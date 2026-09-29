import {
  collectClientDefines,
  createTestApp,
  stubClientDefines,
} from '@vuepress/test-utils'
import type { TestClientOptions } from '@vuepress/test-utils/client'
import { describe, expect, it, vi } from 'vitest'
import type { Component, ComputedRef } from 'vue'
import { defineComponent, h } from 'vue'

import type {
  GitChangelog,
  GitContributors,
  VPHeader,
} from '../../src/client/components/index.js'
import type { LastUpdated } from '../../src/client/composables/useLastUpdated.js'
import type { GitPluginOptions } from '../../src/node/index.js'
import { gitPlugin } from '../../src/node/index.js'

const REPO_URL = 'https://github.com/vuepress/ecosystem'

const CHANGELOG_OPTIONS: GitPluginOptions['changelog'] = {
  commitUrlPattern: ':repo/commit/:hash',
  issueUrlPattern: ':repo/issues/:issue',
  repoUrl: REPO_URL,
  tagUrlPattern: ':repo/releases/tag/:tag',
}

interface GitClient {
  components: {
    GitChangelog: typeof GitChangelog
    GitContributors: typeof GitContributors
    VPHeader: typeof VPHeader
  }
  composables: {
    useLastUpdated: () => ComputedRef<LastUpdated | null>
  }
  renderVuePress: (options: TestClientOptions) => Promise<string>
}

/**
 * Run a callback with the git client modules loaded against the defines of a
 * real plugin
 *
 * The composables read `__GIT_CONTRIBUTORS__` / `__GIT_CHANGELOG__` at module
 * scope, so the modules are imported after the defines are stubbed, and the
 * test client is imported in the same module generation to keep the injection
 * symbols identical.
 *
 * @param options - The git plugin options / git 插件配置
 * @param callback - The callback to run / 要执行的回调
 * @returns The result of the callback / 回调的返回值
 */
const withGitClient = async <T>(
  options: GitPluginOptions,
  // oxlint-disable-next-line promise/prefer-await-to-callbacks
  callback: (client: GitClient) => Promise<T>,
): Promise<T> => {
  const app = await createTestApp({ plugins: [gitPlugin(options)] })

  try {
    const restore = stubClientDefines(await collectClientDefines(app))

    try {
      vi.resetModules()

      const [{ renderVuePress }, components, composables] = await Promise.all([
        import('@vuepress/test-utils/client'),
        import('../../src/client/components/index.js'),
        import('../../src/client/composables/index.js'),
      ])

      // oxlint-disable-next-line promise/prefer-await-to-callbacks
      return await callback({ components, composables, renderVuePress })
    } finally {
      restore()
    }
  } finally {
    app.cleanup()
  }
}

const withProps = (
  component: Component,
  props: Record<string, unknown>,
): Component =>
  defineComponent({
    name: 'PropsWrapper',
    setup: () => () => h(component, props),
  })

const contributors = [
  {
    avatar: 'https://example.com/alice.png',
    commits: 3,
    email: 'alice@example.com',
    name: 'Alice',
    url: 'https://github.com/alice',
    username: 'alice',
  },
  {
    commits: 1,
    email: 'bob@example.com',
    name: 'Bob',
    username: 'bob',
  },
]

const changelog = [
  {
    author: 'Alice',
    email: 'alice@example.com',
    hash: 'abcdef1234567890',
    message: 'feat: add a feature, close #123',
    time: 1_600_000_000_000,
  },
  {
    author: 'Bob',
    email: 'bob@example.com',
    hash: '1234567890abcdef',
    message: 'chore: release',
    tag: 'v1.0.0',
    time: 1_500_000_000_000,
  },
]

