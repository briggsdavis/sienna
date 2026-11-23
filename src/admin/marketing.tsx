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
  Textarea,
  toImage,
  Toggle,
  useAsync,
  type ImageValue,
} from "@/admin/ui"
import { api } from "../../convex/_generated/api"
import type { Doc } from "../../convex/_generated/dataModel"

type Popup = Doc<"popups"> & { image: string | null }
type Announcement = Doc<"announcements">

export function MarketingAdmin() {
  const popups = useQuery(api.marketing.listPopups)
  const announcements = useQuery(api.marketing.listAnnouncements)
  const [popup, setPopup] = useState<Popup | "new" | null>(null)
  const [announcement, setAnnouncement] = useState<Announcement | "new" | null>(null)
  const removePopup = useMutation(api.marketing.removePopup)
  const removeAnnouncement = useMutation(api.marketing.removeAnnouncement)
  const setPopupActive = useMutation(api.marketing.setPopupActive)
  const setAnnouncementActive = useMutation(api.marketing.setAnnouncementActive)

  return (
    <>
      <PageHeader
        title="Popup & announcement bar"
        description="Promote signups and news without touching code. Only one popup can be active at a time. Signups land in Subscribers."
      />

      <section className="mb-10">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold">Email popup</h2>
          <Button size="sm" variant="primary" onClick={() => setPopup("new")}>
            <i className="ph ph-plus" /> New popup
          </Button>
        </div>
        {popups === undefined ? (
          <Loading />
        ) : popups.length === 0 ? (
          <Empty>No popups yet.</Empty>
        ) : (
          <Card>
            <ul className="divide-y divide-ink/5">
              {popups.map((p) => (
                <li key={p._id} className="flex flex-wrap items-center gap-4 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      {p.name}
                      {p.active ? <Badge tone="green">Live</Badge> : <Badge>Off</Badge>}
                    </div>
                    <div className="truncate text-xs text-ink-soft">
                      "{p.headline}" • after {p.delaySeconds}s •{" "}
                      {p.frequencyDays === 0 ? "once per visitor" : `every ${p.frequencyDays} days`}{" "}
                      • {p.pages.length ? p.pages.join(", ") : "all pages"}
                    </div>
                  </div>
                  <Toggle
                    checked={p.active}
                    onChange={(active) => setPopupActive({ id: p._id, active })}
                    label="Active"
                  />
                  <IconButton icon="ph-pencil-simple" label="Edit" onClick={() => setPopup(p)} />
                  <IconButton
                    icon="ph-trash"
                    label="Delete"
                    onClick={() => confirmDelete(`popup "${p.name}"`) && removePopup({ id: p._id })}
                  />
                </li>
              ))}
            </ul>
          </Card>
        )}
      </section>

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-base font-semibold">Announcement bar</h2>
          <Button size="sm" variant="primary" onClick={() => setAnnouncement("new")}>
            <i className="ph ph-plus" /> New announcement
          </Button>
        </div>
        {announcements === undefined ? (
          <Loading />
        ) : announcements.length === 0 ? (
          <Empty>No announcements yet.</Empty>
        ) : (
          <Card>
            <ul className="divide-y divide-ink/5">
              {announcements.map((a) => (
                <li key={a._id} className="flex flex-wrap items-center gap-4 px-4 py-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 text-sm font-medium">
                      <span className="truncate">{a.message}</span>
                      {a.active ? <Badge tone="green">Live</Badge> : <Badge>Off</Badge>}
                    </div>
                    <div className="text-xs text-ink-soft">
                      {a.ctaText ? `${a.ctaText} → ${a.ctaUrl}` : "No button"}
                      {(a.startDate || a.endDate) &&
                        ` • ${a.startDate ?? "now"} to ${a.endDate ?? "open-ended"}`}
                    </div>
                  </div>
                  <Toggle
                    checked={a.active}
                    onChange={(active) => setAnnouncementActive({ id: a._id, active })}
                    label="Active"
                  />
                  <IconButton
                    icon="ph-pencil-simple"
                    label="Edit"
                    onClick={() => setAnnouncement(a)}
                  />
                  <IconButton
                    icon="ph-trash"
                    label="Delete"
                    onClick={() =>
                      confirmDelete("this announcement") && removeAnnouncement({ id: a._id })
                    }
                  />
                </li>
              ))}
            </ul>
          </Card>
        )}
      </section>

      {popup && (
        <PopupModal popup={popup === "new" ? null : popup} onClose={() => setPopup(null)} />
      )}
      {announcement && (
        <AnnouncementModal
          announcement={announcement === "new" ? null : announcement}
          onClose={() => setAnnouncement(null)}
        />
      )}
    </>
  )
}

