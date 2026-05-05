import { Link } from "react-router"
import SectionLabel from "@/components/section-label"
import { img } from "@/lib/images"

export default function Home() {
  return (
    <>
      <Hero />
      <ChalkboardStrip />
      <TodaysPasta />
      <Cucina />
      <StoryTeaser />
      <Press />
      <VisitCta />
    </>
  )
}

function Hero() {
  return (
    <section className="relative bg-paper">
      <div className="mx-auto grid max-w-[1480px] grid-cols-12 gap-6 px-6 pt-16 pb-10 lg:px-10">
        <div className="relative z-10 col-span-12 md:col-span-7">
          <p
            className="animate-rise text-eyebrow text-rosso uppercase"
            style={{ animationDelay: "60ms" }}
          >
            ✻ &nbsp; Brooklyn · Est. 2019
          </p>
          <h1
            className="animate-rise mt-8 font-sans leading-none font-black tracking-tight text-olive uppercase"
            style={{
              fontSize: "clamp(72px, 11vw, 168px)",
              animationDelay: "120ms",
            }}
          >
            Eat
            <br />
            <span className="font-display font-normal text-rosso normal-case italic">
              loud,
            </span>
            <br />
            drink
            <br />
            <span className="font-display font-normal normal-case italic">
              red.
            </span>
          </h1>
          <p
            className="animate-rise mt-10 max-w-xl text-lg text-olive/80"
            style={{ animationDelay: "240ms" }}
          >
            A loud, lamp-lit trattoria in north Brooklyn pouring natural wine,
            tearing fresh focaccia, and turning out the kind of red-sauce
            cooking that makes the table forget its phones.
          </p>

          <div
            className="animate-rise mt-10 flex flex-wrap items-center gap-4"
            style={{ animationDelay: "320ms" }}
          >
            <Link
              to="/reserve"
              className="inline-flex items-center gap-3 rounded-full bg-olive px-7 py-4 text-sm font-semibold tracking-wider text-cream uppercase transition-colors hover:bg-ink"
            >
              Reserve a table
              <span aria-hidden>→</span>
            </Link>
            <Link
              to="/menu"
              className="inline-flex items-center gap-3 rounded-full border border-olive/30 px-7 py-4 text-sm font-semibold tracking-wider text-olive uppercase transition-all hover:border-olive hover:bg-olive hover:text-cream"
            >
              See the menu
            </Link>
          </div>
        </div>

        <div className="relative col-span-12 md:col-span-5">
          <div className="relative aspect-[4/5] overflow-hidden rounded-sm">
            <img
              src={img.pasta}
              alt="A bowl of bucatini in tomato sauce"
              className="absolute inset-0 h-full w-full object-cover"
            />
            <span className="absolute top-4 left-4 rounded-full bg-rosso px-3 py-1.5 text-eyebrow text-cream uppercase">
              Tonight · 6:30
            </span>
          </div>

          <div className="animate-spin-slow absolute -bottom-12 -left-10 hidden md:flex">
            <Stamp />
          </div>
        </div>
      </div>

      <div className="mx-auto mt-12 grid max-w-[1480px] grid-cols-2 gap-6 border-t border-olive/15 px-6 pt-10 pb-12 md:grid-cols-4 lg:px-10">
        {[
          ["32", "wines by the glass"],
          ["7", "pastas made daily"],
          ["3hr", "Sunday gravy simmer"],
          ["1939", "the year nonna's recipe was written"],
        ].map(([num, label]) => (
          <div key={label}>
            <p className="font-display text-h1 leading-none text-rosso italic">
              {num}
            </p>
            <p className="mt-3 max-w-[14ch] text-sm text-olive/70">{label}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

function Stamp() {
  return (
    <svg viewBox="0 0 200 200" className="h-44 w-44 text-rosso">
      <defs>
        <path
          id="circle"
          d="M 100,100 m -80,0 a 80,80 0 1,1 160,0 a 80,80 0 1,1 -160,0"
        />
      </defs>
      <text
        className="fill-current text-eyebrow uppercase"
        style={{ fontSize: "13px", letterSpacing: "0.28em" }}
      >
        <textPath href="#circle">
          ✻ Made by hand · Cucina dal 2019 · Brooklyn USA ·
        </textPath>
      </text>
      <text
        x="100"
        y="108"
        textAnchor="middle"
        className="fill-current"
        style={{
          fontFamily: "var(--font-serif)",
          fontStyle: "italic",
          fontSize: "30px",
        }}
      >
        SM
      </text>
    </svg>
  )
}

function ChalkboardStrip() {
  return (
    <section className="bg-olive text-cream">
      <div className="mx-auto flex max-w-[1480px] flex-col items-start gap-6 px-6 py-10 md:flex-row md:items-center md:gap-12 lg:px-10">
        <p className="text-eyebrow text-cream/50 uppercase">
          Tonight at the bar
        </p>
        <p className="font-display flex-1 text-h2 leading-tight italic">
          Spritz Veneziano, anchovy toast, and a Lambrusco so cold it bruises.
        </p>
        <Link
          to="/menu"
          className="text-sm font-semibold tracking-wider whitespace-nowrap text-rosso uppercase hover:text-cream"
        >
          See drinks →
        </Link>
      </div>
    </section>
  )
}

function TodaysPasta() {
  return (
    <section className="mx-auto max-w-[1480px] px-6 py-28 lg:px-10">
      <SectionLabel number="01" className="mb-10">
        Pasta of the day
      </SectionLabel>
      <div className="grid grid-cols-12 items-end gap-8">
        <div className="order-2 col-span-12 md:order-1 md:col-span-5">
          <h2 className="font-sans text-h1 leading-none font-black text-olive uppercase">
            Cacio e
            <br />
            <span className="font-display font-normal text-rosso normal-case italic">
              pepe nero.
            </span>
          </h2>
          <p className="mt-8 max-w-md text-lg text-olive/80">
            Hand-rolled tonnarelli, two-year Pecorino di Pienza, cracked
            Tellicherry pepper — and a splash of pasta water that is, more or
            less, the only sauce we ever needed.
          </p>
          <dl className="mt-10 grid max-w-md grid-cols-2 gap-x-10 gap-y-4 text-sm">
            {[
              ["Pasta", "Tonnarelli, hand-cut"],
              ["Cheese", "Pecorino di Pienza"],
              ["Pepper", "Tellicherry, cracked"],
              ["Price", "$24"],
            ].map(([k, v]) => (
              <div
                key={k}
                className="flex flex-col border-t border-olive/15 pt-3"
              >
                <dt className="text-eyebrow text-olive/50 uppercase">{k}</dt>
                <dd className="mt-1 text-olive">{v}</dd>
              </div>
            ))}
          </dl>
        </div>

        <div className="relative order-1 col-span-12 md:order-2 md:col-span-7">
          <div className="relative aspect-[5/4] overflow-hidden">
            <img
              src={img.pastaClose}
              alt="Cacio e pepe"
              className="absolute inset-0 h-full w-full object-cover"
            />
          </div>
          <div className="absolute -top-6 -left-6 hidden md:block">
            <span className="inline-block -rotate-6 rounded-full bg-rosso px-4 py-2 text-eyebrow text-cream uppercase">
              ✻ Special · Thursday only
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

function Cucina() {
  const tiles: Array<[string, string, string]> = [
    [img.dough, "Pasta fresca", "Rolled at 7am, every day."],
    [img.pizza, "Pizza al taglio", "Bar snack from 4pm."],
    [img.antipasti, "Antipasti", "Sliced to order, share generously."],
    [img.wine, "Wine bar", "120 small-grower bottles."],
  ]
  return (
    <section className="bg-bone">
      <div className="mx-auto max-w-[1480px] px-6 py-28 lg:px-10">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel number="02" className="mb-6">
              The kitchen
            </SectionLabel>
            <h2 className="max-w-xl font-sans text-h1 leading-none font-black text-olive uppercase">
              Four corners of
              <br />
              <span className="font-display font-normal text-rosso normal-case italic">
                the kitchen.
              </span>
            </h2>
          </div>
          <Link
            to="/menu"
            className="text-sm font-semibold tracking-wider text-rosso uppercase hover:text-rosso-deep"
          >
            Browse the full menu →
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
          {tiles.map(([src, title, sub], i) => (
            <article key={title} className="group">
              <div className="relative aspect-[4/5] overflow-hidden bg-olive/5">
                <img
                  src={src}
                  alt={title}
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <span className="absolute top-3 left-3 rounded-full bg-olive/80 px-2.5 py-1 text-eyebrow text-cream uppercase">
                  0{i + 1}
                </span>
              </div>
              <h3 className="font-display mt-5 text-h3 text-olive italic">
                {title}
              </h3>
              <p className="mt-1 text-base text-olive/70">{sub}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

function StoryTeaser() {
  return (
    <section className="mx-auto grid max-w-[1480px] grid-cols-12 items-center gap-8 px-6 py-28 lg:px-10">
      <div className="col-span-12 md:col-span-6">
        <div className="grid grid-cols-2 gap-4">
          <img
            src={img.hands}
            alt="A chef shaping pasta"
            className="aspect-[4/5] object-cover"
          />
          <img
            src={img.tomatoes}
            alt="Vine tomatoes"
            className="mt-12 aspect-[4/5] object-cover"
          />
        </div>
      </div>
      <div className="col-span-12 md:col-span-6 md:pl-12">
        <SectionLabel number="03" className="mb-8">
          Our story
        </SectionLabel>
        <h2 className="font-sans text-h1 leading-none font-black text-olive uppercase">
          Two grandmothers,
          <br />
          <span className="font-display font-normal text-rosso normal-case italic">
            one stove.
          </span>
        </h2>
        <p className="mt-8 max-w-md text-lg text-olive/80">
          Sienna Mercato grew out of a notebook of recipes our chef Giulia
          inherited from her grandmother in Modena — and a stubborn refusal to
          let any of them be fancied up. We cook from that notebook, and we
          argue about it nightly.
        </p>
        <Link
          to="/story"
          className="mt-10 inline-flex items-center gap-3 rounded-full border border-olive/30 px-6 py-3 text-sm font-semibold tracking-wider text-olive uppercase transition-all hover:bg-olive hover:text-cream"
        >
          Read our story →
        </Link>
      </div>
    </section>
  )
}

function Press() {
  const quotes: Array<[string, string]> = [
    [
      '"The bucatini will ruin you for any other red sauce in the borough."',
      "— The New York Times",
    ],
    ['"A trattoria that talks back, in the best possible way."', "— Eater NY"],
    ['"Order the cacio. Order it twice."', "— Resy Hit List"],
  ]
  return (
    <section className="bg-rosso text-cream">
      <div className="mx-auto max-w-[1480px] px-6 py-28 lg:px-10">
        <p className="mb-10 text-eyebrow text-cream/70 uppercase">
          As heard around the table
        </p>
        <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
          {quotes.map(([q, attr]) => (
            <figure key={q}>
              <blockquote className="font-display text-h2 leading-tight italic">
                {q}
              </blockquote>
              <figcaption className="mt-6 text-eyebrow text-cream/60 uppercase">
                {attr}
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  )
}

function VisitCta() {
  return (
    <section className="relative">
      <div className="absolute inset-0">
        <img src={img.interior} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-olive/70" />
      </div>
      <div className="relative mx-auto max-w-[1480px] px-6 py-32 text-center text-cream lg:px-10">
        <p className="text-eyebrow text-cream/70 uppercase">Come find us</p>
        <h2 className="font-display mt-6 text-display leading-none italic">
          Pull up a chair.
        </h2>
        <p className="mx-auto mt-8 max-w-xl text-lg text-cream/85">
          The kitchen opens at five. The wine opens earlier. Hold a seat — we'll
          save the corner booth.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <Link
            to="/reserve"
            className="inline-flex items-center gap-3 rounded-full bg-rosso px-8 py-4 text-sm font-semibold tracking-wider text-cream uppercase transition-colors hover:bg-rosso-deep"
          >
            Reserve a table →
          </Link>
          <Link
            to="/visit"
            className="inline-flex items-center gap-3 rounded-full border border-cream/40 bg-cream/10 px-8 py-4 text-sm font-semibold tracking-wider text-cream uppercase transition-colors hover:bg-cream hover:text-olive"
          >
            Find us
          </Link>
        </div>
      </div>
    </section>
  )
}
