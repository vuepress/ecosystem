/**
 * Forked and edited from https://github.com/vxhly/vuepress-plugin-one-click-copy/blob/master/bin/clientRootMixin.js
 *
 * MIT License
 *
 * Copyright (c) 2019 vxhly <pengchengou@gmail.com>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * © 2019 GitHub, Inc.
 */

import { useLocaleConfig } from '@vuepress/helper/client'
import { useClipboard, useEventListener } from '@vueuse/core'
import { nextTick, onMounted, watch } from 'vue'
import { usePageData } from 'vuepress/client'
import type { CopyCodeLocaleConfig } from '../../shared/index.js'
import { useIsMobile } from './useIsMobile.js'

declare const __COPY_CODE_DELAY__: number
declare const __COPY_CODE_DURATION__: number
declare const __COPY_CODE_LOCALES__: CopyCodeLocaleConfig
declare const __COPY_CODE_SELECTOR__: string[]
declare const __COPY_CODE_SHOW_IN_MOBILE__: boolean

const timeoutIdMap = new Map<HTMLElement, number>()

export const setupCopyCode = (): void => {
  const { copy } = useClipboard({ legacy: true })
  const locale = useLocaleConfig(__COPY_CODE_LOCALES__)
  const page = usePageData()
  const isMobile = useIsMobile()

  const insertCopyButton = (codeBlockElement: HTMLElement): void => {
    if (!codeBlockElement.hasAttribute('copy-code-registered')) {
      const copyElement = document.createElement('button')

      copyElement.type = 'button'
      copyElement.classList.add('copy-code-button')
      copyElement.innerHTML = '<div class="copy-icon" />'
      copyElement.setAttribute('aria-label', locale.value.copy)
      copyElement.setAttribute('data-copied', locale.value.copied)

      if (codeBlockElement.parentElement)
        codeBlockElement.parentElement.insertBefore(
          copyElement,
          codeBlockElement,
        )

      codeBlockElement.setAttribute('copy-code-registered', '')
    }
  }

  const appendCopyButton = (): void => {
    nextTick().then(() =>
      setTimeout(() => {
        __COPY_CODE_SELECTOR__.forEach((item) => {
          document.querySelectorAll<HTMLElement>(item).forEach(insertCopyButton)
        })
      }, __COPY_CODE_DELAY__),
    )
  }

  const copyCodeBlockContent = (
    codeContainer: HTMLDivElement,
    codeContent: HTMLPreElement,
    button: HTMLButtonElement,
  ): void => {
    let { innerText: text = '' } = codeContent

    if (
      // is shell
      /language-(shellscript|shell|bash|sh|zsh)/.test(
        codeContainer.classList.toString(),
      )
    )
      text = text.replace(/^ *(\$|>) /gm, '')

    copy(text).then(() => {
      button.classList.add('copied')
      clearTimeout(timeoutIdMap.get(button))

      const timeoutId = setTimeout(() => {
        button.classList.remove('copied')
        button.blur()
        timeoutIdMap.delete(button)
      }, __COPY_CODE_DURATION__) as unknown as number

      timeoutIdMap.set(button, timeoutId)
    })
  }

  onMounted(() => {
    if (!isMobile.value || __COPY_CODE_SHOW_IN_MOBILE__) appendCopyButton()

    useEventListener('click', (event) => {
      const el = event.target as HTMLElement

      if (el.matches('div[class*="language-"] > button.copy')) {
        const codeContainer = el.parentElement as HTMLDivElement
        const preBlock = el.nextElementSibling as HTMLPreElement | null

        if (preBlock)
          copyCodeBlockContent(codeContainer, preBlock, el as HTMLButtonElement)
      } else if (el.matches('div[class*="language-"] div.copy-icon')) {
        const buttonElement = el.parentElement as HTMLButtonElement
        const codeContainer = buttonElement.parentElement as HTMLDivElement
        const preBlock =
          buttonElement.nextElementSibling as HTMLPreElement | null

        if (preBlock)
          copyCodeBlockContent(codeContainer, preBlock, buttonElement)
      }
    })

    watch(
      () => page.value.path,
      () => {
        if (!isMobile.value || __COPY_CODE_SHOW_IN_MOBILE__) appendCopyButton()
      },
    )
  })
}
