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
  Tabs,
  Textarea,
  toImage,
  Toggle,
  useAsync,
  type ImageValue,
} from "@/admin/ui"
import { WEEKDAYS } from "@/lib/util"
import { api } from "../../convex/_generated/api"
import type { Doc } from "../../convex/_generated/dataModel"

type Restaurant = Doc<"specials">["restaurant"]
type Special = Doc<"specials"> & { image: string | null }

const RESTAURANTS: { value: Restaurant; label: string }[] = [
  { value: "tetto", label: "Il Tetto" },
  { value: "mezzo", label: "Mezzo" },
  { value: "emporio", label: "Emporio" },
]

export function SpecialsAdmin() {
  const [restaurant, setRestaurant] = useState<Restaurant>("tetto")
  const specials = useQuery(api.specials.listForAdmin, { restaurant })
  const [editing, setEditing] = useState<Special | "new" | null>(null)
  const setActive = useMutation(api.specials.setActive)
  const move = useMutation(api.specials.move)
  const remove = useMutation(api.specials.remove)

  return (
    <>
      <PageHeader
        title="Daily specials"
        description="Specials show on each restaurant page for the days you pick, and on the home page for today."
        actions={
          <Button variant="primary" onClick={() => setEditing("new")}>
            <i className="ph ph-plus" /> Add special
          </Button>
        }
      />
      <Tabs items={RESTAURANTS} value={restaurant} onChange={setRestaurant} />
      {specials === undefined ? (
        <Loading />
      ) : specials.length === 0 ? (
        <Empty>No specials for this restaurant yet.</Empty>
      ) : (
        <Card>
          <ul className="divide-y divide-ink/5">
            {specials.map((special, index) => (
              <li key={special._id} className="flex flex-wrap items-center gap-4 px-4 py-3">
                {special.image ? (
                  <img src={special.image} alt="" className="h-12 w-16 rounded-md object-cover" />
                ) : (
                  <div className="flex h-12 w-16 items-center justify-center rounded-md bg-ink/5">
                    <i className="ph ph-star text-ink/30" />
                  </div>
                )}
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2 text-sm font-medium">
                    {special.name}
                    {special.price && <span className="text-ink-soft">{special.price}</span>}
                    {!special.active && <Badge>Off</Badge>}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {WEEKDAYS.map((day, d) => (
                      <span
                        key={day}
                        className={`rounded px-1.5 py-0.5 text-[0.65rem] ${
                          special.days.includes(d) ? "bg-sienna/10 text-sienna" : "text-ink/25"
                        }`}
                      >
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
                <Toggle
                  checked={special.active}
                  onChange={(active) => setActive({ id: special._id, active })}
                  label="Active"
                />
                <div className="flex">
                  <IconButton
                    icon="ph-arrow-up"
                    label="Move up"
                    disabled={index === 0}
                    onClick={() => move({ id: special._id, direction: "up" })}
                  />
                  <IconButton
                    icon="ph-arrow-down"
                    label="Move down"
                    disabled={index === specials.length - 1}
                    onClick={() => move({ id: special._id, direction: "down" })}
                  />
                  <IconButton
                    icon="ph-pencil-simple"
                    label="Edit"
                    onClick={() => setEditing(special)}
                  />
                  <IconButton
                    icon="ph-trash"
                    label="Delete"
                    onClick={() =>
                      confirmDelete(`"${special.name}"`) && remove({ id: special._id })
                    }
                  />
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}
      {editing && (
        <SpecialModal
          restaurant={restaurant}
          special={editing === "new" ? null : editing}
          onClose={() => setEditing(null)}
        />
      )}
    </>
  )
}

function SpecialModal({
  restaurant,
  special,
  onClose,
}: {
  restaurant: Restaurant
  special: Special | null
  onClose: () => void
}) {
  const create = useMutation(api.specials.create)
  const update = useMutation(api.specials.update)
  const [form, setForm] = useState({
    name: special?.name ?? "",
    desc: special?.desc ?? "",
    price: special?.price ?? "",
    days: special?.days ?? [0, 1, 2, 3, 4, 5, 6],
    active: special?.active ?? true,
  })
  const [image, setImage] = useState<ImageValue>(special ? fromImage(special) : {})
  const { busy, error, setError, run } = useAsync()

  const toggleDay = (day: number) =>
    setForm((f) => ({
      ...f,
      days: f.days.includes(day) ? f.days.filter((d) => d !== day) : [...f.days, day].sort(),
    }))

  const save = async () => {
    if (!form.name.trim()) return setError("Add a name")
    if (form.days.length === 0) return setError("Pick at least one day")
    const fields = {
      name: form.name.trim(),
      desc: form.desc.trim() || undefined,
      price: form.price.trim().replace(/^\$/, "") || undefined,
      days: form.days,
      active: form.active,
      ...toImage(image),
    }
    const ok = await run(() =>
      special ? update({ id: special._id, ...fields }) : create({ restaurant, ...fields }),
    )
    if (ok) onClose()
  }

  return (
    <Modal
      title={special ? "Edit special" : "New special"}
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
      <Field label="Name">
        <Input
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          autoFocus
        />
      </Field>
      <Field label="Description">
        <Textarea value={form.desc} onChange={(e) => setForm({ ...form, desc: e.target.value })} />
      </Field>
      <Field label="Price" hint="Optional. Numbers show with $.">
        <Input value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
      </Field>
      <div>
        <span className="mb-1 block text-xs font-medium text-ink-soft">Days</span>
        <div className="flex flex-wrap gap-1.5">
          {WEEKDAYS.map((day, d) => (
            <button
              key={day}
              type="button"
              onClick={() => toggleDay(d)}
              className={`rounded-md border px-3 py-1.5 text-sm ${
                form.days.includes(d)
                  ? "border-sienna bg-sienna text-white"
                  : "border-ink/15 text-ink-soft hover:bg-ink/5"
              }`}
            >
              {day}
            </button>
          ))}
          <Button
            size="sm"
            variant="ghost"
            onClick={() => setForm({ ...form, days: [0, 1, 2, 3, 4, 5, 6] })}
          >
            Every day
          </Button>
        </div>
      </div>
      <ImageField label="Image (optional)" value={image} onChange={setImage} />
      <Toggle
        checked={form.active}
        onChange={(active) => setForm({ ...form, active })}
        label="Active"
      />
      <ErrorText message={error} />
    </Modal>
  )
}
