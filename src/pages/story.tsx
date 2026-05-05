import { ArrowRight, Quotes } from "@phosphor-icons/react"
import { Link } from "react-router"
import SectionLabel from "@/components/section-label"
import { img } from "@/lib/images"

export default function Story() {
  return (
    <>
      <Hero />
      <Pillars />
      <Pull />
      <Family />
      <Cta />
    </>
  )
}

function Hero() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[1480px] px-6 pt-20 pb-12 lg:px-10">
        <p className="text-eyebrow text-rosso uppercase">Our story</p>
        <h1
          className="mt-6 font-sans leading-none font-black text-olive uppercase"
          style={{ fontSize: "clamp(56px, 9vw, 144px)" }}
        >
          A loud kitchen,
          <br />
          <span className="font-display font-normal text-rosso normal-case italic">
            a long table,
          </span>
          <br />
          and a notebook
          <br />
          <span className="font-display font-normal normal-case italic">
            from Modena.
          </span>
        </h1>
      </div>
      <div className="mx-auto grid max-w-[1480px] grid-cols-12 gap-8 px-6 pb-20 lg:px-10">
        <div className="col-span-12 md:col-span-8">
          <img
            src={img.alley}
            alt="An Italian alleyway"
            className="aspect-[16/10] w-full object-cover"
          />
        </div>
        <div className="col-span-12 flex flex-col justify-end md:col-span-4">
          <p className="text-lg text-olive/80">
            Sienna Mercato opened in 2019 in a former hardware store on Mulberry
            Street. We kept the tin ceiling, painted everything else tomato red,
            and started cooking from a single, stained recipe notebook.
          </p>
          <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t border-olive/15 pt-6 text-sm">
            {[
              ["Opened", "April 2019"],
              ["Seats", "62 + 14 at the bar"],
              ["Chef", "Giulia Marchetti"],
              ["Sommelier", "Tonia Russo"],
            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-eyebrow text-olive/50 uppercase">{k}</dt>
                <dd className="mt-1 text-olive">{v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  )
}

function Pillars() {
  const items: Array<[string, string, string]> = [
    [
      "01",
      "Cook from one notebook.",
      "Every recipe in the kitchen comes from Giulia's grandmother in Modena. We don't fancy them up. We don't shrink the portions.",
    ],
    [
      "02",
      "Buy from the people we know.",
      "Pasta from Sfoglini, fish from Greenpoint Fish, oil from a single grove in Umbria, tomatoes from a farm in Salerno.",
    ],
    [
      "03",
      "Pour wine like it's water.",
      "Tonia's list runs to 120 small-grower bottles. None of them are precious about it. Several are very cold.",
    ],
  ]
  return (
    <section className="bg-bone">
      <div className="mx-auto max-w-[1480px] px-6 py-24 lg:px-10">
        <SectionLabel number="01" className="mb-10">
          House rules
        </SectionLabel>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {items.map(([n, title, body]) => (
            <article key={n}>
              <p className="font-display text-h1 leading-none text-rosso italic">
                {n}
              </p>
              <h3 className="mt-6 font-sans text-h3 leading-tight font-black text-olive uppercase">
                {title}
              </h3>
              <p className="mt-4 text-base text-olive/75">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function Pull() {
  return (
    <section className="relative overflow-hidden bg-rosso text-cream">
      <div className="mx-auto max-w-[1480px] px-6 py-32 text-center lg:px-10">
        <Quotes weight="fill" size={56} className="mx-auto text-cream/30" />
        <blockquote
          className="font-display mx-auto mt-8 max-w-4xl leading-tight italic"
          style={{ fontSize: "clamp(40px, 6vw, 88px)" }}
        >
          You don't cook Italian food. You cook for the table.
        </blockquote>
        <figcaption className="mt-10 text-eyebrow text-cream/70 uppercase">
          — Nonna Marchetti, 1939–2014
        </figcaption>
      </div>
    </section>
  )
}

function Family() {
  return (
    <section className="mx-auto max-w-[1480px] px-6 py-28 lg:px-10">
      <SectionLabel number="02" className="mb-10">
        The team
      </SectionLabel>
      <div className="grid grid-cols-12 gap-8">
        <div className="col-span-12 md:col-span-5">
          <img
            src={img.hands}
            alt="Chef Giulia shaping pasta"
            className="aspect-[4/5] w-full object-cover"
          />
          <h3 className="font-display mt-6 text-h2 text-olive italic">
            Giulia Marchetti
          </h3>
          <p className="mt-2 text-eyebrow text-rosso uppercase">
            Chef · Co-founder
          </p>
          <p className="mt-4 text-base text-olive/75">
            Trained in Modena and Bologna. Cooks the way her grandmother cooked.
            Argues about ragù.
          </p>
        </div>
        <div className="col-span-12 md:col-span-4 md:mt-24">
          <img
            src={img.wine}
            alt="Sommelier Tonia Russo"
            className="aspect-[4/5] w-full object-cover"
          />
          <h3 className="font-display mt-6 text-h2 text-olive italic">
            Tonia Russo
          </h3>
          <p className="mt-2 text-eyebrow text-rosso uppercase">
            Sommelier · Wine buyer
          </p>
          <p className="mt-4 text-base text-olive/75">
            Hunts down small-grower bottles from Sicily to Friuli. Will pour you
            something you've never heard of.
          </p>
        </div>
        <div className="col-span-12 md:col-span-3 md:mt-48">
          <img
            src={img.bread}
            alt="Pastry chef Marco"
            className="aspect-[4/5] w-full object-cover"
          />
          <h3 className="font-display mt-6 text-h2 text-olive italic">
            Marco Greco
          </h3>
          <p className="mt-2 text-eyebrow text-rosso uppercase">
            Pastry · Bread program
          </p>
          <p className="mt-4 text-base text-olive/75">
            Bakes the focaccia at 5am. Makes one tiramisu at a time, by hand.
          </p>
        </div>
      </div>
    </section>
  )
}

function Cta() {
  return (
    <section className="bg-olive text-cream">
      <div className="mx-auto flex max-w-[1480px] flex-col items-start justify-between gap-8 px-6 py-24 md:flex-row md:items-center lg:px-10">
        <h2 className="font-display max-w-xl text-h1 leading-tight italic">
          Come cook with us — or just come eat. Either is good.
        </h2>
        <div className="flex flex-wrap gap-4">
          <Link
            to="/reserve"
            className="inline-flex items-center gap-3 rounded-full bg-rosso px-7 py-4 text-sm font-semibold tracking-wider text-cream uppercase transition-colors hover:bg-rosso-deep"
          >
            Reserve <ArrowRight weight="bold" size={16} />
          </Link>
          <a
            href="mailto:hello@siennamercato.com"
            className="inline-flex items-center gap-3 rounded-full border border-cream/30 px-7 py-4 text-sm font-semibold tracking-wider text-cream uppercase transition-colors hover:bg-cream hover:text-olive"
          >
            Careers
          </a>
        </div>
      </div>
    </section>
  )
}