function PopupModal({ popup, onClose }: { popup: Popup | null; onClose: () => void }) {
  const create = useMutation(api.marketing.createPopup)
  const update = useMutation(api.marketing.updatePopup)
  const [form, setForm] = useState({
    name: popup?.name ?? "Newsletter",
    headline: popup?.headline ?? "",
    body: popup?.body ?? "",
    buttonLabel: popup?.buttonLabel ?? "Sign me up",
    successMessage: popup?.successMessage ?? "You're on the list.",
    askName: popup?.askName ?? false,
    delaySeconds: String(popup?.delaySeconds ?? 10),
    frequencyDays: String(popup?.frequencyDays ?? 14),
    pages: (popup?.pages ?? []).join(", "),
    active: popup?.active ?? false,
  })
  const [image, setImage] = useState<ImageValue>(popup ? fromImage(popup) : {})
  const { busy, error, setError, run } = useAsync()
  const set = (changes: Partial<typeof form>) => setForm((f) => ({ ...f, ...changes }))

  const save = async () => {
    if (!form.headline.trim()) return setError("Add a headline")
    const fields = {
      name: form.name.trim() || "Popup",
      headline: form.headline.trim(),
      body: form.body.trim(),
      buttonLabel: form.buttonLabel.trim() || "Sign up",
      successMessage: form.successMessage.trim() || "Thanks!",
      askName: form.askName,
      delaySeconds: Math.max(0, Number(form.delaySeconds) || 0),
      frequencyDays: Math.max(0, Number(form.frequencyDays) || 0),
      pages: form.pages
        .split(",")
        .map((p) => p.trim())
        .filter(Boolean),
      active: form.active,
      ...toImage(image),
    }
    const ok = await run(() => (popup ? update({ id: popup._id, ...fields }) : create(fields)))
    if (ok) onClose()
  }

  return (
    <Modal
      title={popup ? "Edit popup" : "New popup"}
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
      <Field label="Internal name">
        <Input value={form.name} onChange={(e) => set({ name: e.target.value })} />
      </Field>
      <Field label="Headline">
        <Input value={form.headline} onChange={(e) => set({ headline: e.target.value })} />
      </Field>
      <Field label="Copy">
        <Textarea value={form.body} onChange={(e) => set({ body: e.target.value })} />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Button label">
          <Input value={form.buttonLabel} onChange={(e) => set({ buttonLabel: e.target.value })} />
        </Field>
        <Field label="Success message">
          <Input
            value={form.successMessage}
            onChange={(e) => set({ successMessage: e.target.value })}
          />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Show after (seconds)">
          <Input
            inputMode="numeric"
            value={form.delaySeconds}
            onChange={(e) => set({ delaySeconds: e.target.value })}
          />
        </Field>
        <Field label="Show again after (days)" hint="0 = only once per visitor">
          <Input
            inputMode="numeric"
            value={form.frequencyDays}
            onChange={(e) => set({ frequencyDays: e.target.value })}
          />
        </Field>
        <Field
          label="Only on pages"
          hint="Comma separated, e.g. /, /mezzo, /menus/*. Blank = all pages"
        >
          <Input value={form.pages} onChange={(e) => set({ pages: e.target.value })} />
        </Field>
      </div>
      <ImageField label="Image (optional)" value={image} onChange={setImage} />
      <div className="flex gap-6">
        <Toggle
          checked={form.askName}
          onChange={(askName) => set({ askName })}
          label="Ask for first name"
        />
        <Toggle checked={form.active} onChange={(active) => set({ active })} label="Active" />
      </div>
      <p className="text-xs text-ink-soft">
        The email field and consent checkbox are always shown. Consent wording is in Settings.
      </p>
      <ErrorText message={error} />
    </Modal>
  )
}

