import {
  ArrowRight,
  Clock,
  MapPin,
  Phone,
  EnvelopeSimple,
  InstagramLogo,
} from "@phosphor-icons/react"
import { Link } from "react-router"
import SectionLabel from "@/components/section-label"
import { img } from "@/lib/images"

export default function Visit() {
  return (
    <>
      <Hero />
      <Details />
      <Train />
      <Closing />
    </>
  )
}

function Hero() {
  return (
    <section className="bg-paper">
      <div className="mx-auto max-w-[1480px] px-6 pt-20 pb-12 lg:px-10">
        <p className="text-eyebrow text-rosso uppercase">Come find us</p>
        <h1
          className="mt-6 font-sans leading-none font-black text-olive uppercase"
          style={{ fontSize: "clamp(56px, 9vw, 144px)" }}
        >
          Find
          <br />
          <span className="font-display font-normal text-rosso normal-case italic">
            your way in.
          </span>
        </h1>
      </div>
      <div className="relative mx-auto max-w-[1480px] px-6 lg:px-10">
        <div className="relative aspect-[16/7] overflow-hidden">
          <img
            src={img.interior}
            alt="The dining room at Sienna Mercato"
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-olive/60 to-transparent" />
          <div className="absolute right-8 bottom-8 left-8 flex flex-wrap items-end justify-between gap-4 text-cream">
            <div>
              <p className="text-eyebrow text-cream/70 uppercase">Brooklyn</p>
              <p className="font-display mt-2 text-h1 leading-none italic">
                412 Mulberry St.
              </p>
            </div>
            <a
              href="https://maps.google.com"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-rosso px-5 py-3 text-sm font-semibold tracking-wider text-cream uppercase transition-colors hover:bg-rosso-deep"
            >
              Open in maps <ArrowRight weight="bold" size={16} />
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

function Details() {
  return (
    <section className="mx-auto grid max-w-[1480px] grid-cols-12 gap-10 px-6 py-24 lg:px-10">
      <div className="col-span-12 md:col-span-5">
        <SectionLabel number="01" className="mb-8">
          Hours
        </SectionLabel>
        <ul className="font-display divide-y divide-olive/15 text-h3 text-olive italic">
          {[
            ["Mon", "Closed"],
            ["Tue", "5–10pm"],
            ["Wed", "5–10pm"],
            ["Thu", "5–10pm"],
            ["Fri", "5pm – 12am"],
            ["Sat", "5pm – 12am"],
            ["Sun", "11am – 9pm"],
          ].map(([d, h]) => (
            <li key={d} className="flex items-baseline justify-between py-4">
              <span>{d}</span>
              <span className={d === "Mon" ? "text-olive/40" : "text-rosso"}>
                {h}
              </span>
            </li>
          ))}
        </ul>
        <p className="mt-6 text-base text-olive/70">
          Aperitivo at the bar daily 4–6pm. Brunch served Sunday 11am–3pm.
        </p>
      </div>

      <div className="col-span-12 grid grid-cols-1 gap-6 sm:grid-cols-2 md:col-span-7">
        <Card icon={<MapPin weight="fill" size={20} />} label="Address">
          412 Mulberry Street
          <br />
          Brooklyn, NY 11211
          <br />
          <span className="text-olive/55">
            Williamsburg, between Grand & Powers
          </span>
        </Card>
        <Card icon={<Phone weight="fill" size={20} />} label="Reservations">
          +1 (718) 555-0142
          <br />
          <span className="text-olive/55">Tue–Sun · 12–10pm</span>
        </Card>
        <Card
          icon={<EnvelopeSimple weight="fill" size={20} />}
          label="Private events"
        >
          events@siennamercato.com
          <br />
          <span className="text-olive/55">
            Back room seats 14 · full buyouts available
          </span>
        </Card>
        <Card
          icon={<InstagramLogo weight="fill" size={20} />}
          label="Follow along"
        >
          @siennamercato
          <br />
          <span className="text-olive/55">
            Daily specials, behind the line, focaccia.
          </span>
        </Card>
        <Card icon={<Clock weight="fill" size={20} />} label="Walk-ins" wide>
          14 bar seats are held nightly. First come, first poured. Show up at
          5pm sharp on Tuesdays — the line is shortest, the focaccia is hottest.
        </Card>
      </div>
    </section>
  )
}

function Card({
  icon,
  label,
  children,
  wide = false,
}: {
  icon: React.ReactNode
  label: string
  children: React.ReactNode
  wide?: boolean
}) {
  return (
    <div
      className={`border border-olive/15 bg-cream/60 p-6 ${wide ? "sm:col-span-2" : ""}`}
    >
      <div className="flex items-center gap-3 text-rosso">
        {icon}
        <p className="text-eyebrow text-olive/60 uppercase">{label}</p>
      </div>
      <p className="mt-4 text-base leading-relaxed text-olive">{children}</p>
    </div>
  )
}

function Train() {
  return (
    <section className="bg-bone">
      <div className="mx-auto grid max-w-[1480px] grid-cols-12 items-center gap-8 px-6 py-20 lg:px-10">
        <div className="col-span-12 md:col-span-5">
          <SectionLabel number="02" className="mb-8">
            Getting here
          </SectionLabel>
          <h2 className="font-sans text-h1 leading-none font-black uppercase">
            By foot,
            <br />
            <span className="font-display font-normal text-rosso normal-case italic">
              by L train,
            </span>
            <br />
            by yellow cab.
          </h2>
        </div>
        <div className="col-span-12 grid gap-6 sm:grid-cols-3 md:col-span-7">
          {[
            ["L train", "Bedford Av · 6 min walk"],
            ["G train", "Metropolitan · 9 min walk"],
            ["Citi Bike", "Grand & Roebling dock"],
          ].map(([k, v]) => (
            <div key={k} className="border-t border-olive/20 pt-5">
              <p className="text-eyebrow text-olive/55 uppercase">{k}</p>
              <p className="font-display mt-3 text-h4 text-olive italic">{v}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

function Closing() {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={img.alley} alt="" className="h-full w-full object-cover" />
        <div className="absolute inset-0 bg-rosso/80 mix-blend-multiply" />
      </div>
      <div className="relative mx-auto max-w-[1480px] px-6 py-32 text-cream lg:px-10">
        <p className="text-eyebrow text-cream/80 uppercase">See you soon</p>
        <h2 className="font-display mt-6 max-w-3xl text-display leading-none italic">
          We'll keep the lamps on.
        </h2>
        <Link
          to="/reserve"
          className="mt-12 inline-flex items-center gap-3 rounded-full bg-cream px-8 py-4 text-sm font-semibold tracking-wider text-olive uppercase transition-colors hover:bg-paper"
        >
          Reserve a table <ArrowRight weight="bold" size={16} />
        </Link>
      </div>
    </section>
  )
}
