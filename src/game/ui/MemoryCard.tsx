/**
 * Memory card — IL momento emotivo: una polaroid con la foto, il titolo,
 * la data e il luogo in oro, il ricordo in corsivo. All'apertura l'id viene
 * salvato in localStorage ('rf:seen').
 */
import { useEffect } from 'react'
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

export default function MemoryCard({ id, onClose }: { id: MemoryId; onClose: () => void }) {
  const m = MEMORIES[id]

  useEffect(() => {
    markSeen(id)
  }, [id])

  if (!m) {
    console.warn('[gioco] memoria sconosciuta:', id)
    return null
  }

  const src = import.meta.env.BASE_URL + 'photos/' + m.photos[0]

  return (
    <div className="rf-memory" onClick={onClose}>
      <figure className="rf-memory__card" onClick={(e) => e.stopPropagation()}>
        <span className="rf-memory__city">{m.city}</span>
        <img className="rf-memory__photo" src={src} alt={m.title} />
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
