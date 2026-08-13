/**
 * Finestra di dialogo in stile Pokémon: label oro, testo a macchina da
 * scrivere (~25 ms/carattere). Azione = completa la riga / riga successiva.
 */
import { useEffect, useState } from 'react'
import type { DialogData } from '../engine/types'

interface Props {
  data: DialogData
  /** il GameRoot instrada qui il tasto azione mentre il dialogo è aperto */
  advanceRef: { current: (() => void) | null }
  onDone: () => void
}

export default function DialogBox({ data, advanceRef, onDone }: Props) {
  const [line, setLine] = useState(0)
  const [chars, setChars] = useState(0)

  const text = data.lines[line] ?? ''
  const typed = chars >= text.length
  const last = line >= data.lines.length - 1

  useEffect(() => {
    setLine(0)
    setChars(0)
  }, [data])

  useEffect(() => {
    if (typed) return
    const iv = window.setInterval(() => setChars((c) => c + 1), 25)
    return () => window.clearInterval(iv)
  }, [typed, line, data])

  const advance = () => {
    if (!typed) setChars(text.length)
    else if (!last) {
      setLine((l) => l + 1)
      setChars(0)
    } else onDone()
  }

  useEffect(() => {
    advanceRef.current = advance
    return () => {
      advanceRef.current = null
    }
  })

  return (
    <div className="rf-dialog" onClick={advance} role="dialog" aria-live="polite">
      {data.label && <span className="rf-dialog__label">{data.label}</span>}
      <p className="rf-dialog__text">{text.slice(0, chars)}</p>
      <span className={'rf-dialog__more' + (typed ? ' rf-dialog__more--on' : '')}>
        {last ? '♥' : '▼'}
      </span>
    </div>
  )
}
