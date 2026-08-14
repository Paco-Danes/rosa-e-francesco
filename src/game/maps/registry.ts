/**
 * REGISTRO SCENE — il motore parte da qui.
 * La scena iniziale del gioco è 'overworld'.
 */
import type { Scene, SceneId } from './types'
import { overworldScene } from './overworld'
import { lausanneScene } from './lausanne'
import { sauvabelinScene } from './sauvabelin'
import { smdmScene } from './smdm'
import { cocuruzzoScene } from './cocuruzzo'
import { budapestScene, danubioScene } from './budapest'
import { milanoScene } from './milano'
import { torvaianicaScene } from './torvaianica'

export const SCENES: Record<SceneId, Scene> = {
  overworld: overworldScene,
  lausanne: lausanneScene,
  sauvabelin: sauvabelinScene,
  smdm: smdmScene,
  cocuruzzo: cocuruzzoScene,
  budapest: budapestScene,
  danubio: danubioScene,
  milano: milanoScene,
  torvaianica: torvaianicaScene,
}
