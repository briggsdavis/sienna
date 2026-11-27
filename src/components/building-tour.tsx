import { useEffect, useRef, useState, type ReactNode } from "react"
import { Link } from "react-router"
import { EText } from "@/components/editable"
import { HOME_FLOORS } from "@/content/home"

/*
 * Home page, alternate version of the "Three floors" intro: a line drawing of
 * the building pins to the screen, and each floor washes red from the bottom up
 * as you scroll, with that restaurant's details beside it.
 */

// Drawing coordinates (the traced line art is 1230 x 1110).
const VIEW_W = 1230
const VIEW_H = 1110

/**
 * Floor outlines, bottom to top, in the order the tour visits them. Traced from the
 * line art by scripts/trace-building-floors.py, so each red fill meets the outline
 * exactly and the strokes drawn on top hide the edge. Rerun it if the drawing changes.
 */
const FLOOR_SHAPES = [
  {
    id: "emporio",
    emblem: { x: 495, y: 740, size: 240 },
    top: 695,
    bottom: 1027.5,
    d: "M1106 698.5 L1104.5 698 L1059 698 L1057.5 697.5 L1056.5 696 L1051.5 695 L921 695 L920.5 695.5 L894 695.5 L893.5 696 L873 696 L872.5 696.5 L650.5 696.5 L650 697 L643 697 L639.5 698.5 L639 698 L590.5 698 L588.5 699 L584.5 697.5 L569.5 697.5 L569 698 L359 698 L358.5 698.5 L338 698.5 L337.5 699 L320 699 L319.5 699.5 L261.5 699.5 L261 699 L239 699 L238.5 698.5 L183.5 698.5 L183 699 L168 699 L167.5 699.5 L164 698 L116.5 698 L115 698.5 L114.5 699.5 L114 751.5 L113.5 752 L113.5 761.5 L113 762 L113 788 L112.5 788.5 L112 817 L111.5 817.5 L111 874 L110.5 874.5 L110.5 885.5 L110 886 L110 905.5 L109.5 906 L109.5 926.5 L109 927 L109 941 L108.5 941.5 L108 970.5 L107 972 L106 972 L104.5 976 L104 1017.5 L106 1020.5 L110.5 1020.5 L111 1021 L153.5 1021 L156.5 1020 L157.5 1018.5 L159.5 1018 L165 1014.5 L168.5 1014.5 L169 1014 L253.5 1013 L254 1013.5 L263 1013.5 L264.5 1014 L266.5 1016 L267 1020 L268.5 1020.5 L300.5 1020.5 L301 1021 L308 1021 L309.5 1019.5 L309.5 1015.5 L312.5 1013.5 L313 1014 L320 1014 L320.5 1014.5 L428.5 1013.5 L431.5 1015.5 L431 1019 L433 1021 L443 1021 L443.5 1020.5 L471 1021 L472.5 1020.5 L473.5 1019 L473 1015.5 L476 1013.5 L483 1013.5 L483.5 1014 L546.5 1013.5 L547 1013 L591 1013 L591.5 1013.5 L593.5 1012.5 L595 1012.5 L597.5 1013.5 L598 1014.5 L600.5 1016 L600 1018.5 L600.5 1020.5 L604.5 1021 L605 1020.5 L613.5 1020.5 L614 1020 L636 1020 L638 1020.5 L639.5 1020 L640 1019 L640 1016 L642.5 1014.5 L643 1013.5 L645 1013 L646 1011 L648 1010 L648.5 1010.5 L684 1010 L684.5 1010.5 L730 1010.5 L730.5 1011 L736.5 1011 L739 1009.5 L741 1010.5 L743.5 1014 L748 1017.5 L750.5 1018 L763.5 1018 L765 1018.5 L766 1020 L766 1025.5 L766.5 1026.5 L769 1027.5 L771 1027.5 L771.5 1026.5 L774.5 1025.5 L789.5 1014.5 L789.5 1006.5 L792.5 1004.5 L794.5 1005.5 L807.5 1005.5 L808 1006 L834.5 1006 L835 1005.5 L863.5 1005.5 L864 1005 L866.5 1005 L869 1003.5 L872 1005.5 L872 1016.5 L873 1020 L940.5 1019 L944.5 1018 L944.5 1010.5 L946 1008.5 L947.5 1008 L950 1008 L950.5 1008.5 L1022 1008.5 L1022.5 1008 L1025 1008 L1025.5 1008.5 L1033.5 1008.5 L1034 1009 L1047 1009 L1047.5 1009.5 L1049.5 1009 L1063.5 1016 L1066.5 1017 L1068.5 1016.5 L1072.5 1019 L1082 1019.5 L1082.5 1019 L1099.5 1019 L1100 1018.5 L1120 1018.5 L1124 1017 L1125 1014.5 L1124.5 993.5 L1124 993 L1123 973.5 L1122 970.5 L1119 968 L1118 935.5 L1117.5 935 L1117.5 920.5 L1117 920 L1116.5 900.5 L1116 900 L1116 883.5 L1115.5 883 L1114.5 861.5 L1114 861 L1114 849 L1113.5 848.5 L1113.5 840 L1113 839.5 L1113 831.5 L1112.5 831 L1112.5 817 L1112 816.5 L1112 810 L1111.5 809.5 L1111 796 L1110.5 795.5 L1109 747.5 L1108.5 747 L1108.5 740 L1108 739.5 L1108 733.5 L1107.5 733 L1107 702Z",
  },
  {
    id: "mezzo",
    emblem: { x: 500, y: 462, size: 220 },
    top: 439,
    bottom: 701.5,
    d: "M1105 441 L1104 439.5 L1101.5 439.5 L1101 439 L1049 439.5 L1048.5 440 L1041 440 L1037.5 441.5 L1036.5 441 L1024.5 441 L1024 440.5 L876 440.5 L875.5 441 L846 441 L845.5 441.5 L784.5 441.5 L784 442 L778.5 442.5 L777.5 444 L776 444.5 L768.5 444.5 L764.5 442 L755.5 442 L755 441.5 L688 441.5 L687.5 442 L646.5 442 L646 442.5 L643.5 442.5 L640 441 L632.5 441 L632 440.5 L595.5 440.5 L595 441 L582.5 441.5 L579 443 L577 442 L560 442 L559.5 441.5 L522.5 441.5 L522 442 L466 442.5 L465.5 443 L454 443 L452 444 L451 443.5 L435.5 443.5 L435 443 L269.5 443 L269 443.5 L243.5 444 L243 444.5 L184 444.5 L182.5 445 L179 443.5 L176 443.5 L175.5 443 L162.5 443 L162 442.5 L150 442.5 L149.5 442 L145.5 442 L145 442.5 L122.5 442.5 L118.5 443.5 L117.5 445.5 L117.5 447.5 L119 450 L120 450.5 L123.5 456.5 L124 492 L123.5 492.5 L123 518.5 L122.5 519 L122.5 530 L122 530.5 L120.5 582.5 L120 583 L120 590.5 L119.5 591 L119.5 596 L119 596.5 L118.5 615.5 L118 616 L117.5 626.5 L117 627 L116 651 L115.5 651.5 L115.5 660.5 L115 661 L115 669 L114.5 669.5 L114.5 700 L115 701 L116.5 701.5 L164 701.5 L167.5 699.5 L168 700 L171 700 L171.5 699.5 L321 699.5 L321.5 699 L346 699 L346.5 698.5 L582 698.5 L582.5 698 L586 698 L587.5 698.5 L589 701 L590.5 701.5 L639 701.5 L640.5 701 L641.5 698.5 L643.5 697.5 L676 697 L676.5 696.5 L695 696.5 L695.5 697 L845 697 L845.5 696.5 L872.5 696.5 L873 696 L917 696 L917.5 695.5 L938.5 695.5 L939 695 L1010.5 695 L1011 695.5 L1054.5 695.5 L1055 695 L1057 696 L1057.5 700 L1058 701 L1059.5 701.5 L1104.5 701.5 L1106 701 L1106.5 700 L1106.5 688 L1106 687.5 L1106 677 L1105.5 676.5 L1105.5 667.5 L1105 667 L1104.5 641 L1104 640.5 L1104 634.5 L1103.5 634 L1103 619.5 L1102.5 619 L1102.5 608.5 L1102 608 L1101.5 583 L1101 582.5 L1101 551 L1100.5 550.5 L1100 526 L1099.5 525.5 L1099.5 516 L1099 515.5 L1099 509 L1098.5 508.5 L1098 486.5 L1097.5 486 L1097 475.5 L1098.5 473.5 L1098 452.5 L1104 445 L1105 443Z",
  },
  {
    id: "tetto",
    emblem: { x: 530, y: 88, size: 170 },
    top: 64,
    bottom: 304.5,
    d: "M119.5 292.5 L119.5 294 L122 296 L123.5 302.5 L126 304 L129 304 L129.5 304.5 L157.5 304.5 L158 304 L179.5 304 L180 303.5 L196 303.5 L196.5 303 L232.5 303 L233 302.5 L449 302 L449.5 301.5 L478 301.5 L478.5 301 L530 301 L530.5 300.5 L539.5 300.5 L540 300 L564 300 L564.5 299.5 L992 299.5 L992.5 300 L1098 300 L1100.5 298.5 L1101 294.5 L1103.5 291 L1103.5 281 L1102.5 277.5 L1098 276.5 L1039 276.5 L1037.5 276 L1036.5 274.5 L1036 261.5 L1035.5 261 L1035 239.5 L1034.5 239 L1034.5 232 L1034 231.5 L1034 226.5 L1033.5 226 L1033.5 215.5 L1033 215 L1033 211.5 L1032 209 L1030.5 208.5 L1029 209 L1026.5 209 L1026 208.5 L1019 208.5 L1018.5 209 L1016 209 L1015.5 208.5 L1007.5 208.5 L1007 209 L1004.5 208.5 L996.5 208.5 L996 209 L985 208.5 L984 209 L982 208 L976 208 L973 209 L971 208 L966.5 207.5 L965.5 206 L965.5 188.5 L966.5 187 L968.5 186.5 L970 184 L970 180 L969.5 178 L968.5 177 L964.5 176 L956.5 176 L956 175.5 L916 175 L915.5 174.5 L908.5 174 L907 171.5 L905 165 L901.5 158.5 L897.5 152.5 L891.5 146.5 L885 142 L867.5 132.5 L862.5 131 L851.5 125.5 L847.5 124.5 L832.5 117.5 L827.5 116 L825.5 114.5 L820.5 113.5 L811.5 109.5 L795.5 104 L794 103 L784 100 L781.5 98.5 L776.5 97.5 L744.5 86.5 L739.5 85.5 L719 79 L714 78.5 L712 77.5 L705 76.5 L700.5 75 L695 74.5 L688 72.5 L684.5 72.5 L679.5 71 L676 71 L660.5 68 L649.5 67 L642.5 65.5 L628 65 L627.5 64.5 L620.5 64.5 L620 64 L607 64 L604 65 L598 65 L597.5 65.5 L587.5 66 L587 66.5 L561 69 L558 70 L547.5 71 L533.5 74 L531 74 L515 77 L505 80 L494.5 82 L476 88 L472.5 88.5 L464 91.5 L459 92.5 L427 103 L423.5 105 L419.5 106 L418 107 L410.5 109 L407 111 L394 115.5 L384.5 120 L377 122.5 L348 137 L338.5 143 L333.5 147 L325.5 156 L320 166.5 L318.5 171.5 L318.5 173.5 L317.5 175.5 L315.5 176.5 L236.5 175.5 L229.5 177 L228.5 180 L228.5 184.5 L230 186.5 L232 191.5 L239.5 203 L241 206 L241.5 209.5 L240.5 211 L239 211.5 L237 211 L196.5 211.5 L195 212.5 L194.5 218.5 L194 219 L193.5 277.5 L192.5 279 L190.5 280 L124.5 281 L122 281.5 L120 284.5 L120 292Z",
  },
] as const

