import { useState } from "react"
import { Link } from "react-router"

const SPACES = [
  {
    id: "emporio",
    roman: "I",
    name: "Emporio",
    sub: "A Meatball Joint",
    capacity: "105",
    vibe: "Energetic · industrial · loud",
    perfect: [
      "Corporate happy hours",
      "Rehearsal dinners",
      "Family celebrations",
      "Birthdays",
    ],
    desc: "Ground floor. Modern-industrial brick and steel, the open kitchen running through service, the bar long enough to seat your whole guest list. Customizable food stations, cocktail packages, no dress code.",
    image:
      "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=70",
    accent: "text-sienna",
    href: "/emporio",
  },
  {
    id: "mezzo",
    roman: "II",
    name: "Mezzo",
    sub: "Pizza & Charcuterie",
    capacity: "90",
    vibe: "Intimate · refined · candlelit",
    perfect: [
      "Cocktail hours",
      "Seated dinners",
      "Rehearsal dinners",
      "Corporate entertaining",
    ],
    desc: "Second floor. Hardwood floors, exposed brick, a wood-beamed ceiling and open-air garage windows that look out over Penn Avenue. Custom menus, custom beverage pairings, wine list included.",
    image:
      "https://images.unsplash.com/photo-1571997478779-2adcbbe9ab2f?auto=format&fit=crop&w=1600&q=70",
    accent: "text-sienna-deep",
    href: "/mezzo",
  },
  {
    id: "tetto",
    roman: "III",
    name: "Il Tetto",
    sub: "Rooftop Beer Garden",
    capacity: "200",
    vibe: "Open-air · skyline · all-season",
    perfect: [
      "Weddings",
      "Rehearsal dinners",
      "Corporate parties",
      "Award-night socials",
    ],
    desc: "Third floor. Award-winning rooftop with a retractable glass roof, bistro lights overhead, the Pittsburgh skyline behind every photograph. Chef-crafted catering, curated beverages, a dedicated event team.",
    image:
      "https://images.unsplash.com/photo-1414235077428-338989a2e8c0?auto=format&fit=crop&w=1600&q=70",
    accent: "text-gold",
    href: "/tetto",
  },
] as const

const TIER_1 = [
  { name: "Cheesy Bread", price: "$70 / $140" },
  { name: "Buffalo Chicken Balls", price: "$55 / $110" },
  {
    name: "Choice of 2 Meatballs",
    price: "$110",
    note: "serves 25 · ten sauces",
  },
  { name: "Chicken Parmesan", price: "$57.50 / $115" },
  { name: "Shepherd's Pie", price: "$42.50 half pan" },
  { name: "Mac & Cheese", price: "$60 / $120" },
  { name: "Mashed Potatoes", price: "$60 / $120" },
  { name: "Roasted Brussels Sprouts", price: "$115 / $230" },
  { name: "Cookies, chocolate chip & oatmeal raisin", price: "$70 / $140" },
] as const

const TIER_2 = [
  {
    name: "Cheese & Charcuterie Display",
    price: "$100 / $200",
    note: "3 meats · 3 cheeses · pickles · chutney",
  },
  { name: "Mini Crab Cakes", price: "$90 / $180" },
  { name: "Caprese with Focaccia", price: "$50 / $100" },
  {
    name: "Hand-Tossed Pizza",
    price: "$20 / $24",
    note: "one or two toppings · 8-cut",
  },
  { name: "Chicken Picatta · Veal Picatta", price: "$90 / $110" },
  { name: "Chicken Marsala · Veal Marsala", price: "$90 / $110" },
  { name: "Rigatoni Bolognese", price: "$80 / $160" },
  { name: "Stuffed Shells, cheese or sausage", price: "$60 / $75" },
  { name: "Cannolis · pick 2 flavors", price: "$30 per dozen" },
] as const

