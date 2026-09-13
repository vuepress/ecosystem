import { expect, test } from '@playwright/test'

test.describe('plugin-markdown-code-tree', () => {
  test('render code tree', async ({ page }) => {
    await page.goto('code-tree/')

    const codeTree = page.locator('.vp-code-tree').first()

    await expect(codeTree.locator('.vp-code-tree-title')).toHaveText('Vue App')
    await expect(codeTree.locator('.vp-code-tree-node-name')).toHaveText([
      'src',
      'components',
      'HelloWorld.vue',
      'App.vue',
      'main.ts',
      'package.json',
    ])

    // The entry file is opened by default
    await expect(
      codeTree.locator(
        '.vp-code-tree-node-info.active .vp-code-tree-node-name',
      ),
    ).toHaveText('main.ts')

    // Only the code block of the active file is displayed
    await expect(
      codeTree.locator('.vp-code-tree-code > .code-block-with-title'),
    ).toHaveCount(4)
    await expect(
      codeTree.locator('.vp-code-tree-code > .code-block-with-title.active'),
    ).toHaveCount(1)
    await expect(
      codeTree.locator(
        '.vp-code-tree-code > .code-block-with-title.active .code-block-title-bar',
      ),
    ).toHaveText('src/main.ts')
  })

  test('switch active file', async ({ page }) => {
    await page.goto('code-tree/')

    const codeTree = page.locator('.vp-code-tree').first()

    await codeTree
      .locator('.vp-code-tree-node-name', { hasText: /^HelloWorld\.vue$/u })
      .click()

    await expect(
      codeTree.locator(
        '.vp-code-tree-node-info.active .vp-code-tree-node-name',
      ),
    ).toHaveText('HelloWorld.vue')
    await expect(
      codeTree.locator(
        '.vp-code-tree-code > .code-block-with-title.active .code-block-title-bar',
      ),
    ).toHaveText('src/components/HelloWorld.vue')
  })

  test('toggle folder', async ({ page }) => {
    await page.goto('code-tree/')

    const codeTree = page.locator('.vp-code-tree').first()
    const group = codeTree.locator('.vp-code-tree-node-group').first()

    await expect(group).toHaveCSS('display', 'block')

    await codeTree.locator('.vp-code-tree-node-info.folder').first().click()

    await expect(group).toHaveCSS('display', 'none')

    await codeTree.locator('.vp-code-tree-node-info.folder').first().click()

    await expect(group).toHaveCSS('display', 'block')
  })

  test('render node icon', async ({ page }) => {
    await page.goto('code-tree/')

    const codeTree = page.locator('.vp-code-tree').first()

    // Every node has an icon, and the fallback icon matches the node type,
    // since `@vuepress/plugin-icon` is not enabled in the e2e site.
    await expect(
      codeTree.locator(
        '.vp-code-tree-node-info.folder > .vp-code-tree-node-icon > .vp-code-tree-node-icon-fallback-folder',
      ),
    ).toHaveCount(2)
    await expect(
      codeTree.locator(
        '.vp-code-tree-node-info.file > .vp-code-tree-node-icon > .vp-code-tree-node-icon-fallback-file',
      ),
    ).toHaveCount(4)
    await expect(
      codeTree.locator('.vp-code-tree-node-info .vp-code-tree-node-icon'),
    ).toHaveCount(6)
  })

  test('open the first code block by default', async ({ page }) => {
    await page.goto('code-tree/')

    const codeTree = page.locator('.vp-code-tree').nth(1)

    await expect(
      codeTree.locator(
        '.vp-code-tree-node-info.active .vp-code-tree-node-name',
      ),
    ).toHaveText('index.ts')
    await expect(
      codeTree.locator(
        '.vp-code-tree-code > .code-block-with-title.active .code-block-title-bar',
      ),
    ).toHaveText('index.ts')
  })

  test('ignore code block without title', async ({ page }) => {
    await page.goto('code-tree/')

    const codeTree = page.locator('.vp-code-tree').nth(2)

    await expect(codeTree.locator('.vp-code-tree-node-name')).toHaveText([
      'untitled.ts',
    ])
    await expect(
      codeTree.locator('.vp-code-tree-code > .code-block-with-title'),
    ).toHaveCount(1)
    await expect(
      codeTree.locator('.vp-code-tree-code > .code-block-with-title.active'),
    ).toHaveCount(1)
    // The code block without a title is not displayed
    await expect(
      codeTree.locator('.vp-code-tree-code > div[class*="language-"]'),
    ).toBeHidden()
  })

  test('embed a directory', async ({ page }) => {
    await page.goto('code-tree/')

    const codeTree = page.locator('.vp-code-tree').nth(3)

    await expect(codeTree.locator('.vp-code-tree-title')).toHaveText('Snippet')
    await expect(codeTree.locator('.vp-code-tree-node-name')).toHaveText([
      'a.ts',
      'b.ts',
      'package.json',
    ])

    // The entry file declared by the attribute is opened by default
    await expect(
      codeTree.locator(
        '.vp-code-tree-node-info.active .vp-code-tree-node-name',
      ),
    ).toHaveText('b.ts')
    await expect(
      codeTree.locator(
        '.vp-code-tree-code > .code-block-with-title.active .code-block-title-bar',
      ),
    ).toHaveText('b.ts')

    // The icon of every node is resolved from its file name
    await expect(
      codeTree.locator(
        '.vp-code-tree-node-icon-fallback-file, .vp-code-tree-node-icon iconify-icon',
      ),
    ).toHaveCount(3)
  })
})
