import { ArrowRight, Asterisk, Leaf, Flame } from "@phosphor-icons/react"
import { Link } from "react-router"
import { img } from "@/lib/images"

type Dish = {
  name: string
  english?: string
  desc: string
  price: string
  tags?: Array<"veg" | "spicy">
  feature?: string
}

const SECTIONS: Array<{
  id: string
  number: string
  title: string
  italian: string
  blurb: string
  dishes: Dish[]
}> = [
  {
    id: "antipasti",
    number: "01",
    title: "To Begin",
    italian: "Antipasti",
    blurb:
      "Sliced thin, salted right, meant for the middle of the table. Order one too many.",
    dishes: [
      {
        name: "Focaccia di Recco",
        desc: "Stretched-dough focaccia, crozet butter, sea salt, rosemary oil.",
        price: "9",
        feature: img.bread,
      },
      {
        name: "Burrata di Andria",
        english: "Burrata, peach, basil",
        desc: "Stracciatella from Puglia, white peach, torn basil, twelve-year balsamico.",
        price: "19",
        tags: ["veg"],
      },
      {
        name: "Vitello tonnato",
        desc: "Slow-poached veal, tuna-caper aioli, fried capers, lemon.",
        price: "21",
      },
      {
        name: "Polpo alla griglia",
        english: "Grilled octopus",
        desc: "Charred octopus, white beans, salsa verde, pickled fresno.",
        price: "23",
        tags: ["spicy"],
      },
      {
        name: "Tagliere",
        english: "Salumi & cheese",
        desc: "Three meats, three cheeses, mostarda, grissini. Pairs with anything red.",
        price: "28",
      },
    ],
  },
  {
    id: "primi",
    number: "02",
    title: "First Course",
    italian: "Primi",
    blurb: "Pasta is rolled at seven in the morning. We don't lie about that.",
    dishes: [
      {
        name: "Cacio e pepe",
        desc: "Hand-cut tonnarelli, two-year Pecorino di Pienza, Tellicherry pepper.",
        price: "24",
        feature: img.pastaClose,
        tags: ["veg"],
      },
      {
        name: "Bucatini all'amatriciana",
        desc: "Guanciale, San Marzano, calabrian chili, pecorino romano.",
        price: "26",
        tags: ["spicy"],
      },
      {
        name: "Tagliatelle al ragù",
        english: "Ragù bolognese",
        desc: "Three meats, milk, soffritto, three hours. The way Modena does it.",
        price: "27",
      },
      {
        name: "Risotto al Barolo",
        desc: "Carnaroli, Barolo reduction, beef marrow, parmigiano 36-month.",
        price: "29",
      },
      {
        name: "Cappellacci di zucca",
        english: "Pumpkin cappellacci",
        desc: "Brown butter, sage, crushed amaretti, parmigiano.",
        price: "26",
        tags: ["veg"],
      },
    ],
  },
  {
    id: "secondi",
    number: "03",
    title: "Mains",
    italian: "Secondi",
    blurb: "From the wood oven, the grill, and a very loud Tuscan chef.",
    dishes: [
      {
        name: "Bistecca alla fiorentina",
        desc: "30oz dry-aged porterhouse, rosemary, lemon, very good olive oil. For two.",
        price: "118",
        feature: img.interior,
      },
      {
        name: "Branzino al sale",
        english: "Salt-baked branzino",
        desc: "Whole branzino, herb-salt crust, lemon, capers. Cracked tableside.",
        price: "44",
      },
      {
        name: "Pollo al mattone",
        desc: "Brick-pressed half chicken, charred radicchio, anchovy butter.",
        price: "32",
      },
      {
        name: "Melanzane alla parmigiana",
        desc: "Layered eggplant, tomato, mozzarella, basil. Finished in the oven.",
        price: "26",
        tags: ["veg"],
      },
    ],
  },
  {
    id: "dolci",
    number: "04",
    title: "Sweets",
    italian: "Dolci",
    blurb: "We make all of them. We even make the ice cream.",
    dishes: [
      {
        name: "Tiramisù della casa",
        desc: "Savoiardi, mascarpone, espresso, marsala, cocoa. The original recipe.",
        price: "12",
        feature: img.tiramisu,
      },
      {
        name: "Panna cotta al limone",
        desc: "Amalfi lemon panna cotta, candied peel, basil oil.",
        price: "11",
        tags: ["veg"],
      },
      {
        name: "Affogato",
        desc: "Fior di latte gelato drowned in a double espresso.",
        price: "10",
        tags: ["veg"],
      },
      {
        name: "Cannoli siciliani",
        desc: "Crisp shell, sheep's-milk ricotta, candied orange, pistachio.",
        price: "11",
      },
    ],
  },
]

export default function Menu() {
  return (
    <>
      <MenuHero />
      <Legend />
      {SECTIONS.map((s) => (
        <Section key={s.id} section={s} />
      ))}
      <Closer />
    </>
  )
}

