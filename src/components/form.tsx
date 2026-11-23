import {
  useState,
  type InputHTMLAttributes,
  type ReactNode,
  type SelectHTMLAttributes,
  type TextareaHTMLAttributes,
} from "react"
import { newId } from "@/lib/util"

export type Tone = "dark" | "light"

const LABEL = {
  dark: "font-serif text-2xs tracking-[0.3em] text-cream/75 uppercase",
  light: "font-serif text-2xs tracking-[0.3em] text-ink-soft uppercase",
}

const CONTROL = {
  dark: "mt-2 w-full border-b border-cream/40 bg-transparent py-3 font-serif text-cream placeholder:text-cream/45 focus:border-cream focus:outline-none aria-[invalid=true]:border-cream",
  light:
    "mt-2 w-full border-b border-ink/25 bg-transparent py-3 font-serif text-ink placeholder:text-ink-soft/50 focus:border-sienna focus:outline-none",
}

export function useFormGuard() {
  const [state, setState] = useState(() => ({ submissionId: newId(), startedAt: Date.now() }))
  return {
    ...state,
    reset: () => setState({ submissionId: newId(), startedAt: Date.now() }),
  }
}

export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Leave this empty
        <input
          tabIndex={-1}
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          name="company_website"
        />
      </label>
    </div>
  )
}

function Label({
  tone,
  label,
  required,
  children,
}: {
  tone: Tone
  label: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className={LABEL[tone]}>
        {label}
        {required && <span className="ml-1">*</span>}
      </span>
      {children}
    </label>
  )
}

export function TextField({
  tone,
  label,
  ...props
}: { tone: Tone; label: string } & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <Label tone={tone} label={label} required={props.required}>
      <input {...props} className={CONTROL[tone]} />
    </Label>
  )
}

export function TextArea({
  tone,
  label,
  ...props
}: { tone: Tone; label: string } & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return (
    <Label tone={tone} label={label} required={props.required}>
      <textarea {...props} className={`${CONTROL[tone]} font-body`} />
    </Label>
  )
}

export function SelectField({
  tone,
  label,
  options,
  ...props
}: {
  tone: Tone
  label: string
  options: readonly string[]
} & SelectHTMLAttributes<HTMLSelectElement>) {
  return (
    <Label tone={tone} label={label} required={props.required}>
      <select
        {...props}
        className={`${CONTROL[tone]} appearance-none ${
          tone === "dark" ? "[&>option]:bg-sienna [&>option]:text-cream" : ""
        }`}
      >
        <option value="" disabled>
          Choose
        </option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Label>
  )
}

export function FormError({ tone, message }: { tone: Tone; message: string }) {
  if (!message) return null
  return (
    <p
      role="alert"
      className={`flex items-start gap-2 rounded-md px-4 py-3 font-body text-sm ${
        tone === "dark" ? "bg-sienna-deep/60 text-cream" : "bg-sienna/10 text-sienna-deep"
      }`}
    >
      <i className="ph ph-warning-circle mt-0.5 text-base" />
      {message}
    </p>
  )
}
