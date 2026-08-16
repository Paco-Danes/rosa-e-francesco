/**
 * Schermo intero su telefono (Fullscreen API): va chiamato dentro un gesto
 * dell'utente (tap/click). Su Android/Chrome nasconde la barra del browser;
 * su iPhone/Safari non è permesso per le pagine web (lì la via è "Aggiungi
 * alla schermata Home", già predisposta dal manifest) — quindi qui fallisce
 * in silenzio senza rompere nulla.
 */
export function tryFullscreen(): void {
  if (typeof window === 'undefined' || typeof document === 'undefined') return
  const isMobile =
    window.matchMedia('(pointer: coarse)').matches || Math.min(window.innerWidth, window.innerHeight) < 820
  if (!isMobile) return
  // già "app" da schermata Home: niente da fare
  if (window.matchMedia('(display-mode: standalone)').matches) return
  if (document.fullscreenElement) return
  const el = document.documentElement as HTMLElement & {
    webkitRequestFullscreen?: () => Promise<void> | void
  }
  try {
    const p = el.requestFullscreen
      ? el.requestFullscreen({ navigationUI: 'hide' } as FullscreenOptions)
      : el.webkitRequestFullscreen?.()
    if (p && typeof (p as Promise<void>).catch === 'function') (p as Promise<void>).catch(() => {})
  } catch {
    /* non supportato: pazienza */
  }
}
