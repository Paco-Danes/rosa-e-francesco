# Rosa & Francesco ✦

Un regalo in due atti, online su **https://paco-danes.github.io/rosa-e-francesco/**

1. **L'attesa** — la pagina countdown "notte stellata" verso il **15 settembre 2026**, con il bloom clock che sboccia giorno per giorno.
2. **Il viaggio** — la cartuccia segreta in fondo alla pagina avvia il minigioco: Rosa in versione pixel cammina per le città della nostra storia (Losanna, Santa Maria delle Mole, Cocuruzzo, Budapest — in barca sul Danubio —, Milano, Torvaianica) e legge i cartelli che aprono i ricordi.

Più le sezioni: **pensieri dolci** (lettere), **ricordi** (polaroid), **noi** (contatori dall'8 agosto 2025).

L'ingresso è protetto da una domanda dolce. **Password provvisoria durante i lavori: *fake*** (quando il sito sarà pronto, riportarla a *mameli* in `src/gate/SoftGate.tsx`). Maiuscole/minuscole indifferenti — è solo un cancelletto gentile, non vera sicurezza: il sito e le foto restano pubblici per chi ha il link.

## ✏️ Come aggiornare i contenuti (guida pratica)

Tutto ciò che è "tuo" (testi, foto, lettere) sta in due posti: `src/content/` per i testi e due cartelle per le immagini. Nessuna modifica al codice.

### 1. Pensieri dolci (le lettere) → `src/content/letters.ts`

Aggiungi un blocco alla lista `LETTERS` (l'ordine in pagina è dalla data più recente; le date si scrivono in italiano "13 agosto 2026", oppure testo libero come "sempre valido" che finisce in fondo):

```ts
{
  title: 'Per il tuo compleanno',
  date: '2 ottobre 2026',
  body:
    'Amore,\n\nprima riga del paragrafo…\n\nSecondo paragrafo…\n\nTuo, Francesco',
},
```

Note: `\n\n` = a capo di paragrafo; se nel testo c'è un apostrofo (`l'amore`) scrivi la stringa tra virgolette doppie `"…"` oppure usa l'apostrofo tipografico `'` (`l'amore`).

### 2. Motivi ("un motivo per cui ti amo") → `src/content/reasons.ts`

Una frase per riga nella lista `REASONS`, tra virgolette e con la virgola finale:

```ts
'Perché ridi anche con gli occhi.',
'Perché con te anche il lunedì è sopportabile.',
```

Aggiungi, togli, riscrivi liberamente: il bottone pesca a caso da qui.

### 3. Polaroid della sezione Ricordi → cartella `src/assets/ricordi/`

Basta copiare le immagini lì (jpg / png / webp / svg). Non serve toccare nessun file:
- il **nome del file diventa la didascalia**: `una-sera-a-roma.jpg` → *"una sera a roma"* (trattini e underscore diventano spazi);
- un **prefisso numerico ordina** senza apparire: `01-il-primo-bacio.jpg`, `02-….jpg`;
- questa cartella è **separata** dalle foto del minigioco: niente spoiler. Cancella `01-le-nostre-polaroid.svg` (segnaposto) quando metti le prime vere.

### 4. Foto e testi dei ricordi del minigioco → `public/photos/` + `src/content/memories.ts`

- Copia la foto in `public/photos/` (jpg consigliato; ok png/webp; niente HEIC).
- In `memories.ts` trova il ricordo (es. `'bud-ghiaccio'`) e aggiungi il nome file all'array `photos`: la **prima** è la copertina, le altre si sfogliano come un mazzo di polaroid:

```ts
photos: ['buda_skii.jpg', 'buda_skii_2.jpg', 'nuova-foto.jpg'],
```

- Nello stesso blocco puoi cambiare `title`, `date`, `place` e `text` (il testo che appare nella card).
- Foto **verticali** che la card ritaglia male: aggiungi `#top` o `#bottom` al nome (`'foto.jpg#top'`) per dire quale bordo conservare.

### 5. Testi dei cartelli e degli NPC nel minigioco → `src/game/maps/<città>.ts`

I dialoghi che Rosa legge nel gioco NON stanno in `src/content/`: sono nei file delle mappe, uno per zona:

| Zona | File |
| --- | --- |
| Mappa d'Europa (i cartelli davanti a ogni città) | `src/game/maps/overworld.ts` |
| Losanna / Torre di Sauvabelin | `src/game/maps/lausanne.ts` / `sauvabelin.ts` |
| Roma, Santa Maria e dintorni | `src/game/maps/smdm.ts` |
| Cocuruzzo | `src/game/maps/cocuruzzo.ts` |
| Danubio + Budapest | `src/game/maps/budapest.ts` |
| Milano | `src/game/maps/milano.ts` |
| Torvaianica | `src/game/maps/torvaianica.ts` |

In ogni file cerca la lista `signs:` (cartelli) o `npcs:` (personaggi). Ogni voce ha un `label` (il titoletto in oro sopra il fumetto) e le `lines` (le frasi, mostrate una alla volta — ogni riga = una schermata di dialogo). Cambia solo QUESTI due campi:

```ts
{
  x: 9, y: 8,                              // ← posizione: NON toccare
  label: 'Cattedrale di Losanna',          // ← titoletto: modificabile
  lines: [                                 // ← frasi: modificabili, aggiungine quante vuoi
    'Gotica, antica, piena di gradini.',
    'Quel fiatone in cima ce lo ricordiamo ancora…',
  ],
  memoryId: 'lau-cattedrale',              // ← quale ricordo si apre alla fine: NON toccare
},
```

Regole d'oro: non cambiare `x`, `y`, `kind`, `memoryId`, `character`, `custom`, `wander` (posizioni e collegamenti — muoverli può rendere un cartello irraggiungibile); virgolette e virgole come nell'esempio (apostrofi dentro le frasi: usa `"…"` doppie o l'apostrofo tipografico `'`). Frasi lunghe vanno a capo da sole, ma spezzarle in più righe rende il dialogo più bello da leggere.

Per un controllo automatico prima di pubblicare: `npx tsx scripts/validate.ts` deve stampare `0 errori` (verifica che tutti i cartelli restino raggiungibili e collegati).

### 6. Pubblicare

Dopo ogni modifica, dalla cartella del progetto:

```bash
git add -A && git commit -m "aggiorno contenuti" && git push
```

GitHub Pages ricostruisce il sito da solo (1-2 minuti). Consiglio: prima di pushare `npm run build` — se stampa `✓ built` è tutto a posto (un apostrofo dimenticato o una virgola mancante lo segnala qui, non in produzione).

### Riepilogo rapido

| Cosa | Dove |
| --- | --- |
| Lettere "pensieri dolci" | `src/content/letters.ts` |
| Frasi "un motivo per cui ti amo" | `src/content/reasons.ts` |
| Polaroid della sezione Ricordi | cartella `src/assets/ricordi/` (nome file = didascalia) |
| Foto del minigioco | `public/photos/` + array `photos` in `src/content/memories.ts` |
| Testi/date dei ricordi del minigioco | `src/content/memories.ts` |
| Cartelli e battute degli NPC nel minigioco | `src/game/maps/<città>.ts` → campi `label` e `lines` |
| Password del cancelletto | `src/gate/SoftGate.tsx` (ora `fake`, da riportare a `mameli`) |

## Sviluppo

```bash
npm install
npm run dev      # anteprima locale
npm run build    # build di produzione
```

Struttura: `src/countdown/` pagina countdown · `src/game/` motore + arte pixel + mappe · `src/sections/` sezioni satellite · `src/content/` **tutti i contenuti modificabili**.
