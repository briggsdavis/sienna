import { useMutation, useQuery } from "convex/react"
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type MouseEvent,
  type ReactNode,
} from "react"
import { Link } from "react-router"
import { ExternalLink } from "@/components/external-link"
import { WordReveal } from "@/components/word-reveal"
import { pickFile, useUpload } from "@/lib/upload"
import { errorMessage, isInternal } from "@/lib/util"
import { api } from "../../convex/_generated/api"

type EditMode = { isAdmin: boolean; editing: boolean; setEditing: (value: boolean) => void }

const EditModeContext = createContext<EditMode>({
  isAdmin: false,
  editing: false,
  setEditing: () => {},
})

export function EditModeProvider({ children }: { children: ReactNode }) {
  const me = useQuery(api.admins.me)
  const [editing, setEditingState] = useState(() => localStorage.getItem("sm_edit") === "1")
  const isAdmin = !!me

  const setEditing = (value: boolean) => {
    localStorage.setItem("sm_edit", value ? "1" : "0")
    setEditingState(value)
  }

  return (
    <EditModeContext.Provider value={{ isAdmin, editing: isAdmin && editing, setEditing }}>
      {children}
    </EditModeContext.Provider>
  )
}

export function useEditMode() {
  return useContext(EditModeContext)
}

type Content = Record<string, { text?: string; href?: string; image?: string | null }>

const PageContext = createContext<{ page: string; content: Content | undefined }>({
  page: "",
  content: {},
})

export function PageContent({ page, children }: { page: string; children: ReactNode }) {
  const content = useQuery(api.pageContent.forPage, { page })
  return <PageContext.Provider value={{ page, content }}>{children}</PageContext.Provider>
}

export function useEditablePageContent() {
  return useContext(PageContext).content
}

function useEntry(k: string) {
  const { page, content } = useContext(PageContext)
  return { page, loading: content === undefined, entry: content?.[k] }
}

const EDIT_OUTLINE =
  "rounded-sm outline-1 outline-offset-4 outline-sienna-bright/70 outline-dashed hover:outline-2 focus:outline-2 focus:outline-solid cursor-text"

export function EText({
  k,
  d,
  multiline = false,
  className = "",
  words,
}: {
  k: string
  d: string
  multiline?: boolean
  className?: string
  /** Reveal the text word by word; a number sets the start delay in seconds. */
  words?: boolean | number
}) {
  const { page, loading, entry } = useEntry(k)
  const { editing } = useEditMode()
  const set = useMutation(api.pageContent.set)
  const reset = useMutation(api.pageContent.reset)
  const value = entry?.text ?? d
  const style = multiline || value.includes("\n") ? "whitespace-pre-line" : ""

  if (loading) return <span className={`invisible ${className}`}>{d}</span>

  if (!editing && words !== undefined && words !== false)
    return (
      <WordReveal
        text={value}
        delay={typeof words === "number" ? words : 0}
        className={`${style} ${className}`}
      />
    )

  if (!editing) return <span className={`${style} ${className}`}>{value}</span>

  return (
    <span
      key={value}
      contentEditable="plaintext-only"
      suppressContentEditableWarning
      title="Click to edit. Clear the text to restore the original."
      className={`${EDIT_OUTLINE} ${style} ${className}`}
      onClick={(e) => {
        e.preventDefault()
        e.stopPropagation()
      }}
      onKeyDown={(e) => {
        if (e.key === "Enter" && !multiline) {
          e.preventDefault()
          e.currentTarget.blur()
        }
        if (e.key === "Escape") {
          e.currentTarget.textContent = value
          e.currentTarget.blur()
        }
      }}
      onBlur={(e) => {
        const text = (e.currentTarget.innerText ?? "").replace(/\n{3,}/g, "\n\n").trim()
        if (text === value) return
        if (!text || text === d) reset({ page, key: k }).catch(() => {})
        else set({ page, key: k, text }).catch((err) => alert(errorMessage(err)))
      }}
    >
      {value}
    </span>
  )
}

export function EImage({
  k,
  d,
  children,
}: {
  k: string
  d: string
  children: (src: string) => ReactNode
}) {
  const { page, entry } = useEntry(k)
  const { editing } = useEditMode()
  const set = useMutation(api.pageContent.set)
  const reset = useMutation(api.pageContent.reset)
  const upload = useUpload()
  const [busy, setBusy] = useState(false)
  const src = entry?.image ?? d

  const replace = async (e: MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    const file = await pickFile()
    if (!file) return
    setBusy(true)
    try {
      const imageId = await upload(file)
      await set({ page, key: k, imageId })
    } catch (err) {
      alert(errorMessage(err))
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      {children(src)}
      {editing && (
        <span className="absolute top-3 right-3 z-40 flex gap-1.5 font-sans">
          <button
            type="button"
            onClick={replace}
            className="rounded-full bg-ink/85 px-3 py-1.5 text-xs text-cream shadow-lg hover:bg-sienna"
          >
            <i className="ph ph-image mr-1" />
            {busy ? "Uploading..." : "Replace image"}
          </button>
          {entry?.image && (
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                reset({ page, key: k }).catch(() => {})
              }}
              className="rounded-full bg-ink/85 px-3 py-1.5 text-xs text-cream shadow-lg hover:bg-sienna"
            >
              Reset
            </button>
          )}
        </span>
      )}
    </>
  )
}