const RECURRING = [
  {
    title: "Wine Down Thursday",
    sub: "Bottles & Boards",
    floor: "Mezzo",
    desc: "Half-off select bottles paired with a chef's charcuterie board. The sommelier picks four every week, when they're gone, they're gone.",
    when: "Every Thursday · 5 → 9 PM",
    icon: "ph-wine",
  },
  {
    title: "Trivia on the Rooftop",
    sub: "Pitcher · pizza · pop quiz",
    floor: "Il Tetto",
    desc: "Six rounds, three drinks deep, cash bar tab for the winning table. Show up early, the rooftop fills by question two.",
    when: "Tuesdays · 7 → 9 PM",
    icon: "ph-microphone",
  },
] as const

const REVIEWS = [
  {
    quote:
      "I came here for a wedding on the rooftop and it is a beautiful venue. The food was delicious and the staff was professional and helpful.",
    by: "Jesse V.",
    stars: 5,
  },
  {
    quote:
      "When first tasked with planning our 3-day event, I had to find a hotel and entertainment too. Sienna Mercato, I could not have asked for anyone better. The venue was beautiful, the staff amazing, food delicious, drinks perfection, and the price was right. I'd give it 11 out of 10 stars.",
    by: "Tracy M.",
    stars: 5,
  },
] as const

const CONTACTS = [
  {
    name: "Susan Certo",
    role: "Events Director",
    email: "scerto@siennapgh.com",
  },
  {
    name: "Renee Sroka",
    role: "Private Events",
    email: "rsroka@siennapgh.com",
    phone: "412.360.9031",
  },
] as const

function StarRow({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-sienna">
      {Array.from({ length: n }).map((_, i) => (
        <i key={i} className="ph-fill ph-star text-base" />
      ))}
    </div>
  )
}

function CateringRow({
  name,
  price,
  note,
}: {
  name: string
  price: string
  note?: string
}) {
  return (
    <li className="flex items-baseline gap-3 py-3">
      <div className="flex-1">
        <div className="font-serif text-lg text-ink">{name}</div>
        {note && (
          <div className="mt-0.5 font-italic text-sm text-ink-soft italic">
            {note}
          </div>
        )}
      </div>
      <span
        className="mx-2 hidden max-w-[35%] flex-1 translate-y-[-6px] border-b border-dotted border-ink/25 sm:block"
        aria-hidden
      />
      <span className="font-serif text-base text-sienna-deep tabular-nums">
        {price}
      </span>
    </li>
  )
}

