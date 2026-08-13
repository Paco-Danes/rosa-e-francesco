// STUB — sostituito dai personaggi completi (vedi catalog.ts per il contratto).
import { sprite } from './format'
import type { CharacterKey, CharacterSet } from './catalog'

const body = sprite([
  '................',
  '.....HHHHHH.....',
  '....HHHHHHHH....',
  '....Hffffff H...',
  '....Hf f f fH...',
  '....Hffffff H...',
  '.....ffffff.....',
  '....PPPPPPPP....',
  '...PPPPPPPPPP...',
  '...fPPPPPPPPf...',
  '...fPPPPPPPPf...',
  '....PPPPPPPP....',
  '....PPPPPPPP....',
  '.....PPPPPP.....',
  '.....ff..ff.....',
  '.....ff..ff.....',
  '.....KK..KK.....',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
  '................',
])

const set: CharacterSet = { down: [body], up: [body], left: [body], right: [body] }

const stub: Partial<Record<CharacterKey, CharacterSet>> = { rosa: set }

export const CHARACTERS = new Proxy(stub, {
  get: (t, k: string) => (t as Record<string, CharacterSet>)[k] ?? set,
}) as Record<CharacterKey, CharacterSet>
