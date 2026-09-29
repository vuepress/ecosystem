// @vitest-environment happy-dom
import type { VueWrapper } from '@vue/test-utils'
import { flushPromises } from '@vue/test-utils'
import {
  collectClientDefines,
  createTestApp,
  stubClientDefines,
} from '@vuepress/test-utils'
import { mountVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it, vi } from 'vitest'

import copyCodeClientConfig from '../../src/client/config.js'
import { copyCodePlugin } from '../../src/node/index.js'

// The clipboard itself is out of scope, only the copied text is asserted.
const { copiedTexts } = vi.hoisted(() => ({ copiedTexts: [] as string[] }))

vi.mock(import('@vueuse/core'), async (importOriginal) => {
  const actual = await importOriginal()

  return {
    ...actual,
    useClipboard: (): { copy: (value: string) => Promise<void> } => ({
      copy: (value: string): Promise<void> => {
        copiedTexts.push(value)

        return Promise.resolve()
      },
    }),
  } as unknown as typeof actual
})

type CopyCodeOptions = Parameters<typeof copyCodePlugin>[0]

interface CopyCodeFixture {
  wrapper: VueWrapper
  cleanup: () => void
}

const mountCopyCode = async (
  options: CopyCodeOptions,
  content: string,
): Promise<CopyCodeFixture> => {
  const app = await createTestApp({ plugins: [copyCodePlugin(options)] })
  const restore = stubClientDefines(await collectClientDefines(app))

  const wrapper = await mountVuePress({
    attachTo: document.body,
    clientConfigs: [copyCodeClientConfig],
    content,
  })

  await flushPromises()

  return {
    wrapper,
    cleanup: (): void => {
      // unmount to dispose the window event listeners of the composable
      wrapper.unmount()
      restore()
      app.cleanup()
    },
  }
}

describe('copy code behavior', () => {
  it('copies the code block matched by a custom selector', async () => {
    copiedTexts.length = 0

    const { wrapper, cleanup } = await mountCopyCode(
      { selector: '.custom-code' },
      `
        <div class="custom-wrapper">
          <div class="language-ts custom-code"><pre><code>const custom = 1</code></pre></div>
        </div>
        <div class="language-ts"><pre><code>const normal = 2</code></pre></div>
      `,
    )

    try {
      // only the matched code block gets a button
      expect(wrapper.findAll('button.vp-copy-code-button')).toHaveLength(1)

      await wrapper.find('button.vp-copy-code-button').trigger('click')
      await flushPromises()

      expect(copiedTexts).toStrictEqual(['const custom = 1'])
    } finally {
      cleanup()
    }
  })

  it('removes the ignored elements from the copied text', async () => {
    copiedTexts.length = 0

    const { wrapper, cleanup } = await mountCopyCode(
      {
        ignoreSelector: '.token.comment',
        selector: 'div[class*="language-"] pre',
      },
      `
        <div class="language-ts">
          <pre><code>const a = 1<span class="token comment">// comment</span></code></pre>
        </div>
      `,
    )

    try {
      await wrapper.find('button.vp-copy-code-button').trigger('click')
      await flushPromises()

      expect(copiedTexts).toStrictEqual(['const a = 1'])
    } finally {
      cleanup()
    }
  })

  it('shows the copied hint by default', async () => {
    copiedTexts.length = 0

    const { wrapper, cleanup } = await mountCopyCode(
      { selector: 'div[class*="language-"] pre' },
      '<div class="language-ts"><pre><code>const a = 1</code></pre></div>',
    )

    try {
      const button = wrapper.find('button.vp-copy-code-button')

      await button.trigger('click')
      await flushPromises()

      expect(button.classes()).toContain('copied')
    } finally {
      cleanup()
    }
  })

  it('disables the copied hint when the duration is 0', async () => {
    copiedTexts.length = 0

    const { wrapper, cleanup } = await mountCopyCode(
      { duration: 0, selector: 'div[class*="language-"] pre' },
      '<div class="language-ts"><pre><code>const a = 1</code></pre></div>',
    )

    try {
      const button = wrapper.find('button.vp-copy-code-button')

      await button.trigger('click')
      await flushPromises()

      expect(copiedTexts).toStrictEqual(['const a = 1'])
      expect(button.classes()).not.toContain('copied')
    } finally {
      cleanup()
    }
  })
})
