/**
 * CONTENUTI — le memory card aperte dai cartelli nel gioco.
 *
 * ✏️ PER FRANCESCO: questo è IL file da personalizzare.
 * Cambia titoli, date e testi come vuoi. `photos` è un mazzo di foto
 * (file dentro `public/photos/`): la prima è quella in copertina, le altre
 * si sfogliano come un mazzo di polaroid. Aggiungere una foto = aggiungere
 * il file e il nome qui.
 * Foto verticali: aggiungi '#top' o '#bottom' al nome (es. 'foto.jpg#top') per
 * dire quale bordo tenere quando la card la ritaglia in 4:3.
 */

export type MemoryId =
  | 'lau-ouchy'
  | 'lau-cattedrale'
  | 'lau-flon'
  | 'lau-olimpico'
  | 'lau-sauvabelin'
  | 'smdm-piazza'
  | 'smdm-casa-rosa'
  | 'smdm-gabbiano'
  | 'smdm-colosseo'
  | 'smdm-ovindoli'
  | 'smdm-laghi'
  | 'coc-piazza'
  | 'coc-piscina'
  | 'coc-fuochi'
  | 'coc-tavola'
  | 'coc-vicoli'
  | 'bud-danubio'
  | 'bud-parlamento'
  | 'bud-ponte'
  | 'bud-bastione'
  | 'bud-ghiaccio'
  | 'mil-duomo'
  | 'mil-sansiro'
  | 'mil-michelangelo'
  | 'tor-mare'
  | 'tor-tramonto'
  | 'tor-gelato'
  | 'tor-kebab'

export interface Memory {
  city: string
  title: string
  /** testo libero: "Agosto 2025", "8 agosto 2025", "Estate 2025"... */
  date: string
  place: string
  text: string
  /** nomi file dentro public/photos/ — la prima è la copertina */
  photos: string[]
}

