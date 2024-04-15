import { expect, test } from '@playwright/test'

test.describe('has heading sidebar', () => {
  test('frontmatter', async ({ page }) => {
    await page.goto('sidebar/auto.html')

    const sidebarItems = await page.locator('a.sidebar-item')

    expect(await sidebarItems.nth(0)).toContainText('Sidebar Heading 1')
    expect(await sidebarItems.nth(1)).toContainText('Sidebar Heading 2')
  })

  test('config', async ({ page }) => {
    await page.goto('sidebar/heading/1.html')

    const sidebarHeadings = await page.locator('.sidebar-heading')

    const pageTitle = await page.locator('.theme-default-content h1')

    expect(pageTitle).not.toBeEmpty()

    const pageTitleText = (await pageTitle.innerText()).replace('#', '')

    expect(sidebarHeadings).toContainText(pageTitleText)

    const sidebarItems = await page.locator('.sidebar-item.route-link')

    for (const [index, h2] of (
      await page.locator('.theme-default-content h2').all()
    ).entries()) {
      expect(h2).not.toBeEmpty()

      const h2Text = (await h2.innerText()).replace('#', '')

      expect(await sidebarItems.nth(index)).toContainText(h2Text)
    }
  })
})

test('has configured sidebar', async ({ page }) => {
  await page.goto('sidebar/config/1.html')

  const sidebarItems = await page.locator('a.sidebar-item')

  expect(sidebarItems.nth(1)).toContainText('sidebar 1')
  expect(sidebarItems.nth(4)).toContainText('sidebar 2')
})
