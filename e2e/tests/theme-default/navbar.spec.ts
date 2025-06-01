import { expect, test } from '@playwright/test'

test('navbar items', async ({ page }) => {
  await page.goto('')

  const navItems = page.locator(
    '.vp-navbar-menu .vp-navbar-menu-link, .vp-navbar-menu .vp-navbar-menu-group',
  )

  await expect(navItems.nth(0)).toHaveText('Home')
  await expect(navItems.nth(1)).toContainText('Dropdown')
})
