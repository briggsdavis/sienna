import { Fragment, useEffect, useRef, type CSSProperties } from "react"

const WORD_STEP = 0.045

/**
 * Reveals text one word at a time when it scrolls into view.
 * Words stay readable by screen readers as normal text.
 */
export function WordReveal({
  text,
  delay = 0,
  step = WORD_STEP,
  className = "",
}: {
  text: string
  delay?: number
  step?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    if (!("IntersectionObserver" in window)) {
      el.dataset.wordsVisible = ""
      return
    }
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) el.dataset.wordsVisible = ""
        else if (entry.boundingClientRect.top > 0) delete el.dataset.wordsVisible
      },
      { threshold: 0.05, rootMargin: "0px 0px -60px 0px" },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  let index = 0
  const lines = text.split("\n")

  return (
    <span ref={ref} className={`word-reveal ${className}`}>
      {lines.map((line, lineIndex) => (
        <Fragment key={lineIndex}>
          {lineIndex > 0 && <br />}
          {line
            .split(/(\s+)/)
            .filter(Boolean)
            .map((part, partIndex) => {
              if (/^\s+$/.test(part)) return " "
              const style = { "--word-delay": `${delay + index++ * step}s` } as CSSProperties
              return (
                <span key={partIndex} className="word" style={style}>
                  {part}
                </span>
              )
            })}
        </Fragment>
      ))}
    </span>
  )
}
