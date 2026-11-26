import { expect, test } from '@playwright/test'

test.use({ reducedMotion: 'no-preference' })

test('keeps the scroll position when the hash updates with smooth scrolling', async ({
  page,
}) => {
  await page.goto('sidebar/heading/long.html')

  await expect(page.locator('html')).toHaveCSS('scroll-behavior', 'smooth')

  // Scroll down so the second heading becomes active
  await page.evaluate(() => {
    window.scrollTo(0, 950)
  })
  await page.waitForTimeout(800)

  // Scroll back up so the first heading becomes active again
  await page.evaluate(() => {
    window.scrollTo(0, 550)
  })
  await page.waitForTimeout(800)

  const hash = await page.evaluate(() => window.location.hash)

  expect(hash).toBe('#first-heading')

  // The hash update must not start a smooth scroll to the heading, which
  // would make the page oscillate between the headings
  const positions: number[] = []

  for (let i = 0; i < 6; i++) {
    positions.push(await page.evaluate(() => window.scrollY))
    await page.waitForTimeout(200)
  }

  expect(Math.max(...positions) - Math.min(...positions)).toBeLessThan(5)
  expect(positions.at(-1)).toBeGreaterThan(500)
})
