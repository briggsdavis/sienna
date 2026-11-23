import { useMutation, usePaginatedQuery, useQuery } from "convex/react"
import { useEffect, useState, type ReactNode } from "react"
import { useNavigate, useParams } from "react-router"
import {
  Badge,
  Button,
  Card,
  confirmDelete,
  Empty,
  Input,
  Loading,
  PageHeader,
  Select,
  Tabs,
} from "@/admin/ui"
import { formatDay, formatTime, money } from "@/lib/util"
import { api } from "../../convex/_generated/api"
import type { Doc } from "../../convex/_generated/dataModel"

type Kind = "catering" | "privateEvent" | "contact"
type Status = "new" | "reviewed" | "archived"
type AnyInquiry = Doc<"cateringInquiries"> | Doc<"contactInquiries"> | Doc<"privateEventInquiries">

const KINDS: { value: Kind; label: string }[] = [
  { value: "catering", label: "Catering" },
  { value: "privateEvent", label: "Private events" },
  { value: "contact", label: "Contact" },
]

function isKind(value: string | undefined): value is Kind {
  return KINDS.some((k) => k.value === value)
}

const STATUS_TONE = { new: "red", reviewed: "green", archived: "neutral" } as const

function useDebounced(value: string, ms = 300) {
  const [debounced, setDebounced] = useState(value)
  useEffect(() => {
    const t = window.setTimeout(() => setDebounced(value), ms)
    return () => window.clearTimeout(t)
  }, [value, ms])
  return debounced
}

function summary(kind: Kind, row: AnyInquiry) {
  if (kind === "catering") {
    const r = row as Doc<"cateringInquiries">
    return `${formatDay(r.eventDate, { month: "short", day: "numeric" })} • ${r.items.length} items • ${money(r.subtotal)}`
  }
  if (kind === "privateEvent") {
    const r = row as Doc<"privateEventInquiries">
    return `${formatDay(r.date, { month: "short", day: "numeric" })} • ${r.partySize} guests • ${r.restaurant}`
  }
  const r = row as Doc<"contactInquiries">
  return r.subject || r.message.slice(0, 80)
}

export function InquiriesAdmin() {
  const params = useParams()
  const navigate = useNavigate()
  const kind: Kind = isKind(params.kind) ? params.kind : "catering"
  const [status, setStatus] = useState<Status | "">("")
  const [search, setSearch] = useState("")
  const debounced = useDebounced(search)
  const counts = useQuery(api.inquiries.counts)
  const {
    results,
    status: pageStatus,
    loadMore,
  } = usePaginatedQuery(
    api.inquiries.list,
    { kind, status: status || undefined, search: debounced || undefined },
    { initialNumItems: 25 },
  )
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const rows = results as AnyInquiry[]
  const selected = rows.find((r) => r._id === selectedId) ?? null

  useEffect(() => setSelectedId(null), [kind])

  return (
    <>
      <PageHeader
        title="Inquiries"
        description="Everything sent through the website. Catering requests are requests only: nothing has been paid or confirmed."
      />
      <Tabs
        items={KINDS.map((k) => ({ ...k, badge: counts?.[k.value] }))}
        value={kind}
        onChange={(value) => navigate(`/admin/inquiries/${value}`)}
      />
      <div className="mb-4 flex flex-wrap gap-2">
        <div className="relative min-w-60 flex-1">
          <i className="ph ph-magnifying-glass absolute top-1/2 left-3 -translate-y-1/2 text-ink-soft" />
          <Input
            placeholder="Search name, email, phone, notes..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>
        <Select
          value={status}
          onChange={(e) => setStatus(e.target.value as Status | "")}
          className="w-40"
        >
          <option value="">All statuses</option>
          <option value="new">New</option>
          <option value="reviewed">Reviewed</option>
          <option value="archived">Archived</option>
        </Select>
      </div>

      <div className="grid gap-5 lg:grid-cols-[1fr_1.1fr]">
        <div>
          {pageStatus === "LoadingFirstPage" ? (
            <Loading />
          ) : rows.length === 0 ? (
            <Empty>No inquiries match.</Empty>
          ) : (
            <Card>
              <ul className="divide-y divide-ink/5">
                {rows.map((row) => (
                  <li key={row._id}>
                    <button
                      type="button"
                      onClick={() => setSelectedId(row._id)}
                      className={`flex w-full items-start gap-3 px-4 py-3 text-left transition-colors hover:bg-ink/[0.03] ${
                        selectedId === row._id ? "bg-sienna/5" : ""
                      }`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2 text-sm font-medium">
                          {row.name}
                          <Badge tone={STATUS_TONE[row.status]}>{row.status}</Badge>
                        </div>
                        <div className="truncate text-xs text-ink-soft">{summary(kind, row)}</div>
                      </div>
                      <span className="shrink-0 text-xs text-ink-soft">
                        {new Date(row._creationTime).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                        })}
                      </span>
                    </button>
                  </li>
                ))}
              </ul>
              {pageStatus === "CanLoadMore" && (
                <div className="border-t border-ink/5 p-3 text-center">
                  <Button size="sm" onClick={() => loadMore(25)}>
                    Load more
                  </Button>
                </div>
              )}
            </Card>
          )}
        </div>
        <div className="lg:sticky lg:top-6 lg:self-start">
          {selected ? (
            <Detail kind={kind} row={selected} onDeleted={() => setSelectedId(null)} />
          ) : (
            <Empty>Select an inquiry to see the details.</Empty>
          )}
        </div>
      </div>
    </>
  )
}

