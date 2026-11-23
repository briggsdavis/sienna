import { useMutation, useQuery } from "convex/react"
import { useState } from "react"
import { useNavigate, useParams } from "react-router"
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
  Toggle,
  useAsync,
  type ImageValue,
} from "@/admin/ui"
import type { MenuSection } from "@/components/menu-view"
import { money } from "@/lib/util"
import { api } from "../../convex/_generated/api"
import type { Doc, Id } from "../../convex/_generated/dataModel"

type MenuKey = Doc<"menuSections">["menu"]
type Item = MenuSection["items"][number]

const MENUS: { value: MenuKey; label: string }[] = [
  { value: "tetto", label: "Il Tetto" },
  { value: "mezzo", label: "Mezzo" },
  { value: "emporio", label: "Emporio" },
  { value: "catering", label: "Catering" },
]

function isMenu(value: string | undefined): value is MenuKey {
  return MENUS.some((m) => m.value === value)
}

export function MenusAdmin() {
  const params = useParams()
  const navigate = useNavigate()
  const menu: MenuKey = isMenu(params.menu) ? params.menu : "tetto"
  const sections = useQuery(api.menus.getForAdmin, { menu })
  const [editingSection, setEditingSection] = useState<MenuSection | "new" | null>(null)
  const [editingItem, setEditingItem] = useState<{
    item: Item | null
    sectionId: Id<"menuSections">
  } | null>(null)
  const moveSection = useMutation(api.menus.moveSection)
  const deleteSection = useMutation(api.menus.deleteSection)
  const moveItem = useMutation(api.menus.moveItem)
  const setFlags = useMutation(api.menus.setItemFlags)
  const deleteItem = useMutation(api.menus.deleteItem)
  const catering = menu === "catering"

  return (
    <>
      <PageHeader
        title="Menus"
        description={
          catering
            ? "The catering shop. Each item has one or more sizes with prices. Unavailable items stay listed but can't be added to a cart; hidden items don't show at all."
            : "Edit sections and items. Changes publish to the menu page immediately."
        }
        actions={
          <>
            <a
              href={catering ? "/catering" : `/menus/${menu}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-ink/15 bg-white px-4 py-2 text-sm hover:bg-ink/5"
            >
              <i className="ph ph-arrow-square-out" /> View live
            </a>
            <Button variant="primary" onClick={() => setEditingSection("new")}>
              <i className="ph ph-plus" /> Add section
            </Button>
          </>
        }
      />
      <Tabs items={MENUS} value={menu} onChange={(value) => navigate(`/admin/menus/${value}`)} />

      {sections === undefined ? (
        <Loading />
      ) : sections.length === 0 ? (
        <Empty>No sections yet. Add one to start this menu.</Empty>
      ) : (
        <div className="space-y-5">
          {sections.map((section, sIndex) => (
            <Card key={section._id}>
              <div className="flex flex-wrap items-center gap-3 border-b border-ink/10 px-4 py-3">
                {section.image && (
                  <img src={section.image} alt="" className="h-10 w-14 rounded-md object-cover" />
                )}
                <div className="min-w-0 flex-1">
                  <div className="font-semibold">{section.title}</div>
                  {section.subtitle && (
                    <div className="text-xs text-ink-soft">{section.subtitle}</div>
                  )}
                </div>
                <div className="flex items-center">
                  <IconButton
                    icon="ph-arrow-up"
                    label="Move section up"
                    disabled={sIndex === 0}
                    onClick={() => moveSection({ id: section._id, direction: "up" })}
                  />
                  <IconButton
                    icon="ph-arrow-down"
                    label="Move section down"
                    disabled={sIndex === sections.length - 1}
                    onClick={() => moveSection({ id: section._id, direction: "down" })}
                  />
                  <IconButton
                    icon="ph-pencil-simple"
                    label="Edit section"
                    onClick={() => setEditingSection(section)}
                  />
                  <IconButton
                    icon="ph-trash"
                    label="Delete section"
                    onClick={() =>
                      confirmDelete(`"${section.title}" and its ${section.items.length} items`) &&
                      deleteSection({ id: section._id })
                    }
                  />
                  <Button
                    size="sm"
                    className="ml-2"
                    onClick={() => setEditingItem({ item: null, sectionId: section._id })}
                  >
                    <i className="ph ph-plus" /> Item
                  </Button>
                </div>
              </div>
              {section.items.length === 0 ? (
                <p className="px-4 py-4 text-sm text-ink-soft">No items in this section.</p>
              ) : (
                <ul className="divide-y divide-ink/5">
                  {section.items.map((item, iIndex) => (
                    <li
                      key={item._id}
                      className={`flex flex-wrap items-center gap-3 px-4 py-2.5 ${item.hidden ? "opacity-50" : ""}`}
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2 text-sm">
                          <span className="font-medium">{item.name}</span>
                          {item.flag && <Badge>{item.flag}</Badge>}
                          {!item.available && <Badge tone="amber">Unavailable</Badge>}
                          {item.hidden && <Badge>Hidden</Badge>}
                        </div>
                        {item.desc && (
                          <div className="truncate text-xs text-ink-soft">{item.desc}</div>
                        )}
                      </div>
                      <div className="text-sm text-ink-soft tabular-nums">
                        {catering
                          ? (item.options ?? [])
                              .map((o) => `${o.label} ${money(o.price)}`)
                              .join(" / ")
                          : item.price && (/^\d/.test(item.price) ? `$${item.price}` : item.price)}
                      </div>
                      <div className="flex items-center">
                        <IconButton
                          icon="ph-arrow-up"
                          label="Move up"
                          disabled={iIndex === 0}
                          onClick={() => moveItem({ id: item._id, direction: "up" })}
                        />
                        <IconButton
                          icon="ph-arrow-down"
                          label="Move down"
                          disabled={iIndex === section.items.length - 1}
                          onClick={() => moveItem({ id: item._id, direction: "down" })}
                        />
                        <IconButton
                          icon={item.available ? "ph-check-circle" : "ph-prohibit"}
                          label={item.available ? "Mark unavailable" : "Mark available"}
                          onClick={() => setFlags({ id: item._id, available: !item.available })}
                        />
                        <IconButton
                          icon={item.hidden ? "ph-eye-slash" : "ph-eye"}
                          label={item.hidden ? "Show item" : "Hide item"}
                          onClick={() => setFlags({ id: item._id, hidden: !item.hidden })}
                        />
                        <IconButton
                          icon="ph-pencil-simple"
                          label="Edit item"
                          onClick={() => setEditingItem({ item, sectionId: section._id })}
                        />
                        <IconButton
                          icon="ph-trash"
                          label="Delete item"
                          onClick={() =>
                            confirmDelete(`"${item.name}"`) && deleteItem({ id: item._id })
                          }
                        />
                      </div>
                    </li>
                  ))}
                </ul>
              )}
            </Card>
          ))}
        </div>
      )}

      {editingSection && (
        <SectionModal
          menu={menu}
          section={editingSection === "new" ? null : editingSection}
          onClose={() => setEditingSection(null)}
        />
      )}
      {editingItem && sections && (
        <ItemModal
          catering={catering}
          sections={sections}
          sectionId={editingItem.sectionId}
          item={editingItem.item}
          onClose={() => setEditingItem(null)}
        />
      )}
    </>
  )
}

function SectionModal({
  menu,
  section,
  onClose,
}: {
  menu: MenuKey
  section: MenuSection | null
  onClose: () => void
}) {
  const create = useMutation(api.menus.createSection)
  const update = useMutation(api.menus.updateSection)
  const [title, setTitle] = useState(section?.title ?? "")
  const [subtitle, setSubtitle] = useState(section?.subtitle ?? "")
  const [image, setImage] = useState<ImageValue>(section ? fromImage(section) : {})
  const { busy, error, setError, run } = useAsync()

  const save = async () => {
    if (!title.trim()) return setError("Add a title")
    const fields = {
      title: title.trim(),
      subtitle: subtitle.trim() || undefined,
      ...toImage(image),
    }
    const ok = await run(() =>
      section ? update({ id: section._id, ...fields }) : create({ menu, ...fields }),
    )
    if (ok) onClose()
  }

  return (
    <Modal
      title={section ? "Edit section" : "New section"}
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
      <Field label="Title">
        <Input value={title} onChange={(e) => setTitle(e.target.value)} autoFocus />
      </Field>
      <Field label="Subtitle" hint="Optional line under the title">
        <Input value={subtitle} onChange={(e) => setSubtitle(e.target.value)} />
      </Field>
      <ImageField label="Section image (optional)" value={image} onChange={setImage} />
      <ErrorText message={error} />
    </Modal>
  )
}

function ItemModal({
  catering,
  sections,
  sectionId: initialSection,
  item,
  onClose,
}: {
  catering: boolean
  sections: MenuSection[]
  sectionId: Id<"menuSections">
  item: Item | null
  onClose: () => void
}) {
  const create = useMutation(api.menus.createItem)
  const update = useMutation(api.menus.updateItem)
  const [form, setForm] = useState({
    sectionId: initialSection,
    name: item?.name ?? "",
    desc: item?.desc ?? "",
    price: item?.price ?? "",
    flag: item?.flag ?? "",
    note: item?.note ?? "",
    serves: item?.serves ?? "",
    kitchen: item?.kitchen ?? "",
    available: item?.available ?? true,
    hidden: item?.hidden ?? false,
  })
  const [options, setOptions] = useState(
    (
      item?.options ??
      (catering
        ? [
            { label: "Half pan", price: 0 },
            { label: "Full pan", price: 0 },
          ]
        : [])
    ).map((o) => ({
      label: o.label,
      price: String(o.price),
    })),
  )
  const [image, setImage] = useState<ImageValue>(item ? fromImage(item) : {})
  const { busy, error, setError, run } = useAsync()
  const set = (changes: Partial<typeof form>) => setForm((f) => ({ ...f, ...changes }))

  const save = async () => {
    if (!form.name.trim()) return setError("Add a name")
    const parsed = options
      .filter((o) => o.label.trim() || o.price)
      .map((o) => ({ label: o.label.trim(), price: Number(o.price) }))
    if (catering) {
      if (parsed.length === 0) return setError("Add at least one size and price")
      if (parsed.some((o) => !o.label || !Number.isFinite(o.price) || o.price <= 0)) {
        return setError("Each size needs a label and a price above zero")
      }
    }
    const fields = {
      sectionId: form.sectionId,
      name: form.name.trim(),
      desc: form.desc.trim() || undefined,
      price: catering ? undefined : form.price.trim().replace(/^\$/, "") || undefined,
      flag: form.flag.trim() || undefined,
      note: form.note.trim() || undefined,
      serves: form.serves.trim() || undefined,
      kitchen: (form.kitchen || undefined) as "emporio" | "mezzo" | undefined,
      options: catering ? parsed : undefined,
      available: form.available,
      hidden: form.hidden,
      ...toImage(image),
    }
    const ok = await run(() => (item ? update({ id: item._id, ...fields }) : create(fields)))
    if (ok) onClose()
  }

  return (
    <Modal
      title={item ? "Edit item" : "New item"}
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
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Name">
          <Input value={form.name} onChange={(e) => set({ name: e.target.value })} autoFocus />
        </Field>
        <Field label="Section">
          <Select
            value={form.sectionId}
            onChange={(e) => set({ sectionId: e.target.value as Id<"menuSections"> })}
          >
            {sections.map((s) => (
              <option key={s._id} value={s._id}>
                {s.title}
              </option>
            ))}
          </Select>
        </Field>
      </div>
      <Field label="Description">
        <Textarea value={form.desc} onChange={(e) => set({ desc: e.target.value })} />
      </Field>
      {catering ? (
        <>
          <div>
            <span className="mb-1 block text-xs font-medium text-ink-soft">Sizes and prices</span>
            <div className="space-y-2">
              {options.map((option, index) => (
                <div key={index} className="flex gap-2">
                  <Input
                    placeholder="Half pan"
                    value={option.label}
                    onChange={(e) =>
                      setOptions(
                        options.map((o, i) => (i === index ? { ...o, label: e.target.value } : o)),
                      )
                    }
                  />
                  <Input
                    placeholder="0.00"
                    inputMode="decimal"
                    className="max-w-32"
                    value={option.price}
                    onChange={(e) =>
                      setOptions(
                        options.map((o, i) => (i === index ? { ...o, price: e.target.value } : o)),
                      )
                    }
                  />
                  <IconButton
                    icon="ph-x"
                    label="Remove size"
                    onClick={() => setOptions(options.filter((_, i) => i !== index))}
                  />
                </div>
              ))}
              <Button size="sm" onClick={() => setOptions([...options, { label: "", price: "" }])}>
                <i className="ph ph-plus" /> Add size
              </Button>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-3">
            <Field label="Note">
              <Input value={form.note} onChange={(e) => set({ note: e.target.value })} />
            </Field>
            <Field label="Serves">
              <Input
                placeholder="serves 25"
                value={form.serves}
                onChange={(e) => set({ serves: e.target.value })}
              />
            </Field>
            <Field label="Kitchen">
              <Select value={form.kitchen} onChange={(e) => set({ kitchen: e.target.value })}>
                <option value="">None</option>
                <option value="emporio">Emporio</option>
                <option value="mezzo">Mezzo</option>
              </Select>
            </Field>
          </div>
          <ImageField label="Photo" value={image} onChange={setImage} />
        </>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field
            label="Price"
            hint="Numbers show with $. Leave blank for none, or type text like MP."
          >
            <Input value={form.price} onChange={(e) => set({ price: e.target.value })} />
          </Field>
          <Field label="Tag" hint="Small label, e.g. house favorite, local">
            <Input value={form.flag} onChange={(e) => set({ flag: e.target.value })} />
          </Field>
        </div>
      )}
      <div className="flex gap-6">
        <Toggle
          checked={form.available}
          onChange={(available) => set({ available })}
          label="Available"
        />
        <Toggle checked={form.hidden} onChange={(hidden) => set({ hidden })} label="Hidden" />
      </div>
      <ErrorText message={error} />
    </Modal>
  )
}
