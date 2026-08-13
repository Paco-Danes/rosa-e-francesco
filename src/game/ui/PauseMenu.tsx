/**
 * Menu di pausa in stile pixel: riprendi, oppure torna al cielo (esci).
 */
export default function PauseMenu({
  onResume,
  onExit,
}: {
  onResume: () => void
  onExit: () => void
}) {
  return (
    <div className="rf-pause">
      <div className="rf-pause__panel">
        <p className="rf-pause__title">PAUSA</p>
        <button className="rf-pause__btn" onClick={onResume}>
          ▸ riprendi
        </button>
        <button className="rf-pause__btn rf-pause__btn--exit" onClick={onExit}>
          ✦ torna al cielo
        </button>
        <p className="rf-pause__hint">ESC per riprendere</p>
      </div>
    </div>
  )
}
