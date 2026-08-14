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

async function enterScene(query) {
  await page.goto(BASE + query + '#/gioco', { waitUntil: 'networkidle' })
  await page.reload({ waitUntil: 'networkidle' })
  await page.waitForTimeout(700)
  await page.keyboard.press('Enter')
  await page.waitForTimeout(1100)
}

// Roma e dintorni: quattro angoli
await enterScene('?scene=smdm&at=8,6') // colosseo NW
await page.screenshot({ path: `${OUT}/40-roma-colosseo.png` })
await enterScene('?scene=smdm&at=31,6') // ovindoli NE
await page.screenshot({ path: `${OUT}/41-roma-ovindoli.png` })
await enterScene('?scene=smdm&at=20,13') // centro: laghi/piazza
await page.screenshot({ path: `${OUT}/42-roma-centro.png` })
await enterScene('?scene=smdm&at=8,22') // sud: gabbiano/casa
await page.screenshot({ path: `${OUT}/43-roma-sud.png` })

// Budapest: pista + ruota
await enterScene('?scene=budapest&at=28,12')
await page.screenshot({ path: `${OUT}/44-buda-pista.png` })

// Mazzo polaroid: leggi il cartello della pista (28,13) stando sul ghiaccio (28,12)
await page.keyboard.press('ArrowDown') // si gira verso il cartello
await page.waitForTimeout(300)
await page.keyboard.press('e')
await page.waitForTimeout(500)
for (let i = 0; i < 4; i++) {
  await page.keyboard.press('e')
  await page.waitForTimeout(420)
}
await page.waitForTimeout(500)
await page.screenshot({ path: `${OUT}/45-deck-1.png` })
// sfoglia: freccia destra
await page.keyboard.press('ArrowRight')
await page.waitForTimeout(230)
await page.screenshot({ path: `${OUT}/46-deck-mid.png` })
await page.waitForTimeout(600)
await page.screenshot({ path: `${OUT}/47-deck-2.png` })

console.log('ERRORS:', errors.length ? errors.join('\n') : 'none')
await browser.close()
