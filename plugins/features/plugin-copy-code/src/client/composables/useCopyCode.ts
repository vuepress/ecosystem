import { Message, useLocale } from '@vuepress/helper/client'
import {
  useClipboard,
  useEventListener,
  useMediaQuery,
  watchImmediate,
} from '@vueuse/core'
import type { MaybeRefOrGetter } from 'vue'
import { computed, nextTick } from 'vue'
import { onContentUpdated } from 'vuepress/client'

import { useCopyCodeOptions } from '../helpers/index.js'
import type {
  CopyCodeClientOptions,
  CopyCodePluginLocaleConfig,
} from '../types.js'

import '@vuepress/helper/message.css'
import '../styles/vars.scss'
import '../styles/copy-code.scss'

/**
 * Options for the useCopyCode composable
 *
 * UseCopyCode 组合式 API 的选项
 *
 * @internal
 */
export interface UseCopyCodeOptions {
  /**
   * Copy code options from Node
   *
   * Node 中定义的复制代码选项
   */
  options: MaybeRefOrGetter<CopyCodeClientOptions>

  /**
   * Locale config for copy button
   *
   * 复制按钮的多语言配置
   */
  locales: CopyCodePluginLocaleConfig
}

const CHECK_ICON =
  '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#06a35a"><path d="M822.812 824.618c-83.076 81.992-188.546 124.614-316.05 127.865-122.085-3.251-223.943-45.873-305.935-127.865S76.213 640.406 72.962 518.682c3.251-127.503 45.873-232.973 127.865-316.05 81.992-83.075 184.211-126.058 305.936-129.309 127.503 3.251 232.973 46.234 316.049 129.31 83.076 83.076 126.059 188.546 129.31 316.05-2.89 121.723-46.234 223.943-129.31 305.935zM432.717 684.111c3.973 3.974 8.307 5.78 13.364 6.14 5.057.362 9.753-1.444 13.365-5.417l292.57-287.515c3.974-3.973 5.78-8.307 5.78-13.364s-1.806-9.753-5.78-13.365l1.807 1.806c-3.973-3.973-8.669-5.779-14.087-6.14-5.418-.361-10.475 1.445-14.809 5.418L460.529 592.006c-3.973 3.25-8.669 4.695-14.448 4.695-5.78 0-10.836-1.445-15.531-3.973l-94.273-72.962c-4.335-3.251-9.392-4.335-14.448-3.973s-9.392 3.25-12.642 7.585l-2.89 3.973c-3.25 4.334-4.334 9.391-3.973 14.81.722 5.417 2.528 10.113 5.779 14.086L432.717 684.11z"/></svg>'
const SHELL_RE = /language-(?:shellscript|shell|bash|sh|zsh)/u

/**
 * Use copy code function
 *
 * 使用复制代码功能
 *
 * @param options - Options for copy code / 复制代码选项
 * @internal
 */
// oxlint-disable-next-line max-lines-per-function
export const useCopyCode = ({
  options: baseOptions,
  locales,
}: UseCopyCodeOptions): void => {
  if (__VUEPRESS_SSR__) return

  /**
   * On small-screen devices, the copy button is not displayed by default in
   * order to prevent it from obstructing content, as the `:hover` effect can be
   * triggered by `touch` events.
   */
  const isMobile = useMediaQuery('(max-width: 419px)')
  const options = useCopyCodeOptions(baseOptions)
  const enabled = computed(() => !isMobile.value || options.value.showInMobile)

  const locale = useLocale(locales)

  const insertCopyButton = (codeBlockElement: HTMLElement): void => {
    if (codeBlockElement.hasAttribute('copy-code')) return

    const copyElement = document.createElement('button')

    copyElement.type = 'button'
    copyElement.classList.add('vp-copy-code-button')
    copyElement.setAttribute('aria-label', locale.value.copy)
    copyElement.dataset.copied = locale.value.copied

    codeBlockElement.parentElement?.insertBefore(copyElement, codeBlockElement)
    codeBlockElement.setAttribute('copy-code', '')
  }

  const appendCopyButton = (): void => {
    document.body.classList.toggle('no-copy-code', !enabled.value)
    if (!enabled.value) return

    document
      .querySelectorAll<HTMLElement>(options.value.selector)
      .forEach((el) => {
        insertCopyButton(el)
      })
  }

  watchImmediate([enabled, options], () => nextTick(appendCopyButton), {
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
    codeContent: HTMLElement,
    button: HTMLButtonElement,
  ): Promise<void> => {
    const { duration, ignoreSelector, transform } = options.value
    const clone = codeContent.cloneNode(true) as HTMLPreElement

    if (ignoreSelector) {
      clone.querySelectorAll(ignoreSelector).forEach((node) => {
        node.remove()
      })
    }

    if (transform) transform(clone)

    let text = clone.textContent || ''

    if (SHELL_RE.test(codeContainer.className))
      text = text.replaceAll(/^ *(?:\$|>) /gmu, '')

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

  useEventListener(
    'click',
    (event) => {
      const el = event.target as HTMLElement

      if (!enabled.value || !el.matches('button.vp-copy-code-button')) return

      const codeContainer = el.parentElement as HTMLDivElement | null
      const codeBlock = el.nextElementSibling as HTMLElement | null

      // The button is inserted right before the matched code block, so the
      // `copy-code` attribute ensures the button belongs to this plugin.
      if (!codeContainer || !codeBlock?.hasAttribute('copy-code')) return

      // If the configured selector matches a wrapper instead of the `<pre>`
      // element itself, look for the `<pre>` inside it.
      const preBlock = codeBlock.matches('pre')
        ? codeBlock
        : codeBlock.querySelector('pre')

      if (!preBlock) return

      void copyContent(codeContainer, preBlock, el as HTMLButtonElement)
    },
    { passive: true },
  )

  useEventListener(
    'dblclick',
    (event) => {
      const el = event.target as HTMLElement
      const { duration, inlineSelector } = options.value

      if (!enabled.value || !inlineSelector || !el.matches(inlineSelector))
        return

      const selection = window.getSelection()

      if (
        selection &&
        (el.contains(selection.anchorNode) || el.contains(selection.focusNode))
      )
        selection.removeAllRanges()

      void copy(el.textContent || '')
      ;(message ??= new Message()).pop(
        `${CHECK_ICON}<span>${locale.value.copied} </span>`,
        duration,
      )
    },
    { passive: true },
  )
}
