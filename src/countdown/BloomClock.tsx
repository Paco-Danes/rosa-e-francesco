// Il bloom clock: un fiore SVG a 12 petali che sboccia col passare dei
// giorni. `bloom` ∈ [0,1] → frazione di petali aperti; ogni petalo si apre
// con un unfold dolce (rotazione + scala dal bocciolo), con entrata
// scaglionata al mount. Il cuore del fiore pulsa piano.
import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'

interface BloomClockProps {
  bloom: number
  celebrate: boolean
}

const PETAL_D = 'M 0 -8 C 9 -16 10.5 -34 0 -47.5 C -10.5 -34 -9 -16 0 -8 Z'
const PETAL_VEIN = 'M 0 -12 C 1.5 -22 1.5 -32 0 -42'

export default function BloomClock({ bloom, celebrate }: BloomClockProps) {
  // parte tutto chiuso, poi si apre fino allo stato reale: piccolo respiro
  // d'ingresso che lei vede a ogni visita.
  const [grown, setGrown] = useState(false)
  useEffect(() => {
    const id = window.setTimeout(() => setGrown(true), 80)
    return () => window.clearTimeout(id)
  }, [])

  const open = celebrate ? 12 : bloom * 12

  return (
    <div className="bloom" role="img" aria-label="Il fiore del conto alla rovescia, sboccia giorno per giorno">
      <svg className="bloom__svg" viewBox="-60 -60 120 120" aria-hidden="true">
        <defs>
          <linearGradient id="bloom-oro" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#f2b13c" />
            <stop offset="1" stopColor="#ffd98f" />
          </linearGradient>
          <linearGradient id="bloom-rosa" x1="0" y1="1" x2="0" y2="0">
            <stop offset="0" stopColor="#e86a92" />
            <stop offset="1" stopColor="#ff9eb8" />
          </linearGradient>
          <radialGradient id="bloom-core" cx="0.5" cy="0.4" r="0.75">
            <stop offset="0" stopColor="#fff2cf" />
            <stop offset="0.55" stopColor="#ffd98f" />
            <stop offset="1" stopColor="#f2b13c" />
          </radialGradient>
        </defs>

        {/* quadrante: cerchio guida tratteggiato, come un orologio di stelle */}
        <circle className="bloom__ring" cx="0" cy="0" r="52" />
        {Array.from({ length: 12 }, (_, i) => (
          <circle
            key={i}
            className="bloom__tick"
            cx={52 * Math.sin((i * Math.PI) / 6)}
            cy={-52 * Math.cos((i * Math.PI) / 6)}
            r="0.9"
          />
        ))}

        {/* i 12 petali */}
        {Array.from({ length: 12 }, (_, i) => {
          const o = grown ? Math.min(1, Math.max(0, open - i)) : 0
          const rosa = i % 2 === 1
          return (
            <g key={i} transform={`rotate(${i * 30})`}>
              <path
                className={`bloom__petal ${rosa ? 'bloom__petal--rosa' : 'bloom__petal--oro'}`}
                style={{ '--open': String(o), transitionDelay: `${i * 110}ms` } as CSSProperties}
                d={PETAL_D}
              />
              <path
                className="bloom__vein"
                style={{ '--open': String(o), transitionDelay: `${i * 110}ms` } as CSSProperties}
                d={PETAL_VEIN}
              />
            </g>
          )
        })}

        {/* il cuore del fiore */}
        <g className="bloom__coreWrap">
          <circle className="bloom__coreGlow" cx="0" cy="0" r="12.5" />
          <circle className="bloom__core" cx="0" cy="0" r="7" fill="url(#bloom-core)" />
          <circle className="bloom__coreDot" cx="-2" cy="-2.4" r="1.7" />
        </g>
      </svg>
    </div>
  )
}
