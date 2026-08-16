/**
 * MILANO — «Luci di città».
 *
 * L'ora d'oro sulla città: a est la Piazza del Duomo con il marmo che prende
 * il tramonto, a ovest San Siro con il palco del concerto di Bruno Mars.
 * In mezzo, un tram giallo fermo al capolinea e un parco che scende verso
 * l'uscita; nell'angolo in basso a destra, la palazzina di Michelangelo.
 *
 * Griglia 30×22 — legenda locale (i caratteri NON sono quelli della palette):
 *   g grass · e grass2 · f flowers · w tallGrass · p plaza · c cobble
 *   P path · s sidewalk · a asphalt
 */
import type { Scene } from './types'
import {
  duomo,
  galleria,
  sanSiro,
  palco,
  tram,
  brunoMars,
  casaMichelangelo,
  michelangelo,
} from '../art/buildings/milano'

const W = 30
const H = 22

// prettier-ignore
const ground = [
  'gegggggggggefg' + 'g' + 'ppppppppppppppp',
  'ggeggggggggegg' + 'g' + 'ppppppppppppppp',
  'gggggeggggggge' + 'g' + 'ppppppppppppppp',
  'gfgggggggeggge' + 'g' + 'ppppppppppppppp',
  'gggggggggggfgg' + 'g' + 'ppppppppppppppp',
  'gegggggggggegg' + 'g' + 'ppppppppppppppp',
  'ccccccccccc' + 'gge' + 'g' + 'ppppppppppppppp',
  'ccccccccccc' + 'geg' + 'g' + 'ppppppppppppppp',
  'ccccccccccc' + 'egg' + 'g' + 'ppppppppppppppp',
  'ccccccccccc' + 'ssssss' + 'ppppppppppppp',
  'ccccccccccc' + 'aaaaaa' + 'ppppppppppppp',
  'ccccccccccc' + 'aaaaaa' + 'ppppppppppppp',
  'ccccccccccc' + 'aaaaaa' + 'ppppppppppppp',
  'ccccccccccc' + 'aaaaaa' + 'ppppppppppppp',
  'ge' + 'PPPPPPPPP' + 'ssssss' + 'PPPPPPPPPPP' + 'gg',
  'gf' + 'PPPPPPPPPPPPPPPPPPPPPPPPPP' + 'eg',
  'ggeggwggggfg' + 'PPPPPP' + 'gfggeggggggg',
  'gwwggggeggge' + 'PPPPPP' + 'ggggwwgggggg',
  'ggggfggggggg' + 'PPPPPP' + 'gegggfgggggg',
  'gegwgggfggge' + 'PPPPPP' + 'gggeggggPfge',
  'ggggggeggggg' + 'PPPPPP' + 'gfgggeggPggg',
  'gggfggggwggg' + 'PPPPPP' + 'ggggggwggfgg',
]

