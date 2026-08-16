import { chromium } from 'playwright'
const OUT = '/tmp/claude-321503/-raid5-danese-rosa-e-francesco/7aa10d4f-6268-46f8-8406-eedc280befde/scratchpad'
const BASE = 'http://localhost:4173/rosa-e-francesco/'
const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
const errors = []
page.on('pageerror', (e) => errors.push(e.message))
await page.goto(BASE, { waitUntil: 'networkidle' })
await page.evaluate(() => localStorage.setItem('rf:gate:v1', 'ok'))
async function readSign(scene, at, dirKey, shot) {
  await page.goto(BASE + `?scene=${scene}&at=${at}#/gioco`, { waitUntil: 'networkidle' })
  await page.reload({ waitUntil: 'networkidle' }); await page.waitForTimeout(700)
  await page.keyboard.press('Enter'); await page.waitForTimeout(1100)
  await page.keyboard.down(dirKey); await page.waitForTimeout(90); await page.keyboard.up(dirKey); await page.waitForTimeout(400)
  await page.keyboard.press('e'); await page.waitForTimeout(600)
  for (let i = 0; i < 6; i++) { await page.keyboard.press('e'); await page.waitForTimeout(450) }
  await page.waitForTimeout(700)
  await page.screenshot({ path: `${OUT}/${shot}.png` })
}
await readSign('smdm', '6,24', 'ArrowUp', '80-gabbiano-top')
await readSign('torvaianica', '17,14', 'ArrowUp', '81-tramonto-deck')
console.log('ERRORS:', errors.length ? errors.join(' | ') : 'none')
await browser.close()