export function useContentHref(k: string, d: string) {
  const { entry } = useEntry(k)
  return entry?.href || d
}

export function ELink({
  k,
  label,
  href,
  className = "",
  children,
  onClick,
}: {
  k: string
  label: string
  href: string
  className?: string
  children?: (label: string) => ReactNode
  onClick?: () => void
}) {
  const { page, loading, entry } = useEntry(k)
  const { editing } = useEditMode()
  const [open, setOpen] = useState(false)
  const finalLabel = entry?.text || label
  const finalHref = entry?.href || href
  const body = children ? children(finalLabel) : finalLabel
  const hidden = loading ? "invisible" : ""

  if (editing) {
    return (
      <>
        <button
          type="button"
          onClick={(e) => {
            e.preventDefault()
            e.stopPropagation()
            setOpen(true)
          }}
          className={`${className} ${hidden} outline-1 outline-offset-4 outline-sienna-bright/70 outline-dashed`}
          title={`Links to ${finalHref}`}
        >
          {body}
        </button>
        {open && (
          <LinkDialog
            page={page}
            k={k}
            label={finalLabel}
            href={finalHref}
            defaults={{ label, href }}
            onClose={() => setOpen(false)}
          />
        )}
      </>
    )
  }

  if (isInternal(finalHref)) {
    if (finalHref.startsWith("#")) {
      return (
        <a href={finalHref} className={`${className} ${hidden}`} onClick={onClick}>
          {body}
        </a>
      )
    }
    return (
      <Link to={finalHref} className={`${className} ${hidden}`} onClick={onClick}>
        {body}
      </Link>
    )
  }
  return (
    <ExternalLink href={finalHref} className={`${className} ${hidden}`} onClick={onClick}>
      {body}
    </ExternalLink>
  )
}

function LinkDialog({
  page,
  k,
  label,
  href,
  defaults,
  onClose,
}: {
  page: string
  k: string
  label: string
  href: string
  defaults: { label: string; href: string }
  onClose: () => void
}) {
  const set = useMutation(api.pageContent.set)
  const reset = useMutation(api.pageContent.reset)
  const [form, setForm] = useState({ label, href })
  const [error, setError] = useState("")

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  const save = async () => {
    if (!form.href.trim()) return setError("Add a link destination")
    try {
      await set({ page, key: k, text: form.label.trim(), href: form.href.trim() })
      onClose()
    } catch (err) {
      setError(errorMessage(err))
    }
  }

  return (
    <div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-ink/50 p-4 font-sans"
      onClick={onClose}
    >
      <div
        className="w-full max-w-md rounded-xl bg-white p-6 text-left text-ink shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-lg font-semibold">Edit button</h2>
        <label className="mt-4 block text-sm">
          <span className="font-medium text-ink-soft">Label</span>
          <input
            value={form.label}
            onChange={(e) => setForm({ ...form, label: e.target.value })}
            className="mt-1 w-full rounded-md border border-ink/20 px-3 py-2 text-base focus:border-sienna focus:outline-none"
          />
        </label>
        <label className="mt-3 block text-sm">
          <span className="font-medium text-ink-soft">Destination</span>
          <input
            value={form.href}
            onChange={(e) => setForm({ ...form, href: e.target.value })}
            placeholder="/events or https://..."
            className="mt-1 w-full rounded-md border border-ink/20 px-3 py-2 text-base focus:border-sienna focus:outline-none"
          />
          <span className="mt-1 block text-xs text-ink-soft">
            Use a path like /catering for pages on this site, or a full URL.
          </span>
        </label>
        {error && <p className="mt-3 text-sm text-sienna">{error}</p>}
        <div className="mt-6 flex items-center justify-between gap-2">
          <button
            type="button"
            onClick={async () => {
              await reset({ page, key: k })
              setForm(defaults)
              onClose()
            }}
            className="text-sm text-ink-soft underline hover:text-sienna"
          >
            Restore original
          </button>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={onClose}
              className="rounded-md px-4 py-2 text-sm text-ink-soft hover:bg-ink/5"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={save}
              className="rounded-md bg-sienna px-4 py-2 text-sm text-cream hover:bg-sienna-deep"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export function EditToolbar() {
  const { isAdmin, editing, setEditing } = useEditMode()
  if (!isAdmin) return null
  return (
    <div className="fixed bottom-4 left-4 z-[150] flex items-center gap-2 rounded-full bg-ink/95 py-1.5 pr-1.5 pl-4 font-sans text-sm text-cream shadow-2xl">
      <span className="hidden sm:inline">
        {editing ? "Editing: click outlined text, images or buttons" : "Admin"}
      </span>
      <button
        type="button"
        onClick={() => setEditing(!editing)}
        className={`rounded-full px-3 py-1.5 text-xs font-medium ${
          editing ? "bg-sienna-bright text-cream" : "bg-cream text-ink"
        }`}
      >
        {editing ? "Done editing" : "Edit page"}
      </button>
      <Link to="/admin" className="rounded-full px-3 py-1.5 text-xs hover:bg-cream/10">
        Dashboard
      </Link>
    </div>
  )
}
