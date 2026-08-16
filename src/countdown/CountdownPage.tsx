// La notte stellata — il primo colpo d'occhio del regalo.
// Cielo canvas, le stelle R & F che viaggiano l'una verso l'altra lungo un
// arco tratteggiato, il bloom clock al centro, la cartuccia segreta in basso.
import { useEffect, useMemo, useRef, useState } from 'react'
import type { CSSProperties } from 'react'
import type { Route } from '../App'
import StarrySky from './StarrySky'
import BloomClock from './BloomClock'
import Cartridge from './Cartridge'
import { tryFullscreen } from '../fullscreen'
import './countdown.css'

export interface CountdownPageProps {
  onStartGame: () => void
  onNavigate: (r: Extract<Route, 'pensieri' | 'ricordi' | 'noi'>) => void
}

// ── costanti del nostro tempo ──────────────────────────────────────────────
const ANNIVERSARIO = new Date(2025, 7, 8, 0, 0, 0).getTime() // 8 agosto 2025
const TARGET = new Date(2026, 8, 15, 0, 0, 0).getTime() // 15 settembre 2026
const BLOOM_START = new Date(2026, 7, 13, 0, 0, 0).getTime() // 13 agosto 2026

const DAY = 86_400_000
const clamp01 = (v: number) => Math.min(1, Math.max(0, v))
const pad2 = (n: number) => String(n).padStart(2, '0')

// ── l'arco nel cielo (coordinate in % del viewport) ────────────────────────
const ARC = { x0: 7, y0: 46, cx: 50, cy: 8, x1: 93, y1: 46 }
function arcPoint(t: number) {
  const u = 1 - t
  return {
    x: u * u * ARC.x0 + 2 * u * t * ARC.cx + t * t * ARC.x1,
    y: u * u * ARC.y0 + 2 * u * t * ARC.cy + t * t * ARC.y1,
  }
}

// ── cifra che cambia con crossfade morbido, mai a scatto ───────────────────
function SoftNumber({ value }: { value: string }) {
  const [st, setSt] = useState({ curr: value, prev: null as string | null, k: 0 })
  useEffect(() => {
    setSt((p) => (p.curr === value ? p : { curr: value, prev: p.curr, k: p.k + 1 }))
  }, [value])
  return (
    <span className="cd-num">
      {st.prev !== null && (
        <span key={`p${st.k}`} className="cd-num__ghost" aria-hidden="true">
          {st.prev}
        </span>
      )}
      <span key={`c${st.k}`} className={st.prev !== null ? 'cd-num__in' : undefined}>
        {st.curr}
      </span>
    </span>
  )
}

function Unit({ value, label }: { value: string; label: string }) {
  return (
    <span className="cd-unit">
      <SoftNumber value={value} />
      <span className="cd-unit__label">{label}</span>
    </span>
  )
}

interface FallingPetal {
  left: number
  delay: number
  dur: number
  size: number
  sway: number
  spin: number
  rosa: boolean
}

