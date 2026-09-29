import type { Page } from '@playwright/test'
import { expect, test } from '@playwright/test'

import { BASE } from '../../utils/env.js'

/**
 * Open the search box and search for a query, waiting for its results.
 *
 * In dev mode the search worker imports FlexSearch, which the dev server
 * optimizes on demand: that optimization reloads the page and discards whatever
 * the test has done so far, so the interaction is retried until the results are
 * rendered.
 *
 * 打开搜索框并搜索某个搜索词，等待其结果出现。
 *
 * 在开发模式下，搜索工作线程会导入 FlexSearch，而开发服务器会按需优化它：该优化会重载页面并丢弃测试此前的操作，因此会重试交互直到结果被渲染出来。
 *
 * @param page - Page to search in 需要搜索的页面
 * @param query - Query to search for 需要搜索的搜索词
 */
const search = async (page: Page, query: string): Promise<void> => {
  await expect
    .poll(
      async () => {
        try {
          if (!(await page.locator('.vp-search-input').isVisible()))
            await page.locator('.vp-search-button').click({ timeout: 2000 })

          await page.locator('.vp-search-input').fill(query, { timeout: 2000 })

          return await page.locator('.vp-search-record').count()
        } catch {
          // The page can be reloaded by the dev server while the test runs
          return 0
        }
      },
      { timeout: 30_000 },
    )
    .toBeGreaterThan(0)
}

test.describe('plugin-flexsearch', () => {
  test('search pages of the default locale', async ({ page }) => {
    await page.goto('')

    await search(page, 'watermark')

    await expect(
      page.locator(`.vp-search-record a[href="${BASE}watermark/"]`),
    ).toHaveCount(1)
  })

  test('require every query term to match', async ({ page }) => {
    await page.goto('')

    await search(page, 'disabled watermark')

    await expect(
      page.locator(
        `.vp-search-record a[href="${BASE}watermark/disabled.html"]`,
      ),
    ).toHaveCount(1)

    await page.locator('.vp-search-input').fill('disabled zzzznotaword')

    await expect(page.locator('.vp-search-record')).toHaveCount(0)
  })

  test('search pages of another locale', async ({ page }) => {
    await page.goto('zh/')

    await search(page, '主页')

    // The Chinese locale has its own index
    await expect(
      page.locator(`.vp-search-record a[href="${BASE}zh/"]`).first(),
    ).toBeVisible()
  })
})
