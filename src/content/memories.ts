/**
 * CONTENUTI — le memory card aperte dai cartelli nel gioco.
 *
 * ✏️ PER FRANCESCO: questo è IL file da personalizzare.
 * Cambia titoli, date e testi come vuoi; per le foto vere sostituisci i file
 * in `public/photos/` mantenendo lo stesso nome (es. `lau-ouchy.jpg` al posto
 * di `lau-ouchy.svg` — in quel caso aggiorna qui l'estensione).
 */

export type MemoryId =
  | 'lau-ouchy'
  | 'lau-cattedrale'
  | 'lau-flon'
  | 'lau-olimpico'
  | 'lau-migros'
  | 'lau-sauvabelin'
  | 'smdm-piazza'
  | 'smdm-casa-rosa'
  | 'smdm-gabbiano'
  | 'smdm-ibba'
  | 'coc-piazza'
  | 'coc-piscina'
  | 'coc-fuochi'
  | 'coc-tavola'
  | 'coc-vicoli'
  | 'bud-danubio'
  | 'bud-parlamento'
  | 'bud-ponte'
  | 'bud-bastione'
  | 'mil-duomo'
  | 'mil-sansiro'
  | 'tor-mare'
  | 'tor-tramonto'
  | 'tor-gelato'

export interface Memory {
  city: string
  title: string
  /** testo libero: "Agosto 2025", "8 agosto 2025", "Estate 2025"... */
  date: string
  place: string
  text: string
  /** nome file dentro public/photos/ */
  photo: string
}

