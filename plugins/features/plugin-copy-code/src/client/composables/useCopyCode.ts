import { Message, useLocaleConfig } from '@vuepress/helper/client'
import {
  useClipboard,
  useEventListener,
  useMediaQuery,
  watchImmediate,
} from '@vueuse/core'
import { computed } from 'vue'
import { onContentUpdated } from 'vuepress/client'
import type { CopyCodePluginLocaleConfig } from '../types.js'

import '@vuepress/helper/message.css'
import '../styles/copy-code.css'
import '../styles/vars.css'

export interface UseCopyCodeOptions {
  locales: CopyCodePluginLocaleConfig
  selector: string
  ignoreSelector?: string
  inlineSelector?: string
  /** @default 2000 */
  duration: number
  /** @default false */
  showInMobile?: boolean
  /**
   * Transform pre element before copy
   *
   * For example, deleting certain elements before copying, or inserting copyright information.
   *
   * @param preElement `<pre>` clone Node
   *
   * @example
   * ```js
   * {
   *   transform(pre) {
   *     // Remove all `.ignore` elements
   *     pre.querySelectorAll('.ignore').remove()
   *     // insert copyright
   *     pre.innerHTML += `\n Copied by VuePress`
   *   }
   * }
   * ```
   */
  transform?: (preElement: HTMLElement) => void
}

const CHECK_ICON =
  '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#06a35a"><path d="M822.812 824.618c-83.076 81.992-188.546 124.614-316.05 127.865-122.085-3.251-223.943-45.873-305.935-127.865S76.213 640.406 72.962 518.682c3.251-127.503 45.873-232.973 127.865-316.05 81.992-83.075 184.211-126.058 305.936-129.309 127.503 3.251 232.973 46.234 316.049 129.31 83.076 83.076 126.059 188.546 129.31 316.05-2.89 121.723-46.234 223.943-129.31 305.935zM432.717 684.111c3.973 3.974 8.307 5.78 13.364 6.14 5.057.362 9.753-1.444 13.365-5.417l292.57-287.515c3.974-3.973 5.78-8.307 5.78-13.364s-1.806-9.753-5.78-13.365l1.807 1.806c-3.973-3.973-8.669-5.779-14.087-6.14-5.418-.361-10.475 1.445-14.809 5.418L460.529 592.006c-3.973 3.25-8.669 4.695-14.448 4.695-5.78 0-10.836-1.445-15.531-3.973l-94.273-72.962c-4.335-3.251-9.392-4.335-14.448-3.973s-9.392 3.25-12.642 7.585l-2.89 3.973c-3.25 4.334-4.334 9.391-3.973 14.81.722 5.417 2.528 10.113 5.779 14.086L432.717 684.11z"/></svg>'
const SHELL_RE = /language-(shellscript|shell|bash|sh|zsh)/

export const useCopyCode = ({
  selector,
  ignoreSelector,
  inlineSelector,
  duration = 2000,
  locales,
  showInMobile,
  transform,
}: UseCopyCodeOptions): void => {
  if (__VUEPRESS_SSR__) return

  /**
   * On small-screen devices, the copy button is not displayed by default in order to prevent
   * it from obstructing content, as the `:hover` effect can be triggered by `touch` events.
   */
  const isMobile = useMediaQuery('(max-width: 419px)')
  const enabled = computed(() => !isMobile.value || showInMobile)

  const locale = useLocaleConfig(locales)

  const insertCopyButton = (codeBlockElement: HTMLElement): void => {
    if (codeBlockElement.hasAttribute('copy-code')) return

    const copyElement = document.createElement('button')

    copyElement.type = 'button'
    copyElement.classList.add('vp-copy-code-button')
    copyElement.setAttribute('aria-label', locale.value.copy)
    copyElement.setAttribute('data-copied', locale.value.copied)

    codeBlockElement.parentElement?.insertBefore(copyElement, codeBlockElement)
    codeBlockElement.setAttribute('copy-code', '')
  }

  const appendCopyButton = (): void => {
    document.body.classList.toggle('no-copy-code', !enabled.value)
    if (!enabled.value) return

    document.querySelectorAll<HTMLElement>(selector).forEach(insertCopyButton)
  }

  watchImmediate(enabled, appendCopyButton, {
    flush: 'post',
  })

  onContentUpdated((reason) => {
    if (reason !== 'beforeUnmount') appendCopyButton()
  })

  const { copy } = useClipboard({ legacy: true })
  const timeoutIdMap = new WeakMap<HTMLElement, ReturnType<typeof setTimeout>>()
  let message: Message | null = null

  const copyContent = async (
    codeContainer: HTMLDivElement,
    codeContent: HTMLPreElement,
    button: HTMLButtonElement,
  ): Promise<void> => {
    const clone = codeContent.cloneNode(true) as HTMLPreElement

    if (ignoreSelector) {
      clone.querySelectorAll(ignoreSelector).forEach((node) => {
        node.remove()
      })
    }

    if (transform) transform(clone)

    let text = clone.textContent || ''

    if (SHELL_RE.test(codeContainer.className))
      text = text.replace(/^ *(\$|>) /gm, '')

    await copy(text)

    if (duration <= 0) return

    button.classList.add('copied')
    clearTimeout(timeoutIdMap.get(button))
    const timeoutId = setTimeout(() => {
      button.classList.remove('copied')
      button.blur()
      timeoutIdMap.delete(button)
    }, duration)
    timeoutIdMap.set(button, timeoutId)
  }

  useEventListener('click', (event) => {
    const el = event.target as HTMLElement

    if (
      enabled.value &&
      el.matches('div[class*="language-"] > button.vp-copy-code-button')
    ) {
      const codeContainer = el.parentElement as HTMLDivElement | null
      const preBlock = el.nextElementSibling as HTMLPreElement | null

      if (!codeContainer || !preBlock) return

      void copyContent(codeContainer, preBlock, el as HTMLButtonElement)
    }
  })

  if (inlineSelector) {
    useEventListener('dblclick', (event) => {
      const el = event.target as HTMLElement

      if (enabled.value && el.matches(inlineSelector)) {
        void copy(el.textContent || '')
        ;(message ??= new Message()).pop(
          `${CHECK_ICON}<span>${locale.value.copied} 🎉</span>`,
          duration,
        )
      }
    })
    useEventListener('selectstart', (event) => {
      const el = event.target as HTMLElement | Text

      if (
        enabled.value &&
        (el instanceof HTMLElement
          ? el.matches(inlineSelector)
          : el.parentElement?.matches(inlineSelector))
      ) {
        event.preventDefault()
      }
    })
  }
}
