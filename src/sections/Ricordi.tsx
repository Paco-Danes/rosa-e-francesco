import { useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import { MEMORIES } from '../content/memories'
import type { MemoryId } from '../content/memories'
import './sections.css'

export interface SectionProps {
  onBack: () => void
}

/** Una selezione di polaroid, un po' da ogni città. */
const SCELTE: { id: MemoryId; rot: number }[] = [
  { id: 'lau-ouchy', rot: -4 },
  { id: 'smdm-piazza', rot: 3 },
  { id: 'coc-fuochi', rot: -2.5 },
  { id: 'bud-parlamento', rot: 5 },
  { id: 'tor-tramonto', rot: -5 },
  { id: 'mil-duomo', rot: 2 },
  { id: 'lau-cattedrale', rot: 4.5 },
  { id: 'coc-piscina', rot: -3 },
  { id: 'bud-ponte', rot: 1.5 },
  { id: 'smdm-ibba', rot: -1.5 },
]

const FOTO_BASE = import.meta.env.BASE_URL + 'photos/'

export default function Ricordi({ onBack }: SectionProps) {
  const [focus, setFocus] = useState<MemoryId | null>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [trascina, setTrascina] = useState(false)
  const presa = useRef({ px: 0, py: 0, x0: 0, y0: 0 })

  const apri = (id: MemoryId) => {
    setPos({ x: 0, y: 0 })
    setFocus(id)
  }

  const onPointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    presa.current = { px: e.clientX, py: e.clientY, x0: pos.x, y0: pos.y }
    setTrascina(true)
  }

  const onPointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    if (!trascina) return
    const p = presa.current
    setPos({ x: p.x0 + e.clientX - p.px, y: p.y0 + e.clientY - p.py })
  }

  const onPointerUp = () => setTrascina(false)

  const grande = focus ? MEMORIES[focus] : null

  return (
    <div className="sez">
      <div className="sez__stars" aria-hidden="true" />
      <button className="sez__back" onClick={onBack}>
        ← torna al cielo
      </button>

      <div className="sez__inner">
        <h1 className="sez__title">Ricordi</h1>
        <p className="sez__sub">polaroid sparse sul tavolo della nostra storia</p>

        <div className="polaroids">
          {SCELTE.map(({ id, rot }) => {
            const m = MEMORIES[id]
            return (
              <button
                key={id}
                className="polaroid"
                style={{ '--rot': `${rot}deg` } as React.CSSProperties}
                onClick={() => apri(id)}
                aria-label={`Guarda da vicino: ${m.title}, ${m.city}`}
              >
                <img
                  className="polaroid__foto"
                  src={FOTO_BASE + m.photos[0]}
                  alt={`${m.title} — ${m.city}`}
                  loading="lazy"
                  draggable={false}
                />
                <span className="polaroid__dida">
                  <strong>{m.title}</strong>
                  <span>{m.city}</span>
                </span>
              </button>
            )
          })}
        </div>

        <p className="sez__whisper">ogni foto è un posto dove torneremo, almeno col cuore ♡</p>
      </div>

      {grande && focus && (
        <div
          className="polaroid-overlay"
          onClick={() => setFocus(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className={`polaroid polaroid--grande${trascina ? ' trascina' : ''}`}
            style={
              {
                '--rot': `${SCELTE.find((s) => s.id === focus)?.rot ?? 0}deg`,
                '--dx': `${pos.x}px`,
                '--dy': `${pos.y}px`,
              } as React.CSSProperties
            }
            onClick={(e) => e.stopPropagation()}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerUp}
          >
            <img
              className="polaroid__foto"
              src={FOTO_BASE + grande.photos[0]}
              alt={`${grande.title} — ${grande.city}`}
              draggable={false}
            />
            <span className="polaroid__dida">
              <strong>{grande.title}</strong>
              <span>
                {grande.city} · {grande.date}
              </span>
            </span>
          </div>
          <p className="polaroid-overlay__hint">trascinala dove vuoi · tocca fuori per posarla</p>
        </div>
      )}
    </div>
  )
}
