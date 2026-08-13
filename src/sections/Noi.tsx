import { useEffect, useState } from 'react'
import { REASONS } from '../content/reasons'
import './sections.css'

export interface SectionProps {
  onBack: () => void
}

/** L'inizio ufficiale: 8 agosto 2025, mezzanotte, ora locale. */
const INIZIO = new Date(2025, 7, 8, 0, 0, 0).getTime()

interface Tempo {
  giorni: number
  ore: number
  minuti: number
  secondi: number
}

function calcolaTempo(): Tempo {
  const diff = Math.max(0, Date.now() - INIZIO)
  const s = Math.floor(diff / 1000)
  return {
    giorni: Math.floor(s / 86400),
    ore: Math.floor(s / 3600) % 24,
    minuti: Math.floor(s / 60) % 60,
    secondi: s % 60,
  }
}

const fmt = new Intl.NumberFormat('it-IT')

export default function Noi({ onBack }: SectionProps) {
  const [tempo, setTempo] = useState<Tempo>(calcolaTempo)
  const [motivo, setMotivo] = useState<{ testo: string; n: number } | null>(null)

  useEffect(() => {
    const id = window.setInterval(() => setTempo(calcolaTempo()), 1000)
    return () => window.clearInterval(id)
  }, [])

  const estraiMotivo = () => {
    setMotivo((prev) => {
      let nuovo: string
      do {
        nuovo = REASONS[Math.floor(Math.random() * REASONS.length)]
      } while (REASONS.length > 1 && nuovo === prev?.testo)
      return { testo: nuovo, n: (prev?.n ?? 0) + 1 }
    })
  }

  const battiti = tempo.giorni * 100_000

  return (
    <div className="sez">
      <div className="sez__stars" aria-hidden="true" />
      <button className="sez__back" onClick={onBack}>
        ← torna al cielo
      </button>

      <div className="sez__inner noi">
        <h1 className="sez__title">Noi</h1>
        <p className="sez__sub">il tempo, contato come piace a noi</p>

        <div className="noi__giorni">
          <div className="noi__giorni-num">{fmt.format(tempo.giorni)}</div>
          <div className="noi__giorni-label">giorni insieme</div>
        </div>

        <div className="noi__hms" aria-label="ore, minuti e secondi in più">
          <span className="noi__hms-item">
            <span className="noi__hms-num">{tempo.ore}</span>
            <span className="noi__hms-label">ore</span>
          </span>
          <span className="noi__hms-dot" aria-hidden="true">
            ·
          </span>
          <span className="noi__hms-item">
            <span className="noi__hms-num">{tempo.minuti}</span>
            <span className="noi__hms-label">minuti</span>
          </span>
          <span className="noi__hms-dot" aria-hidden="true">
            ·
          </span>
          <span className="noi__hms-item">
            <span className="noi__hms-num">{tempo.secondi}</span>
            <span className="noi__hms-label">secondi</span>
          </span>
        </div>

        <div className="noi__derivate">
          <div className="noi__derivata">
            <div className="noi__derivata-num">{fmt.format(tempo.giorni)}</div>
            <div className="noi__derivata-label">albe viste insieme</div>
          </div>
          <div className="noi__derivata">
            <div className="noi__derivata-num">{fmt.format(battiti)}</div>
            <div className="noi__derivata-label">battiti di cuore, più o meno</div>
          </div>
        </div>

        <p className="noi__nota">conteggio ufficiale dall’8 agosto 2025</p>

        <button className="noi__motivo-btn" onClick={estraiMotivo}>
          un motivo per cui ti amo ✦
        </button>

        {motivo && (
          <p className="noi__motivo" key={motivo.n}>
            {motivo.testo}
          </p>
        )}
      </div>
    </div>
  )
}
