// @vitest-environment happy-dom
import type { VueWrapper } from '@vue/test-utils'
import { flushPromises } from '@vue/test-utils'
import {
  collectClientDefines,
  createTestApp,
  stubClientDefines,
} from '@vuepress/test-utils'
import type { TestApp, TestPageOptions } from '@vuepress/test-utils'
import { mountVuePress } from '@vuepress/test-utils/client'
import { describe, expect, it, vi } from 'vitest'

import copyrightClientConfig from '../../src/client/config.js'
import { copyrightPlugin } from '../../src/node/index.js'
import type { CopyrightPluginOptions } from '../../src/node/index.js'

interface CopyrightContext {
  app: TestApp
  appElement: HTMLDivElement
  restore: () => void
  wrapper: VueWrapper
}

const mountCopyright = async (
  options: CopyrightPluginOptions,
  page: TestPageOptions = {},
): Promise<CopyrightContext> => {
  const app = await createTestApp({ plugins: [copyrightPlugin(options)] })
  const restore = stubClientDefines(await collectClientDefines(app))

  const appElement = document.createElement('div')

  appElement.id = 'app'
  document.body.append(appElement)

  const wrapper = await mountVuePress({
    attachTo: appElement,
    clientConfigs: [copyrightClientConfig],
    content: '<p class="content">Hello world</p>',
    page: { path: '/', ...page },
  })

  await flushPromises()

  return { app, appElement, restore, wrapper }
}

const cleanupCopyright = ({
  app,
  appElement,
  restore,
  wrapper,
}: CopyrightContext): void => {
  wrapper.unmount()
  appElement.remove()
  restore()
  app.cleanup()
}

const selectContent = (element: Element): void => {
  const range = document.createRange()

  range.selectNodeContents(element)

  const selection = window.getSelection()!

  selection.removeAllRanges()
  selection.addRange(range)
}

const dispatchCopy = (
  target: Element,
): { event: Event; setData: ReturnType<typeof vi.fn> } => {
  const setData = vi.fn<(format: string, data: string) => void>()
  const event = new Event('copy', { bubbles: true, cancelable: true })

  Object.defineProperty(event, 'clipboardData', { value: { setData } })
  target.dispatchEvent(event)

  return { event, setData }
}

describe('copyright client config', () => {
  it('should append the copyright to the copied content', async () => {
    const context = await mountCopyright({
      author: 'Alice',
      global: true,
      license: 'MIT',
      triggerLength: 1,
    })

    try {
      selectContent(context.wrapper.find('.content').element)

      const { setData } = dispatchCopy(context.appElement)

      expect(setData).toHaveBeenCalledWith(
        'text/html',
        expect.stringContaining('Copyright by Alice'),
      )
      expect(setData).toHaveBeenCalledWith(
        'text/html',
        expect.stringContaining('License under MIT'),
      )
      expect(setData).toHaveBeenCalledWith(
        'text/plain',
        expect.stringContaining('------'),
      )
    } finally {
      cleanupCopyright(context)
    }
  })

  it('should not append the copyright when the selection is too short', async () => {
    const context = await mountCopyright({
      author: 'Alice',
      global: true,
      triggerLength: 100,
    })

    try {
      selectContent(context.wrapper.find('.content').element)

      const { event, setData } = dispatchCopy(context.appElement)

      expect(setData).not.toHaveBeenCalled()
      expect(event.defaultPrevented).toBe(false)
    } finally {
      cleanupCopyright(context)
    }
  })

  it('should not append the copyright when the plugin is disabled', async () => {
    const context = await mountCopyright({ author: 'Alice', triggerLength: 1 })

    try {
      selectContent(context.wrapper.find('.content').element)

      const { setData } = dispatchCopy(context.appElement)

      expect(setData).not.toHaveBeenCalled()
    } finally {
      cleanupCopyright(context)
    }
  })

  it('should prevent the copy when copying is disabled', async () => {
    const context = await mountCopyright({
      author: 'Alice',
      disableCopy: true,
      global: true,
      triggerLength: 1,
    })

    try {
      selectContent(context.wrapper.find('.content').element)

      const { event, setData } = dispatchCopy(context.appElement)

      expect(event.defaultPrevented).toBe(true)
      expect(setData).not.toHaveBeenCalled()
    } finally {
      cleanupCopyright(context)
    }
  })

  it('should use the copyright data of the page', async () => {
    const context = await mountCopyright(
      { global: true, triggerLength: 1 },
      { data: { copyright: 'Custom copyright' } },
    )

    try {
      selectContent(context.wrapper.find('.content').element)

      const { setData } = dispatchCopy(context.appElement)

      expect(setData).toHaveBeenCalledWith(
        'text/html',
        expect.stringContaining('Custom copyright'),
      )
    } finally {
      cleanupCopyright(context)
    }
  })

  it('should disable the text selection of the app element', async () => {
    const context = await mountCopyright({
      disableSelection: true,
      global: true,
    })

    try {
      expect(context.appElement.style.userSelect).toBe('none')
    } finally {
      cleanupCopyright(context)
    }
  })

  it('should keep the text selection enabled by default', async () => {
    const context = await mountCopyright({})

    try {
      expect(context.appElement.style.userSelect).toBe('auto')
    } finally {
      cleanupCopyright(context)
    }
  })
})
