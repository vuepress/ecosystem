import { expect, test } from '@playwright/test'

test.describe('plugin-blog', () => {
  test('generate type page', async ({ page }) => {
    const types = ['article', 'timeline']

    for (const type of types) {
      await page.goto(`${type}/`)
      expect(await page.locator('article').count()).toBeGreaterThan(0)
    }
  })

  test('generate category main page', async ({ page }) => {
    const categories = ['category', 'tag']

    for (const category of categories) {
      await page.goto(`${category}/`)
      expect(await page.locator('main')).not.toHaveText('404')
      expect(await page.locator('.article-wrapper')).toBeVisible()
      expect(await page.locator('article').count()).toBe(0)
    }
  })

  test('generate category item page', async ({ page }) => {
    const categoryConfig = {
      category: ['category-a', 'category-b', 'category-c', '分类-1', '分类-2'],
      tag: ['tag-a', 'tag-b', 'tag-c', 'tag-d', '标签-1', '标签-2'],
    }

    for (const [name, items] of Object.entries(categoryConfig)) {
      for (const item of items) {
        await page.goto(`${name}/${encodeURI(item)}/`)

        expect(await page.locator('main')).not.toHaveText('404')
      }
    }
  })
})