export const milanoScene: Scene = {
  id: 'milano',
  name: 'Milano — Luci di città',
  width: W,
  height: H,
  ambience: 'sunset',
  legend: {
    g: { base: 'grass' },
    e: { base: 'grass2' },
    f: { base: 'flowers' },
    w: { base: 'tallGrass' },
    p: { base: 'plaza' },
    c: { base: 'cobble' },
    P: { base: 'path' },
    s: { base: 'sidewalk' },
    a: { base: 'asphalt' },
  },
  ground,
  buildings: [
    // San Siro: il tetto di travi rosse resta alle spalle del player
    { sprite: sanSiro, x: 1, y: 0, solid: { x: 0, y: 1, w: 7, h: 5 } },
    // Il palco del concerto, davanti allo stadio
    { sprite: palco, x: 2, y: 7, solid: { x: 0, y: 1, w: 5, h: 2 } },
    // La Galleria, con la volta di vetro che spunta dietro l'arcone
    { sprite: galleria, x: 16, y: 1, solid: { x: 0, y: 1, w: 4, h: 3 } },
    // Il Duomo: si passa dietro la corona di guglie
    { sprite: duomo, x: 21, y: 0, solid: { x: 0, y: 2, w: 7, h: 3 } },
    // Il tram giallo fermo al capolinea
    { sprite: tram, x: 12, y: 10, solid: { x: 0, y: 1, w: 4, h: 2 } },
    // La palazzina di Michelangelo: si passa dietro il tetto piatto
    { sprite: casaMichelangelo, x: 25, y: 15, solid: { x: 0, y: 1, w: 3, h: 3 } },
  ],
  props: [
    // lampioni dell'esplanade del concerto
    { prop: 'lamp', x: 0, y: 8 },
    { prop: 'lamp', x: 10, y: 8 },
    { prop: 'lamp', x: 0, y: 12 },
    { prop: 'lamp', x: 10, y: 12 },
    // lampioni eleganti della piazza
    { prop: 'lamp', x: 15, y: 6 },
    { prop: 'lamp', x: 28, y: 6 },
    { prop: 'lamp', x: 18, y: 12 },
    { prop: 'lamp', x: 28, y: 12 },
    // la piazza: fontana, statua, panchine, vasi
    { prop: 'fountain', x: 23, y: 10 },
    { prop: 'statue', x: 20, y: 8 },
    { prop: 'bench', x: 19, y: 13 },
    { prop: 'bench', x: 26, y: 13 },
    { prop: 'pot', x: 15, y: 5 },
    { prop: 'pot', x: 20, y: 0 },
    { prop: 'roseBush', x: 17, y: 0 },
    { prop: 'roseBush', x: 29, y: 0 },
    // i piccioni prepotenti (gabbiani in trasferta)
    { prop: 'gull', x: 22, y: 6 },
    { prop: 'gull', x: 19, y: 8 },
    { prop: 'gull', x: 25, y: 9 },
    { prop: 'gull', x: 27, y: 11 },
    { prop: 'gull', x: 20, y: 11 },
    { prop: 'gull', x: 3, y: 6 },
    { prop: 'gull', x: 9, y: 6 },
    // un gattino vicino al tram
    { prop: 'cat', x: 11, y: 14 },
    // il parco verso l'uscita
    { prop: 'tree', x: 10, y: 1 },
    { prop: 'tree', x: 12, y: 4 },
    { prop: 'tree', x: 0, y: 17 },
    { prop: 'tree', x: 2, y: 20 },
    { prop: 'tree', x: 9, y: 19 },
    { prop: 'tree', x: 20, y: 20 },
    { prop: 'tree', x: 28, y: 20 },
    { prop: 'roseBush', x: 9, y: 16 },
    { prop: 'roseBush', x: 20, y: 16 },
    { prop: 'flowerPatch', x: 4, y: 16 },
    { prop: 'flowerPatch', x: 22, y: 16 },
    { prop: 'flowerPatch', x: 7, y: 18 },
    { prop: 'flowerPatch', x: 24, y: 19 },
    // davanti a casa di Michelangelo: un vaso e la panchina del cortile
    { prop: 'pot', x: 24, y: 18 },
    { prop: 'bench', x: 28, y: 16 },
  ],
  signs: [
    {
      x: 24,
      y: 6,
      label: 'Piazza del Duomo',
      lines: [
        'Il marmo che prende il colore del tramonto, le guglie come pizzo.',
        'In mezzo a mille persone, la piazza sembrava comunque solo vostra.',
        'E la Madonnina, da lassù, vi ha visti. E ha sorriso.',
      ],
      memoryId: 'mil-duomo',
    },
    {
      x: 8,
      y: 9,
      label: 'San Siro — Bruno Mars',
      lines: [
        'Sessantamila voci, e tu che cantavi guardando lei.',
        '«Just the way you are»: non l’ha scritta lui. L’ha scritta per voi, e non lo sa.',
      ],
      memoryId: 'mil-sansiro',
    },
    {
      x: 25,
      y: 19,
      label: 'Casa di Michelangelo',
      lines: [
        'Un divano, due chiacchiere e il guacamole di Michelangelo.',
        'Le case degli amici sono le tappe più belle dei viaggi.',
      ],
      memoryId: 'mil-michelangelo',
    },
    {
      x: 24,
      y: 4,
      kind: 'none',
      label: 'Portone del Duomo',
      lines: ['È chiuso. Ma stasera la meraviglia è tutta qui fuori.'],
    },
    {
      x: 17,
      y: 4,
      kind: 'none',
      label: 'Galleria Vittorio Emanuele II',
      lines: [
        'Dentro, l’ottagono luccica d’oro.',
        'Qualcuno gira sui tacchi sul toro del mosaico. Un giro anche per voi, non si sa mai.',
      ],
    },
    {
      x: 4,
      y: 5,
      kind: 'none',
      label: 'Stadio San Siro',
      lines: ['Il tempio del calcio. Stasera, però, è il tempio del funk.'],
    },
  ],
  npcs: [
    {
      character: 'npcMan',
      custom: michelangelo,
      x: 27,
      y: 19,
      dir: 'down',
      label: 'Michelangelo',
      lines: ['Si sono tecnicamente in malattia... vuoi del guacamole ??'],
    },
    {
      character: 'npcMan',
      custom: brunoMars,
      x: 4,
      y: 10,
      dir: 'down',
      label: 'Bruno (?!)',
      lines: [
        'Ehi, voi due! Questa la dedico a voi…',
        '♪ ’Cause you’re amazing… just the way you are ♪',
        '(nessuno sa perché è qui. Lui però lo sa.)',
      ],
    },
    {
      character: 'npcWoman',
      x: 2,
      y: 11,
      dir: 'up',
      wander: true,
      label: 'Fan in delirio',
      lines: ['Ha fatto Uptown Funk PRIMA volta, giuro!', 'Non sto urlando. Ok, sto urlando.'],
    },
    {
      character: 'npcMan',
      x: 7,
      y: 11,
      dir: 'up',
      label: 'Fan commosso',
      lines: ['Ho i brividi dal primo accordo.', 'Dai che adesso fa Locked Out of Heaven!'],
    },
    {
      character: 'npcKid',
      x: 6,
      y: 12,
      dir: 'up',
      wander: true,
      label: 'Piccolo fan',
      lines: ['Da grande faccio il batterista!'],
    },
    {
      character: 'npcNonna',
      x: 22,
      y: 8,
      dir: 'down',
      label: 'Signora dei piccioni',
      lines: [
        'Questi piccioni non hanno paura di niente, sai?',
        'Ai miei tempi, in piazza, ci si dava il primo bacio. Occhio, eh.',
      ],
    },
  ],
  exits: [{ x: 12, y: 21, w: 6, h: 1, to: 'overworld' }],
  spawn: { x: 14, y: 20, dir: 'up' },
  effects: [{ type: 'fireworks', x: 1, y: 0, w: 7, h: 3 }],
}