export const MEMORIES: Record<MemoryId, Memory> = {
  // ─── Losanna — «Dove il lago ci ha visti» ───
  'lau-ouchy': {
    city: 'Losanna',
    title: 'Il lago di Ouchy',
    date: 'Autunno 2025',
    place: 'Lungolago di Ouchy, Losanna',
    text: 'Le passeggiate lungo il lago, i cigni che ci guardavano come se sapessero tutto. Qui il tempo rallentava sempre, e a noi andava benissimo così.',
    photo: 'lau-ouchy.svg',
  },
  'lau-cattedrale': {
    city: 'Losanna',
    title: 'La Cattedrale',
    date: 'Autunno 2025',
    place: 'Cathédrale de Lausanne',
    text: 'Tutti quei gradini per arrivare in cima, e tu che ridevi del mio fiatone. Dall’alto la città sembrava piccola: noi due no.',
    photo: 'lau-cattedrale.svg',
  },
  'lau-flon': {
    city: 'Losanna',
    title: 'Le sere al Flon',
    date: 'Inverno 2025',
    place: 'Quartiere del Flon, Losanna',
    text: 'Le luci del Flon, le vetrine, il freddo che era solo una scusa per stringersi di più. Ogni angolo di quel quartiere sa qualcosa di noi.',
    photo: 'lau-flon.svg',
  },
  'lau-olimpico': {
    city: 'Losanna',
    title: 'Il Museo Olimpico',
    date: 'Inverno 2025',
    place: 'Musée Olympique, Ouchy',
    text: 'Tra fiamme olimpiche e medaglie, ho pensato che la mia vittoria più grande era camminarti accanto. Podio: primo posto, per sempre.',
    photo: 'lau-olimpico.svg',
  },
  'lau-migros': {
    city: 'Losanna',
    title: 'La nostra Migros',
    date: 'Ogni settimana',
    place: 'Una piccola Migros di Losanna',
    text: 'La spesa insieme: tu con la lista, io che aggiungevo cose a caso nel carrello. Le cose più normali, con te, sono le mie preferite.',
    photo: 'lau-migros.svg',
  },

  'lau-sauvabelin': {
    city: 'Losanna',
    title: 'La Torre di Sauvabelin',
    date: 'Autunno 2025',
    place: 'Tour de Sauvabelin, nel bosco sopra Losanna',
    text: 'Gradino di legno dopo gradino, fino sopra le cime degli alberi: il lago, le Alpi e i tetti di Losanna tutti in una volta. Il mondo, da lassù, sembrava fatto apposta per guardarlo in due.',
    photo: 'lau-sauvabelin.svg',
  },

  // ─── Santa Maria delle Mole — «Casa» ───
  'smdm-piazza': {
    city: 'Santa Maria delle Mole',
    title: 'La piazza con la rotonda',
    date: 'Estate 2025',
    place: 'Piazza di Santa Maria delle Mole',
    text: 'La rotonda, la chiesa, i giri "solo per fare due passi" che finivano sempre troppo tardi. Casa è dove il passeggio non ha orario.',
    photo: 'smdm-piazza.svg',
  },
  'smdm-casa-rosa': {
    city: 'Santa Maria delle Mole',
    title: 'Casa di Rosa',
    date: 'Da sempre',
    place: 'Casa tua',
    text: 'Il posto più bello del mondo non è in nessuna guida turistica: è il divano di casa tua, con te vicino e nessuna fretta di andare via.',
    photo: 'smdm-casa-rosa.svg',
  },
  'smdm-gabbiano': {
    city: 'Santa Maria delle Mole',
    title: 'Il Gabbiano',
    date: 'Tutto l’anno',
    place: 'Palestra "Il Gabbiano"',
    text: 'Qui voli tu: capriole, equilibri e cose che io non capisco ma guardo a bocca aperta. La mia acrobata preferita, in palestra e nella vita.',
    photo: 'smdm-gabbiano.svg',
  },
  'smdm-ibba': {
    city: 'Santa Maria delle Mole',
    title: 'Officine Ibba',
    date: 'Le domeniche',
    place: 'Caffè Officine Ibba',
    text: 'Il nostro tavolino, i cornetti, le chiacchiere che non finivano mai. Certe officine riparano motori; questa riparava le giornate storte.',
    photo: 'smdm-ibba.svg',
  },

  // ─── Cocuruzzo — «Le radici» ───
  'coc-piazza': {
    city: 'Cocuruzzo',
    title: 'La piazzetta',
    date: 'Estate 2025',
    place: 'Piazza di Cocuruzzo',
    text: 'La piazzetta dove si conoscono tutti, e dove ormai conoscono anche noi. Due sedie, un po’ d’ombra e le storie del paese: la felicità semplice.',
    photo: 'coc-piazza.svg',
  },
  'coc-piscina': {
    city: 'Cocuruzzo',
    title: 'La piscina',
    date: 'Agosto 2025',
    place: 'La piscina',
    text: 'Tuffi, schizzi e gare a chi resta di più sott’acqua (vinci sempre tu). L’estate profuma di cloro, crema solare e di noi.',
    photo: 'coc-piscina.svg',
  },
  'coc-fuochi': {
    city: 'Cocuruzzo',
    title: 'I fuochi sulla chiesetta',
    date: 'Festa del paese, estate 2025',
    place: 'Sagrato della chiesetta',
    text: 'I fuochi d’artificio sopra la chiesetta, il naso all’insù, la tua mano nella mia. Ogni scoppio un battito. Il cielo faceva festa con noi.',
    photo: 'coc-fuochi.svg',
  },
  'coc-tavola': {
    city: 'Cocuruzzo',
    title: 'A tavola!',
    date: 'Ogni volta',
    place: 'Le tavolate di Cocuruzzo',
    text: 'Antipasti che sono pranzi interi, brindisi, bis obbligatori. Qui l’amore si misura in porzioni, e con te faccio sempre il tris.',
    photo: 'coc-tavola.svg',
  },
  'coc-vicoli': {
    city: 'Cocuruzzo',
    title: 'I vicoli e le colline',
    date: 'Estate 2025',
    place: 'Vicoli e campagna di Cocuruzzo',
    text: 'I vicoli in salita, le colline tutt’intorno, i tramonti sui campi. Camminare piano, parlare piano, volersi bene forte.',
    photo: 'coc-vicoli.svg',
  },

  // ─── Budapest — «La fuga romantica» ───
  'bud-danubio': {
    city: 'Budapest',
    title: 'Il Danubio di notte',
    date: 'Primavera 2026',
    place: 'Battello sul Danubio',
    text: 'La città che scorre lenta ai lati, le luci sull’acqua, il vento tra i capelli. In mezzo al Danubio ho capito che con te andrei ovunque, anche a remi.',
    photo: 'bud-danubio.svg',
  },
  'bud-parlamento': {
    city: 'Budapest',
    title: 'Il Parlamento',
    date: 'Primavera 2026',
    place: 'Országház, Budapest',
    text: 'Tutto quell’oro e quelle guglie, e io che guardavo più te che il palazzo. Maestoso lui, ma la meraviglia vera eri tu.',
    photo: 'bud-parlamento.svg',
  },
  'bud-ponte': {
    city: 'Budapest',
    title: 'Il Ponte delle Catene',
    date: 'Primavera 2026',
    place: 'Széchenyi Lánchíd',
    text: 'Da Buda a Pest mano nella mano, i leoni di pietra a farci la guardia. I ponti uniscono le città; tu hai unito tutto il resto.',
    photo: 'bud-ponte.svg',
  },
  'bud-bastione': {
    city: 'Budapest',
    title: 'Il Bastione dei Pescatori',
    date: 'Primavera 2026',
    place: 'Halászbástya, Budapest',
    text: 'Le torri bianche come in una fiaba, la città distesa sotto di noi. Se esiste un posto fatto per le promesse, è questo. E noi le abbiamo fatte.',
    photo: 'bud-bastione.svg',
  },

  // ─── Milano — «Luci di città» ───
  'mil-duomo': {
    city: 'Milano',
    title: 'Il Duomo',
    date: 'Inverno 2026',
    place: 'Piazza del Duomo, Milano',
    text: 'Il marmo, le guglie, i piccioni prepotenti. In mezzo a tutta quella gente, la piazza sembrava comunque solo nostra.',
    photo: 'mil-duomo.svg',
  },
  'mil-sansiro': {
    city: 'Milano',
    title: 'San Siro — Bruno Mars',
    date: 'Estate 2026',
    place: 'Stadio San Siro, Milano',
    text: 'Sessantamila persone, e io che cantavo guardando te. "Just the way you are": non l’ha scritta lui, l’ha scritta per noi e non lo sa.',
    photo: 'mil-sansiro.svg',
  },

  // ─── Torvaianica — «Sale e tramonti» ───
  'tor-mare': {
    city: 'Torvaianica',
    title: 'Il nostro mare',
    date: 'Estate 2025',
    place: 'Spiaggia di Torvaianica',
    text: 'I piedi nella sabbia, le onde che contano i secondi meglio di qualsiasi orologio. Il mare di casa non sarà famoso, ma ci ha visti felici.',
    photo: 'tor-mare.svg',
  },
  'tor-tramonto': {
    city: 'Torvaianica',
    title: 'Il tramonto',
    date: 'Estate 2025',
    place: 'Riva al tramonto',
    text: 'Il sole che si scioglie nel mare e il cielo che fa i colori che piacciono a te. Restiamo "ancora cinque minuti" da un anno intero.',
    photo: 'tor-tramonto.svg',
  },
  'tor-gelato': {
    city: 'Torvaianica',
    title: 'La dolce vita',
    date: 'Estate 2025',
    place: 'Chiosco "La dolce vita"',
    text: 'Il chiosco dei gelati con il nome giusto. Tu sempre indecisa sul gusto, io sempre deciso su di te. Alla fine: due coni, un’unica dolce vita.',
    photo: 'tor-gelato.svg',
  },
}
