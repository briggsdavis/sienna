import { useSettings } from "@/components/reserve"
import { Seo } from "@/components/seo"
import { PAGE_SEO } from "@/lib/pages"

const FALLBACK = `Sienna Mercato collects the information you choose to send us through this website, such as your name, email address, phone number and event details, so we can respond to reservations, catering requests, private event inquiries and messages.

If you opt in to our emails, we use your email address to send news, menus and offers. You can unsubscribe at any time. Inquiry forms do not sign you up for marketing unless you tick the box.

We count visits with a first-party, anonymous counter to understand which pages are useful. We do not use advertising trackers. You can decline analytics from the banner at the bottom of the page.

We don't sell your personal information. To ask about or delete the information we hold, contact us at 412.281.2810 or through the contact page.`

export function Privacy() {
  const settings = useSettings()
  const text = settings?.privacyPolicy?.trim() || FALLBACK

  return (
    <section className="min-h-screen bg-paper px-6 pt-40 pb-28 lg:px-12">
      <Seo path="/privacy" {...PAGE_SEO["/privacy"]} />
      <div className="mx-auto max-w-3xl">
        <h1 className="font-display text-[clamp(2.5rem,calc(6vw*var(--site-type-scale)),4.5rem)] leading-[0.9] text-ink">
          Privacy policy.
        </h1>
        <div className="mt-10 space-y-5 font-body text-lg leading-relaxed whitespace-pre-line text-ink-soft">
          {settings === undefined ? <div className="h-60" /> : text}
        </div>
      </div>
    </section>
  )
}
