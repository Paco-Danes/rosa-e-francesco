/**
 * Tipi condivisi tra il motore (canvas) e la UI React (overlay).
 */
import type { MemoryId } from '../../content/memories'

/** Payload di un dialogo aperto da un cartello o da un NPC. */
export interface DialogData {
  label?: string
  lines: string[]
  memoryId?: MemoryId
}

/** Callback con cui il motore parla con la UI React. */
export interface EngineCallbacks {
  /** true quando un overlay (dialogo / memory / pausa) blocca il mondo */
  isLocked(): boolean
  /** apri un dialogo (cartello o NPC) */
  onDialog(d: DialogData): void
  /** mostra il banner con il nome della scena appena entrata */
  onBanner(name: string): void
  /** tasto azione premuto (E / Spazio / Invio / bottone A) */
  onActionKey(): void
  /** Esc premuto */
  onEscape(): void
}
