// STUB — sostituito dal motore di gioco completo.
export interface GameRootProps {
  onExit: () => void
}

export default function GameRoot({ onExit }: GameRootProps) {
  return (
    <main style={{ display: 'grid', placeItems: 'center', height: '100%' }}>
      <button onClick={onExit}>✕ esci (stub)</button>
    </main>
  )
}
