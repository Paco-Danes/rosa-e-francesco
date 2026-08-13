/**
 * GameRoot — la radice del gioco: titolo → esplorazione.
 * Il canvas (motore) vive sotto; i momenti di racconto (dialoghi, memory
 * card, pausa, banner) sono overlay React sopra di lui.
 */
import { useEffect, useMemo, useRef, useState } from 'react'
import { Engine } from './engine/engine'
import type { DialogData } from './engine/types'
import type { MemoryId } from '../content/memories'
import TitleScreen from './ui/TitleScreen'
import DialogBox from './ui/DialogBox'
import MemoryCard from './ui/MemoryCard'
import PauseMenu from './ui/PauseMenu'
import TouchControls from './ui/TouchControls'
import LocationBanner from './ui/LocationBanner'
import './ui/game.css'

export interface GameRootProps {
  onExit: () => void
}

export default function GameRoot({ onExit }: GameRootProps) {
  const [phase, setPhase] = useState<'title' | 'play'>('title')
  const [dialog, setDialog] = useState<{ d: DialogData; n: number } | null>(null)
  const [memory, setMemory] = useState<MemoryId | null>(null)
  const [paused, setPaused] = useState(false)
  const [banner, setBanner] = useState<{ name: string; n: number } | null>(null)
  const [hint, setHint] = useState(false)

  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const engineRef = useRef<Engine | null>(null)
  const advanceRef = useRef<(() => void) | null>(null)
  const uiRef = useRef({
    dialog: null as DialogData | null,
    memory: null as MemoryId | null,
    paused: false,
  })
  const counterRef = useRef(0)
  const bannerTimer = useRef(0)

  // specchio sempre-aggiornato dello stato UI, letto dal motore (isLocked)
  useEffect(() => {
    uiRef.current = { dialog: dialog?.d ?? null, memory, paused }
  }, [dialog, memory, paused])

  const isTouch = useMemo(
    () =>
      typeof window !== 'undefined' &&
      (navigator.maxTouchPoints > 0 || window.matchMedia('(pointer: coarse)').matches),
    [],
  )

  /* ── instradamento dei comandi (letture solo da ref: chiusure sicure) ── */

  const handleAction = () => {
    const u = uiRef.current
    if (u.paused || u.memory) return
    if (u.dialog) {
      advanceRef.current?.()
      return
    }
    engineRef.current?.interact()
  }

  const handleEscape = () => {
    const u = uiRef.current
    if (u.memory) {
      setMemory(null)
      return
    }
    if (u.dialog) return
    setPaused((v) => !v)
  }

  const openDialog = (d: DialogData) => {
    if (d.lines.length === 0) {
      if (d.memoryId) setMemory(d.memoryId)
      return
    }
    setDialog({ d, n: ++counterRef.current })
  }

  const showBanner = (name: string) => {
    setBanner({ name, n: ++counterRef.current })
    window.clearTimeout(bannerTimer.current)
    bannerTimer.current = window.setTimeout(() => setBanner(null), 2300)
  }

  /* ── vita del motore ── */

  useEffect(() => {
    if (phase !== 'play') return
    const canvas = canvasRef.current
    if (!canvas) return
    const engine = new Engine(canvas, {
      isLocked: () => {
        const u = uiRef.current
        return !!(u.dialog || u.memory || u.paused)
      },
      onDialog: openDialog,
      onBanner: showBanner,
      onActionKey: handleAction,
      onEscape: handleEscape,
    })
    engineRef.current = engine
    const resize = () => {
      const scale = window.innerHeight < 760 ? 2 : 3
      const w = Math.max(160, Math.min(480, Math.floor(window.innerWidth / scale)))
      const h = Math.max(144, Math.min(320, Math.floor(window.innerHeight / scale)))
      engine.setSize(w, h, scale)
    }
    resize()
    window.addEventListener('resize', resize)
    engine.start()
    return () => {
      window.removeEventListener('resize', resize)
      engine.destroy()
      engineRef.current = null
    }
    // il motore vive per tutta la fase 'play': le callback leggono solo ref
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [phase])

  // hint dei comandi nei primi ~10 secondi di gioco
  useEffect(() => {
    if (phase !== 'play') return
    setHint(true)
    const t = window.setTimeout(() => setHint(false), 10000)
    return () => window.clearTimeout(t)
  }, [phase])

  useEffect(() => () => window.clearTimeout(bannerTimer.current), [])

  return (
    <main className="rf-game">
      {phase === 'title' ? (
        <TitleScreen onStart={() => setPhase('play')} />
      ) : (
        <>
          <canvas ref={canvasRef} className="rf-canvas" />
          {banner && <LocationBanner key={banner.n} name={banner.name} />}
          {hint && !dialog && !memory && !paused && (
            <div className="rf-hint">
              {isTouch ? 'muoviti col d-pad · leggi: A' : 'muoviti: frecce · leggi: E'}
            </div>
          )}
          {dialog && (
            <DialogBox
              key={dialog.n}
              data={dialog.d}
              advanceRef={advanceRef}
              onDone={() => {
                const mid = dialog.d.memoryId
                setDialog(null)
                if (mid) setMemory(mid)
              }}
            />
          )}
          {memory && <MemoryCard id={memory} onClose={() => setMemory(null)} />}
          {paused && <PauseMenu onResume={() => setPaused(false)} onExit={onExit} />}
          {isTouch && (
            <TouchControls onDir={(d) => engineRef.current?.setVirtualDir(d)} onAction={handleAction} />
          )}
        </>
      )}
      <button
        className="rf-close"
        aria-label={phase === 'title' ? 'chiudi' : 'pausa'}
        onClick={() => (phase === 'title' ? onExit() : setPaused(true))}
      >
        ✕
      </button>
    </main>
  )
}
