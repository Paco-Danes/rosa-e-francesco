import { chromium } from 'playwright'
const OUT = '/tmp/claude-321503/-raid5-danese-rosa-e-francesco/7aa10d4f-6268-46f8-8406-eedc280befde/scratchpad'
const BASE = 'http://localhost:4173/rosa-e-francesco/'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
const errors = []
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message))
page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()) })
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.evaluate(() => localStorage.setItem('rf:gate:v1', 'ok'))
async function enterScene(query) {
  await page.goto(BASE + query + '#/gioco', { waitUntil: 'networkidle' })
  await page.reload({ waitUntil: 'networkidle' })
  await page.waitForTimeout(700)
  await page.keyboard.press('Enter')
  await page.waitForTimeout(1100)
}
// Milano SE: Michelangelo — parla con lui (npc a 27,19; stiamo a 27,20 e guardiamo su)
await enterScene('?scene=milano&at=27,20')
await page.keyboard.press('ArrowUp'); await page.waitForTimeout(300)
await page.keyboard.press('e'); await page.waitForTimeout(1800)
await page.screenshot({ path: `${OUT}/60-milano-michelangelo.png` })
// Roma: cartello visibile alla casa
await enterScene('?scene=smdm&at=20,25')
await page.screenshot({ path: `${OUT}/61-roma-cartello-casa.png` })
// Torvaianica: kebabbaro (alto a destra) + cartello tramonto sulla sabbia
await enterScene('?scene=torvaianica&at=20,7')
await page.screenshot({ path: `${OUT}/62-torva-kebab.png` })
await enterScene('?scene=torvaianica&at=17,14')
await page.screenshot({ path: `${OUT}/63-torva-tramonto.png` })
// Losanna: base torre senza cartello
await enterScene('?scene=lausanne&at=25,7')
await page.screenshot({ path: `${OUT}/64-lausanne-torre.png` })
console.log('ERRORS:', errors.length ? errors.join('\n') : 'none')
await browser.close()
