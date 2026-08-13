import { chromium } from 'playwright'

const OUT = '/tmp/claude-321503/-raid5-danese/75838e61-001e-4cac-b390-83c2ac7a96fa/scratchpad'
const URL = 'http://localhost:4173/rosa-e-francesco/'

const browser = await chromium.launch()
const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
const errors = []
page.on('pageerror', (e) => errors.push('pageerror: ' + e.message))
page.on('console', (m) => {
  if (m.type() === 'error') errors.push('console: ' + m.text())
})

await page.goto(URL, { waitUntil: 'networkidle' })
await page.waitForTimeout(1200)
await page.screenshot({ path: `${OUT}/01-gate.png` })

// gate
await page.fill('.gate__input', 'Via Mameli')
await page.click('.gate__btn')
await page.waitForTimeout(2500)
await page.screenshot({ path: `${OUT}/02-countdown.png` })

// scroll to cartridge if needed and click it
const cart = page.locator('[class*="cart"] >> visible=true').first()
await cart.scrollIntoViewIfNeeded().catch(() => {})
await page.screenshot({ path: `${OUT}/03-cartridge.png` })
await cart.click({ force: true })
await page.waitForTimeout(2500)
await page.screenshot({ path: `${OUT}/04-title.png` })

// press start
await page.keyboard.press('Enter')
await page.waitForTimeout(1500)
await page.screenshot({ path: `${OUT}/05-overworld.png` })

// walk around
for (const [key, n] of [['ArrowDown', 6], ['ArrowRight', 8], ['ArrowDown', 4]]) {
  for (let i = 0; i < n; i++) {
    await page.keyboard.down(key)
    await page.waitForTimeout(180)
    await page.keyboard.up(key)
    await page.waitForTimeout(40)
  }
}
await page.screenshot({ path: `${OUT}/06-walk.png` })

console.log('ERRORS:', errors.length ? errors.join('\n') : 'none')
await browser.close()