describe('git contributors component', () => {
  it('should render the contributors with their avatar, link and name', async () => {
    await withGitClient(
      { contributors: true },
      async ({ components, renderVuePress }) => {
        const html = await renderVuePress({
          page: { data: { git: { contributors } }, path: '/', title: 'Home' },
          rootComponent: components.GitContributors,
          site: { lang: 'en-US', title: 'Site' },
        })

        expect(html).toContain('id="doc-contributors"')
        expect(html).toContain('Contributors')
        expect(html).toContain('class="vp-contributors"')
        expect(html).toContain('href="https://github.com/alice"')
        expect(html).toContain('src="https://example.com/alice.png"')
        expect(html).toContain('Alice')
        expect(html).toContain('Bob')
      },
    )
  })

  it('should render a contributor without a url as plain text', async () => {
    await withGitClient(
      { contributors: true },
      async ({ components, renderVuePress }) => {
        const html = await renderVuePress({
          page: { data: { git: { contributors } }, path: '/', title: 'Home' },
          rootComponent: components.GitContributors,
          site: { lang: 'en-US', title: 'Site' },
        })

        expect(html).toContain(
          '<span target="_blank" rel="noreferrer" class="vp-contributor">',
        )
      },
    )
  })

  it('should render nothing when the page has no contributor', async () => {
    await withGitClient(
      { contributors: true },
      async ({ components, renderVuePress }) => {
        const html = await renderVuePress({
          page: { data: { git: {} }, path: '/', title: 'Home' },
          rootComponent: components.GitContributors,
          site: { lang: 'en-US', title: 'Site' },
        })

        expect(html).not.toContain('vp-contributors')
      },
    )
  })

  it('should render nothing when the frontmatter disables contributors', async () => {
    await withGitClient(
      { contributors: true },
      async ({ components, renderVuePress }) => {
        const html = await renderVuePress({
          page: {
            data: { git: { contributors } },
            frontmatter: { contributors: false },
            path: '/',
            title: 'Home',
          },
          rootComponent: components.GitContributors,
          site: { lang: 'en-US', title: 'Site' },
        })

        expect(html).not.toContain('vp-contributors')
      },
    )
  })

  it('should use the title prop as the header text', async () => {
    await withGitClient(
      { contributors: true },
      async ({ components, renderVuePress }) => {
        const html = await renderVuePress({
          page: { data: { git: { contributors } }, path: '/', title: 'Home' },
          rootComponent: withProps(components.GitContributors, {
            headerLevel: 3,
            title: 'Authors',
          }),
          site: { lang: 'en-US', title: 'Site' },
        })

        expect(html).toContain('<h3 id="doc-contributors"')
        expect(html).toContain('Authors')
        expect(html).not.toContain('>Contributors<')
      },
    )
  })

  it('should render nothing when the plugin disables contributors', async () => {
    await withGitClient(
      { contributors: false },
      async ({ components, renderVuePress }) => {
        const html = await renderVuePress({
          page: { data: { git: { contributors } }, path: '/', title: 'Home' },
          rootComponent: components.GitContributors,
          site: { lang: 'en-US', title: 'Site' },
        })

        expect(html).not.toContain('vp-contributors')
      },
    )
  })
})

