/**
 * Schermata del titolo — cielo stellato, logo pixel, PREMI START lampeggiante
 * e un leggero velo scanline da vecchio CRT.
 */
import { useEffect } from 'react'
import { tryFullscreen } from '../../fullscreen'

export default function TitleScreen({ onStart }: { onStart: () => void }) {
  const start = () => {
    tryFullscreen()
    onStart()
  }
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        onStart()
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onStart])

  return (
    <div className="rf-title" onClick={start}>
      <div className="rf-title__stars" />
      <div className="rf-title__inner">
        <span className="rf-title__heart">♥</span>
        <h1 className="rf-title__logo">
          ROSA <span className="rf-title__amp">&amp;</span> FRANCESCO
        </h1>
        <p className="rf-title__sub">Un anno insieme</p>
        <p className="rf-title__start">PREMI START</p>
      </div>
      <p className="rf-title__copy">© i nostri ricordi, 2025–2026</p>
      <div className="rf-title__scan" />
    </div>
  )
}
