import { chromium } from 'playwright'

const OUT = '/tmp/claude-321503/-raid5-danese/75838e61-001e-4cac-b390-83c2ac7a96fa/scratchpad'
const BASE = 'http://localhost:4173/rosa-e-francesco/'

const browser = await chromium.launch()
const errors = []

async function shot(dateStr, name, hover = false) {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
  page.on('pageerror', (e) => errors.push(name + ' pageerror: ' + e.message))
  await page.clock.install({ time: new Date(dateStr) })
  await page.goto(BASE, { waitUntil: 'networkidle' })
  await page.evaluate(() => localStorage.setItem('rf:gate:v1', 'ok'))
  await page.reload({ waitUntil: 'networkidle' })
  await page.clock.runFor(4000)
  await page.waitForTimeout(1500)
  if (hover) {
    await page.hover('.bloom__hit')
    await page.clock.runFor(600)
    await page.waitForTimeout(500)
  }
  await page.screenshot({ path: `${OUT}/${name}.png` })
  await page.close()
}

await shot('2026-08-14T12:00:00', '30-bloom-oggi')
await shot('2026-08-14T12:00:00', '31-bloom-card', true)
await shot('2026-09-01T12:00:00', '32-bloom-set1')
await shot('2026-09-12T12:00:00', '33-bloom-set12')

console.log('ERRORS:', errors.length ? errors.join('\n') : 'none')
await browser.close()