function MenuHero() {
  return (
    <section className="relative overflow-hidden bg-rosso text-cream">
      <div className="mx-auto grid max-w-[1480px] grid-cols-12 gap-8 px-6 pt-24 pb-32 lg:px-10">
        <div className="col-span-12 md:col-span-8">
          <p className="text-eyebrow text-cream/70 uppercase">Spring '26</p>
          <h1
            className="mt-6 font-sans leading-none font-black uppercase"
            style={{ fontSize: "clamp(72px, 12vw, 200px)" }}
          >
            The
            <br />
            <span className="font-display font-normal normal-case italic">
              menu.
            </span>
          </h1>
          <p className="mt-10 max-w-xl text-lg text-cream/85">
            Updated by the chef on Tuesdays. Pasta is hand-rolled before
            service. We change the menu when the market changes — please don't
            hold us to whatever you read here last week.
          </p>
        </div>
        <div className="col-span-12 flex items-end md:col-span-4 md:justify-end">
          <ul className="space-y-2 text-base text-cream/85 md:text-right">
            {SECTIONS.map((s) => (
              <li key={s.id}>
                <a
                  href={`#${s.id}`}
                  className="group inline-flex items-center gap-3 hover:text-cream"
                >
                  <span className="font-display text-h3 text-cream/50 italic transition-colors group-hover:text-cream">
                    {s.number}
                  </span>
                  <span className="text-sm tracking-wider uppercase">
                    {s.italian} · {s.title}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <p
        aria-hidden
        className="font-display pointer-events-none absolute -bottom-12 -left-6 whitespace-nowrap text-cream/[0.06] italic select-none"
        style={{ fontSize: "320px", lineHeight: 1 }}
      >
        Eat well
      </p>
    </section>
  )
}

function Legend() {
  return (
    <div className="border-y border-olive/10 bg-bone">
      <div className="mx-auto flex max-w-[1480px] flex-wrap items-center gap-x-10 gap-y-3 px-6 py-5 text-sm text-olive/70 lg:px-10">
        <span className="text-eyebrow text-olive/50 uppercase">Legend</span>
        <span className="inline-flex items-center gap-2">
          <Leaf weight="fill" size={16} className="text-olive" /> Vegetarian
        </span>
        <span className="inline-flex items-center gap-2">
          <Flame weight="fill" size={16} className="text-rosso" /> Spicy
        </span>
        <span className="inline-flex items-center gap-2">
          <Asterisk weight="bold" size={14} className="text-rosso" /> Chef's
          pick
        </span>
        <span className="ml-auto italic">
          Prices in USD. 20% gratuity for parties of six or more.
        </span>
      </div>
    </div>
  )
}

function Section({ section }: { section: (typeof SECTIONS)[number] }) {
  return (
    <section
      id={section.id}
      className="mx-auto max-w-[1480px] scroll-mt-24 px-6 py-24 lg:px-10"
    >
      <div className="mb-12 grid grid-cols-12 items-end gap-10">
        <div className="col-span-12 md:col-span-7">
          <div className="flex items-baseline gap-5">
            <span className="font-display text-h1 leading-none text-rosso italic">
              {section.number}
            </span>
            <p className="text-eyebrow text-olive/60 uppercase">
              {section.title}
            </p>
          </div>
          <h2 className="mt-4 font-sans text-h1 leading-none font-black uppercase">
            <span className="font-display font-normal text-olive normal-case italic">
              {section.italian}
            </span>
          </h2>
        </div>
        <p className="col-span-12 text-lg text-olive/80 md:col-span-5">
          {section.blurb}
        </p>
      </div>

      <ul className="grid grid-cols-1 gap-x-16 gap-y-10 md:grid-cols-2">
        {section.dishes.map((d) => (
          <li
            key={d.name}
            className="grid grid-cols-12 gap-4 border-t border-olive/15 pt-6"
          >
            {d.feature && (
              <div className="col-span-12 -mx-1 -mt-6 mb-4">
                <img
                  src={d.feature}
                  alt={d.name}
                  className="aspect-[5/2] w-full object-cover"
                />
              </div>
            )}
            <div className="col-span-9">
              <div className="flex flex-wrap items-center gap-2">
                <h3 className="font-display text-h3 text-olive italic">
                  {d.name}
                </h3>
                {d.tags?.includes("veg") && (
                  <Leaf weight="fill" size={16} className="text-olive/70" />
                )}
                {d.tags?.includes("spicy") && (
                  <Flame weight="fill" size={16} className="text-rosso" />
                )}
              </div>
              {d.english && (
                <p className="mt-1 text-eyebrow text-olive/50 uppercase">
                  {d.english}
                </p>
              )}
              <p className="mt-2 text-base text-olive/75">{d.desc}</p>
            </div>
            <div className="col-span-3 text-right">
              <span className="font-display text-h3 text-rosso italic">
                {d.price}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

function Closer() {
  return (
    <section className="bg-olive text-cream">
      <div className="mx-auto grid max-w-[1480px] grid-cols-12 items-center gap-8 px-6 py-24 lg:px-10">
        <div className="col-span-12 md:col-span-7">
          <p className="text-eyebrow text-cream/60 uppercase">Drinks</p>
          <h2 className="font-display mt-6 text-display leading-none italic">
            120 bottles,
            <br />
            zero pretense.
          </h2>
          <p className="mt-8 max-w-xl text-lg text-cream/85">
            A short list of cocktails, an honest list of wines, and a fridge
            full of cold Lambrusco. Ask Tonia for the by-the-glass pour she
            keeps secret from the floor.
          </p>
          <Link
            to="/reserve"
            className="mt-10 inline-flex items-center gap-3 rounded-full bg-rosso px-7 py-4 text-sm font-semibold tracking-wider text-cream uppercase transition-colors hover:bg-rosso-deep"
          >
            Reserve a table <ArrowRight weight="bold" size={16} />
          </Link>
        </div>
        <div className="col-span-12 md:col-span-5">
          <img
            src={img.wine}
            alt="Glasses of red wine"
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
      </div>
    </section>
  )
}
