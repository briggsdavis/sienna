import { getAuthUserId } from "@convex-dev/auth/server"
import { HOUR, MINUTE, RateLimiter } from "@convex-dev/rate-limiter"
import { Resend } from "@convex-dev/resend"
import { ConvexError } from "convex/values"
import { components } from "./_generated/api"
import type { Doc, Id } from "./_generated/dataModel"
import { env, type MutationCtx, type QueryCtx } from "./_generated/server"

export const rateLimiter = new RateLimiter(components.rateLimiter, {
  inquiryByEmail: { kind: "token bucket", rate: 3, period: 10 * MINUTE, capacity: 3 },
  inquiryGlobal: { kind: "token bucket", rate: 200, period: HOUR, capacity: 50 },
  signupByEmail: { kind: "fixed window", rate: 3, period: HOUR },
  trackByVisitor: { kind: "token bucket", rate: 120, period: MINUTE, capacity: 30 },
})

export const resend = new Resend(components.resend, { testMode: false })

export function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

function envAdminEmails() {
  return (env.ADMIN_EMAILS ?? "")
    .split(",")
    .map((email) => normalizeEmail(email))
    .filter(Boolean)
}

export async function isAdminEmail(ctx: QueryCtx, email: string | undefined) {
  if (!email) return false
  const normalized = normalizeEmail(email)
  if (envAdminEmails().includes(normalized)) return true
  const row = await ctx.db
    .query("admins")
    .withIndex("by_email", (q) => q.eq("email", normalized))
    .unique()
  return row !== null
}

export async function getAdmin(ctx: QueryCtx) {
  const userId = await getAuthUserId(ctx)
  if (!userId) return null
  const user = await ctx.db.get("users", userId)
  if (!user || !(await isAdminEmail(ctx, user.email))) return null
  return user
}

export async function requireAdmin(ctx: QueryCtx) {
  const admin = await getAdmin(ctx)
  if (!admin) throw new ConvexError("Not authorized")
  return admin
}

export async function resolveImage(
  ctx: QueryCtx,
  doc: { imageId?: Id<"_storage">; imageUrl?: string },
) {
  if (doc.imageId) return (await ctx.storage.getUrl(doc.imageId)) ?? doc.imageUrl ?? null
  return doc.imageUrl ?? null
}

export function dayKey(time = Date.now()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/New_York",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(new Date(time))
}

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

export function cleanText(value: string | undefined, field: string, max: number, required = false) {
  const text = (value ?? "").trim()
  if (required && !text) throw new ConvexError(`${field} is required`)
  if (text.length > max) throw new ConvexError(`${field} is too long`)
  return text
}

export function cleanEmail(value: string) {
  const email = normalizeEmail(value)
  if (!EMAIL_RE.test(email) || email.length > 200) {
    throw new ConvexError("Enter a valid email address")
  }
  return email
}

export function cleanPhone(value: string | undefined, required = false) {
  const phone = cleanText(value, "Phone", 40, required)
  if (phone && phone.replace(/\D/g, "").length < 7) {
    throw new ConvexError("Enter a valid phone number")
  }
  return phone
}

export function rejectBots(honeypot: string | undefined, startedAt: number) {
  if (honeypot) throw new ConvexError("Submission rejected")
  if (Date.now() - startedAt < 2500) throw new ConvexError("Please take a moment and try again")
}

export async function limitInquiry(ctx: MutationCtx, email: string) {
  const global = await rateLimiter.limit(ctx, "inquiryGlobal")
  const perEmail = await rateLimiter.limit(ctx, "inquiryByEmail", { key: email })
  if (!global.ok || !perEmail.ok) {
    throw new ConvexError("Too many submissions. Please wait a few minutes and try again.")
  }
}

export async function getSettingsDoc(ctx: QueryCtx): Promise<Doc<"settings"> | null> {
  return await ctx.db
    .query("settings")
    .withIndex("by_key", (q) => q.eq("key", "site"))
    .unique()
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
}

export async function notify(
  ctx: MutationCtx,
  options: {
    subject: string
    intro: string
    rows: [string, string][]
    table?: { head: string[]; rows: string[][] }
    replyTo?: string
    idempotencyKey: string
  },
) {
  const settings = await getSettingsDoc(ctx)
  const to = settings?.notificationEmail || env.NOTIFY_EMAIL
  if (!to || !env.RESEND_API_KEY) return

  const rows = options.rows
    .filter(([, value]) => value)
    .map(
      ([label, value]) =>
        `<tr><td style="padding:6px 12px 6px 0;color:#4a3a2a;vertical-align:top">${escapeHtml(label)}</td><td style="padding:6px 0;color:#1a120b">${escapeHtml(value).replace(/\n/g, "<br>")}</td></tr>`,
    )
    .join("")

  const table = options.table
    ? `<table style="margin-top:20px;border-collapse:collapse;width:100%">
        <tr>${options.table.head.map((h) => `<th style="text-align:left;border-bottom:1px solid #ccc;padding:6px">${escapeHtml(h)}</th>`).join("")}</tr>
        ${options.table.rows.map((r) => `<tr>${r.map((c) => `<td style="border-bottom:1px solid #eee;padding:6px">${escapeHtml(c)}</td>`).join("")}</tr>`).join("")}
      </table>`
    : ""

  const adminUrl = env.SITE_URL ? `${env.SITE_URL.replace(/\/$/, "")}/admin` : null

  await resend.sendEmail(ctx, {
    from: env.EMAIL_FROM ?? "Sienna Mercato <notifications@siennamercato.com>",
    to,
    subject: options.subject,
    replyTo: options.replyTo ? [options.replyTo] : undefined,
    idempotencyKey: options.idempotencyKey,
    html: `<div style="font-family:Georgia,serif;max-width:640px">
      <h2 style="color:#e03c31;margin:0 0 8px">${escapeHtml(options.subject)}</h2>
      <p style="color:#4a3a2a">${escapeHtml(options.intro)}</p>
      <table style="border-collapse:collapse">${rows}</table>
      ${table}
      ${adminUrl ? `<p style="margin-top:24px"><a href="${adminUrl}" style="color:#e03c31">Open the dashboard</a></p>` : ""}
    </div>`,
  })
}

export function formatMoney(value: number) {
  return `$${value.toFixed(2)}`
}

export async function swapOrder<T extends "menuSections" | "menuItems" | "specials">(
  ctx: MutationCtx,
  table: T,
  a: { _id: Id<T>; order: number },
  b: { _id: Id<T>; order: number } | null,
) {
  if (!b) return
  await ctx.db.patch(table, a._id, { order: b.order } as never)
  await ctx.db.patch(table, b._id, { order: a.order } as never)
}
