import {
  CalendarBlank,
  Clock,
  Users,
  EnvelopeSimple,
  User,
  Phone,
  CheckCircle,
} from "@phosphor-icons/react"
import { useState } from "react"
import { img } from "@/lib/images"

const TIMES = [
  "5:00",
  "5:30",
  "6:00",
  "6:30",
  "7:00",
  "7:30",
  "8:00",
  "8:30",
  "9:00",
  "9:30",
]
const PARTIES = ["1", "2", "3", "4", "5", "6", "7+"]

export default function Reserve() {
  const [done, setDone] = useState(false)
  const [party, setParty] = useState("2")
  const [time, setTime] = useState("7:00")

  return (
    <section className="bg-paper">
      <div className="mx-auto grid min-h-[88vh] max-w-[1480px] grid-cols-12 gap-0 px-6 lg:px-10">
        <div className="col-span-12 py-20 md:col-span-7 md:pr-16">
          <p className="text-eyebrow text-rosso uppercase">Reservations</p>
          <h1
            className="mt-6 font-sans leading-none font-black text-olive uppercase"
            style={{ fontSize: "clamp(56px, 9vw, 144px)" }}
          >
            Hold
            <br />
            <span className="font-display font-normal text-rosso normal-case italic">
              a seat.
            </span>
          </h1>
          <p className="mt-8 max-w-md text-lg text-olive/75">
            Reservations open thirty days in advance. We hold a few walk-in
            spots at the bar every night — first focaccia is on us.
          </p>

          {done ? (
            <div className="mt-12 max-w-xl rounded-sm border border-olive/15 bg-cream p-8">
              <CheckCircle weight="fill" size={36} className="text-rosso" />
              <h2 className="font-display mt-4 text-h2 text-olive italic">
                See you soon.
              </h2>
              <p className="mt-3 text-base text-olive/75">
                You're booked for {party} at {time}pm. We sent a confirmation —
                check your inbox, and don't forget to bring an appetite.
              </p>
              <button
                type="button"
                onClick={() => setDone(false)}
                className="mt-6 text-eyebrow text-rosso uppercase hover:text-rosso-deep"
              >
                Book another →
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault()
                setDone(true)
              }}
              className="mt-12 max-w-xl space-y-6"
            >
              <div className="grid grid-cols-2 gap-4">
                <Field label="Date" icon={<CalendarBlank size={18} />}>
                  <input
                    required
                    type="date"
                    defaultValue={new Date().toISOString().slice(0, 10)}
                    className="w-full bg-transparent text-base text-olive outline-none"
                  />
                </Field>
                <Field label="Party size" icon={<Users size={18} />}>
                  <select
                    value={party}
                    onChange={(e) => setParty(e.target.value)}
                    className="w-full bg-transparent text-base text-olive outline-none"
                  >
                    {PARTIES.map((p) => (
                      <option key={p}>{p}</option>
                    ))}
                  </select>
                </Field>
              </div>

              <div>
                <p className="mb-3 inline-flex items-center gap-2 text-eyebrow text-olive/50 uppercase">
                  <Clock size={14} /> Available times
                </p>
                <div className="flex flex-wrap gap-2">
                  {TIMES.map((t) => {
                    const active = t === time
                    return (
                      <button
                        type="button"
                        key={t}
                        onClick={() => setTime(t)}
                        className={`rounded-full border px-4 py-2 text-sm font-semibold tracking-wide transition-colors ${
                          active
                            ? "border-rosso bg-rosso text-cream"
                            : "border-olive/20 text-olive hover:border-olive"
                        }`}
                      >
                        {t}
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Name" icon={<User size={18} />}>
                  <input
                    required
                    type="text"
                    placeholder="Giulia M."
                    className="w-full bg-transparent text-base text-olive outline-none placeholder:text-olive/40"
                  />
                </Field>
                <Field label="Phone" icon={<Phone size={18} />}>
                  <input
                    required
                    type="tel"
                    placeholder="(718) 555-0142"
                    className="w-full bg-transparent text-base text-olive outline-none placeholder:text-olive/40"
                  />
                </Field>
              </div>

              <Field label="Email" icon={<EnvelopeSimple size={18} />}>
                <input
                  required
                  type="email"
                  placeholder="email@yours.com"
                  className="w-full bg-transparent text-base text-olive outline-none placeholder:text-olive/40"
                />
              </Field>

              <Field label="Notes for the kitchen">
                <textarea
                  rows={3}
                  placeholder="Allergies, anniversaries, special requests…"
                  className="w-full resize-none bg-transparent text-base text-olive outline-none placeholder:text-olive/40"
                />
              </Field>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-3 rounded-full bg-rosso px-8 py-4 text-sm font-semibold tracking-wider text-cream uppercase transition-colors hover:bg-rosso-deep md:w-auto"
              >
                Confirm reservation
              </button>
              <p className="text-sm text-olive/55">
                We hold tables for 15 minutes past the reservation time.
              </p>
            </form>
          )}
        </div>

        <aside className="relative col-span-5 hidden md:block">
          <div className="sticky top-32">
            <div className="relative aspect-[4/5] overflow-hidden">
              <img
                src={img.interior}
                alt="Inside the dining room"
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute right-6 bottom-6 left-6 text-cream">
                <p className="text-eyebrow text-cream/80 uppercase">
                  The corner booth
                </p>
                <p className="font-display mt-2 text-h2 leading-tight italic">
                  Best seat in the house — request it in the notes.
                </p>
              </div>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
              <Tile k="Largest party" v="14 (private back room)" />
              <Tile k="Walk-in bar" v="14 seats, no res" />
              <Tile k="Dietary" v="Always accommodating" />
              <Tile k="Cancellation" v="$25/seat after 24h" />
            </div>
          </div>
        </aside>
      </div>
    </section>
  )
}

function Field({
  label,
  icon,
  children,
}: {
  label: string
  icon?: React.ReactNode
  children: React.ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-2 flex items-center gap-2 text-eyebrow text-olive/55 uppercase">
        {icon}
        {label}
      </span>
      <div className="rounded-sm border border-olive/20 bg-cream/40 px-4 py-3 transition-colors focus-within:border-rosso hover:border-olive/40">
        {children}
      </div>
    </label>
  )
}

function Tile({ k, v }: { k: string; v: string }) {
  return (
    <div className="border-t border-olive/15 pt-3">
      <p className="text-eyebrow text-olive/50 uppercase">{k}</p>
      <p className="mt-1 text-olive">{v}</p>
    </div>
  )
}