export default function CountdownPage({ onStartGame, onNavigate }: CountdownPageProps) {
  const [now, setNow] = useState(() => Date.now())
  const [crt, setCrt] = useState(false)
  const started = useRef(false)

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 500)
    return () => window.clearInterval(id)
  }, [])

  // accensione CRT → poi si entra nel gioco
  useEffect(() => {
    if (!crt) return
    const id = window.setTimeout(() => {
      if (!started.current) {
        started.current = true
        onStartGame()
      }
    }, 1450)
    return () => window.clearTimeout(id)
  }, [crt, onStartGame])

  const celebrate = now >= TARGET
  const remaining = Math.max(0, TARGET - now)
  const days = Math.floor(remaining / DAY)
  const hours = Math.floor(remaining / 3_600_000) % 24
  const minutes = Math.floor(remaining / 60_000) % 60
  const seconds = Math.floor(remaining / 1_000) % 60
  const albe = Math.max(1, Math.ceil(remaining / DAY))

  const journey = clamp01((now - ANNIVERSARIO) / (TARGET - ANNIVERSARIO))
  const bloom = clamp01((now - BLOOM_START) / (TARGET - BLOOM_START))
  const bloomDayTotal = Math.round((TARGET - BLOOM_START) / DAY)
  const bloomDayNow = Math.min(bloomDayTotal, Math.max(1, Math.floor((now - BLOOM_START) / DAY) + 1))

  const posR = arcPoint(journey * 0.5)
  const posF = arcPoint(1 - journey * 0.5)
  const posMeet = arcPoint(0.5)

  const petalsRain = useMemo<FallingPetal[]>(() => {
    if (!celebrate) return []
    return Array.from({ length: 28 }, (_, i) => ({
      left: (i * 37 + 11) % 100,
      delay: -((i * 1.37) % 9),
      dur: 7 + ((i * 2.13) % 6),
      size: 9 + ((i * 3.1) % 8),
      sway: ((i % 5) - 2) * 4,
      spin: 360 + ((i * 97) % 420),
      rosa: i % 3 !== 0,
    }))
  }, [celebrate])

  return (
    <main className="cd">
      <StarrySky />

      {/* l'arco luminoso che unisce R e F */}
      <svg className="sky-arc" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
        <defs>
          <linearGradient id="arc-grad" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#ff9eb8" />
            <stop offset="0.5" stopColor="#fff2cf" />
            <stop offset="1" stopColor="#ffd98f" />
          </linearGradient>
        </defs>
        <path
          className="sky-arc__path"
          d={`M ${ARC.x0} ${ARC.y0} Q ${ARC.cx} ${ARC.cy} ${ARC.x1} ${ARC.y1}`}
          pathLength={100}
          vectorEffect="non-scaling-stroke"
        />
      </svg>

      {/* le due stelle: Rosa e Francesco */}
      {celebrate ? (
        <div
          className="rf-heart"
          style={{ left: `${posMeet.x}%`, top: `${posMeet.y}%` }}
          aria-label="Rosa e Francesco, insieme"
        >
          ♥
        </div>
      ) : (
        <>
          <div className="rf-star rf-star--r" style={{ left: `${posR.x}%`, top: `${posR.y}%` }} aria-hidden="true">
            <span className="rf-star__core" />
            <span className="rf-star__label">R</span>
          </div>
          <div className="rf-star rf-star--f" style={{ left: `${posF.x}%`, top: `${posF.y}%` }} aria-hidden="true">
            <span className="rf-star__core" />
            <span className="rf-star__label">F</span>
          </div>
        </>
      )}

      {/* pioggia di petali quando ci siamo */}
      {celebrate && (
        <div className="petal-rain" aria-hidden="true">
          {petalsRain.map((p, i) => (
            <span
              key={i}
              className={`petal-rain__petal ${p.rosa ? '' : 'petal-rain__petal--oro'}`}
              style={
                {
                  left: `${p.left}%`,
                  width: `${p.size}px`,
                  height: `${p.size * 1.4}px`,
                  animationDelay: `${p.delay}s`,
                  animationDuration: `${p.dur}s`,
                  '--sway': `${p.sway}vw`,
                  '--spin': `${p.spin}deg`,
                } as CSSProperties
              }
            />
          ))}
        </div>
      )}

      {/* menu discreto */}
      <nav className="cd-nav" aria-label="Le altre stanze">
        <button type="button" onClick={() => onNavigate('pensieri')}>
          pensieri dolci
        </button>
        <span aria-hidden="true">·</span>
        <button type="button" onClick={() => onNavigate('ricordi')}>
          ricordi
        </button>
        <span aria-hidden="true">·</span>
        <button type="button" onClick={() => onNavigate('noi')}>
          noi
        </button>
      </nav>

      {/* intestazione */}
      <header className="cd-head">
        <h1 className="cd-head__title">Rosa &amp; Francesco</h1>
        <p className="cd-head__sub">15 settembre 2026 — il nostro prossimo abbraccio</p>
      </header>

      {/* il cuore della pagina: bloom clock + countdown */}
      <section className="cd-center">
        <BloomClock bloom={bloom} celebrate={celebrate} dayNow={bloomDayNow} dayTotal={bloomDayTotal} />

        {celebrate ? (
          <h2 className="cd-together">
            Ci siamo. <span className="cd-together__heart">♥</span>
          </h2>
        ) : (
          <>
            <div className="cd-units" role="timer" aria-live="off">
              <Unit value={String(days)} label={days === 1 ? 'giorno' : 'giorni'} />
              <span className="cd-units__dot" aria-hidden="true">
                ·
              </span>
              <Unit value={pad2(hours)} label="ore" />
              <span className="cd-units__dot" aria-hidden="true">
                ·
              </span>
              <Unit value={pad2(minutes)} label="minuti" />
              <span className="cd-units__dot" aria-hidden="true">
                ·
              </span>
              <Unit value={pad2(seconds)} label="secondi" />
            </div>
            <p className="cd-poem">
              {albe === 1 ? (
                <>
                  manca <span className="cd-poem__n">1</span> alba al nostro abbraccio
                </>
              ) : (
                <>
                  mancano <span className="cd-poem__n">{albe}</span> albe al nostro abbraccio
                </>
              )}
            </p>
          </>
        )}
      </section>

      {/* la cartuccia segreta */}
      <footer className="cd-foot">
        <Cartridge
          onClick={() => {
            tryFullscreen()
            if (!crt) setCrt(true)
          }}
        />
        <p className="cd-foot__whisper">c&rsquo;è un segreto, qui sotto&hellip;</p>
      </footer>

      {/* accensione CRT */}
      {crt && (
        <div className="crt" aria-hidden="true">
          <div className="crt__line" />
          <div className="crt__scan" />
        </div>
      )}
    </main>
  )
}
