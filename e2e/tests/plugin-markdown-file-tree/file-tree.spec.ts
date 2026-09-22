import { expect, test } from '@playwright/test'

test.describe('plugin-markdown-file-tree: file tree', () => {
  test('render file tree', async ({ page }) => {
    await page.goto('file-tree/')

    const fileTree = page.locator('.vp-file-tree').first()

    await expect(fileTree.locator('.vp-file-tree-title')).toHaveText(
      'My Project',
    )
    await expect(fileTree.locator('.vp-file-tree-name')).toHaveText([
      'docs',
      '.vuepress',
      'config.ts',
      'page1.md',
      'README.md',
      'theme',
      'client',
      'components',
      'Navbar.vue',
      'config.ts',
      'node',
      '…',
      'package.json',
      '…',
    ])
  })

  test('render node state', async ({ page }) => {
    await page.goto('file-tree/')

    const fileTree = page.locator('.vp-file-tree').first()

    // `++` marks an added file, and `--` marks a removed one
    await expect(fileTree.locator('.vp-file-tree-info.diff.add')).toHaveCount(1)
    await expect(
      fileTree.locator('.vp-file-tree-info.diff.remove'),
    ).toHaveCount(1)
    // A bold name is focused
    await expect(fileTree.locator('.vp-file-tree-info.focus')).toHaveCount(1)
    // A folder with a trailing slash is collapsed
    await expect(
      fileTree.locator('.vp-file-tree-info.folder.expanded'),
    ).toHaveCount(5)
    await expect(fileTree.locator('.vp-file-tree-info.folder')).toHaveCount(6)

    // Every node except the ellipsis placeholder has an icon, and the fallback
    // icon matches the node type, since `@vuepress/plugin-icon` is not enabled
    // in the e2e site.
    await expect(
      fileTree.locator('.vp-file-tree-info .vp-file-tree-icon-fallback'),
    ).toHaveCount(12)
    // An ellipsis placeholder has no icon
    await expect(fileTree.locator('.vp-file-tree-name.omit')).toHaveCount(2)
  })

  test('toggle folder', async ({ page }) => {
    await page.goto('file-tree/')

    const fileTree = page.locator('.vp-file-tree').first()
    const group = fileTree.locator('.vp-file-tree-group').first()

    await expect(group).toHaveCSS('display', 'block')

    await fileTree.locator('.vp-file-tree-info.folder').first().click()

    await expect(group).toHaveCSS('display', 'none')

    await fileTree.locator('.vp-file-tree-info.folder').first().click()

    await expect(group).toHaveCSS('display', 'block')
  })
})
