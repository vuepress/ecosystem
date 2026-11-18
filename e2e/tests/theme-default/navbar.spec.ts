import { expect, test } from '@playwright/test'

test('navbar items', async ({ page }) => {
  await page.goto('')

  const navItems = page.locator('.vp-navbar .vp-navbar-item')

  await expect(navItems.nth(0)).toHaveText('Home')
  await expect(navItems.nth(1)).toContainText('Dropdown')
})

test('navbar dropdown exposes its expanded state', async ({ page }) => {
  await page.goto('')

  const desktopTrigger = page.locator(
    '.vp-navbar .vp-navbar-dropdown-title[aria-label="Dropdown"]',
  )
  const mobileTrigger = page.locator(
    '.vp-navbar .vp-navbar-dropdown-title-mobile[aria-label="Dropdown"]',
  )

  await expect(desktopTrigger).toHaveAttribute('aria-expanded', 'false')
  await expect(mobileTrigger).toHaveAttribute('aria-expanded', 'false')

  const menuId = await desktopTrigger.getAttribute('aria-controls')

  expect(menuId).toBeTruthy()
  await expect(page.locator(`[id="${menuId}"]`)).toHaveClass(
    /vp-navbar-dropdown/u,
  )

  await desktopTrigger.focus()
  await page.keyboard.press('Enter')

  await expect(desktopTrigger).toHaveAttribute('aria-expanded', 'true')
  await expect(mobileTrigger).toHaveAttribute('aria-expanded', 'true')
})

test('navbar marks the current page', async ({ page }) => {
  await page.goto('')

  await expect(
    page.locator('.vp-navbar .vp-navbar-item a[aria-label="Home"]'),
  ).toHaveAttribute('aria-current', 'page')
  await expect(
    page.locator('.vp-navbar .vp-navbar-dropdown a[aria-label="item"]'),
  ).not.toHaveAttribute('aria-current', 'page')

  await page.goto('navbar/')

  await expect(
    page.locator('.vp-navbar .vp-navbar-dropdown a[aria-label="item"]'),
  ).toHaveAttribute('aria-current', 'page')
})
