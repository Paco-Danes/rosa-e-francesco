/**
 * SANTA MARIA DELLE MOLE — «Casa», il paese del cuore di Rosa.
 *
 * La scena più affettuosa del gioco: la piazza con la rotonda e la chiesa,
 * la casetta di Rosa con le rose rampicanti e il gatto sul vialetto, la
 * palestra "Il Gabbiano" dove vola l'acrobata, il caffè "Officine Ibba"
 * delle domeniche lente. Petali di rosa cadono sul giardino di casa.
 *
 * Legenda ground:  g erba · e erba con ciuffi · t erba alta · f fiorellini
 *                  p sentiero · S sentiero coi sassi · s marciapiede
 *                  a asfalto · P sagrato/piazza · c ciottolato · h siepe
 */
import type { Scene } from './types'
import {
  smdmCasaRosa,
  smdmChiesa,
  smdmGabbiano,
  smdmIbba,
  smdmNoemi,
  smdmRamona,
} from '../art/buildings/smdm'

export const smdmScene: Scene = {
  id: 'smdm',
  name: 'Santa Maria delle Mole — Casa',
  width: 28,
  height: 20,
  ambience: 'day',
  legend: {
    g: { base: 'grass' },
    e: { base: 'grass2' },
    t: { base: 'tallGrass' },
    f: { base: 'flowers' },
    p: { base: 'path' },
    S: { base: 'pathStones' },
    s: { base: 'sidewalk' },
    a: { base: 'asphalt' },
    P: { base: 'plaza' },
    c: { base: 'cobble' },
    h: { base: 'hedge', solid: true },
  },
  //         0123456789012345678901234567
  ground: [
    'hhhhhhhhhhhhhhhhhhhhhhhhhhhh', //  0  siepe di confine
    'hfggggfgeggfggegfggggggggggh', //  1  giardino di casa · retro chiesa
    'hggggggggfegggggeggggggggggh', //  2
    'hfgggggeggfgfggeggfggggggggh', //  3
    'hgggggfggegggeggfggeggggggfh', //  4
    'hfgggggfgggeggfggegggggggggh', //  5
    'hggppgggfgeggfgggfegggggggfh', //  6  porta di casa Rosa
    'ggepppppppppssssssssPPPPPPgg', //  7  viale + sagrato della chiesa
    'gegpppppppppsaaaaaaaaasggggg', //  8  anello nord della rotonda
    'ggggggggegggsaaaaaaaaasggggg', //  9
    'gggggggfggegsaaafffaaasggggg', // 10  aiuola della rotonda
    'gggggggggeggsaaafffaaasggggg', // 11
    'ggggggggggfesaaafffaaasccccc', // 12  dehors delle Officine
    'gpppppppppppsaaaaaaaaasccccc', // 13  davanti alla palestra
    'gpppppppppppsaaaaaaaaasccccc', // 14  anello sud
    'gggegggtgeggssssaasssssgggeg', // 15  attraversamento pedonale
    'tgeSSSSSSSSSSSSsaasggeggfggt', // 16  vialetto del parco
    'tegSSSSSSSSSSSSsaasgegtggggt', // 17
    'tggegfggggeggfgsaasegtgfgegt', // 18
    'ttggeggtgggegggaaaaggetgggtt', // 19  uscita verso il mondo
  ],
  buildings: [
    // Casa di Rosa: la casetta più adorabile, il tetto rosso e le rose
    { sprite: smdmCasaRosa, x: 2, y: 1, solid: { x: 0, y: 2, w: 4, h: 3 } },
    // La chiesa di travertino affacciata sul sagrato della piazza
    { sprite: smdmChiesa, x: 20, y: 1, solid: { x: 0, y: 3, w: 6, h: 3 } },
    // Palestra "Il Gabbiano", dove Rosa vola
    { sprite: smdmGabbiano, x: 1, y: 9, solid: { x: 0, y: 2, w: 6, h: 2 } },
    // Caffè "Officine Ibba", mattoni e cornetti
    { sprite: smdmIbba, x: 23, y: 8, solid: { x: 0, y: 2, w: 5, h: 2 } },
  ],
  props: [
    // giardino di casa Rosa
    { prop: 'tree', x: 7, y: 2 },
    { prop: 'tree', x: 10, y: 4 },
    { prop: 'roseBush', x: 2, y: 6 },
    { prop: 'roseBush', x: 5, y: 6 },
    { prop: 'flowerPatch', x: 9, y: 6 },
    { prop: 'flowerPatch', x: 13, y: 3 },
    { prop: 'bush', x: 14, y: 2 },
    { prop: 'bush', x: 17, y: 3 },
    { prop: 'cat', x: 3, y: 7 },
    // chiesa e sagrato
    { prop: 'cypress', x: 19, y: 2 },
    { prop: 'cypress', x: 26, y: 2 },
    { prop: 'bench', x: 13, y: 7 },
    { prop: 'lamp', x: 12, y: 7 },
    // la rotonda: aiuola con la statuina e le rose
    { prop: 'statue', x: 17, y: 11 },
    { prop: 'roseBush', x: 18, y: 10 },
    { prop: 'roseBush', x: 16, y: 12 },
    // palestra "Il Gabbiano"
    { prop: 'pot', x: 2, y: 13 },
    { prop: 'pot', x: 5, y: 13 },
    { prop: 'gull', x: 7, y: 12 },
    { prop: 'gull', x: 9, y: 10 },
    // dehors delle Officine Ibba
    { prop: 'table', x: 23, y: 13 },
    { prop: 'table', x: 26, y: 13 },
    { prop: 'pot', x: 27, y: 12 },
    { prop: 'barrel', x: 27, y: 14 },
    // parco a sud e viale d'ingresso
    { prop: 'lamp', x: 12, y: 15 },
    { prop: 'lamp', x: 22, y: 15 },
    { prop: 'lamp', x: 18, y: 17 },
    { prop: 'tree', x: 1, y: 15 },
    { prop: 'bench', x: 5, y: 15 },
    { prop: 'tree', x: 8, y: 18 },
    { prop: 'flowerPatch', x: 5, y: 18 },
    { prop: 'bench', x: 24, y: 15 },
    { prop: 'olive', x: 20, y: 16 },
    { prop: 'pine', x: 26, y: 16 },
    { prop: 'flowerPatch', x: 24, y: 16 },
    { prop: 'tree', x: 24, y: 17 },
  ],
  signs: [
    {
      x: 16,
      y: 10,
      label: 'La piazza con la rotonda',
      lines: [
        'La rotonda, i lampioni, il giro lento della piazza.',
        '«Due passi e torniamo», dicevi. Non sono mai stati solo due.',
      ],
      memoryId: 'smdm-piazza',
    },
    {
      x: 4,
      y: 6,
      kind: 'none',
      label: 'Casa di Rosa',
      lines: [
        'Le rose sul muro, le finestre accese, il gatto sul vialetto.',
        'Il posto più bello del mondo non è su nessuna mappa.',
        'È qui, dove ci sei tu.',
      ],
      memoryId: 'smdm-casa-rosa',
    },
    {
      x: 6,
      y: 13,
      label: 'Palestra "Il Gabbiano"',
      lines: [
        'Qui dentro vola un\'acrobata.',
        'Capriole, equilibri impossibili — e io, a bocca aperta, col cuore in gola.',
      ],
      memoryId: 'smdm-gabbiano',
    },
    {
      x: 25,
      y: 13,
      label: 'Officine Ibba',
      lines: [
        'Il nostro tavolino è quello vicino alla vetrina.',
        'Cornetti caldi, chiacchiere lente e domeniche che non volevano finire.',
      ],
      memoryId: 'smdm-ibba',
    },
    {
      x: 23,
      y: 7,
      kind: 'none',
      label: 'La chiesa sulla piazza',
      lines: [
        'Il campanile scandisce le ore, ma qui il tempo va più piano.',
        'Una candela accesa, per noi.',
      ],
    },
  ],
  npcs: [
    {
      character: 'npcNonna',
      x: 20,
      y: 7,
      dir: 'down',
      wander: true,
      label: 'Nonna in piazza',
      lines: [
        'Che bella coppia che siete…',
        'Vi guardo e mi torna in mente il mio Peppino, tanti anni fa.',
      ],
    },
    {
      character: 'npcKid',
      x: 15,
      y: 9,
      dir: 'right',
      wander: true,
      label: 'Bimbo di corsa',
      lines: ['Dieci giri della rotonda senza fermarmi! Contali!', 'Pronti… via!'],
    },
    {
      character: 'npcMan',
      x: 26,
      y: 14,
      dir: 'left',
      label: 'Il barista delle Officine',
      lines: ['Il solito tavolino? Ve lo tengo sempre da parte.', 'Due cornetti, lo so già.'],
    },
    {
      character: 'npcWoman',
      custom: smdmRamona,
      x: 3,
      y: 13,
      dir: 'down',
      label: 'Ramona',
      lines: [
        'Benvenuti al Gabbiano! Scarpe pulite, mi raccomando.',
        'NOEMI! Chi ha messo i tappetini al contrario?!',
        'Quella ragazza… un disastro al giorno. Però le voglio bene.',
      ],
    },
    {
      character: 'npcWoman',
      custom: smdmNoemi,
      x: 7,
      y: 14,
      dir: 'down',
      label: 'Noemi',
      lines: [
        'Ci siamo divertiti un sacco, la Crociera è bellipfsssima,',
        'ah comunque non ci pfsono per 20 giorni che vado alle terme',
        'ma ricordatevi che sono laureata pfzzzs pfzzss',
      ],
    },
  ],
  exits: [{ x: 15, y: 19, w: 4, h: 1, to: 'overworld' }],
  spawn: { x: 16, y: 18, dir: 'up' },
  effects: [{ type: 'petals', x: 0, y: 0, w: 12, h: 9 }],
}