export function Events() {
  const [submitted, setSubmitted] = useState(false)

  return (
    <div className="relative">
      {/* HERO */}
      <section className="relative h-[88svh] min-h-[640px] w-full overflow-hidden bg-ink">
        <img
          src="https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?auto=format&fit=crop&w=2400&q=80"
          alt="A long candlelit table set for a private event at Sienna Mercato"
          className="slow-zoom absolute inset-0 h-full w-full object-cover opacity-85"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/55 via-ink/30 to-ink/95" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_40%,rgba(232,160,74,0.25),transparent_60%)]" />

        <div className="absolute top-24 right-0 left-0 z-10 mx-auto flex max-w-[1600px] items-center justify-between px-6 font-serif text-2xs tracking-[0.4em] text-cream/70 uppercase lg:px-12">
          <Link
            to="/"
            className="under flex items-center gap-2 hover:text-cream"
          >
            <i className="ph ph-arrow-left text-sm" />
            all of sienna
          </Link>
          <span className="hidden items-center gap-2 md:inline-flex">
            <i className="ph ph-house-line text-sm" /> Three floors · 942 Penn
            Ave
          </span>
          <span className="flex items-center gap-2">
            up to 200 guests
            <span className="inline-block h-px w-8 bg-cream/40" />
          </span>
        </div>

        <div className="relative z-10 mx-auto flex h-full max-w-[1600px] flex-col justify-end px-6 pb-20 lg:px-12">
          <div className="rise" style={{ animationDelay: "0.05s" }}>
            <div className="mb-6 flex items-center gap-3 font-italic text-xl text-gold italic">
              <span className="swash" />
              <span>three floors of possibilities</span>
            </div>
            <h1 className="font-display text-[clamp(4rem,12vw,11rem)] leading-[0.85] tracking-tight text-cream">
              Events
              <br />
              <span className="font-italic font-light text-gold italic">
                & Catering.
              </span>
            </h1>
            <p className="mt-8 max-w-2xl font-body text-xl leading-snug text-cream/85 md:text-2xl">
              Rehearsal dinners on the second floor. Weddings on the rooftop.
              Corporate happy hours on the ground floor. Or a half pan of
              meatballs delivered to your office by noon.
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-4">
              <a
                href="#inquire"
                className="group inline-flex items-center gap-3 bg-sienna px-7 py-4 font-serif text-sm tracking-[0.25em] text-cream uppercase transition-colors hover:bg-sienna-bright"
              >
                <i className="ph ph-envelope text-lg" />
                Inquire about a private event
                <i className="ph ph-arrow-down text-base transition-transform group-hover:translate-y-0.5" />
              </a>
              <a
                href="https://www.siennamercato.com/catering-store-v2"
                target="_blank"
                rel="noreferrer"
                className="group inline-flex items-center gap-3 border border-cream/40 px-7 py-4 font-serif text-sm tracking-[0.25em] text-cream uppercase transition-colors hover:border-cream hover:bg-cream/10"
              >
                <i className="ph ph-bag text-lg" />
                Order catering pickup
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* THREE FLOORS, at a glance */}
      <section className="relative bg-paper py-28">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
          <div className="mb-14 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <div>
              <div className="mb-3 font-italic text-lg text-sienna italic">
                the venue
              </div>
              <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.9] text-ink">
                Three rooms.
                <br />
                <span className="font-italic text-sienna italic">
                  Three vibes.
                </span>{" "}
                Pick a floor.
              </h2>
            </div>
            <p className="max-w-md font-italic text-lg leading-relaxed text-ink-soft italic">
              Each floor stands alone or stacks with the others, the whole
              building seats nearly four hundred.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {SPACES.map((s) => (
              <article
                key={s.id}
                className="group flex flex-col overflow-hidden border border-ink/10 bg-cream"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <img
                    src={s.image}
                    alt={`${s.name} private event space`}
                    className="dish-img absolute inset-0 h-full w-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-ink/70 via-transparent to-transparent" />
                  <div className="absolute top-4 left-4 bg-cream px-3 py-1.5 font-serif text-2xs tracking-[0.4em] text-ink uppercase">
                    Floor {s.roman}
                  </div>
                  <div className="absolute right-4 bottom-4 left-4 flex items-baseline justify-between">
                    <h3 className="font-display text-4xl text-cream drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
                      {s.name}
                    </h3>
                    <span className={`font-display text-2xl ${s.accent}`}>
                      {s.capacity}
                    </span>
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-7">
                  <div className="font-italic text-sm text-sienna italic">
                    {s.sub}
                  </div>
                  <div className="mt-2 font-serif text-2xs tracking-[0.3em] text-ink-soft uppercase">
                    {s.vibe}
                  </div>
                  <p className="mt-4 font-body text-base leading-relaxed text-ink-soft">
                    {s.desc}
                  </p>
                  <div className="mt-6">
                    <div className="font-serif text-2xs tracking-[0.3em] text-ink-soft uppercase">
                      Perfect for
                    </div>
                    <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 font-italic text-sm text-ink italic">
                      {s.perfect.map((p, i) => (
                        <li key={p} className="flex items-center gap-2">
                          {p}
                          {i < s.perfect.length - 1 && (
                            <span className="text-sienna/50">·</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <Link
                    to={s.href}
                    className="under mt-6 inline-flex items-center gap-2 font-serif text-xs tracking-[0.3em] text-sienna uppercase hover:text-sienna-deep"
                  >
                    See the floor
                    <i className="ph ph-arrow-right text-sm" />
                  </Link>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-12 flex flex-wrap items-center justify-between gap-4 rounded-none border border-ink/10 bg-cream px-6 py-4 font-serif text-xs tracking-[0.3em] text-ink-soft uppercase">
            <span className="flex items-center gap-3">
              <i className="ph-duotone ph-cube text-2xl text-sienna" />
              Want to see the rooms before you book?
            </span>
            <a
              href="https://viewer.threshold360.com/?thresholdId=7761067-1993885746&preset=share"
              target="_blank"
              rel="noreferrer"
              className="group inline-flex items-center gap-2 text-sienna hover:text-sienna-deep"
            >
              Tour all three floors in 360°
              <i className="ph ph-arrow-up-right text-sm transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </a>
          </div>
        </div>
      </section>

      {/* CATERING, TWO TIERS */}
      <section className="relative bg-paper-deep py-28">
        <div className="mx-auto max-w-[1500px] px-6 lg:px-12">
          <div className="mb-14 grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end">
            <div>
              <div className="mb-3 font-italic text-lg text-sienna italic">
                catering · delivery & pickup
              </div>
              <h2 className="font-display text-[clamp(3rem,7vw,6rem)] leading-[0.85] text-ink">
                Two kitchens,
                <br />
                <span className="font-italic text-sienna italic">
                  two tiers.
                </span>
              </h2>
            </div>
            <p className="max-w-md font-italic text-lg leading-relaxed text-ink-soft italic">
              Every catering order ships out of one of our two kitchens, the
              casual ground floor or the refined second. Half pans serve 12,
              full pans serve 24. Forty-eight hours notice, please.
            </p>
          </div>

          <div className="grid gap-12 lg:grid-cols-2">
            <div className="border border-ink/10 bg-cream p-8 lg:p-10">
              <div className="mb-2 flex items-baseline justify-between">
                <span className="font-display text-3xl text-ink">Tier 1</span>
                <span className="font-italic text-sm text-sienna italic">
                  Emporio kitchen
                </span>
              </div>
              <h3 className="font-display text-5xl leading-[0.9] text-ink">
                Casual,
                <br />
                <span className="font-italic text-sienna italic">
                  family-style.
                </span>
              </h3>
              <p className="mt-4 font-italic text-base text-ink-soft italic">
                Meatballs, mac & cheese, chicken parm, feeds a conference room
                or a graduation party without ceremony.
              </p>
              <ul className="mt-6 divide-y divide-ink/10 border-t border-b border-ink/10">
                {TIER_1.map((r) => (
                  <CateringRow key={r.name} {...r} />
                ))}
              </ul>
              <div className="mt-4 font-italic text-xs text-ink-soft italic">
                Half pan / full pan, unless noted.
              </div>
            </div>

            <div className="border border-ink/10 bg-cream p-8 lg:p-10">
              <div className="mb-2 flex items-baseline justify-between">
                <span className="font-display text-3xl text-ink">Tier 2</span>
                <span className="font-italic text-sm text-sienna-deep italic">
                  Mezzo kitchen
                </span>
              </div>
              <h3 className="font-display text-5xl leading-[0.9] text-ink">
                Refined,
                <br />
                <span className="font-italic text-sienna-deep italic">
                  plated-ready.
                </span>
              </h3>
              <p className="mt-4 font-italic text-base text-ink-soft italic">
                Charcuterie boards, picatta and marsala, hand-tossed pizzas,
                pasta with chicken add-ons, for the dinners that need to look
                the part.
              </p>
              <ul className="mt-6 divide-y divide-ink/10 border-t border-b border-ink/10">
                {TIER_2.map((r) => (
                  <CateringRow key={r.name} {...r} />
                ))}
              </ul>
              <div className="mt-4 font-italic text-xs text-ink-soft italic">
                Half pan / full pan, unless noted.
              </div>
            </div>
          </div>

          {/* fees row */}
          <div className="mt-12 grid gap-px bg-ink/15 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                k: "20%",
                v: "service gratuity · in-house",
                icon: "ph-receipt",
              },
              {
                k: "10%",
                v: "kitchen gratuity · catering",
                icon: "ph-chef-hat",
              },
              {
                k: "$50 / $25",
                v: "delivery · regular / downtown",
                icon: "ph-truck",
              },
              {
                k: "$55",
                v: "serviceware per 25 guests",
                icon: "ph-fork-knife",
              },
            ].map((f) => (
              <div key={f.v} className="flex items-center gap-5 bg-cream p-6">
                <i className={`ph-duotone ${f.icon} text-3xl text-sienna`} />
                <div>
                  <div className="font-display text-2xl leading-none text-ink">
                    {f.k}
                  </div>
                  <div className="mt-1 font-italic text-sm text-ink-soft italic">
                    {f.v}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 font-italic text-sm text-ink-soft italic">
            <span className="flex items-center gap-2">
              <i className="ph ph-clock text-sienna" />
              Forty-eight hours notice for catering requests.
            </span>
            <a
              href="https://www.siennamercato.com/catering-store-v2"
              target="_blank"
              rel="noreferrer"
              className="under text-sienna hover:text-sienna-deep"
            >
              Order catering online →
            </a>
          </div>
        </div>
      </section>

      {/* RECURRING NIGHTS */}
      <section className="relative overflow-hidden bg-ink py-24 text-paper">
        <div className="pointer-events-none absolute -top-32 -right-32 h-[480px] w-[480px] rounded-full bg-sienna opacity-30 blur-[160px]" />
        <div className="pointer-events-none absolute -bottom-40 -left-32 h-[420px] w-[420px] rounded-full bg-gold opacity-20 blur-[140px]" />
        <div className="relative mx-auto max-w-[1500px] px-6 lg:px-12">
          <div className="mb-12 grid gap-6 md:grid-cols-[1.2fr_1fr] md:items-end">
            <div>
              <div className="mb-3 font-italic text-lg text-gold italic">
                on the calendar
              </div>
              <h2 className="font-display text-[clamp(3rem,6vw,5rem)] leading-[0.9]">
                Two standing nights.
              </h2>
            </div>
            <p className="max-w-md font-italic text-lg leading-relaxed text-paper/70 italic">
              You don't need a private event to make a night out feel like one.
              Walk in, sit down, ask for the running tab.
            </p>
          </div>

          <div className="grid gap-px bg-paper/15 sm:grid-cols-2">
            {RECURRING.map((e) => (
              <article
                key={e.title}
                className="group bg-ink p-8 transition-colors hover:bg-sienna-deep"
              >
                <div className="flex items-start justify-between gap-6">
                  <i
                    className={`ph-duotone ${e.icon} text-5xl text-gold transition-colors group-hover:text-cream`}
                  />
                  <span className="font-serif text-2xs tracking-[0.3em] text-paper/60 uppercase">
                    Floor · {e.floor}
                  </span>
                </div>
                <div className="mt-8 font-italic text-base text-gold italic">
                  {e.sub}
                </div>
                <h3 className="mt-2 font-display text-4xl leading-tight">
                  {e.title}
                </h3>
                <p className="mt-4 font-italic leading-relaxed text-paper/80 italic">
                  {e.desc}
                </p>
                <div className="mt-6 inline-flex items-center gap-3 border border-paper/30 px-4 py-2 font-serif text-xs tracking-[0.3em] text-paper/85 uppercase">
                  <i className="ph ph-clock text-sm text-gold" />
                  {e.when}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="relative bg-paper py-28">
        <div className="mx-auto max-w-[1300px] px-6 lg:px-12">
          <div className="mb-14 text-center">
            <div className="mb-3 font-italic text-lg text-sienna italic">
              from the guestbook
            </div>
            <h2 className="font-display text-[clamp(3rem,6vw,5rem)] leading-[0.9] text-ink">
              We host the night.
              <br />
              <span className="font-italic text-sienna italic">
                You take the credit.
              </span>
            </h2>
          </div>

          <div className="grid gap-10 md:grid-cols-2">
            {REVIEWS.map((r) => (
              <figure
                key={r.by}
                className="relative border-l-2 border-sienna bg-cream/60 p-8 lg:p-10"
              >
                <div className="absolute -top-3 left-8 bg-paper px-3 font-display text-5xl leading-none text-sienna">
                  &ldquo;
                </div>
                <StarRow n={r.stars} />
                <blockquote className="mt-4 font-display text-2xl leading-snug text-ink lg:text-3xl">
                  {r.quote}
                </blockquote>
                <figcaption className="mt-6 font-italic text-sm text-ink-soft italic">
                  , {r.by} · five-star review
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* INQUIRY FORM + CONTACTS */}
      <section
        id="inquire"
        className="relative overflow-hidden bg-sienna py-28 text-cream"
      >
        <div className="grain pointer-events-none absolute inset-0 opacity-50 mix-blend-overlay" />
        <div className="relative mx-auto grid max-w-[1500px] gap-16 px-6 lg:grid-cols-[1.2fr_1fr] lg:px-12">
          <div>
            <div className="mb-4 font-italic text-lg text-cream/85 italic">
              inquire now
            </div>
            <h2 className="font-display text-[clamp(3rem,7vw,5.5rem)] leading-[0.85]">
              Tell us about
              <br />
              <span className="font-italic italic">your night.</span>
            </h2>
            <p className="mt-8 max-w-xl font-body text-xl leading-relaxed text-cream/85">
              The events team replies within one business day. Send us the date,
              the headcount, and a sentence about the vibe, we'll send back a
              floor and a draft menu.
            </p>

            <form
              className="mt-10 grid gap-5"
              onSubmit={(e) => {
                e.preventDefault()
                setSubmitted(true)
              }}
            >
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Your name" name="name" type="text" required />
                <Field label="Email" name="email" type="email" required />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <Field label="Phone" name="phone" type="tel" />
                <Field label="Event date" name="date" type="date" />
              </div>
              <div className="grid gap-5 sm:grid-cols-2">
                <SelectField
                  label="Floor"
                  name="floor"
                  options={[
                    "No preference",
                    "Floor I · Emporio",
                    "Floor II · Mezzo",
                    "Floor III · Il Tetto",
                    "Whole building",
                  ]}
                />
                <SelectField
                  label="Headcount"
                  name="headcount"
                  options={[
                    "Under 25",
                    "25 – 50",
                    "50 – 100",
                    "100 – 150",
                    "150 – 200+",
                  ]}
                />
              </div>
              <SelectField
                label="Event type"
                name="type"
                options={[
                  "Wedding",
                  "Rehearsal dinner",
                  "Corporate / company",
                  "Birthday / anniversary",
                  "Holiday party",
                  "Catering · delivery only",
                  "Something else",
                ]}
              />
              <label className="block">
                <span className="font-serif text-2xs tracking-[0.3em] text-cream/70 uppercase">
                  About the night
                </span>
                <textarea
                  name="notes"
                  rows={4}
                  placeholder="Tone, courses, any must-haves, music, dietary notes, the budget if you have one in mind."
                  className="mt-2 w-full border-b border-cream/40 bg-transparent py-3 font-italic text-cream placeholder:font-italic placeholder:text-cream/50 placeholder:italic focus:border-cream focus:outline-none"
                />
              </label>

              <button
                type="submit"
                disabled={submitted}
                className="group mt-2 inline-flex w-fit items-center gap-3 bg-cream px-7 py-4 font-serif text-sm tracking-[0.3em] text-sienna uppercase transition-colors hover:bg-paper disabled:opacity-70"
              >
                {submitted ? (
                  <>
                    <i className="ph ph-check-circle text-lg" />
                    Got it, we'll be in touch
                  </>
                ) : (
                  <>
                    <i className="ph ph-paper-plane-tilt text-lg" />
                    Send the inquiry
                    <i className="ph ph-arrow-up-right text-base transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </>
                )}
              </button>
            </form>
          </div>

          <aside>
            <div className="mb-6 font-serif text-xs tracking-[0.4em] text-cream/70 uppercase">
              Or call · email
            </div>
            <ul className="divide-y divide-cream/20 border-y border-cream/20">
              {CONTACTS.map((c) => (
                <li key={c.email} className="py-6">
                  <div className="font-display text-2xl">{c.name}</div>
                  <div className="mt-1 font-italic text-sm text-cream/75 italic">
                    {c.role}
                  </div>
                  <div className="mt-3 flex flex-col gap-1.5">
                    <a
                      href={`mailto:${c.email}`}
                      className="under inline-flex items-center gap-2 font-serif text-sm hover:text-paper"
                    >
                      <i className="ph ph-envelope text-base" />
                      {c.email}
                    </a>
                    {c.phone && (
                      <a
                        href={`tel:1${c.phone.replace(/\./g, "")}`}
                        className="under inline-flex items-center gap-2 font-serif text-sm hover:text-paper"
                      >
                        <i className="ph ph-phone text-base" />
                        {c.phone}
                      </a>
                    )}
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-10 border border-cream/30 bg-sienna-deep/40 p-6">
              <div className="font-serif text-2xs tracking-[0.3em] text-cream/70 uppercase">
                Reservations · 1 → 8 guests
              </div>
              <p className="mt-2 font-italic text-cream/85 italic">
                Mezzo (Floor II) takes regular reservations through OpenTable ,
                no inquiry form needed.
              </p>
              <a
                href="https://www.opentable.com/r/mezzo-at-sienna-mercato-second-floor-only-reservations-pittsburgh"
                target="_blank"
                rel="noreferrer"
                className="under mt-3 inline-flex items-center gap-2 font-serif text-sm tracking-[0.2em] uppercase hover:text-paper"
              >
                Reserve Mezzo
                <i className="ph ph-arrow-up-right text-sm" />
              </a>
            </div>
          </aside>
        </div>
      </section>

      {/* CTA STRIP */}
      <section className="relative bg-ink text-cream">
        <div className="mx-auto flex max-w-[1600px] flex-col gap-8 px-6 py-20 lg:flex-row lg:items-center lg:justify-between lg:px-12">
          <div>
            <div className="mb-2 font-italic text-base text-gold italic">
              ready to climb?
            </div>
            <h3 className="font-display text-5xl leading-[0.9]">
              Pick a floor.
              <br />
              <span className="font-italic italic">We'll handle the rest.</span>
            </h3>
          </div>
          <div className="flex flex-wrap gap-4">
            <Link
              to="/emporio"
              className="inline-flex items-center gap-3 border border-cream/40 px-6 py-3 font-serif text-xs tracking-[0.3em] text-cream uppercase transition-colors hover:bg-cream/10"
            >
              I · Emporio
            </Link>
            <Link
              to="/mezzo"
              className="inline-flex items-center gap-3 border border-cream/40 px-6 py-3 font-serif text-xs tracking-[0.3em] text-cream uppercase transition-colors hover:bg-cream/10"
            >
              II · Mezzo
            </Link>
            <Link
              to="/tetto"
              className="inline-flex items-center gap-3 border border-cream/40 px-6 py-3 font-serif text-xs tracking-[0.3em] text-cream uppercase transition-colors hover:bg-cream/10"
            >
              III · Il Tetto
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}

function Field({
  label,
  name,
  type,
  required,
}: {
  label: string
  name: string
  type: string
  required?: boolean
}) {
  return (
    <label className="block">
      <span className="font-serif text-2xs tracking-[0.3em] text-cream/70 uppercase">
        {label}
        {required && <span className="ml-1 text-cream">*</span>}
      </span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full border-b border-cream/40 bg-transparent py-3 font-serif text-cream focus:border-cream focus:outline-none"
      />
    </label>
  )
}

function SelectField({
  label,
  name,
  options,
}: {
  label: string
  name: string
  options: readonly string[]
}) {
  return (
    <label className="block">
      <span className="font-serif text-2xs tracking-[0.3em] text-cream/70 uppercase">
        {label}
      </span>
      <select
        name={name}
        defaultValue=""
        className="mt-2 w-full appearance-none border-b border-cream/40 bg-transparent py-3 font-serif text-cream focus:border-cream focus:outline-none [&>option]:bg-sienna [&>option]:text-cream"
      >
        <option value="" disabled>
          Choose
        </option>
        {options.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
    </label>
  )
}
