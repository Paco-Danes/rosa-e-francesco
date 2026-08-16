import { chromium } from 'playwright'
const OUT = '/tmp/claude-321503/-raid5-danese-rosa-e-francesco/7aa10d4f-6268-46f8-8406-eedc280befde/scratchpad'
const BASE = 'http://localhost:4173/rosa-e-francesco/'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.evaluate(() => localStorage.setItem('rf:gate:v1', 'ok'))
await page.goto(BASE + '?scene=milano&at=27,20#/gioco', { waitUntil: 'networkidle' })
await page.reload({ waitUntil: 'networkidle' }); await page.waitForTimeout(700)
await page.keyboard.press('Enter'); await page.waitForTimeout(1100)
await page.keyboard.down('ArrowUp'); await page.waitForTimeout(90); await page.keyboard.up('ArrowUp'); await page.waitForTimeout(400)
await page.keyboard.press('e'); await page.waitForTimeout(2600)
await page.screenshot({ path: `${OUT}/60b-michelangelo-dialog.png` })
await browser.close()
