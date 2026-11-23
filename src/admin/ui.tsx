import {
  useEffect,
  useState,
  type ButtonHTMLAttributes,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react"
import { pickFile, useUpload } from "@/lib/upload"
import { errorMessage } from "@/lib/util"
import type { Id } from "../../convex/_generated/dataModel"

const VARIANTS = {
  primary: "bg-sienna text-white hover:bg-sienna-deep",
  secondary: "border border-ink/15 bg-white text-ink hover:bg-ink/5",
  danger: "border border-sienna/30 bg-white text-sienna hover:bg-sienna/10",
  ghost: "text-ink-soft hover:bg-ink/5 hover:text-ink",
}

export function Button({
  variant = "secondary",
  size = "md",
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof VARIANTS
  size?: "sm" | "md"
}) {
  return (
    <button
      type="button"
      {...props}
      className={`inline-flex items-center justify-center gap-1.5 rounded-lg font-medium transition-colors disabled:cursor-not-allowed disabled:opacity-50 ${
        size === "sm" ? "px-2.5 py-1.5 text-xs" : "px-4 py-2 text-sm"
      } ${VARIANTS[variant]} ${className}`}
    />
  )
}

export function IconButton({
  icon,
  label,
  className = "",
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { icon: string; label: string }) {
  return (
    <button
      type="button"
      aria-label={label}
      title={label}
      {...props}
      className={`inline-flex h-8 w-8 items-center justify-center rounded-md text-ink-soft transition-colors hover:bg-ink/5 hover:text-ink disabled:opacity-30 ${className}`}
    >
      <i className={`ph ${icon} text-base`} />
    </button>
  )
}

const CONTROL =
  "w-full rounded-lg border border-ink/15 bg-white px-3 py-2 text-sm text-ink placeholder:text-ink-soft/50 focus:border-sienna focus:ring-2 focus:ring-sienna/15 focus:outline-none"

export function Input(props: InputHTMLAttributes<HTMLInputElement>) {
  return <input {...props} className={`${CONTROL} ${props.className ?? ""}`} />
}

export function Textarea(props: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea rows={3} {...props} className={`${CONTROL} ${props.className ?? ""}`} />
}

export function Select(props: SelectHTMLAttributes<HTMLSelectElement>) {
  return <select {...props} className={`${CONTROL} ${props.className ?? ""}`} />
}

export function Field({
  label,
  hint,
  children,
  className = "",
}: {
  label: string
  hint?: string
  children: ReactNode
  className?: string
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs font-medium text-ink-soft">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-ink-soft/70">{hint}</span>}
    </label>
  )
}

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean
  onChange: (value: boolean) => void
  label?: string
}) {
  return (
    <label className="inline-flex cursor-pointer items-center gap-2 text-sm text-ink">
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={`relative h-5 w-9 rounded-full transition-colors ${checked ? "bg-sienna" : "bg-ink/20"}`}
      >
        <span
          className={`absolute top-0.5 h-4 w-4 rounded-full bg-white shadow transition-all ${
            checked ? "left-[18px]" : "left-0.5"
          }`}
        />
      </button>
      {label}
    </label>
  )
}

export function Modal({
  title,
  onClose,
  children,
  footer,
  wide = false,
}: {
  title: string
  onClose: () => void
  children: ReactNode
  footer?: ReactNode
  wide?: boolean
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose()
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose])

  return (
    <div className="fixed inset-0 z-[200] flex items-start justify-center overflow-y-auto bg-ink/40 p-4 sm:py-12">
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className={`w-full rounded-xl bg-white shadow-2xl ${wide ? "max-w-3xl" : "max-w-lg"}`}
      >
        <div className="flex items-center justify-between border-b border-ink/10 px-5 py-4">
          <h2 className="text-base font-semibold text-ink">{title}</h2>
          <IconButton icon="ph-x" label="Close" onClick={onClose} />
        </div>
        <div className="space-y-4 px-5 py-5">{children}</div>
        {footer && (
          <div className="flex justify-end gap-2 border-t border-ink/10 px-5 py-4">{footer}</div>
        )}
      </div>
    </div>
  )
}

