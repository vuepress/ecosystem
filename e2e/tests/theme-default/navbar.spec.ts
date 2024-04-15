import { expect, test } from '@playwright/test'

test('navbar items', async ({ page }) => {
  await page.goto('')

  const navItems = await page.locator('.navbar .navbar-item')

  expect(await navItems.nth(0)).toHaveText('Home')
  expect(await navItems.nth(1)).toContainText('Dropdown')
})
