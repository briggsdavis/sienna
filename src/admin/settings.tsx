import { useMutation, useQuery } from "convex/react"
import type { FunctionReturnType } from "convex/server"
import { useEffect, useState, type ReactNode } from "react"
import {
  Button,
  Card,
  confirmDelete,
  ErrorText,
  Field,
  IconButton,
  Input,
  Loading,
  PageHeader,
  Select,
  Textarea,
  Toggle,
  useAsync,
} from "@/admin/ui"
import { FLOORS, type FloorId } from "@/lib/site"
import { api } from "../../convex/_generated/api"

type Reservation = {
  mode: "walkin" | "link" | "embed"
  url?: string
  label?: string
  note?: string
}

export function SettingsAdmin() {
  const settings = useQuery(api.settings.get)
  const privateSettings = useQuery(api.settings.getPrivate)
  if (!settings || !privateSettings) return <Loading />
  return <SettingsForm settings={settings} notificationEmail={privateSettings.notificationEmail} />
}

function Section({
  title,
  description,
  children,
}: {
  title: string
  description?: string
  children: ReactNode
}) {
  return (
    <Card className="p-5">
      <h2 className="text-base font-semibold">{title}</h2>
      {description && <p className="mt-1 text-sm text-ink-soft">{description}</p>}
      <div className="mt-4 space-y-4">{children}</div>
    </Card>
  )
}

function SettingsForm({
  settings,
  notificationEmail: initialEmail,
}: {
  settings: FunctionReturnType<typeof api.settings.get>
  notificationEmail: string
}) {
  const update = useMutation(api.settings.update)
  const [form, setForm] = useState({
    notificationEmail: initialEmail,
    giftCardUrl: settings.giftCardUrl,
    orderUrl: settings.orderUrl,
    marketingConsentText: settings.marketingConsentText,
    privacyPolicy: settings.privacyPolicy,
    requireAnalyticsConsent: settings.requireAnalyticsConsent,
  })
  const [reservations, setReservations] = useState<Record<FloorId, Reservation>>(
    settings.reservations,
  )
  const [saved, setSaved] = useState(false)
  const { busy, error, setError, run } = useAsync()
  const set = (changes: Partial<typeof form>) => setForm((f) => ({ ...f, ...changes }))

  useEffect(() => {
    if (!saved) return
    const t = window.setTimeout(() => setSaved(false), 2500)
    return () => window.clearTimeout(t)
  }, [saved])

  const save = async () => {
    for (const id of Object.keys(reservations) as FloorId[]) {
      const r = reservations[id]
      if (r.mode !== "walkin" && !(r.url ?? "").startsWith("https://")) {
        return setError(`${FLOORS[id].name}: add a reservation URL starting with https://`)
      }
    }
    if (form.notificationEmail && !/^\S+@\S+\.\S+$/.test(form.notificationEmail)) {
      return setError("Notification email doesn't look right")
    }
    const ok = await run(() =>
      update({
        ...form,
        notificationEmail: form.notificationEmail.trim(),
        reservations: {
          emporio: clean(reservations.emporio),
          mezzo: clean(reservations.mezzo),
          tetto: clean(reservations.tetto),
        },
      }),
    )
    if (ok) setSaved(true)
  }

  return (
    <>
      <PageHeader
        title="Settings"
        actions={
          <>
            {saved && <span className="self-center text-sm text-emerald-700">Saved</span>}
            <Button variant="primary" disabled={busy} onClick={save}>
              Save changes
            </Button>
          </>
        }
      />
      <div className="space-y-5">
        <ErrorText message={error} />
        <Section
          title="Notifications"
          description="Catering requests, private event inquiries and contact messages are emailed here."
        >
          <Field label="Send inquiry emails to">
            <Input
              type="email"
              value={form.notificationEmail}
              onChange={(e) => set({ notificationEmail: e.target.value })}
              placeholder="events@siennamercato.com"
            />
          </Field>
        </Section>

        <Section
          title="Reservations"
          description="How each restaurant takes bookings. Link sends guests to the booking site; Embed shows the booking widget on the restaurant page."
        >
          {(["tetto", "mezzo", "emporio"] as FloorId[]).map((id) => (
            <ReservationRow
              key={id}
              name={FLOORS[id].name}
              value={reservations[id]}
              onChange={(value) => setReservations({ ...reservations, [id]: value })}
            />
          ))}
        </Section>

        <Section title="Links">
          <Field label="Online ordering URL">
            <Input value={form.orderUrl} onChange={(e) => set({ orderUrl: e.target.value })} />
          </Field>
          <Field label="Gift card URL">
            <Input
              value={form.giftCardUrl}
              onChange={(e) => set({ giftCardUrl: e.target.value })}
            />
          </Field>
        </Section>

        <Section
          title="Privacy & consent"
          description="Final legal wording should come from the restaurant."
        >
          <Field
            label="Email signup consent text"
            hint="Shown next to the checkbox on every signup form, and stored with each subscriber."
          >
            <Textarea
              value={form.marketingConsentText}
              onChange={(e) => set({ marketingConsentText: e.target.value })}
            />
          </Field>
          <Field
            label="Privacy policy"
            hint="Shown on /privacy. Leave blank to use the built-in placeholder."
          >
            <Textarea
              rows={10}
              value={form.privacyPolicy}
              onChange={(e) => set({ privacyPolicy: e.target.value })}
            />
          </Field>
          <Toggle
            checked={form.requireAnalyticsConsent}
            onChange={(requireAnalyticsConsent) => set({ requireAnalyticsConsent })}
            label="Only count visits after a visitor accepts the analytics banner"
          />
        </Section>

        <Admins />
      </div>
    </>
  )
}

