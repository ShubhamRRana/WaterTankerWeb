import { useEffect, useState } from 'react'

type AnimatedHeadingProps = {
  text: string
  className?: string
  initialDelay?: number
  charDelay?: number
  transitionMs?: number
}

export default function AnimatedHeading({
  text,
  className = '',
  initialDelay = 200,
  charDelay = 30,
  transitionMs = 500,
}: AnimatedHeadingProps) {
  const [animate, setAnimate] = useState(false)
  const lines = text.split('\n')

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), initialDelay)
    return () => clearTimeout(timer)
  }, [initialDelay])

  return (
    <h1 className={className} style={{ letterSpacing: '-0.04em' }}>
      {lines.map((line, lineIndex) => {
        const lineOffset = lines
          .slice(0, lineIndex)
          .reduce((sum, l) => sum + l.length, 0)

        return (
          <span key={lineIndex} className="block whitespace-nowrap">
            {line.split('').map((char, charIndex) => {
              const delay = lineOffset * charDelay + charIndex * charDelay

              return (
                <span
                  key={charIndex}
                  className="inline-block transition-all"
                  style={{
                    opacity: animate ? 1 : 0,
                    transform: animate ? 'translateX(0)' : 'translateX(-18px)',
                    transitionDuration: `${transitionMs}ms`,
                    transitionDelay: `${delay}ms`,
                  }}
                >
                  {char === ' ' ? '\u00A0' : char}
                </span>
              )
            })}
          </span>
        )
      })}
    </h1>
  )
}