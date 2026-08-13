/**
 * Controlli touch: d-pad in basso a sinistra (tieni premuto per camminare)
 * e bottone A in basso a destra. Mostrati solo su dispositivi touch.
 */
import type { MouseEvent, PointerEvent } from 'react'
import type { Dir } from '../maps/types'

interface Props {
  onDir: (d: Dir | null) => void
  onAction: () => void
}

export default function TouchControls({ onDir, onAction }: Props) {
  const hold = (d: Dir) => ({
    onPointerDown: (e: PointerEvent<HTMLButtonElement>) => {
      e.preventDefault()
      e.currentTarget.setPointerCapture(e.pointerId)
      onDir(d)
    },
    onPointerUp: () => onDir(null),
    onPointerCancel: () => onDir(null),
    onContextMenu: (e: MouseEvent) => e.preventDefault(),
  })

  return (
    <div className="rf-touch">
      <div className="rf-dpad">
        <button className="rf-dpad__b rf-dpad__b--up" aria-label="su" {...hold('up')}>
          ▲
        </button>
        <button className="rf-dpad__b rf-dpad__b--left" aria-label="sinistra" {...hold('left')}>
          ◀
        </button>
        <button className="rf-dpad__b rf-dpad__b--right" aria-label="destra" {...hold('right')}>
          ▶
        </button>
        <button className="rf-dpad__b rf-dpad__b--down" aria-label="giù" {...hold('down')}>
          ▼
        </button>
      </div>
      <button
        className="rf-abtn"
        aria-label="azione"
        onContextMenu={(e) => e.preventDefault()}
        onPointerDown={(e) => {
          e.preventDefault()
          onAction()
        }}
      >
        A
      </button>
    </div>
  )
}
