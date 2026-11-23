import { useQuery } from "convex/react"
import { useMemo, useState } from "react"
import { Link } from "react-router"
import { Card, Loading, PageHeader, Tabs } from "@/admin/ui"
import { addDays, formatDay, todayKey } from "@/lib/util"
import { api } from "../../convex/_generated/api"

const RANGES = [
  { value: "7", label: "1 week" },
  { value: "30", label: "1 month" },
  { value: "90", label: "3 months" },
  { value: "182", label: "6 months" },
] as const

type Range = (typeof RANGES)[number]["value"]

const SOURCES = [
  { key: "direct", label: "Direct", color: "bg-ink" },
  { key: "search", label: "Search", color: "bg-sienna" },
  { key: "social", label: "Social", color: "bg-amber-600" },
  { key: "referral", label: "Referral", color: "bg-emerald-700" },
  { key: "email", label: "Email", color: "bg-sky-700" },
] as const

const CONVERSIONS = [
  { key: "cateringInquiry", label: "Catering requests" },
  { key: "privateEventInquiry", label: "Private event inquiries" },
  { key: "contactInquiry", label: "Contact messages" },
  { key: "reservationClick", label: "Reservation clicks" },
  { key: "giftCardClick", label: "Gift card clicks" },
  { key: "signup", label: "Email signups" },
] as const

