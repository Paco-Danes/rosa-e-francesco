import { chromium } from 'playwright'

const OUT = '/tmp/claude-321503/-raid5-danese/75838e61-001e-4cac-b390-83c2ac7a96fa/scratchpad'
const URL = 'http://localhost:4173/rosa-e-francesco/#/gioco'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
const errors = []
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message))
page.on('console', (m) => {
  if (m.type() === 'error') errors.push('console: ' + m.text())
})

await page.goto(URL, { waitUntil: 'networkidle' })
await page.evaluate(() => localStorage.setItem('rf:gate:v1', 'ok'))
await page.reload({ waitUntil: 'networkidle' })
await page.waitForTimeout(800)
await page.keyboard.press('Enter') // START
await page.waitForTimeout(1200)

const step = async (key, n) => {
  for (let i = 0; i < n; i++) {
    await page.keyboard.down(key)
    await page.waitForTimeout(100)
    await page.keyboard.up(key)
    await page.waitForTimeout(200)
  }
}

// entra a Losanna: spawn overworld (9,6), exit (9,5) un passo in su
await step('ArrowUp', 1)
await page.waitForTimeout(900)
await page.screenshot({ path: `${OUT}/07-lausanne.png` })

// route deterministica al cartello della Cattedrale (9,6):
// (2,20) →R→ (3,20) →U×12→ (3,8) →R×6→ (9,8) →U→ (9,7), poi leggi in su
await step('ArrowRight', 1)
await step('ArrowUp', 9)
await page.screenshot({ path: `${OUT}/07b-up.png` })
await step('ArrowRight', 6)
await step('ArrowUp', 4)
await page.screenshot({ path: `${OUT}/07d-atsign.png` })
await page.keyboard.press('ArrowUp') // assicura lo sguardo verso il cartello
await page.waitForTimeout(300)
await page.keyboard.press('e')
await page.waitForTimeout(600)
await page.screenshot({ path: `${OUT}/08-dialog.png` })
// avanza le righe fino alla memory card
for (let i = 0; i < 8; i++) {
  await page.keyboard.press('e')
  await page.waitForTimeout(500)
}
await page.waitForTimeout(600)
await page.screenshot({ path: `${OUT}/09-memory.png` })

console.log('ERRORS:', errors.length ? errors.join('\n') : 'none')
await browser.close()
