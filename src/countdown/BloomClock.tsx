// Il bloom clock — «il quadrante che fiorisce».
// I 12 petali sono SEMPRE visibili come silhouette dorate a grandezza piena,
// disposti come le ore di un orologio; l'attesa (13 ago → 15 set) li riempie
// di luce in senso orario, e il petalo in corso si colma dal basso come un
// liquido. Sul bordo, 33 tacche = i 33 giorni: le passate accese, su quella
// di oggi brilla una stellina. Al centro, il cuore del fiore batte lub-dub.
import { useEffect, useState } from 'react'
import type { CSSProperties } from 'react'

interface BloomClockProps {
  bloom: number
  celebrate: boolean
  dayNow: number
  dayTotal: number
}

const PETAL_D = 'M 0 -8 C 9 -16 10.5 -34 0 -47.5 C -10.5 -34 -9 -16 0 -8 Z'
const PETAL_VEIN = 'M 0 -12 C 1.5 -22 1.5 -32 0 -42'
const HEART_D =
  'M 0 6.5 C -6.5 1.5 -9 -2 -9 -5 C -9 -8.2 -6.6 -10 -4.4 -10 C -2.6 -10 -1 -9 0 -7.2 C 1 -9 2.6 -10 4.4 -10 C 6.6 -10 9 -8.2 9 -5 C 9 -2 6.5 1.5 0 6.5 Z'

const STAR_D = 'M 0 -3 L 0.9 -0.9 L 3 0 L 0.9 0.9 L 0 3 L -0.9 0.9 L -3 0 L -0.9 -0.9 Z'

export default function BloomClock({ bloom, celebrate, dayNow, dayTotal }: BloomClockProps) {
  // parte tutto chiuso, poi si apre fino allo stato reale: piccolo respiro
  // d'ingresso che lei vede a ogni visita.
  const [grown, setGrown] = useState(false)
  const [card, setCard] = useState(false)
  useEffect(() => {
    const id = window.setTimeout(() => setGrown(true), 80)
    return () => window.clearTimeout(id)
  }, [])

  const open = celebrate ? 12 : bloom * 12
  // il petalo in corso conta come "aperto": è quello che si vede brillare
  const petalsOpen = Math.min(12, Math.ceil(open))
  const litTicks = celebrate ? dayTotal : Math.min(dayTotal, dayNow - 1)
  const todayIdx = Math.min(dayTotal - 1, dayNow - 1)
  const todayAngle = ((todayIdx + 0.5) / dayTotal) * 2 * Math.PI - Math.PI / 2

  return (
    <div className="bloom">
      <button
        type="button"
        className="bloom__hit"
        aria-expanded={card}
        aria-label={`Il fiore-orologio: ${petalsOpen} petali su 12 aperti, giorno ${dayNow} di ${dayTotal} d'attesa. Tocca per i dettagli.`}
        onClick={() => setCard((c) => !c)}
        onMouseEnter={() => setCard(true)}
        onMouseLeave={() => setCard(false)}
      >
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
            <radialGradient id="bloom-heartglow" cx="0.5" cy="0.5" r="0.5">
              <stop offset="0" stopColor="rgba(255, 158, 184, 0.5)" />
              <stop offset="1" stopColor="rgba(255, 158, 184, 0)" />
            </radialGradient>
            {/* clip condiviso: il riempimento "liquido" resta dentro il petalo */}
            <clipPath id="bloom-petalclip" clipPathUnits="userSpaceOnUse">
              <path d={PETAL_D} />
            </clipPath>
          </defs>

          {/* quadrante fisso */}
          <circle className="bloom__ring" cx="0" cy="0" r="52" />

          {/* 33 tacche = 33 giorni d'attesa */}
          {Array.from({ length: dayTotal }, (_, i) => {
            const a = ((i + 0.5) / dayTotal) * 2 * Math.PI - Math.PI / 2
            const cos = Math.cos(a)
            const sin = Math.sin(a)
            return (
              <line
                key={i}
                className={'bloom__day' + (i < litTicks ? ' bloom__day--lit' : '')}
                x1={50.2 * cos}
                y1={50.2 * sin}
                x2={53.4 * cos}
                y2={53.4 * sin}
              />
            )
          })}

          {/* la stellina di oggi, la "lancetta" dell'attesa */}
          {!celebrate && (
            <g
              className="bloom__today"
              transform={`translate(${51.8 * Math.cos(todayAngle)} ${51.8 * Math.sin(todayAngle)})`}
            >
              <path className="bloom__todayStar" d={STAR_D} />
            </g>
          )}

          {/* i 12 petali: silhouette sempre visibili, luce che li riempie */}
          {Array.from({ length: 12 }, (_, i) => {
            const o = grown ? Math.min(1, Math.max(0, open - i)) : 0
            const rosa = i % 2 === 1
            return (
              <g
                key={i}
                className={'bloom__petalG' + (grown ? ' bloom__petalG--in' : '')}
                style={{ transitionDelay: `${i * 90}ms` } as CSSProperties}
                transform={`rotate(${i * 30})`}
              >
                <rect
                  className={`bloom__fill ${rosa ? 'bloom__fill--rosa' : 'bloom__fill--oro'}`}
                  style={{ '--o': String(o) } as CSSProperties}
                  clipPath="url(#bloom-petalclip)"
                  x="-11"
                  y="-48"
                  width="22"
                  height="41"
                />
                <path
                  className="bloom__petal"
                  style={{ '--o': String(o) } as CSSProperties}
                  d={PETAL_D}
                />
                <path
                  className="bloom__vein"
                  style={{ '--o': String(o) } as CSSProperties}
                  d={PETAL_VEIN}
                />
              </g>
            )
          })}

          {/* il cuore del fiore: batte lub-dub */}
          <g className="bloom__heartWrap">
            <circle className="bloom__heartGlow" cx="0" cy="0" r="15" fill="url(#bloom-heartglow)" />
            <g className="bloom__heartBeat">
              <path className="bloom__heart bloom__heart--oro" d={HEART_D} />
              <path
                className="bloom__heart bloom__heart--rosa"
                style={{ opacity: celebrate ? 1 : 0.25 + 0.75 * bloom }}
                d={HEART_D}
              />
            </g>
          </g>
        </svg>
      </button>

      {/* la spiegazione sussurrata, sempre presente */}
      {!celebrate && (
        <p className="bloom__hint">
          ogni petalo sono ~3 giorni di attesa: quando sarà tutto sbocciato, saremo abbracciati
        </p>
      )}

      {/* la mini-card coi numeri vivi */}
      {card && (
        <div className="bloom__card" role="status">
          <p className="bloom__cardTitle">il nostro fiore-orologio</p>
          {celebrate ? (
            <p className="bloom__cardRow">è tutto sbocciato: siamo insieme ♥</p>
          ) : (
            <>
              <p className="bloom__cardRow">sbocciato il 13 agosto, fiorirà per intero il 15 settembre</p>
              <p className="bloom__cardNums">
                <span>
                  petali aperti <strong>{petalsOpen}</strong> di 12
                </span>
                <span aria-hidden="true">·</span>
                <span>
                  giorno <strong>{dayNow}</strong> di {dayTotal}
                </span>
              </p>
            </>
          )}
        </div>
      )}
    </div>
  )
}
