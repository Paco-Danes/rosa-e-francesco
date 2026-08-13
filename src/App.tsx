import { lazy, Suspense, useEffect, useState } from 'react'
import SoftGate from './gate/SoftGate'

const CountdownPage = lazy(() => import('./countdown/CountdownPage'))
const GameRoot = lazy(() => import('./game/GameRoot'))
const PensieriDolci = lazy(() => import('./sections/PensieriDolci'))
const Ricordi = lazy(() => import('./sections/Ricordi'))
const Noi = lazy(() => import('./sections/Noi'))

export type Route = 'countdown' | 'gioco' | 'pensieri' | 'ricordi' | 'noi'

function routeFromHash(): Route {
  const h = window.location.hash.replace(/^#\/?/, '')
  if (h === 'gioco' || h === 'pensieri' || h === 'ricordi' || h === 'noi') return h
  return 'countdown'
}

export function navigate(r: Route) {
  window.location.hash = r === 'countdown' ? '/' : `/${r}`
}

export default function App() {
  const [route, setRoute] = useState<Route>(routeFromHash)

  useEffect(() => {
    const onHash = () => setRoute(routeFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  return (
    <SoftGate>
      <Suspense fallback={<div className="route-loading">✦ &nbsp;un attimo&hellip;</div>}>
        {route === 'countdown' && (
          <CountdownPage
            onStartGame={() => navigate('gioco')}
            onNavigate={(r) => navigate(r)}
          />
        )}
        {route === 'gioco' && <GameRoot onExit={() => navigate('countdown')} />}
        {route === 'pensieri' && <PensieriDolci onBack={() => navigate('countdown')} />}
        {route === 'ricordi' && <Ricordi onBack={() => navigate('countdown')} />}
        {route === 'noi' && <Noi onBack={() => navigate('countdown')} />}
      </Suspense>
    </SoftGate>
  )
}
