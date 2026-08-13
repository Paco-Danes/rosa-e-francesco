/**
 * LOSANNA — «Dove il lago ci ha visti».
 * La città dove la storia è cominciata: la Cattedrale sulla terrazza a nord,
 * il Flon a ovest, il Museo Olimpico verso il lago, la piccola Migros
 * di ogni settimana e, a sud, il Lemano con il lungolago di Ouchy.
 */
import type { Scene } from './types'
import {
  cathedralSprite,
  flonASprite,
  flonBSprite,
  museumSprite,
  migrosSprite,
} from '../art/buildings/lausanne'

export const lausanneScene: Scene = {
  id: 'lausanne',
  name: 'Losanna — Dove il lago ci ha visti',
  width: 28,
  height: 22,
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

  //           x: 0123456789012345678901234567
  ground: [
    /*  0 */ 'hhgGgfgggggGggtgGggfgGgggghh',
    /*  1 */ 'hgggGgggtfgggGggggtfgggGgggh',
    /*  2 */ 'ggGgtgggGggggggggggGgggtgGgg',
    /*  3 */ 'gfgggGgtGgggggggggggtgGgfggg',
    /*  4 */ 'ggggggggPPPPPPPPPPPPgGgfggGg',
    /*  5 */ 'ggggggggPPPPPPPPPPPPggGggtgg',
    /*  6 */ 'ggggggggPPPPPPPPPPPPgfggGggg',
    /*  7 */ 'ggggggggPPPPPPPPPPPPggggfgGg',
    /*  8 */ 'sssssssssfGfrrrrgfGggGgfgtgg',
    /*  9 */ 'cccccccccccccccccccccccccccc',
    /* 10 */ 'cccccccccccccccccccccccccccc',
    /* 11 */ 'gGfgggfgGggggppgfGggggggGgfg',
    /* 12 */ 'fgtgGggfgggggppfggfggggggfgG',
    /* 13 */ 'gGgfgggGgggggppgggggggggGggf',
    /* 14 */ 'ggfgGgtgfsssgppgfggggggggfgG',
    /* 15 */ 'GgfgggfgGgfggppgfgsssssssggf',
    /* 16 */ 'ssssssssssssssssssssssssssss',
    /* 17 */ 'ssssssssssssssssssssssssssss',
    /* 18 */ 'gppgwwwwwwwwwoowwwwwwwwwwwww',
    /* 19 */ 'gppgwwWwwwwWwoowwWwwwwwWwwww',
    /* 20 */ 'gppgWwwwwwWwwooWwWwwwwwwWwWw',
    /* 21 */ 'gppgWWWWWWWWWWWWWWWWWWWWWWWW',
  ],

  buildings: [
    // La Cattedrale sulla terrazza — il player passa dietro guglia e tetti
    {
      sprite: cathedralSprite,
      x: 11,
      y: 0,
      solid: { x: 0, y: 3, w: 6, h: 3 },
    },
    // Il Flon: blocco corallo…
    {
      sprite: flonASprite,
      x: 1,
      y: 4,
      solid: { x: 0, y: 2, w: 4, h: 2 },
    },
    // …e torre viola con la caffetteria
    {
      sprite: flonBSprite,
      x: 5,
      y: 5,
      solid: { x: 0, y: 2, w: 3, h: 2 },
    },
    // La piccola Migros di ogni settimana
    {
      sprite: migrosSprite,
      x: 9,
      y: 11,
      solid: { x: 0, y: 1, w: 3, h: 2 },
    },
    // Il Museo Olimpico, bianco verso il lago
    {
      sprite: museumSprite,
      x: 19,
      y: 11,
      solid: { x: 0, y: 2, w: 5, h: 2 },
    },
  ],

  props: [
    // pini ordinati (molto svizzeri) sul bordo nord
    { prop: 'pine', x: 0, y: 3 },
    { prop: 'pine', x: 2, y: 2 },
    { prop: 'pine', x: 5, y: 1 },
    { prop: 'tree', x: 7, y: 3 },
    { prop: 'tree', x: 18, y: 3 },
    { prop: 'pine', x: 20, y: 1 },
    { prop: 'pine', x: 23, y: 2 },
    { prop: 'pine', x: 26, y: 3 },
    { prop: 'pine', x: 26, y: 7 },
    { prop: 'bush', x: 21, y: 5 },
    { prop: 'bush', x: 25, y: 6 },
    // terrazza della Cattedrale
    { prop: 'pot', x: 8, y: 4 },
    { prop: 'pot', x: 19, y: 4 },
    { prop: 'lamp', x: 9, y: 5 },
    { prop: 'lamp', x: 18, y: 5 },
    { prop: 'fountain', x: 17, y: 7 },
    { prop: 'roseBush', x: 11, y: 8 },
    { prop: 'roseBush', x: 16, y: 8 },
    // verde di mezzo
    { prop: 'bush', x: 0, y: 11 },
    { prop: 'tree', x: 1, y: 12 },
    { prop: 'flowerPatch', x: 3, y: 12 },
    { prop: 'tree', x: 5, y: 14 },
    { prop: 'bush', x: 8, y: 12 },
    { prop: 'cat', x: 12, y: 12 },
    { prop: 'flowerPatch', x: 15, y: 11 },
    { prop: 'flowerPatch', x: 16, y: 14 },
    { prop: 'bush', x: 27, y: 11 },
    { prop: 'flowerPatch', x: 25, y: 12 },
    // il piazzale del Museo Olimpico: fiamma e fontana
    { prop: 'statue', x: 17, y: 15 },
    { prop: 'fountain', x: 24, y: 15 },
    // lungolago di Ouchy
    { prop: 'pot', x: 0, y: 16 },
    { prop: 'lamp', x: 4, y: 16 },
    { prop: 'bench', x: 6, y: 16 },
    { prop: 'lamp', x: 10, y: 16 },
    { prop: 'lamp', x: 16, y: 16 },
    { prop: 'bench', x: 18, y: 16 },
    { prop: 'lamp', x: 22, y: 16 },
    { prop: 'lamp', x: 26, y: 16 },
    { prop: 'pot', x: 27, y: 16 },
    { prop: 'gull', x: 5, y: 17 },
    { prop: 'gull', x: 14, y: 17 },
    // il Lemano: boe e gabbiani
    { prop: 'buoy', x: 6, y: 19 },
    { prop: 'gull', x: 9, y: 19 },
    { prop: 'gull', x: 17, y: 19 },
    { prop: 'gull', x: 21, y: 18 },
    { prop: 'buoy', x: 22, y: 20 },
    { prop: 'buoy', x: 25, y: 18 },
  ],

  signs: [
    {
      x: 9,
      y: 6,
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
      y: 5,
      kind: 'none',
      label: 'Il portone della Cattedrale',
      lines: ['È socchiuso: dentro, un silenzio che profuma di candele.'],
    },
    {
      x: 8,
      y: 8,
      label: 'Quartiere del Flon',
      lines: [
        'Vetrine, luci e musica bassa.',
        'Il freddo, qui, era solo una scusa per stringersi di più.',
      ],
      memoryId: 'lau-flon',
    },
    {
      x: 12,
      y: 13,
      label: 'La nostra Migros',
      lines: [
        'Sconti sul cioccolato quasi ogni giorno.',
        'Una lista della spesa, e mille sorprese nel carrello.',
      ],
      memoryId: 'lau-migros',
    },
    {
      x: 18,
      y: 14,
      label: 'Museo Olimpico',
      lines: [
        'Fiamme, medaglie, record del mondo.',
        'Eppure il podio più bello resta camminare accanto a te.',
      ],
      memoryId: 'lau-olimpico',
    },
    {
      x: 13,
      y: 21,
      kind: 'none',
      label: 'Il lago di Ouchy',
      lines: [
        'Il Lemano è così calmo che sembra ascoltare.',
        'Qui il tempo rallentava sempre — e a noi andava benissimo così.',
      ],
      memoryId: 'lau-ouchy',
    },
  ],

  npcs: [
    {
      character: 'npcWoman',
      x: 11,
      y: 17,
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
      y: 14,
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
      y: 12,
      dir: 'left',
      wander: true,
      label: 'Piccolo campione',
      lines: [
        "Da grande vincerò l'oro olimpico!",
        'Per ora mi alleno a correre fino al lago.',
      ],
    },
  ],

  exits: [
    // la stradina che scende oltre il lungolago, verso il mondo
    { x: 0, y: 21, w: 4, h: 1, to: 'overworld' },
  ],

  spawn: { x: 2, y: 20, dir: 'up' },
}
