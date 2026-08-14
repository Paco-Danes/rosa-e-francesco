import { chromium } from 'playwright'

const OUT = '/tmp/claude-321503/-raid5-danese/75838e61-001e-4cac-b390-83c2ac7a96fa/scratchpad'
const BASE = 'http://localhost:4173/rosa-e-francesco/'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
const errors = []
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message))
page.on('console', (m) => {
  if (m.type() === 'error') errors.push('console: ' + m.text())
})

await page.goto(BASE, { waitUntil: 'networkidle' })
await page.evaluate(() => localStorage.setItem('rf:gate:v1', 'ok'))

const tap = async (key, n = 1) => {
  for (let i = 0; i < n; i++) {
    await page.keyboard.down(key)
    await page.waitForTimeout(100)
    await page.keyboard.up(key)
    await page.waitForTimeout(160)
  }
}

async function enterScene(query) {
  await page.goto(BASE + query + '#/gioco', { waitUntil: 'networkidle' })
  await page.reload({ waitUntil: 'networkidle' })
  await page.waitForTimeout(700)
  await page.keyboard.press('Enter') // START
  await page.waitForTimeout(1100)
}

// 1) DANUBIO: il traghetto di notte
await enterScene('?scene=danubio')
await tap('ArrowRight', 3)
await page.screenshot({ path: `${OUT}/20-danubio-ferry.png` })

// 2) BUDAPEST: il ponte sull'acqua (spawn vicino al ponte)
await enterScene('?scene=budapest&at=8,15')
await page.screenshot({ path: `${OUT}/21-budapest-ponte.png` })
await tap('ArrowLeft', 5)
await page.screenshot({ path: `${OUT}/22-budapest-ponte-cross.png` })

// 3) SAUVABELIN: panorama + cartello + scale
await enterScene('?scene=sauvabelin')
await tap('ArrowRight', 6)
await page.screenshot({ path: `${OUT}/23-sauvabelin.png` })
await tap('ArrowRight', 8) // fino a x=15
await tap('ArrowUp', 1) // si gira verso la balaustra
await page.keyboard.press('e')
await page.waitForTimeout(500)
await page.screenshot({ path: `${OUT}/24-sauvabelin-sign.png` })
for (let i = 0; i < 6; i++) {
  await page.keyboard.press('e')
  await page.waitForTimeout(420)
}
await page.screenshot({ path: `${OUT}/25-sauvabelin-memory.png` })
await page.keyboard.press('Escape')
await page.waitForTimeout(400)

// 4) LOSANNA: il bosco con la torre (spawn nel bosco)
await enterScene('?scene=lausanne&at=24,8')
await page.screenshot({ path: `${OUT}/26-lausanne-bosco.png` })

// 5) SMDM: Noemi e Ramona (spawn davanti alla palestra)
await enterScene('?scene=smdm&at=6,14')
await tap('ArrowRight', 1) // guarda Noemi a (7,14)
await page.keyboard.press('e')
await page.waitForTimeout(600)
await page.screenshot({ path: `${OUT}/27-smdm-noemi.png` })

// 6) COCURUZZO: Annarita e Vincenzo
await enterScene('?scene=cocuruzzo&at=24,11')
await tap('ArrowUp', 1)
await page.keyboard.press('e')
await page.waitForTimeout(600)
await page.screenshot({ path: `${OUT}/28-cocuruzzo-annarita.png` })

console.log('ERRORS:', errors.length ? errors.join('\n') : 'none')
await browser.close()
