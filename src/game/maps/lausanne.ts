/**
 * LOSANNA — «Dove il lago ci ha visti».
 * La città dove la storia è cominciata: la Cattedrale sulla terrazza a nord,
 * il Flon a ovest, il Museo Olimpico verso il lago, la piccola Migros
 * di ogni settimana e, a sud, il Lemano con il lungolago di Ouchy.
 * In alto a destra, il bosco di Sauvabelin con la sua torre di legno:
 * un sentiero si insinua tra i pini fino alla porta.
 */
import type { Scene } from './types'
import {
  cathedralSprite,
  flonASprite,
  flonBSprite,
  museumSprite,
  migrosSprite,
  sauvabelinTowerSprite,
  gioeleFrames,
} from '../art/buildings/lausanne'

export const lausanneScene: Scene = {
  id: 'lausanne',
  name: 'Losanna — Dove il lago ci ha visti',
  width: 30,
  height: 24,
  ambience: 'day',

  legend: {
    g: { base: 'grass' },
    G: { base: 'grass2' },
    f: { base: 'flowers' },
    t: { base: 'tallGrass' },
    p: { base: 'path' },
    r: { base: 'pathStones' },
    P: { base: 'plaza' },
    c: { base: 'cobble' },
    s: { base: 'sidewalk' },
    o: { base: 'wood' },
    h: { base: 'hedge', solid: true },
    w: { base: 'water', solid: true },
    W: { base: 'deepWater', solid: true },
  },

  //           x: 012345678901234567890123456789
  ground: [
    /*  0 */ 'hhhhhhhhhhhhhhhhhhhhhggggggggh',
    /*  1 */ 'hgGggtggGgggggGgtggggggggggggh',
    /*  2 */ 'hhgGgfgggggGggtgGgggtggggggggh',
    /*  3 */ 'hgggGgggtfgggGggggtfgggggggggh',
    /*  4 */ 'ggGgtgggGggggggggggGgggtgggggh',
    /*  5 */ 'gfgggGgtGgggggggggggggggggpggh',
    /*  6 */ 'ggggggggPPPPPPPPPPPPgGgfgppgGh',
    /*  7 */ 'ggggggggPPPPPPPPPPPPggGpppgtgh',
    /*  8 */ 'ggggggggPPPPPPPPPPPPppppfgGggh',
    /*  9 */ 'ggggggggPPPPPPPPPPPPggggfgGggh',
    /* 10 */ 'sssssssssfGfrrrrgfGggGgfgtgggg',
    /* 11 */ 'cccccccccccccccccccccccccccccc',
    /* 12 */ 'cccccccccccccccccccccccccccccc',
    /* 13 */ 'gGfgggfgGggggppgfGggggggGgfggG',
    /* 14 */ 'fgtgGggfgggggppfggfggggggfgGfg',
    /* 15 */ 'gGgfgggGgggggppgggggggggGggfgG',
    /* 16 */ 'ggfgGgtgfsssgppgfggggggggfgGgf',
    /* 17 */ 'GgfgggfgGgfggppgfgsssssssggfGg',
    /* 18 */ 'ssssssssssssssssssssssssssssss',
    /* 19 */ 'ssssssssssssssssssssssssssssss',
    /* 20 */ 'gppgwwwwwwwwwoowwwwwwwwwwwwwww',
    /* 21 */ 'gppgwwWwwwwWwoowwWwwwwwWwwwwwW',
    /* 22 */ 'gppgWwwwwwWwwooWwWwwwwwwWwWwWw',
    /* 23 */ 'gppgWWWWWWWWWWWWWWWWWWWWWWWWWW',
  ],

  buildings: [
    // La Cattedrale sulla terrazza — il player passa dietro guglia e tetti
    {
      sprite: cathedralSprite,
      x: 11,
      y: 2,
      solid: { x: 0, y: 3, w: 6, h: 3 },
    },
    // Il Flon: blocco corallo…
    {
      sprite: flonASprite,
      x: 1,
      y: 6,
      solid: { x: 0, y: 2, w: 4, h: 2 },
    },
    // …e torre viola con la caffetteria
    {
      sprite: flonBSprite,
      x: 5,
      y: 7,
      solid: { x: 0, y: 2, w: 3, h: 2 },
    },
    // La piccola Migros di ogni settimana
    {
      sprite: migrosSprite,
      x: 9,
      y: 13,
      solid: { x: 0, y: 1, w: 3, h: 2 },
    },
    // Il Museo Olimpico, bianco verso il lago
    {
      sprite: museumSprite,
      x: 19,
      y: 13,
      solid: { x: 0, y: 2, w: 5, h: 2 },
    },
    // La Torre di Sauvabelin, di legno sopra il bosco: la porta in basso
    // resta libera, l'exit è sul sentiero davanti all'ingresso
    {
      sprite: sauvabelinTowerSprite,
      x: 25,
      y: 0,
      solid: { x: 0, y: 3, w: 3, h: 2 },
    },
  ],

  props: [
    // il bosco di Sauvabelin, fitto sul bordo nord
    { prop: 'pine', x: 1, y: 1 },
    { prop: 'pine', x: 4, y: 1 },
    { prop: 'pine', x: 9, y: 1 },
    { prop: 'pine', x: 5, y: 3 },
    { prop: 'pine', x: 2, y: 4 },
    { prop: 'pine', x: 0, y: 5 },
    { prop: 'tree', x: 7, y: 5 },
    { prop: 'pine', x: 8, y: 2 },
    { prop: 'tree', x: 18, y: 5 },
    { prop: 'pine', x: 19, y: 1 },
    { prop: 'pine', x: 23, y: 1 },
    { prop: 'pine', x: 28, y: 1 },
    { prop: 'pine', x: 21, y: 2 },
    { prop: 'pine', x: 20, y: 3 },
    { prop: 'pine', x: 23, y: 4 },
    { prop: 'pine', x: 28, y: 4 },
    { prop: 'bush', x: 21, y: 7 },
    { prop: 'pine', x: 28, y: 7 },
    { prop: 'bush', x: 25, y: 8 },
    { prop: 'pine', x: 26, y: 9 },
    // terrazza della Cattedrale
    { prop: 'pot', x: 8, y: 6 },
    { prop: 'pot', x: 19, y: 6 },
    { prop: 'lamp', x: 9, y: 7 },
    { prop: 'lamp', x: 18, y: 7 },
    { prop: 'fountain', x: 17, y: 9 },
    { prop: 'roseBush', x: 11, y: 10 },
    { prop: 'roseBush', x: 16, y: 10 },
    // verde di mezzo
    { prop: 'bush', x: 0, y: 13 },
    { prop: 'tree', x: 1, y: 14 },
    { prop: 'flowerPatch', x: 3, y: 14 },
    { prop: 'tree', x: 5, y: 16 },
    { prop: 'bush', x: 8, y: 14 },
    { prop: 'cat', x: 12, y: 14 },
    { prop: 'flowerPatch', x: 15, y: 13 },
    { prop: 'flowerPatch', x: 16, y: 16 },
    { prop: 'bush', x: 27, y: 13 },
    { prop: 'flowerPatch', x: 25, y: 14 },
    // il piazzale del Museo Olimpico: fiamma e fontana
    { prop: 'statue', x: 17, y: 17 },
    { prop: 'fountain', x: 24, y: 17 },
    // lungolago di Ouchy
    { prop: 'pot', x: 0, y: 18 },
    { prop: 'lamp', x: 4, y: 18 },
    { prop: 'bench', x: 6, y: 18 },
    { prop: 'lamp', x: 10, y: 18 },
    { prop: 'lamp', x: 16, y: 18 },
    { prop: 'bench', x: 18, y: 18 },
    { prop: 'lamp', x: 22, y: 18 },
    { prop: 'lamp', x: 26, y: 18 },
    { prop: 'pot', x: 27, y: 18 },
    { prop: 'gull', x: 5, y: 19 },
    { prop: 'gull', x: 14, y: 19 },
    // il Lemano: boe e gabbiani
    { prop: 'buoy', x: 6, y: 21 },
    { prop: 'gull', x: 9, y: 21 },
    { prop: 'gull', x: 17, y: 21 },
    { prop: 'gull', x: 21, y: 20 },
    { prop: 'buoy', x: 22, y: 22 },
    { prop: 'buoy', x: 25, y: 20 },
  ],

  signs: [
    {
      x: 9,
      y: 8,
      label: 'Cattedrale di Losanna',
      lines: [
        'Gotica, antica, piena di gradini.',
        'Quel fiatone in cima ce lo ricordiamo ancora: la città piccola piccola…',
        '…e noi due, lassù, per niente.',
      ],
      memoryId: 'lau-cattedrale',
    },
    {
      x: 13,
      y: 7,
      kind: 'none',
      label: 'Il portone della Cattedrale',
      lines: ['È socchiuso: dentro, un silenzio che profuma di candele.'],
    },
    {
      x: 8,
      y: 10,
      label: 'Quartiere del Flon',
      lines: [
        'Vetrine, luci e musica bassa.',
        'Il freddo, qui, era solo una scusa per stringersi di più.',
      ],
      memoryId: 'lau-flon',
    },
    {
      x: 12,
      y: 15,
      label: 'La nostra Migros',
      lines: [
        'Sconti sul cioccolato quasi ogni giorno.',
        'Una lista della spesa, e mille sorprese nel carrello.',
      ],
      memoryId: 'lau-migros',
    },
    {
      x: 18,
      y: 16,
      label: 'Museo Olimpico',
      lines: [
        'Fiamme, medaglie, record del mondo.',
        'Eppure il podio più bello resta camminare accanto a te.',
      ],
      memoryId: 'lau-olimpico',
    },
    {
      x: 13,
      y: 23,
      kind: 'none',
      label: 'Il lago di Ouchy',
      lines: [
        'Il Lemano è così calmo che sembra ascoltare.',
        'Qui il tempo rallentava sempre — e a noi andava benissimo così.',
      ],
      memoryId: 'lau-ouchy',
    },
    // il cartello di legno alla base della torre
    {
      x: 25,
      y: 5,
      label: 'Torre di Sauvabelin',
      lines: [
        '302 gradini di legno fino al cielo.',
        'Su, su, su: il panorama ripaga tutto. Anche il fiatone.',
      ],
    },
  ],

  npcs: [
    {
      character: 'npcWoman',
      x: 11,
      y: 19,
      dir: 'down',
      wander: true,
      label: 'Signora al lago',
      lines: [
        'I cigni di Ouchy conoscono tutte le storie del lungolago.',
        'La vostra, dicono, è una delle belle.',
      ],
    },
    {
      character: 'npcMan',
      x: 10,
      y: 16,
      dir: 'down',
      label: 'Cliente della Migros',
      lines: [
        'Anche oggi sconti sul cioccolato…',
        'Tanto qualcosa in più nel carrello ci finisce sempre, eh?',
      ],
    },
    {
      character: 'npcKid',
      x: 16,
      y: 14,
      dir: 'left',
      wander: true,
      label: 'Piccolo campione',
      lines: [
        "Da grande vincerò l'oro olimpico!",
        'Per ora mi alleno a correre fino al lago.',
      ],
    },
    // Gioele, lo scienziato pazzo, vaga per la città
    {
      character: 'npcMan',
      custom: gioeleFrames,
      x: 5,
      y: 13,
      dir: 'down',
      wander: true,
      label: 'Gioele',
      lines: [
        'Il paper! Devo risottomettere il paper! I reviewer non hanno capito NIENTE.',
        'Secondo i miei calcoli, la scienza mi deve già tre lauree.',
        'Scusa, pensavo ad alta voce. …O forse no?',
      ],
    },
  ],

  exits: [
    // la stradina che scende oltre il lungolago, verso il mondo
    { x: 0, y: 23, w: 4, h: 1, to: 'overworld' },
    // la porta della torre: si sale! (spawn: quello della scena)
    { x: 26, y: 5, w: 1, h: 1, to: 'sauvabelin' },
  ],

  spawn: { x: 2, y: 22, dir: 'up' },
}
