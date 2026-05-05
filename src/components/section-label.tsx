type Props = {
  number: string
  children: React.ReactNode
  className?: string
}

export default function SectionLabel({
  number,
  children,
  className = "",
}: Props) {
  return (
    <div className={`flex items-center gap-4 ${className}`}>
      <span className="font-display text-h3 leading-none text-rosso italic">
        {number}
      </span>
      <span className="h-px w-10 bg-olive/30" />
      <span className="text-eyebrow text-olive/70 uppercase">{children}</span>
    </div>
  )
}
