// STUB — sostituito dall'implementazione completa (notte stellata + bloom clock).
import type { Route } from '../App'

export interface CountdownPageProps {
  onStartGame: () => void
  onNavigate: (r: Extract<Route, 'pensieri' | 'ricordi' | 'noi'>) => void
}

export default function CountdownPage({ onStartGame }: CountdownPageProps) {
  return (
    <main style={{ display: 'grid', placeItems: 'center', height: '100%' }}>
      <button onClick={onStartGame}>▶ start (stub)</button>
    </main>
  )
}
