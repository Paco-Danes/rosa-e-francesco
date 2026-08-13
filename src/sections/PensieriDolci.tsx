import { useMemo, useState } from 'react'
import { LETTERS } from '../content/letters'
import type { Letter } from '../content/letters'
import './sections.css'

export interface SectionProps {
  onBack: () => void
}

const MESI: Record<string, number> = {
  gennaio: 0,
  febbraio: 1,
  marzo: 2,
  aprile: 3,
  maggio: 4,
  giugno: 5,
  luglio: 6,
  agosto: 7,
  settembre: 8,
  ottobre: 9,
  novembre: 10,
  dicembre: 11,
}

/** "13 agosto 2026" → timestamp; date non-data ("sempre valido") → -1, finiscono in fondo. */
function parseDataItaliana(s: string): number {
  const m = s.toLowerCase().match(/(\d{1,2})?\s*([a-zàé]+)\s+(\d{4})/)
  if (!m) return -1
  const mese = MESI[m[2]]
  if (mese === undefined) return -1
  return new Date(Number(m[3]), mese, m[1] ? Number(m[1]) : 1).getTime()
}

export default function PensieriDolci({ onBack }: SectionProps) {
  const [aperta, setAperta] = useState<number | null>(null)
  const [letta, setLetta] = useState<Letter | null>(null)

  const lettere = useMemo(
    () =>
      LETTERS.map((l, i) => ({ l, i }))
        .sort((a, b) => parseDataItaliana(b.l.date) - parseDataItaliana(a.l.date)),
    []
  )

  const apri = (idx: number, lettera: Letter) => {
    if (aperta === idx) return
    setAperta(idx)
    // la linguetta si apre, il foglietto scivola fuori… poi la lettera si espande
    window.setTimeout(() => setLetta(lettera), 620)
  }

  const chiudi = () => {
    setLetta(null)
    setAperta(null)
  }

  return (
    <div className="sez">
      <div className="sez__stars" aria-hidden="true" />
      <button className="sez__back" onClick={onBack}>
        ← torna al cielo
      </button>

      <div className="sez__inner">
        <h1 className="sez__title">Pensieri dolci</h1>
        <p className="sez__sub">piccole lettere sigillate, scritte solo per te</p>

        <div className="buste">
          {lettere.map(({ l, i }, idx) => (
            <button
              key={i}
              className={`busta${aperta === idx ? ' aperta' : ''}`}
              onClick={() => apri(idx, l)}
              aria-label={`Apri la lettera «${l.title}»`}
            >
              <span className="busta__corpo" aria-hidden="true">
                <span className="busta__foglietto" />
              </span>
              <span className="busta__linguetta" aria-hidden="true" />
              <span className="busta__sigillo" aria-hidden="true">
                ♥
              </span>
              <span className="busta__nome">{l.title}</span>
            </button>
          ))}
        </div>

        <p className="sez__whisper">nuovi pensieri sbocceranno qui… torna a trovarli ♡</p>
      </div>

      {letta && (
        <div className="lettera-overlay" onClick={chiudi} role="dialog" aria-modal="true">
          <article className="lettera" onClick={(e) => e.stopPropagation()}>
            <button className="lettera__chiudi" onClick={chiudi} aria-label="Chiudi la lettera">
              ✕
            </button>
            <h2 className="lettera__titolo">{letta.title}</h2>
            <p className="lettera__data">{letta.date}</p>
            <hr className="lettera__filo" />
            <div className="lettera__corpo">
              {letta.body.split('\n').map(
                (riga, k) =>
                  riga.trim() !== '' && <p key={k}>{riga}</p>
              )}
            </div>
          </article>
        </div>
      )}
    </div>
  )
}
