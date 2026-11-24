import { Link } from "react-router"

export type Shortcut = { label: string; icon: string; href: string }

export function PageShortcuts({
  shortcuts,
  tone = "paper",
}: {
  shortcuts: readonly Shortcut[]
  tone?: "paper" | "sienna"
}) {
  const sienna = tone === "sienna"
  const className = sienna
    ? "btn-lift border border-cream/55 text-cream hover:border-cream hover:bg-cream hover:text-sienna"
    : "btn-lift border border-ink/20 text-ink hover:border-sienna hover:text-sienna"
  return (
    <nav className={sienna ? "relative" : "bg-paper"} aria-label="Page shortcuts">
      <div className={`site-container flex flex-wrap gap-3 py-5 ${sienna ? "justify-center" : ""}`}>
        {shortcuts.map(({ label, icon, href }) => {
          const content = (
            <>
              <i aria-hidden="true" className={`ph ${icon} text-sm`} />
              {label}
            </>
          )
          return href.startsWith("#") ? (
            <a key={label} href={href} className={className}>
              {content}
            </a>
          ) : (
            <Link key={label} to={href} className={className}>
              {content}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
