import { chromium } from 'playwright'
const OUT = '/tmp/claude-321503/-raid5-danese-rosa-e-francesco/7aa10d4f-6268-46f8-8406-eedc280befde/scratchpad'
const BASE = 'http://localhost:4173/rosa-e-francesco/'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.evaluate(() => localStorage.setItem('rf:gate:v1', 'ok'))
await page.goto(BASE + '?scene=sauvabelin&at=15,9#/gioco', { waitUntil: 'networkidle' })
await page.reload({ waitUntil: 'networkidle' }); await page.waitForTimeout(700)
await page.keyboard.press('Enter'); await page.waitForTimeout(1100)
await page.screenshot({ path: `${OUT}/70-torre-cartello.png` })
await page.keyboard.down('ArrowUp'); await page.waitForTimeout(90); await page.keyboard.up('ArrowUp'); await page.waitForTimeout(400)
await page.keyboard.press('e'); await page.waitForTimeout(600)
for (let i = 0; i < 6; i++) { await page.keyboard.press('e'); await page.waitForTimeout(450) }
await page.waitForTimeout(500)
await page.screenshot({ path: `${OUT}/71-torre-card.png` })
console.log('ERRORS:', errors.length ? errors.join(' | ') : 'none')
await browser.close()
