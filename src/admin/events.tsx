import { useMutation, useQuery } from "convex/react"
import { useState } from "react"
import {
  Badge,
  Button,
  Card,
  confirmDelete,
  Empty,
  ErrorText,
  Field,
  fromImage,
  IconButton,
  ImageField,
  Input,
  Loading,
  Modal,
  PageHeader,
  Select,
  Tabs,
  Textarea,
  toImage,
  useAsync,
  type ImageValue,
} from "@/admin/ui"
import { formatDay, formatTime, todayKey } from "@/lib/util"
import { api } from "../../convex/_generated/api"
import type { Doc } from "../../convex/_generated/dataModel"

type EventDoc = Doc<"events"> & { image: string | null }

const VENUES = ["", "Il Tetto", "Mezzo", "Emporio", "All floors"]

export function EventsAdmin() {
  const events = useQuery(api.events.listForAdmin)
  const remove = useMutation(api.events.remove)
  const [editing, setEditing] = useState<EventDoc | "new" | null>(null)
  const [view, setView] = useState<"upcoming" | "past">("upcoming")
  const today = todayKey()

  const isUpcoming = (e: EventDoc) =>
    e.recurrence === "none" ? e.date >= today : !e.recurUntil || e.recurUntil >= today
  const shown = (events ?? [])
    .filter((e) => (view === "upcoming" ? isUpcoming(e) : !isUpcoming(e)))
    .sort((a, b) =>
      view === "upcoming" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date),
    )

  return (
    <>
      <PageHeader
        title="Events"
        description="Events publish to the calendar on the Events page. Weekly and monthly events repeat from their start date."
        actions={
          <Button variant="primary" onClick={() => setEditing("new")}>
            <i className="ph ph-plus" /> Add event
          </Button>
        }
      />
      <Tabs
        items={[
          { value: "upcoming", label: "Upcoming & recurring" },
          { value: "past", label: "Past" },
        ]}
        value={view}
        onChange={setView}
      />
      {events === undefined ? (
        <Loading />
      ) : shown.length === 0 ? (
        <Empty>{view === "upcoming" ? "No upcoming events." : "No past events."}</Empty>
      ) : (
        <Card>
          <ul className="divide-y divide-ink/5">
            {shown.map((event) => (
              <li key={event._id} className="flex flex-wrap items-center gap-4 px-4 py-3">
                <div className="w-16 text-center">
                  <div className="text-[0.65rem] font-medium text-sienna uppercase">
                    {formatDay(event.date, { month: "short" })}
                  </div>
                  <div className="text-2xl font-semibold">{Number(event.date.slice(8))}</div>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2 text-sm font-medium">
                    {event.title}
                    {event.recurrence !== "none" && (
                      <Badge tone="green">
                        Every {event.recurrence === "weekly" ? "week" : "month"}
                      </Badge>
                    )}
                  </div>
                  <div className="text-xs text-ink-soft">
                    {[event.startTime && formatTime(event.startTime), event.venue]
                      .filter(Boolean)
                      .join(" • ")}
                    {event.recurUntil &&
                      ` • until ${formatDay(event.recurUntil, { month: "short", day: "numeric" })}`}
                  </div>
                </div>
                <div className="flex">
                  <IconButton
                    icon="ph-pencil-simple"
                    label="Edit"
                    onClick={() => setEditing(event)}
                  />
                  <IconButton
                    icon="ph-trash"
                    label="Delete"
                    onClick={() => confirmDelete(`"${event.title}"`) && remove({ id: event._id })}
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}
      {editing && (
        <EventModal event={editing === "new" ? null : editing} onClose={() => setEditing(null)} />
      )}
    </>
  )
}

function EventModal({ event, onClose }: { event: EventDoc | null; onClose: () => void }) {
  const create = useMutation(api.events.create)
  const update = useMutation(api.events.update)
  const [form, setForm] = useState({
    title: event?.title ?? "",
    date: event?.date ?? "",
    startTime: event?.startTime ?? "",
    endTime: event?.endTime ?? "",
    desc: event?.desc ?? "",
    venue: event?.venue ?? "",
    buttonText: event?.buttonText ?? "",
    buttonUrl: event?.buttonUrl ?? "",
    recurrence: event?.recurrence ?? ("none" as const),
    recurUntil: event?.recurUntil ?? "",
  })
  const [image, setImage] = useState<ImageValue>(event ? fromImage(event) : {})
  const { busy, error, setError, run } = useAsync()
  const set = (changes: Partial<typeof form>) => setForm((f) => ({ ...f, ...changes }))

  const save = async () => {
    if (!form.title.trim()) return setError("Add a title")
    if (!form.date) return setError("Pick a date")
    if (form.buttonText && !form.buttonUrl) return setError("Add a link for the button")
    const fields = {
      title: form.title.trim(),
      date: form.date,
      startTime: form.startTime || undefined,
      endTime: form.endTime || undefined,
      desc: form.desc.trim() || undefined,
      venue: form.venue || undefined,
      buttonText: form.buttonText.trim() || undefined,
      buttonUrl: form.buttonUrl.trim() || undefined,
      recurrence: form.recurrence,
      recurUntil: form.recurrence !== "none" && form.recurUntil ? form.recurUntil : undefined,
      ...toImage(image),
    }
    const ok = await run(() => (event ? update({ id: event._id, ...fields }) : create(fields)))
    if (ok) onClose()
  }

  return (
    <Modal
      title={event ? "Edit event" : "New event"}
      onClose={onClose}
      wide
      footer={
        <>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="primary" disabled={busy} onClick={save}>
            Save
          </Button>
        </>
      }
    >
      <Field label="Title">
        <Input value={form.title} onChange={(e) => set({ title: e.target.value })} autoFocus />
      </Field>
      <div className="grid gap-4 sm:grid-cols-4">
        <Field label="Date" className="sm:col-span-2">
          <Input type="date" value={form.date} onChange={(e) => set({ date: e.target.value })} />
        </Field>
        <Field label="Start">
          <Input
            type="time"
            value={form.startTime}
            onChange={(e) => set({ startTime: e.target.value })}
          />
        </Field>
        <Field label="End">
          <Input
            type="time"
            value={form.endTime}
            onChange={(e) => set({ endTime: e.target.value })}
          />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Repeats">
          <Select
            value={form.recurrence}
            onChange={(e) => set({ recurrence: e.target.value as typeof form.recurrence })}
          >
            <option value="none">Doesn't repeat</option>
            <option value="weekly">Every week</option>
            <option value="monthly">Every month</option>
          </Select>
        </Field>
        {form.recurrence !== "none" && (
          <Field label="Until" hint="Optional end date">
            <Input
              type="date"
              value={form.recurUntil}
              onChange={(e) => set({ recurUntil: e.target.value })}
            />
          </Field>
        )}
        <Field label="Where">
          <Select value={form.venue} onChange={(e) => set({ venue: e.target.value })}>
            {VENUES.map((v) => (
              <option key={v} value={v}>
                {v || "Not set"}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Field label="Description">
        <Textarea value={form.desc} onChange={(e) => set({ desc: e.target.value })} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Button text" hint="e.g. Get tickets">
          <Input value={form.buttonText} onChange={(e) => set({ buttonText: e.target.value })} />
        </Field>
        <Field label="Button link">
          <Input
            placeholder="https://..."
            value={form.buttonUrl}
            onChange={(e) => set({ buttonUrl: e.target.value })}
          />
        </Field>
      </div>
      <ImageField label="Image (optional)" value={image} onChange={setImage} />
      <ErrorText message={error} />
    </Modal>
  )
}