function Row({ label, children }: { label: string; children: ReactNode }) {
  if (!children) return null
  return (
    <div className="grid grid-cols-[120px_1fr] gap-3 py-1.5 text-sm">
      <dt className="text-ink-soft">{label}</dt>
      <dd className="break-words whitespace-pre-line">{children}</dd>
    </div>
  )
}

function Detail({ kind, row, onDeleted }: { kind: Kind; row: AnyInquiry; onDeleted: () => void }) {
  const setStatus = useMutation(api.inquiries.setStatus)
  const remove = useMutation(api.inquiries.remove)

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="text-lg font-semibold">{row.name}</h2>
          <div className="text-xs text-ink-soft">
            Received{" "}
            {new Date(row._creationTime).toLocaleString("en-US", {
              dateStyle: "medium",
              timeStyle: "short",
            })}
          </div>
        </div>
        <Badge tone={STATUS_TONE[row.status]}>{row.status}</Badge>
      </div>

      <dl className="mt-4 border-t border-ink/10 pt-3">
        <Row label="Email">
          <a href={`mailto:${row.email}`} className="text-sienna underline">
            {row.email}
          </a>
        </Row>
        <Row label="Phone">
          {row.phone && (
            <a href={`tel:${row.phone}`} className="text-sienna underline">
              {row.phone}
            </a>
          )}
        </Row>
        {kind === "catering" && <CateringRows row={row as Doc<"cateringInquiries">} />}
        {kind === "privateEvent" && <PrivateRows row={row as Doc<"privateEventInquiries">} />}
        {kind === "contact" && (
          <>
            <Row label="Subject">{(row as Doc<"contactInquiries">).subject}</Row>
            <Row label="Message">{(row as Doc<"contactInquiries">).message}</Row>
          </>
        )}
      </dl>

      <div className="mt-5 flex flex-wrap gap-2 border-t border-ink/10 pt-4">
        {(["new", "reviewed", "archived"] as const).map((s) => (
          <Button
            key={s}
            size="sm"
            variant={row.status === s ? "primary" : "secondary"}
            onClick={() => setStatus({ kind, id: row._id, status: s })}
          >
            {s === "new" ? "Mark new" : s === "reviewed" ? "Mark reviewed" : "Archive"}
          </Button>
        ))}
        <a
          href={`mailto:${row.email}`}
          className="inline-flex items-center gap-1.5 rounded-lg border border-ink/15 px-2.5 py-1.5 text-xs font-medium hover:bg-ink/5"
        >
          <i className="ph ph-envelope" /> Reply
        </a>
        <Button
          size="sm"
          variant="danger"
          className="ml-auto"
          onClick={async () => {
            if (!confirmDelete(`this inquiry from ${row.name}`)) return
            await remove({ kind, id: row._id })
            onDeleted()
          }}
        >
          <i className="ph ph-trash" /> Delete
        </Button>
      </div>
    </Card>
  )
}

function CateringRows({ row }: { row: Doc<"cateringInquiries"> }) {
  return (
    <>
      <Row label="Date">
        {formatDay(row.eventDate, {
          weekday: "long",
          month: "long",
          day: "numeric",
          year: "numeric",
        })}
      </Row>
      <Row label="Time">{formatTime(row.eventTime)}</Row>
      <Row label="Service">{row.fulfillment === "delivery" ? "Delivery" : "Pickup"}</Row>
      <Row label="Address">{row.address}</Row>
      <Row label="Guests">{row.guests}</Row>
      <Row label="Notes">{row.notes}</Row>
      <div className="mt-3 overflow-hidden rounded-lg border border-ink/10">
        <table className="w-full text-sm">
          <thead className="bg-ink/[0.03] text-left text-xs text-ink-soft">
            <tr>
              <th className="px-3 py-2 font-medium">Item</th>
              <th className="px-3 py-2 font-medium">Qty</th>
              <th className="px-3 py-2 text-right font-medium">Total</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-ink/5">
            {row.items.map((item, i) => (
              <tr key={i}>
                <td className="px-3 py-2">
                  {item.name}
                  <div className="text-xs text-ink-soft">
                    {item.option} • {money(item.unitPrice)}
                  </div>
                </td>
                <td className="px-3 py-2 tabular-nums">{item.quantity}</td>
                <td className="px-3 py-2 text-right tabular-nums">{money(item.lineTotal)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr className="border-t border-ink/10 font-semibold">
              <td className="px-3 py-2" colSpan={2}>
                Estimated subtotal
              </td>
              <td className="px-3 py-2 text-right tabular-nums">{money(row.subtotal)}</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </>
  )
}

function PrivateRows({ row }: { row: Doc<"privateEventInquiries"> }) {
  return (
    <>
      <Row label="Restaurant">{row.restaurant}</Row>
      <Row label="Date">
        {formatDay(row.date, { weekday: "long", month: "long", day: "numeric", year: "numeric" })}
      </Row>
      <Row label="Party size">{row.partySize}</Row>
      <Row label="Event type">{row.eventType}</Row>
      <Row label="Notes">{row.notes}</Row>
    </>
  )
}