export function Overview() {
  const [range, setRange] = useState<Range>("30")
  const to = todayKey()
  const from = addDays(to, -(Number(range) - 1))
  const report = useQuery(api.analytics.report, { from, to })
  const counts = useQuery(api.inquiries.counts)

  const totals = useMemo(() => {
    const days = report?.days ?? []
    const sum = (fn: (d: (typeof days)[number]) => number) => days.reduce((a, d) => a + fn(d), 0)
    return {
      views: sum((d) => d.views),
      visitors: sum((d) => d.visitors),
      sources: Object.fromEntries(SOURCES.map((s) => [s.key, sum((d) => d.sources[s.key])])),
      conversions: Object.fromEntries(
        CONVERSIONS.map((c) => [c.key, sum((d) => d.conversions[c.key])]),
      ),
    }
  }, [report])

  const series = useMemo(() => {
    const byDay = new Map((report?.days ?? []).map((d) => [d.day, d]))
    const days = Array.from({ length: Number(range) }, (_, i) => addDays(from, i))
    return days.map((day) => ({
      day,
      views: byDay.get(day)?.views ?? 0,
      visitors: byDay.get(day)?.visitors ?? 0,
    }))
  }, [report, range, from])

  const max = Math.max(1, ...series.map((d) => d.views))
  const sourceTotal = Math.max(
    1,
    SOURCES.reduce((a, s) => a + (totals.sources[s.key] ?? 0), 0),
  )

  return (
    <>
      <PageHeader
        title="Overview"
        description="Traffic and conversions from the website. Counts are first-party and anonymous; visitors are unique per day."
      />

      {counts && counts.catering + counts.contact + counts.privateEvent > 0 && (
        <Link
          to="/admin/inquiries"
          className="mb-6 flex items-center justify-between rounded-xl border border-sienna/20 bg-sienna/5 px-5 py-4 text-sm hover:bg-sienna/10"
        >
          <span>
            <strong className="font-semibold">New inquiries:</strong> {counts.catering} catering,{" "}
            {counts.privateEvent} private events, {counts.contact} messages
          </span>
          <i className="ph ph-arrow-right" />
        </Link>
      )}

      <Tabs
        items={RANGES.map((r) => ({ value: r.value, label: r.label }))}
        value={range}
        onChange={setRange}
      />

      {report === undefined ? (
        <Loading />
      ) : (
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-3">
            <Stat label="Page views" value={totals.views} />
            <Stat label="Visitors" value={totals.visitors} />
            <Stat
              label="Conversions"
              value={CONVERSIONS.reduce((a, c) => a + (totals.conversions[c.key] ?? 0), 0)}
            />
          </div>

          <Card className="p-5">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-sm font-semibold">Page views per day</h2>
              <span className="text-xs text-ink-soft">
                {formatDay(from, { month: "short", day: "numeric" })} to{" "}
                {formatDay(to, { month: "short", day: "numeric" })}
              </span>
            </div>
            <div
              className="flex h-44 items-end gap-px"
              role="img"
              aria-label="Page views per day chart"
            >
              {series.map((d) => (
                <div key={d.day} className="group relative flex h-full flex-1 items-end">
                  <div
                    className="w-full rounded-t-sm bg-sienna/70 transition-colors group-hover:bg-sienna"
                    style={{ height: `${Math.max(d.views ? 3 : 0, (d.views / max) * 100)}%` }}
                  />
                  <div className="pointer-events-none absolute bottom-full left-1/2 z-10 mb-1 hidden -translate-x-1/2 rounded bg-ink px-2 py-1 text-[0.65rem] whitespace-nowrap text-white group-hover:block">
                    {formatDay(d.day, { month: "short", day: "numeric" })}: {d.views} views,{" "}
                    {d.visitors} visitors
                  </div>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid gap-6 lg:grid-cols-2">
            <Card className="p-5">
              <h2 className="mb-4 text-sm font-semibold">Traffic sources</h2>
              <div className="mb-4 flex h-3 overflow-hidden rounded-full bg-ink/5">
                {SOURCES.map((s) => (
                  <div
                    key={s.key}
                    className={s.color}
                    style={{ width: `${((totals.sources[s.key] ?? 0) / sourceTotal) * 100}%` }}
                  />
                ))}
              </div>
              <ul className="space-y-2 text-sm">
                {SOURCES.map((s) => (
                  <li key={s.key} className="flex items-center justify-between">
                    <span className="flex items-center gap-2">
                      <span className={`h-2.5 w-2.5 rounded-full ${s.color}`} />
                      {s.label}
                    </span>
                    <span className="text-ink-soft tabular-nums">
                      {totals.sources[s.key] ?? 0} •{" "}
                      {Math.round(((totals.sources[s.key] ?? 0) / sourceTotal) * 100)}%
                    </span>
                  </li>
                ))}
              </ul>
            </Card>

            <Card className="p-5">
              <h2 className="mb-4 text-sm font-semibold">Conversions</h2>
              <ul className="divide-y divide-ink/5 text-sm">
                {CONVERSIONS.map((c) => (
                  <li key={c.key} className="flex justify-between py-2">
                    <span>{c.label}</span>
                    <span className="font-medium tabular-nums">
                      {totals.conversions[c.key] ?? 0}
                    </span>
                  </li>
                ))}
              </ul>
            </Card>
          </div>

          <Card className="p-5">
            <h2 className="mb-4 text-sm font-semibold">Top pages</h2>
            {report.topPaths.length === 0 ? (
              <p className="text-sm text-ink-soft">No visits recorded in this range yet.</p>
            ) : (
              <ul className="space-y-2 text-sm">
                {report.topPaths.map((p) => (
                  <li key={p.path} className="flex items-center gap-3">
                    <span className="w-48 truncate font-mono text-xs">{p.path}</span>
                    <div className="h-2 flex-1 overflow-hidden rounded-full bg-ink/5">
                      <div
                        className="h-full bg-sienna/60"
                        style={{ width: `${(p.views / report.topPaths[0].views) * 100}%` }}
                      />
                    </div>
                    <span className="w-12 text-right text-ink-soft tabular-nums">{p.views}</span>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </div>
      )}
    </>
  )
}

function Stat({ label, value }: { label: string; value: number }) {
  return (
    <Card className="p-5">
      <div className="text-xs font-medium text-ink-soft">{label}</div>
      <div className="mt-1 text-3xl font-semibold tabular-nums">{value.toLocaleString()}</div>
    </Card>
  )
}
