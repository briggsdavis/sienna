import { Asterisk } from "@phosphor-icons/react"

const ITEMS = [
  "Happy hour daily 4–6pm",
  "Pasta made in-house",
  "Walk-ins welcome",
  "Wood-fired pizza by the slice",
  "Wine list curated by Tonia Russo",
  "Open till midnight, Fri & Sat",
]

export default function Marquee() {
  const row = [...ITEMS, ...ITEMS]
  return (
    <div className="overflow-hidden bg-rosso text-cream">
      <div className="animate-marquee flex py-3 whitespace-nowrap">
        {row.map((item, i) => (
          <span
            key={i}
            className="flex items-center gap-6 px-6 text-eyebrow uppercase"
          >
            <Asterisk weight="bold" size={14} className="text-cream/80" />
            {item}
          </span>
        ))}
      </div>
    </div>
  )
}