export const MEMORIES: Record<MemoryId, Memory> = {
  // ─── Losanna — «Dove il lago ci ha visti» ───
  'lau-ouchy': {
    city: 'Losanna',
    title: 'Il lago di Ouchy',
    date: 'Autunno 2025',
    place: 'Lungolago di Ouchy, Losanna',
    text: 'Le passeggiate lungo il lago, i cigni che ci guardavano come se sapessero tutto. Qui il tempo rallentava sempre, e a noi andava benissimo così.',
    photos: ['lau-ouchy.svg'],
  },
  'lau-cattedrale': {
    city: 'Losanna',
    title: 'La Cattedrale',
    date: 'Autunno 2025',
    place: 'Cathédrale de Lausanne',
    text: 'Tutti quei gradini per arrivare in cima, e tu che ridevi del mio fiatone. Dall’alto la città sembrava piccola: noi due no.',
    photos: ['losanna_cattedrale.jpg'],
  },
  'lau-flon': {
    city: 'Losanna',
    title: 'Le sere al Flon',
    date: 'Inverno 2025',
    place: 'Quartiere del Flon, Losanna',
    text: 'Le luci del Flon, le vetrine, il freddo che era solo una scusa per stringersi di più. Ogni angolo di quel quartiere sa qualcosa di noi.',
    photos: ['losanna_flon.jpg'],
  },
  'lau-olimpico': {
    city: 'Losanna',
    title: 'Il Museo Olimpico',
    date: 'Inverno 2025',
    place: 'Musée Olympique, Ouchy',
    text: 'Tra fiamme olimpiche e medaglie, ho pensato che la mia vittoria più grande era camminarti accanto. Podio: primo posto, per sempre.',
    photos: ['lau_olympic.jpg'],
  },
  'lau-sauvabelin': {
    city: 'Losanna',
    title: 'La Torre di Sauvabelin',
    date: 'Autunno 2025',
    place: 'Tour de Sauvabelin, nel bosco sopra Losanna',
    text: 'Gradino di legno dopo gradino, fino sopra le cime degli alberi: il lago, le Alpi e i tetti di Losanna tutti in una volta. Il mondo, da lassù, sembrava fatto apposta per guardarlo in due.',
    photos: ['torre_losanna.jpg'],
  },

  // ─── Roma, Santa Maria e dintorni — «Casa» ───
  'smdm-piazza': {
    city: 'Santa Maria delle Mole',
    title: 'La piazza con la rotonda',
    date: 'Estate 2025',
    place: 'Piazza di Santa Maria delle Mole',
    text: 'La rotonda, la chiesa, i giri "solo per fare due passi" che finivano sempre troppo tardi. Casa è dove il passeggio non ha orario.',
    photos: ['smdm_1.jpg', 'smdm_2.jpg'],
  },
  'smdm-casa-rosa': {
    city: 'Santa Maria delle Mole',
    title: 'La nostra casa',
    date: 'Da sempre',
    place: 'Casa',
    text: 'Il posto più bello del mondo non è in nessuna guida turistica: è casa, con i dolci in forno, gli specchi complici e nessuna fretta di andare via.',
    photos: ['smdm_4.jpg', 'smdm_6.jpg', 'smdm_7.jpg'],
  },
  'smdm-gabbiano': {
    city: 'Santa Maria delle Mole',
    title: 'Il Gabbiano',
    date: 'Tutto l’anno',
    place: 'Palestra "Il Gabbiano"',
    text: 'Qui voli tu: capriole, equilibri e cose che io non capisco ma guardo a bocca aperta. La mia acrobata preferita, in palestra e nella vita.',
    photos: ['gabbiano_1.jpg#top', 'gabbiano_2.jpg', 'gabbiano_3.jpg', 'smdm_8_funny.jpg'],
  },
  'smdm-colosseo': {
    city: 'Roma',
    title: 'Il Colosseo',
    date: 'Un sabato a Roma',
    place: 'Roma, centro del mondo',
    text: 'La città eterna, i gladiatori, e noi due con le mani in pasta: la nostra pizza, impastata ridendo. Roma è antica; noi, nuovissimi.',
    photos: ['rome_colosseum.jpg', 'rome_pizzamaking.jpg'],
  },
  'smdm-ovindoli': {
    city: 'Ovindoli',
    title: 'La neve di Ovindoli',
    date: 'Inverno 2026',
    place: 'Ovindoli, tra le montagne',
    text: 'La neve che scricchiola, la cabinovia che sale piano, i guanti che non bastano mai. Il freddo fuori, e noi due caldissimi.',
    photos: ['ovindoli_snow.jpg'],
  },
  'smdm-laghi': {
    city: 'Castelli Romani',
    title: 'I laghi di Albano e Nemi',
    date: 'Le domeniche d’oro',
    place: 'Lago Albano e lago di Nemi',
    text: 'Due laghi vicini vicini, come noi: ognuno col suo carattere, bellissimi insieme. Le fragoline, i belvedere, l’acqua che luccica.',
    photos: ['smdm_5.jpg', 'albano_lake.jpg', 'nemi_lake.jpg', 'smdm_3.jpg'],
  },

  // ─── Cocuruzzo — «Le radici» ───
  'coc-piazza': {
    city: 'Cocuruzzo',
    title: 'La piazzetta',
    date: 'Estate 2025',
    place: 'Piazza di Cocuruzzo',
    text: 'La piazzetta dove si conoscono tutti, e dove ormai conoscono anche noi. Due sedie, un po’ d’ombra e le storie del paese: la felicità semplice.',
    photos: ['cocu_1.jpg'],
  },
  'coc-piscina': {
    city: 'Cocuruzzo',
    title: 'La piscina',
    date: 'Agosto 2025',
    place: 'La piscina',
    text: 'Tuffi, schizzi e gare a chi resta di più sott’acqua (vinci sempre tu). L’estate profuma di cloro, crema solare e di noi.',
    photos: ['cocu_4.jpg#top'],
  },
  'coc-fuochi': {
    city: 'Cocuruzzo',
    title: 'I fuochi sulla chiesetta',
    date: 'Festa del paese, estate 2025',
    place: 'Sagrato della chiesetta',
    text: 'I fuochi d’artificio sopra la chiesetta, il naso all’insù, la tua mano nella mia. Ogni scoppio un battito. Il cielo faceva festa con noi.',
    photos: ['coc-fuochi.svg'],
  },
  'coc-tavola': {
    city: 'Cocuruzzo',
    title: 'A tavola!',
    date: 'Ogni volta',
    place: 'Le tavolate di Cocuruzzo',
    text: 'Antipasti che sono pranzi interi, brindisi, bis obbligatori. Qui l’amore si misura in porzioni, e con te faccio sempre il tris.',
    photos: ['cocu_a_tavola_1.jpg', 'cocu_a_tavola_2.jpg'],
  },
  'coc-vicoli': {
    city: 'Cocuruzzo',
    title: 'I vicoli e le colline',
    date: 'Estate 2025',
    place: 'Vicoli e campagna di Cocuruzzo',
    text: 'I vicoli in salita, le colline tutt’intorno, i tramonti sui campi. Camminare piano, parlare piano, volersi bene forte.',
    photos: ['cocu_2.jpg', 'cocu_5.jpg', 'cocu_3.jpg'],
  },

  // ─── Budapest — «La fuga romantica» ───
  'bud-danubio': {
    city: 'Budapest',
    title: 'Il Danubio di notte',
    date: 'Primavera 2026',
    place: 'Battello sul Danubio',
    text: 'La città che scorre lenta ai lati, le luci sull’acqua, il vento tra i capelli. In mezzo al Danubio ho capito che con te andrei ovunque, anche a remi.',
    photos: ['bud-danubio.svg'],
  },
  'bud-parlamento': {
    city: 'Budapest',
    title: 'Il Parlamento',
    date: 'Primavera 2026',
    place: 'Országház, Budapest',
    text: 'Tutto quell’oro e quelle guglie, e io che guardavo più te che il palazzo. Maestoso lui, ma la meraviglia vera eri tu.',
    photos: ['buda_parliament.jpg'],
  },
  'bud-ponte': {
    city: 'Budapest',
    title: 'Il Ponte delle Catene',
    date: 'Primavera 2026',
    place: 'Széchenyi Lánchíd',
    text: 'Da Buda a Pest mano nella mano, i leoni di pietra a farci la guardia. I ponti uniscono le città; tu hai unito tutto il resto.',
    photos: ['buda_bridge.jpg'],
  },
  'bud-bastione': {
    city: 'Budapest',
    title: 'Il Bastione dei Pescatori',
    date: 'Primavera 2026',
    place: 'Halászbástya, Budapest',
    text: 'Le torri bianche come in una fiaba, la città distesa sotto di noi. Se esiste un posto fatto per le promesse, è questo. E noi le abbiamo fatte.',
    photos: ['buda_bastion.jpg'],
  },
  'bud-ghiaccio': {
    city: 'Budapest',
    title: 'La pista di ghiaccio',
    date: 'Inverno a Budapest',
    place: 'La pista sotto la ruota panoramica',
    text: 'Pattini ai piedi, mani strette per non cadere (o per la scusa di tenersi). E la ruota illuminata a guardarci girare, un giro dopo l’altro.',
    photos: ['buda_skii.jpg', 'buda_skii_2.jpg'],
  },

  // ─── Milano — «Luci di città» ───
  'mil-duomo': {
    city: 'Milano',
    title: 'Il Duomo',
    date: 'Inverno 2026',
    place: 'Piazza del Duomo, Milano',
    text: 'Il marmo, le guglie, i piccioni prepotenti. In mezzo a tutta quella gente, la piazza sembrava comunque solo nostra.',
    photos: ['mil-duomo.svg'],
  },
  'mil-sansiro': {
    city: 'Milano',
    title: 'San Siro — Bruno Mars',
    date: 'Estate 2026',
    place: 'Stadio San Siro, Milano',
    text: 'Sessantamila persone, e io che cantavo guardando te. "Just the way you are": non l’ha scritta lui, l’ha scritta per noi e non lo sa.',
    photos: ['sansiro_milano.jpg'],
  },

  'mil-michelangelo': {
    city: 'Milano',
    title: 'Casa di Michelangelo',
    date: 'Un pomeriggio qualunque',
    place: 'Il piccolo appartamento di Michelangelo, Milano',
    text: 'Un divano, due chiacchiere e il guacamole di Michelangelo — tecnicamente in malattia, praticamente in cucina. Le case degli amici sono le tappe più belle dei viaggi.',
    photos: ['casa_michelangelo.jpg'],
  },

  // ─── Torvaianica — «Sale e tramonti» ───
  'tor-mare': {
    city: 'Torvaianica',
    title: 'Il nostro mare',
    date: 'Estate 2025',
    place: 'Spiaggia di Torvaianica',
    text: 'I piedi nella sabbia, le onde che contano i secondi meglio di qualsiasi orologio. Il mare di casa non sarà famoso, ma ci ha visti felici.',
    photos: ['torva_1.jpg', 'torva_2.jpg'],
  },
  'tor-tramonto': {
    city: 'Torvaianica',
    title: 'Il tramonto',
    date: 'Estate 2025',
    place: 'Riva al tramonto',
    text: 'Il sole che si scioglie nel mare e il cielo che fa i colori che piacciono a te. Restiamo "ancora cinque minuti" da un anno intero.',
    photos: ['torva_4.jpg', 'torva_1.jpg', 'torva_7.jpg', 'torva_8.jpg'],
  },
  'tor-gelato': {
    city: 'Torvaianica',
    title: 'La dolce vita',
    date: 'Estate 2025',
    place: 'Chiosco "La dolce vita"',
    text: 'Il chiosco dei gelati con il nome giusto. Tu sempre indecisa sul gusto, io sempre deciso su di te. Alla fine: due coni, un’unica dolce vita.',
    photos: ['torva_3.jpg'],
  },
  'tor-kebab': {
    city: 'Torvaianica',
    title: 'Il Kebabbaro',
    date: 'Le sere d’estate',
    place: 'Il kebabbaro di Torvaianica',
    text: 'Salsa yogurt, patatine dentro, e la fame di chi ha passato la giornata al mare. I tavolini fuori, il sole che scende: il ristorante stellato del nostro cuore.',
    photos: ['kebab.jpg'],
  },
}
