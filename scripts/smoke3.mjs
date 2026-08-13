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
await page.reload({ waitUntil: 'networkidle' })

for (const [route, name] of [
  ['#/pensieri', '10-pensieri'],
  ['#/ricordi', '11-ricordi'],
  ['#/noi', '12-noi'],
]) {
  await page.goto(BASE + route, { waitUntil: 'networkidle' })
  await page.waitForTimeout(1200)
  await page.screenshot({ path: `${OUT}/${name}.png` })
}

// apri una busta
await page.goto(BASE + '#/pensieri', { waitUntil: 'networkidle' })
await page.waitForTimeout(800)
await page.locator('button, [role="button"], [class*="envelope"], [class*="busta"]').first().click().catch(() => {})
await page.waitForTimeout(1400)
await page.screenshot({ path: `${OUT}/13-lettera.png` })

// mobile countdown + gioco
const mob = await browser.newPage({ viewport: { width: 390, height: 844 }, hasTouch: true })
mob.on('pageerror', (e) => errors.push('mob pageerror: ' + e.message))
await mob.goto(BASE, { waitUntil: 'networkidle' })
await mob.evaluate(() => localStorage.setItem('rf:gate:v1', 'ok'))
await mob.reload({ waitUntil: 'networkidle' })
await mob.waitForTimeout(1500)
await mob.screenshot({ path: `${OUT}/14-mobile-countdown.png` })
await mob.goto(BASE + '#/gioco', { waitUntil: 'networkidle' })
await mob.waitForTimeout(900)
await mob.tap('body').catch(() => {})
await mob.waitForTimeout(1200)
await mob.screenshot({ path: `${OUT}/15-mobile-gioco.png` })

console.log('ERRORS:', errors.length ? errors.join('\n') : 'none')
await browser.close()
