/**
 * Memory card — IL momento emotivo: un mazzo di polaroid sfogliabile con la
 * foto di copertina, il titolo, la data e il luogo in oro, il ricordo in
 * corsivo. All'apertura l'id viene salvato in localStorage ('rf:seen') e il
 * mazzo riparte sempre dalla prima foto. Con una sola foto niente mazzo:
 * la card resta identica a prima.
 *
 * Sfoglia: click/tap sulla foto o freccia › (avanti), tasti ← → (avanti e
 * indietro). Esc resta gestito dal motore e chiude la card.
 */
import { useEffect, useState } from 'react'
import { MEMORIES } from '../../content/memories'
import type { MemoryId } from '../../content/memories'

function markSeen(id: MemoryId) {
  try {
    const raw = localStorage.getItem('rf:seen')
    const parsed: unknown = raw ? JSON.parse(raw) : []
    const list = Array.isArray(parsed) ? (parsed as string[]) : []
    if (!list.includes(id)) {
      list.push(id)
      localStorage.setItem('rf:seen', JSON.stringify(list))
    }
  } catch {
    /* la memoria del browser può mancare: il ricordo resta comunque nostro */
  }
}

interface DeckState {
  /** indice della foto in copertina */
  index: number
  /** carta in animazione: idx = quale foto, kind = verso, n = per riavviarla */
  anim: { idx: number; kind: 'tuck' | 'untuck'; n: number } | null
}

export default function MemoryCard({ id, onClose }: { id: MemoryId; onClose: () => void }) {
  const m = MEMORIES[id]
  const count = m ? m.photos.length : 0
  const [deck, setDeck] = useState<DeckState>({ index: 0, anim: null })

  useEffect(() => {
    markSeen(id)
    // il mazzo riparte dalla copertina a ogni apertura
    setDeck({ index: 0, anim: null })
  }, [id])

  const go = (dir: 1 | -1) => {
    if (count < 2) return
    setDeck((d) => {
      const next = (d.index + dir + count) % count
      return {
        index: next,
        anim: {
          // avanti: la copertina si infila dietro; indietro: l'ultima riemerge
          idx: dir === 1 ? d.index : next,
          kind: dir === 1 ? 'tuck' : 'untuck',
          n: (d.anim?.n ?? 0) + 1,
        },
      }
    })
  }

  // frecce ← → per sfogliare; Esc non si tocca (il motore chiude la card)
  useEffect(() => {
    if (count < 2) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        e.preventDefault()
        go(1)
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        go(-1)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
    // `go` legge lo stato con l'updater funzionale: basta riagganciarsi su id/count
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [count, id])

  if (!m) {
    console.warn('[gioco] memoria sconosciuta:', id)
    return null
  }

  const base = import.meta.env.BASE_URL + 'photos/'
  // "foto.jpg#top" / "#bottom" = quale bordo conservare quando la card ritaglia
  const photoOf = (p: string) => {
    const [file, focus] = p.split('#')
    const pos = focus === 'top' ? '50% 0%' : focus === 'bottom' ? '50% 100%' : undefined
    return { src: base + file, style: pos ? { objectPosition: pos } : undefined }
  }

  return (
    <div className="rf-memory" onClick={onClose}>
      <figure className="rf-memory__card" onClick={(e) => e.stopPropagation()}>
        <span className="rf-memory__city">{m.city}</span>
        {count <= 1 ? (
          <img className="rf-memory__photo" src={photoOf(m.photos[0]).src} style={photoOf(m.photos[0]).style} alt={m.title} />
        ) : (
          <div className="rf-deck" onClick={() => go(1)}>
            {m.photos.map((p, i) => {
              const depth = (i - deck.index + count) % count
              const animating = deck.anim !== null && deck.anim.idx === i
              const cls = [
                'rf-deck__card',
                depth > 3 ? 'rf-deck__card--hidden' : `rf-deck__card--d${depth}`,
                animating ? `rf-deck__card--${deck.anim!.kind}` : '',
              ]
                .filter(Boolean)
                .join(' ')
              return (
                <div key={animating ? `${i}-a${deck.anim!.n}` : `${i}`} className={cls}>
                  <img
                    src={photoOf(p).src}
                    style={photoOf(p).style}
                    alt={`${m.title} — foto ${i + 1} di ${count}`}
                    draggable={false}
                  />
                </div>
              )
            })}
            <div className="rf-deck__nav" onClick={(e) => e.stopPropagation()}>
              <span className="rf-deck__count">
                {deck.index + 1} / {count}
              </span>
              <button
                type="button"
                className="rf-deck__next"
                aria-label="foto successiva"
                onClick={() => go(1)}
              >
                ›
              </button>
            </div>
          </div>
        )}
        <figcaption className="rf-memory__body">
          <h3 className="rf-memory__title">{m.title}</h3>
          <p className="rf-memory__meta">
            {m.date} · {m.place}
          </p>
          <p className="rf-memory__text">{m.text}</p>
          <button className="rf-memory__close" onClick={onClose}>
            chiudi ♥
          </button>
        </figcaption>
      </figure>
    </div>
  )
}