export function Card({ children, className = "" }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-xl border border-ink/10 bg-white ${className}`}>{children}</div>
}

export function PageHeader({
  title,
  description,
  actions,
}: {
  title: string
  description?: string
  actions?: ReactNode
}) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h1 className="text-2xl font-semibold text-ink">{title}</h1>
        {description && <p className="mt-1 max-w-2xl text-sm text-ink-soft">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap gap-2">{actions}</div>}
    </div>
  )
}

export function Tabs<T extends string>({
  items,
  value,
  onChange,
}: {
  items: { value: T; label: string; badge?: number }[]
  value: T
  onChange: (value: T) => void
}) {
  return (
    <div className="mb-5 flex flex-wrap gap-1 rounded-lg bg-ink/5 p-1" role="tablist">
      {items.map((item) => (
        <button
          key={item.value}
          type="button"
          role="tab"
          aria-selected={value === item.value}
          onClick={() => onChange(item.value)}
          className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-sm transition-colors ${
            value === item.value
              ? "bg-white font-medium text-ink shadow-sm"
              : "text-ink-soft hover:text-ink"
          }`}
        >
          {item.label}
          {!!item.badge && (
            <span className="rounded-full bg-sienna px-1.5 text-[0.65rem] font-semibold text-white">
              {item.badge}
            </span>
          )}
        </button>
      ))}
    </div>
  )
}

export function Badge({
  children,
  tone = "neutral",
}: {
  children: ReactNode
  tone?: "neutral" | "green" | "red" | "amber"
}) {
  const tones = {
    neutral: "bg-ink/5 text-ink-soft",
    green: "bg-emerald-50 text-emerald-700",
    red: "bg-sienna/10 text-sienna",
    amber: "bg-amber-50 text-amber-700",
  }
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${tones[tone]}`}
    >
      {children}
    </span>
  )
}

export function Empty({ children }: { children: ReactNode }) {
  return (
    <div className="rounded-xl border border-dashed border-ink/15 px-6 py-12 text-center text-sm text-ink-soft">
      {children}
    </div>
  )
}

export function Loading() {
  return <div className="py-16 text-center text-sm text-ink-soft">Loading...</div>
}

export type ImageValue = { imageId?: Id<"_storage">; imageUrl?: string; preview?: string | null }

export function ImageField({
  label = "Image",
  value,
  onChange,
}: {
  label?: string
  value: ImageValue
  onChange: (value: ImageValue) => void
}) {
  const upload = useUpload()
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const preview = value.preview ?? value.imageUrl ?? null

  return (
    <div>
      <span className="mb-1 block text-xs font-medium text-ink-soft">{label}</span>
      <div className="flex items-start gap-3">
        <div className="flex h-20 w-28 shrink-0 items-center justify-center overflow-hidden rounded-lg border border-ink/10 bg-ink/5">
          {preview ? (
            <img src={preview} alt="" className="h-full w-full object-cover" />
          ) : (
            <i className="ph ph-image text-2xl text-ink/25" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <div className="flex gap-2">
            <Button
              size="sm"
              disabled={busy}
              onClick={async () => {
                const file = await pickFile()
                if (!file) return
                setBusy(true)
                setError("")
                try {
                  const imageId = await upload(file)
                  onChange({ imageId, imageUrl: undefined, preview: URL.createObjectURL(file) })
                } catch (err) {
                  setError(errorMessage(err))
                } finally {
                  setBusy(false)
                }
              }}
            >
              <i className="ph ph-upload-simple" />
              {busy ? "Uploading..." : "Upload"}
            </Button>
            {preview && (
              <Button size="sm" variant="ghost" onClick={() => onChange({})}>
                Remove
              </Button>
            )}
          </div>
          {error && <span className="text-xs text-sienna">{error}</span>}
        </div>
      </div>
    </div>
  )
}

export function useAsync() {
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState("")
  const run = async (fn: () => Promise<unknown>) => {
    setBusy(true)
    setError("")
    try {
      await fn()
      return true
    } catch (err) {
      setError(errorMessage(err))
      return false
    } finally {
      setBusy(false)
    }
  }
  return { busy, error, setError, run }
}

export function ErrorText({ message }: { message: string }) {
  if (!message) return null
  return <p className="rounded-lg bg-sienna/10 px-3 py-2 text-sm text-sienna">{message}</p>
}

export function confirmDelete(what: string) {
  return window.confirm(`Delete ${what}? This can't be undone.`)
}

export function fromImage(doc: {
  imageId?: Id<"_storage">
  imageUrl?: string
  image?: string | null
}): ImageValue {
  return { imageId: doc.imageId, imageUrl: doc.imageUrl, preview: doc.image ?? doc.imageUrl }
}

export function toImage(value: ImageValue) {
  return { imageId: value.imageId, imageUrl: value.imageId ? undefined : value.imageUrl }
}
