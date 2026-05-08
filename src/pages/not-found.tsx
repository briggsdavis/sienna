import { Link, isRouteErrorResponse, useRouteError } from "react-router"

export function NotFound() {
  const error = useRouteError()

  let code = "404"
  let title = "Off the menu"
  let blurb =
    "The page you're after isn't being served tonight. Let's get you back home."

  if (isRouteErrorResponse(error)) {
    code = String(error.status)
    if (error.status >= 500) {
      title = "The kitchen is closed"
      blurb = "Something went wrong on our end. Try again in a moment."
    } else if (error.status !== 404) {
      title = "Something went sideways"
      blurb = error.statusText || "An unexpected response came back."
    }
  } else if (error instanceof Error) {
    code = "ERR"
    title = "Something burned"
    blurb = error.message || "An unexpected error tripped us up."
  }

  return (
    <section className="relative flex min-h-screen flex-col items-start justify-center bg-paper px-6 py-32 lg:px-12">
      <div className="mx-auto w-full max-w-3xl">
        <div className="font-serif text-xs tracking-[0.4em] text-sienna uppercase">
          Error · {code}
        </div>
        <h1 className="mt-6 font-display text-[clamp(4rem,12vw,9rem)] leading-[0.9] tracking-tight text-ink">
          {title}.
        </h1>
        <p className="mt-6 max-w-xl font-body text-xl leading-relaxed text-ink-soft">
          {blurb}
        </p>
        <Link
          to="/"
          className="group mt-10 inline-flex items-center gap-3 bg-sienna px-7 py-4 font-serif text-sm tracking-[0.25em] text-cream uppercase transition-colors hover:bg-sienna-deep"
        >
          <i className="ph ph-arrow-left text-base transition-transform group-hover:-translate-x-0.5" />
          Back home
        </Link>
      </div>
    </section>
  )
}
