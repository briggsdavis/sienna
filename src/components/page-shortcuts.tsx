import { Link } from "react-router"

export type Shortcut = { label: string; icon: string; href: string }

const SHORTCUT_CLASS =
  "btn-lift inline-flex items-center gap-2 border border-ink/20 px-5 py-2 font-serif text-xs tracking-[0.25em] text-ink uppercase transition-colors hover:border-sienna hover:text-sienna"

export function PageShortcuts({ shortcuts }: { shortcuts: readonly Shortcut[] }) {
  return (
    <nav className="border-b border-ink/10 bg-paper">
      <div className="mx-auto flex max-w-[1600px] flex-wrap gap-3 px-6 py-5 lg:px-12">
        {shortcuts.map(({ label, icon, href }) => {
          const content = (
            <>
              <i className={`ph ${icon} text-sm`} />
              {label}
            </>
          )
          return href.startsWith("#") ? (
            <a key={label} href={href} className={SHORTCUT_CLASS}>
              {content}
            </a>
          ) : (
            <Link key={label} to={href} className={SHORTCUT_CLASS}>
              {content}
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
