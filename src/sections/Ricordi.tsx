import { useMemo, useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import './sections.css'

export interface SectionProps {
  onBack: () => void
}

/**
 * Le polaroid dei Ricordi vivono in src/assets/ricordi/ — una cartella TUTTA
 * loro, separata dalle foto del minigioco (niente spoiler!).
 *
 * ✏️ PER FRANCESCO: per aggiungere una polaroid basta mettere un'immagine
 * (.jpg/.png/.webp/.svg) in src/assets/ricordi/ e fare commit+push.
 * Il nome del file diventa la didascalia: "una-sera-a-roma.jpg" → "una sera
 * a roma". Un prefisso numerico ordina senza apparire: "01-il-primo-bacio.jpg".
 */
const FILES = import.meta.glob('../assets/ricordi/*.{jpg,jpeg,JPG,JPEG,png,PNG,webp,svg}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>

interface Polaroid {
  url: string
  caption: string
  rot: number
}

function captionFromPath(path: string): string {
  const base = path.split('/').pop() ?? ''
  return base
    .replace(/\.[^.]+$/, '')
    .replace(/^\d+[-_ ]*/, '')
    .replace(/[-_]+/g, ' ')
    .trim()
}

export default function Ricordi({ onBack }: SectionProps) {
  const [focus, setFocus] = useState<number | null>(null)
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [trascina, setTrascina] = useState(false)
  const presa = useRef({ px: 0, py: 0, x0: 0, y0: 0 })

  const polaroids = useMemo<Polaroid[]>(
    () =>
      Object.keys(FILES)
        .sort()
        .map((path, i) => ({
          url: FILES[path],
          caption: captionFromPath(path),
          // rotazione "casuale" ma stabile per ogni posizione
          rot: ((i * 47 + 13) % 11) - 5,
        })),
    []
  )

  const apri = (i: number) => {
    setPos({ x: 0, y: 0 })
    setFocus(i)
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

  const grande = focus !== null ? polaroids[focus] : null

  return (
    <div className="sez">
      <div className="sez__stars" aria-hidden="true" />
      <button className="sez__back" onClick={onBack}>
        ← torna al cielo
      </button>

      <div className="sez__inner">
        <h1 className="sez__title">Ricordi</h1>
        <p className="sez__sub">polaroid sparse sul tavolo della nostra storia</p>

        {polaroids.length === 0 ? (
          <p className="sez__whisper">le prime polaroid stanno per arrivare… ♡</p>
        ) : (
          <div className="polaroids">
            {polaroids.map((p, i) => (
              <button
                key={p.url}
                className="polaroid"
                style={{ '--rot': `${p.rot}deg` } as React.CSSProperties}
                onClick={() => apri(i)}
                aria-label={`Guarda da vicino: ${p.caption}`}
              >
                <img
                  className="polaroid__foto"
                  src={p.url}
                  alt={p.caption}
                  loading="lazy"
                  draggable={false}
                />
                <span className="polaroid__dida">
                  <strong>{p.caption}</strong>
                </span>
              </button>
            ))}
          </div>
        )}

        <p className="sez__whisper">ogni foto è un posto dove torneremo, almeno col cuore ♡</p>
      </div>

      {grande && (
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
                '--rot': `${grande.rot}deg`,
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
            <img className="polaroid__foto" src={grande.url} alt={grande.caption} draggable={false} />
            <span className="polaroid__dida">
              <strong>{grande.caption}</strong>
            </span>
          </div>
          <p className="polaroid-overlay__hint">trascinala dove vuoi · tocca fuori per posarla</p>
        </div>
      )}
    </div>
  )
}