function AnnouncementModal({
  announcement,
  onClose,
}: {
  announcement: Announcement | null
  onClose: () => void
}) {
  const create = useMutation(api.marketing.createAnnouncement)
  const update = useMutation(api.marketing.updateAnnouncement)
  const [form, setForm] = useState({
    message: announcement?.message ?? "",
    ctaText: announcement?.ctaText ?? "",
    ctaUrl: announcement?.ctaUrl ?? "",
    tone: announcement?.tone ?? ("sienna" as const),
    dismissible: announcement?.dismissible ?? true,
    active: announcement?.active ?? true,
    startDate: announcement?.startDate ?? "",
    endDate: announcement?.endDate ?? "",
  })
  const { busy, error, setError, run } = useAsync()
  const set = (changes: Partial<typeof form>) => setForm((f) => ({ ...f, ...changes }))

  const save = async () => {
    if (!form.message.trim()) return setError("Add a message")
    if (form.ctaText && !form.ctaUrl) return setError("Add a link for the button")
    const fields = {
      message: form.message.trim(),
      ctaText: form.ctaText.trim() || undefined,
      ctaUrl: form.ctaUrl.trim() || undefined,
      tone: form.tone,
      dismissible: form.dismissible,
      active: form.active,
      startDate: form.startDate || undefined,
      endDate: form.endDate || undefined,
    }
    const ok = await run(() =>
      announcement ? update({ id: announcement._id, ...fields }) : create(fields),
    )
    if (ok) onClose()
  }

  return (
    <Modal
      title={announcement ? "Edit announcement" : "New announcement"}
      onClose={onClose}
      footer={
        <>
          <Button onClick={onClose}>Cancel</Button>
          <Button variant="primary" disabled={busy} onClick={save}>
            Save
          </Button>
        </>
      }
    >
      <Field label="Message">
        <Input value={form.message} onChange={(e) => set({ message: e.target.value })} autoFocus />
      </Field>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Button text (optional)">
          <Input value={form.ctaText} onChange={(e) => set({ ctaText: e.target.value })} />
        </Field>
        <Field label="Button link">
          <Input
            placeholder="/events or https://..."
            value={form.ctaUrl}
            onChange={(e) => set({ ctaUrl: e.target.value })}
          />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-3">
        <Field label="Color">
          <Select
            value={form.tone}
            onChange={(e) => set({ tone: e.target.value as typeof form.tone })}
          >
            <option value="sienna">Sienna red</option>
            <option value="ink">Dark</option>
            <option value="cream">Cream</option>
          </Select>
        </Field>
        <Field label="Start date">
          <Input
            type="date"
            value={form.startDate}
            onChange={(e) => set({ startDate: e.target.value })}
          />
        </Field>
        <Field label="End date">
          <Input
            type="date"
            value={form.endDate}
            onChange={(e) => set({ endDate: e.target.value })}
          />
        </Field>
      </div>
      <div className="flex gap-6">
        <Toggle
          checked={form.dismissible}
          onChange={(dismissible) => set({ dismissible })}
          label="Visitors can close it"
        />
        <Toggle checked={form.active} onChange={(active) => set({ active })} label="Active" />
      </div>
      <ErrorText message={error} />
    </Modal>
  )
}
