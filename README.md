# Rosa & Francesco ✦

Un regalo in due atti, online su **https://paco-danes.github.io/rosa-e-francesco/**

1. **L'attesa** — la pagina countdown "notte stellata" verso il **15 settembre 2026**, con il bloom clock che sboccia giorno per giorno.
2. **Il viaggio** — la cartuccia segreta in fondo alla pagina avvia il minigioco: Rosa in versione pixel cammina per le città della nostra storia (Losanna, Santa Maria delle Mole, Cocuruzzo, Budapest — in barca sul Danubio —, Milano, Torvaianica) e legge i cartelli che aprono i ricordi.

Più le sezioni: **pensieri dolci** (lettere), **ricordi** (polaroid), **noi** (contatori dall'8 agosto 2025).

L'ingresso è protetto da una domanda dolce (risposta: *mameli*, maiuscole/minuscole indifferenti — è solo un cancelletto gentile, non vera sicurezza: il sito e le foto restano pubblici per chi ha il link).

## ✏️ Come personalizzare (le uniche cose da toccare)

| Cosa | Dove |
| --- | --- |
| Testi/date dei ricordi nel gioco | `src/content/memories.ts` |
| Lettere di "pensieri dolci" (aggiungine quando vuoi!) | `src/content/letters.ts` |
| Motivi del bottone "un motivo per cui ti amo" | `src/content/reasons.ts` |
| Foto vere | metti i file in `public/photos/` al posto degli `.svg` segnaposto (stesso nome; se usi `.jpg` aggiorna il campo `photo` in `memories.ts`) |

Dopo ogni modifica:

```bash
git add -A && git commit -m "aggiorno contenuti" && git push
```

Il deploy su GitHub Pages parte da solo (1-2 minuti).

## Sviluppo

```bash
npm install
npm run dev      # anteprima locale
npm run build    # build di produzione
```

Struttura: `src/countdown/` pagina countdown · `src/game/` motore + arte pixel + mappe · `src/sections/` sezioni satellite · `src/content/` **tutti i contenuti modificabili**.