describe('git changelog component', () => {
  it('should render the commit list with the short hash and the message', async () => {
    await withGitClient(
      { changelog: CHANGELOG_OPTIONS, contributors: false },
      async ({ components, renderVuePress }) => {
        const html = await renderVuePress({
          page: { data: { git: { changelog } }, path: '/', title: 'Home' },
          rootComponent: components.GitChangelog,
          site: { lang: 'en-US', title: 'Site' },
        })

        expect(html).toContain('id="doc-changelog"')
        expect(html).toContain('Changelog')
        expect(html).toContain('class="vp-changelog-list"')
        expect(html).toContain('abcdef1')
        expect(html).toContain('feat: add a feature')
      },
    )
  })

  it('should render a release tag item for a tagged commit', async () => {
    await withGitClient(
      { changelog: CHANGELOG_OPTIONS, contributors: false },
      async ({ components, renderVuePress }) => {
        const html = await renderVuePress({
          page: { data: { git: { changelog } }, path: '/', title: 'Home' },
          rootComponent: components.GitChangelog,
          site: { lang: 'en-US', title: 'Site' },
        })

        expect(html).toContain('vp-changelog-item-tag')
        expect(html).toContain('class="vp-changelog-tag"')
        expect(html).toContain('v1.0.0')
      },
    )
  })

  it('should link the commit and the issue with the configured patterns', async () => {
    await withGitClient(
      { changelog: CHANGELOG_OPTIONS, contributors: false },
      async ({ components, renderVuePress }) => {
        const html = await renderVuePress({
          page: { data: { git: { changelog } }, path: '/', title: 'Home' },
          rootComponent: components.GitChangelog,
          site: { lang: 'en-US', title: 'Site' },
        })

        expect(html).toContain(`${REPO_URL}/commit/abcdef1234567890`)
        expect(html).toContain(`${REPO_URL}/issues/123`)
      },
    )
  })

  it('should render nothing when the page has no changelog', async () => {
    await withGitClient(
      { changelog: CHANGELOG_OPTIONS, contributors: false },
      async ({ components, renderVuePress }) => {
        const html = await renderVuePress({
          page: { data: { git: {} }, path: '/', title: 'Home' },
          rootComponent: components.GitChangelog,
          site: { lang: 'en-US', title: 'Site' },
        })

        expect(html).not.toContain('vp-changelog')
      },
    )
  })

  it('should render nothing when the frontmatter disables the changelog', async () => {
    await withGitClient(
      { changelog: CHANGELOG_OPTIONS, contributors: false },
      async ({ components, renderVuePress }) => {
        const html = await renderVuePress({
          page: {
            data: { git: { changelog } },
            frontmatter: { changelog: false },
            path: '/',
            title: 'Home',
          },
          rootComponent: components.GitChangelog,
          site: { lang: 'en-US', title: 'Site' },
        })

        expect(html).not.toContain('vp-changelog')
      },
    )
  })
})

describe('git last updated composable', () => {
  const createProbe = (
    useLastUpdated: GitClient['composables']['useLastUpdated'],
  ): Component =>
    defineComponent({
      name: 'LastUpdatedProbe',
      setup: () => {
        const lastUpdated = useLastUpdated()

        return () =>
          h(
            'div',
            { class: 'probe' },
            lastUpdated.value ? lastUpdated.value.iso : 'none',
          )
      },
    })

  it('should expose the updated time of the page', async () => {
    await withGitClient(
      { contributors: false },
      async ({ composables, renderVuePress }) => {
        const html = await renderVuePress({
          page: {
            data: { git: { updatedTime: 1_600_000_000_000 } },
            path: '/',
            title: 'Home',
          },
          rootComponent: createProbe(composables.useLastUpdated),
          site: { lang: 'en-US', title: 'Site' },
        })

        expect(html).toContain(new Date(1_600_000_000_000).toISOString())
      },
    )
  })

  it('should fall back to the time of the latest changelog item', async () => {
    await withGitClient(
      { contributors: false },
      async ({ composables, renderVuePress }) => {
        const html = await renderVuePress({
          page: { data: { git: { changelog } }, path: '/', title: 'Home' },
          rootComponent: createProbe(composables.useLastUpdated),
          site: { lang: 'en-US', title: 'Site' },
        })

        expect(html).toContain(new Date(changelog[0].time).toISOString())
      },
    )
  })

  it('should expose nothing when the page has no git data', async () => {
    await withGitClient(
      { contributors: false },
      async ({ composables, renderVuePress }) => {
        const html = await renderVuePress({
          page: { data: { git: {} }, path: '/', title: 'Home' },
          rootComponent: createProbe(composables.useLastUpdated),
          site: { lang: 'en-US', title: 'Site' },
        })

        expect(html).toContain('none')
      },
    )
  })
})

describe('git header component', () => {
  it('should render the anchor at the given level', async () => {
    await withGitClient(
      { contributors: false },
      async ({ components, renderVuePress }) => {
        const html = await renderVuePress({
          rootComponent: withProps(components.VPHeader, {
            anchor: 'custom-anchor',
            level: 4,
            text: 'Custom',
          }),
          site: { lang: 'en-US', title: 'Site' },
        })

        expect(html).toContain('<h4 id="custom-anchor"')
        expect(html).toContain('href="#custom-anchor"')
        expect(html).toContain('Custom')
      },
    )
  })
})