function clean(r: Reservation): Reservation {
  return {
    mode: r.mode,
    url: r.mode === "walkin" ? undefined : r.url?.trim() || undefined,
    label: r.label?.trim() || undefined,
    note: r.note?.trim() || undefined,
  }
}

function ReservationRow({
  name,
  value,
  onChange,
}: {
  name: string
  value: Reservation
  onChange: (value: Reservation) => void
}) {
  return (
    <div className="grid gap-3 rounded-lg border border-ink/10 p-4 sm:grid-cols-[120px_160px_1fr]">
      <div className="pt-6 text-sm font-medium">{name}</div>
      <Field label="Mode">
        <Select
          value={value.mode}
          onChange={(e) => onChange({ ...value, mode: e.target.value as Reservation["mode"] })}
        >
          <option value="walkin">Walk-in only</option>
          <option value="link">Link to booking site</option>
          <option value="embed">Embed widget</option>
        </Select>
      </Field>
      <div className="grid gap-3 sm:grid-cols-2">
        {value.mode !== "walkin" && (
          <Field
            label={value.mode === "embed" ? "Widget iframe URL" : "Booking URL"}
            className="sm:col-span-2"
          >
            <Input
              value={value.url ?? ""}
              onChange={(e) => onChange({ ...value, url: e.target.value })}
              placeholder="https://www.opentable.com/..."
            />
          </Field>
        )}
        {value.mode === "link" && (
          <Field label="Button label">
            <Input
              value={value.label ?? ""}
              onChange={(e) => onChange({ ...value, label: e.target.value })}
              placeholder="Reserve on OpenTable"
            />
          </Field>
        )}
        <Field label="Short note" hint="e.g. Walk-ins welcome">
          <Input
            value={value.note ?? ""}
            onChange={(e) => onChange({ ...value, note: e.target.value })}
          />
        </Field>
      </div>
    </div>
  )
}

function Admins() {
  const admins = useQuery(api.admins.list)
  const add = useMutation(api.admins.add)
  const remove = useMutation(api.admins.remove)
  const [email, setEmail] = useState("")
  const { busy, error, run } = useAsync()

  return (
    <Section
      title="Admin users"
      description="People who can sign in to this dashboard. New admins create their password at /admin with this email."
    >
      {admins === undefined ? (
        <Loading />
      ) : (
        <ul className="divide-y divide-ink/5 rounded-lg border border-ink/10">
          {admins.fromEnv.map((e) => (
            <li key={e} className="flex items-center justify-between px-3 py-2 text-sm">
              {e}
              <span className="text-xs text-ink-soft">owner</span>
            </li>
          ))}
          {admins.added.map((a) => (
            <li key={a._id} className="flex items-center justify-between px-3 py-2 text-sm">
              {a.email}
              <IconButton
                icon="ph-trash"
                label="Remove admin"
                onClick={() =>
                  confirmDelete(`admin access for ${a.email}`) && run(() => remove({ id: a._id }))
                }
              />
            </li>
          ))}
        </ul>
      )}
      <form
        className="flex gap-2"
        onSubmit={async (e) => {
          e.preventDefault()
          if (await run(() => add({ email }))) setEmail("")
        }}
      >
        <Input
          type="email"
          placeholder="name@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <Button type="submit" disabled={busy || !email}>
          Add admin
        </Button>
      </form>
      <ErrorText message={error} />
    </Section>
  )
}