const BLURBS: Record<string, string> = {
  emporio:
    "The ground-floor meatball joint. Easygoing and a little loud, in the best way: build a bowl or a hoagie, grab a draft and settle in.",
  mezzo:
    "Upstairs, the pace slows down. Hand-rolled pasta, wood-fired pizza and an Italian wine list, served by candlelight.",
  tetto: "The rooftop bar. Open air, cold drafts, pizza by the pie and the city all around you.",
}

// Scroll timeline, as fractions of the pinned scroll. Each floor washes in over
// FILL, then the previous floor fades back over FADE as the next one starts.
const STARTS = [0.12, 0.38, 0.64]
const FILL = 0.2
const FADE = 0.1
/** Scroll distance while pinned, in svh, on top of one screen. */
const TRAVEL_SVH = 330

const clamp = (n: number) => Math.min(1, Math.max(0, n))
const ease = (t: number) => t * t * (3 - 2 * t)

export function BuildingTour() {
  const sectionRef = useRef<HTMLElement>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const washRefs = useRef<(SVGPathElement | null)[]>([])
  const fillRefs = useRef<(SVGGElement | null)[]>([])
  const emblemRefs = useRef<(SVGGElement | null)[]>([])
  const [stage, setStage] = useState(0)
  const [pinned, setPinned] = useState(true)

  useEffect(() => {
    const section = sectionRef.current
    const panel = panelRef.current
    if (!section || !panel) return
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)")
    let target = 0
    let current = 0
    let frame = 0
    let isPinned = true

    const paint = (p: number) => {
      FLOOR_SHAPES.forEach((floor, i) => {
        const fill = ease(clamp((p - STARTS[i]) / FILL))
        const next = STARTS[i + 1]
        const fade = next === undefined ? 0 : ease(clamp((p - next) / FADE))
        const height = floor.bottom - floor.top + 24
        // The wave-topped wash rises from below the floor to above it.
        washRefs.current[i]?.setAttribute(
          "transform",
          `translate(0 ${floor.bottom + 12 - fill * height})`,
        )
        const shown = String(fill > 0 ? 1 - fade : 0)
        fillRefs.current[i]?.setAttribute("opacity", shown)
        emblemRefs.current[i]?.setAttribute("opacity", shown)
      })
      const active = STARTS.reduce((acc, start, i) => (p >= start ? i + 1 : acc), 0)
      setStage(active)
    }

    const tick = () => {
      // Ease towards the scroll position so the wash glides rather than steps.
      current += (target - current) * 0.14
      if (Math.abs(target - current) < 0.0005) current = target
      paint(current)
      frame = current === target ? 0 : requestAnimationFrame(tick)
    }

    const read = () => {
      if (!isPinned) return
      const rect = section.getBoundingClientRect()
      const travel = section.offsetHeight - window.innerHeight
      target = travel > 0 ? clamp(-rect.top / travel) : 0
      if (!frame) frame = requestAnimationFrame(tick)
    }

    const measure = () => {
      const content =
        ((panel.firstElementChild as HTMLElement | null)?.offsetHeight ?? 0) +
        parseFloat(getComputedStyle(panel).paddingTop) +
        parseFloat(getComputedStyle(panel).paddingBottom)
      isPinned = !motion.matches && content <= window.innerHeight
      setPinned(isPinned)
      if (isPinned) read()
    }

    measure()
    const observer = new ResizeObserver(measure)
    if (panel.firstElementChild) observer.observe(panel.firstElementChild)
    window.addEventListener("scroll", read, { passive: true })
    window.addEventListener("resize", measure)
    motion.addEventListener("change", measure)
    return () => {
      observer.disconnect()
      window.removeEventListener("scroll", read)
      window.removeEventListener("resize", measure)
      motion.removeEventListener("change", measure)
      if (frame) cancelAnimationFrame(frame)
    }
  }, [])

  return (
    <section
      ref={sectionRef}
      aria-label="The building, floor by floor"
      className="relative bg-paper text-ink"
      style={pinned ? { height: `${100 + TRAVEL_SVH}svh` } : undefined}
    >
      <div
        ref={panelRef}
        className={`flex items-center overflow-hidden py-5 md:py-12 ${pinned ? "sticky top-0 min-h-svh" : ""}`}
      >
        <div className="site-container grid items-center gap-4 md:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] md:gap-14 lg:gap-24">
          <figure className="mx-auto w-full max-w-[min(100%,calc(34svh*1230/1110))] md:max-w-[min(100%,calc(74svh*1230/1110))]">
            <div className="relative" style={{ aspectRatio: `${VIEW_W} / ${VIEW_H}` }}>
              <svg
                viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                aria-hidden="true"
                className="absolute inset-0 h-full w-full"
              >
                <defs>
                  {FLOOR_SHAPES.map((floor, i) => (
                    <clipPath key={floor.id} id={`building-wash-${floor.id}`}>
                      {/* A softly wavy leading edge, like paint soaking upward. */}
                      <path
                        ref={(el) => {
                          washRefs.current[i] = el
                        }}
                        transform={`translate(0 ${floor.bottom + 12})`}
                        d={`M0 6 C 150 -6 300 14 460 4 S 760 -8 920 6 S 1140 14 ${VIEW_W} 2 L${VIEW_W} ${VIEW_H} L0 ${VIEW_H} Z`}
                      />
                    </clipPath>
                  ))}
                </defs>
                {FLOOR_SHAPES.map((floor, i) => (
                  <g
                    key={floor.id}
                    ref={(el) => {
                      fillRefs.current[i] = el
                    }}
                    opacity={0}
                    clipPath={`url(#building-wash-${floor.id})`}
                  >
                    <path d={floor.d} fill="var(--color-sienna)" />
                  </g>
                ))}
              </svg>
              <img
                src="/images/home/sienna-mercato-building.svg"
                alt="Line drawing of the Sienna Mercato building on Penn Avenue: Emporio on the ground floor, Mezzo on the second floor and Il Tetto on the roof"
                className="absolute inset-0 h-full w-full"
                draggable={false}
              />
              {/* Each restaurant's emblem rises with its floor's wash, in white at 60%. */}
              <svg
                viewBox={`0 0 ${VIEW_W} ${VIEW_H}`}
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 h-full w-full"
              >
                <defs>
                  <filter id="building-emblem-white">
                    <feColorMatrix values="0 0 0 0 1  0 0 0 0 1  0 0 0 0 1  0 0 0 1 0" />
                  </filter>
                </defs>
                {FLOOR_SHAPES.map((floor, i) => (
                  <g
                    key={floor.id}
                    ref={(el) => {
                      emblemRefs.current[i] = el
                    }}
                    opacity={0}
                    clipPath={`url(#building-wash-${floor.id})`}
                  >
                    <image
                      href={HOME_FLOORS[i].logo}
                      x={floor.emblem.x}
                      y={floor.emblem.y}
                      width={floor.emblem.size}
                      height={floor.emblem.size}
                      preserveAspectRatio="xMidYMid meet"
                      filter="url(#building-emblem-white)"
                      opacity={0.6}
                    />
                  </g>
                ))}
              </svg>
            </div>
            <img
              src="/images/brand/sienna-mercato-logo.png"
              alt="Sienna Mercato"
              className="mx-auto mt-2 h-7 w-auto opacity-80 brightness-0 md:mt-8 md:h-12"
            />
          </figure>

          <div className="grid">
            <TourPanel active={!pinned || stage === 0} stacked={!pinned}>
              <p className="font-display text-[clamp(1.9rem,calc(4.2vw*var(--site-type-scale)),3.75rem)] leading-[1.05] text-ink">
                <EText k="building.intro.line1" d="Three floors." />{" "}
                <span className="text-sienna">
                  <EText k="building.intro.line2" d="Three rooms." />
                </span>{" "}
                <EText k="building.intro.line3" d="One Italian house on Penn Avenue." />
              </p>
              <p className="mt-5 max-w-xl font-body text-base leading-relaxed text-ink-soft md:mt-8 md:text-lg">
                <EText
                  k="building.intro.body"
                  d="A Cultural District landmark since 2013. One address at 942 Penn Avenue: 230 indoor seats, 120 on the rooftop, an Italian-led wine list of 90+ bottles, and 30 rotating drafts."
                />
              </p>
            </TourPanel>

            {HOME_FLOORS.map((floor, i) => (
              <TourPanel key={floor.id} active={!pinned || stage === i + 1} stacked={!pinned}>
                <div className="flex items-center gap-3 md:block">
                  <img
                    src={floor.logo}
                    alt=""
                    className="h-10 w-auto object-contain object-left opacity-70 brightness-0 md:h-16"
                  />
                  <h2 className="font-display text-[clamp(2.2rem,calc(5.5vw*var(--site-type-scale)),5rem)] leading-[0.9] text-ink md:mt-5">
                    {floor.name}
                  </h2>
                </div>
                <p className="mt-3 max-w-lg font-body text-sm leading-relaxed text-ink-soft md:mt-5 md:text-lg">
                  <EText k={`building.${floor.id}.blurb`} d={BLURBS[floor.id]} />
                </p>
                <ul className="mt-4 max-w-lg divide-y divide-ink/10 border-y border-ink/10 md:mt-6">
                  {floor.items.map((item, j) => (
                    <li key={item.name} className="flex items-baseline gap-3 py-1.5 md:py-3">
                      <span className="font-serif text-sm text-ink md:text-base">
                        <EText k={`floor.${floor.id}.item${j}.name`} d={item.name} />
                      </span>
                      <span className="hidden truncate font-body text-sm text-ink-soft lg:inline">
                        <EText k={`floor.${floor.id}.item${j}.note`} d={item.note} />
                      </span>
                      <span className="ml-auto font-serif text-sm text-sienna tabular-nums md:text-base">
                        <EText
                          k={`floor.${floor.id}.item${j}.price`}
                          d={item.price ? `$${item.price}` : ""}
                        />
                      </span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 flex flex-wrap gap-2 max-md:[--button-letter-spacing:0.1em] max-md:[--button-text-size:0.68rem] md:mt-7 md:gap-3">
                  <Link
                    to={floor.href}
                    className="btn-lift border border-ink text-ink hover:bg-ink hover:text-cream"
                  >
                    Discover the restaurant
                  </Link>
                  <Link
                    to={floor.menuHref}
                    className="btn-lift bg-sienna text-cream hover:bg-sienna-deep"
                  >
                    View the menu
                  </Link>
                </div>
              </TourPanel>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/** One state of the right-hand column; panels share a grid cell and cross-fade. */
function TourPanel({
  active,
  stacked,
  children,
}: {
  active: boolean
  /** Unpinned fallback: panels sit one under another instead of cross-fading. */
  stacked: boolean
  children: ReactNode
}) {
  return (
    <div
      aria-hidden={!active}
      inert={!active}
      className={stacked ? "py-8" : "tour-panel col-start-1 row-start-1 self-center"}
      data-active={active || undefined}
    >
      {children}
    </div>
  )
}
