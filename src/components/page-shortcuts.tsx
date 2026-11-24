import { Link } from "react-router"

export type Shortcut = { label: string; icon: string; href: string }

export function PageShortcuts({ shortcuts }: { shortcuts: readonly Shortcut[] }) {
  const className = "btn-lift border border-ink/20 text-ink hover:border-sienna hover:text-sienna"
  return (
    <nav className="bg-paper" aria-label="Page shortcuts">
      <div className="mx-auto flex max-w-[1600px] flex-wrap gap-3 px-6 py-5 lg:px-12">
        {shortcuts.map(({ label, icon, href }) => {
          const content = (
            <>
              <i className={`ph ${icon} text-sm`} />
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
