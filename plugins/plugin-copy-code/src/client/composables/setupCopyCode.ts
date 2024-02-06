import { useLocaleConfig } from '@vuepress/helper/client'
import { useClipboard, useEventListener } from '@vueuse/core'
import { nextTick, onMounted, watch } from 'vue'
import { usePageData } from 'vuepress/client'
import type { CopyCodeLocaleConfig } from '../../shared/index.js'

declare const __CC_DELAY__: number
declare const __CC_DURATION__: number
declare const __CC_LOCALES__: CopyCodeLocaleConfig
declare const __CC_SELECTOR__: string[]
declare const __CC_SHOW_IN_MOBILE__: boolean

const timeoutIdMap = new Map<HTMLElement, number>()

const MOBILE_USERAGENT_REGEXP =
  /\b(?:Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini)/i

const isMobile = (): boolean =>
  typeof window !== 'undefined' &&
  window.navigator &&
  'userAgent' in window.navigator &&
  MOBILE_USERAGENT_REGEXP.test(navigator.userAgent)

export const setupCopyCode = (): void => {
  const { copy } = useClipboard({ legacy: true })
  const locale = useLocaleConfig(__CC_LOCALES__)
  const page = usePageData()

  const insertCopyButton = (codeBlockElement: HTMLElement): void => {
    if (!codeBlockElement.hasAttribute('copy-code-registered')) {
      const copyElement = document.createElement('button')

      copyElement.type = 'button'
      copyElement.classList.add('vp-copy-code-button')
      copyElement.innerHTML = '<div class="vp-copy-icon" />'
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
        __CC_SELECTOR__.forEach((item) => {
          document.querySelectorAll<HTMLElement>(item).forEach(insertCopyButton)
        })
      }, __CC_DELAY__),
    )
  }

  const copyContent = (
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
      }, __CC_DURATION__) as unknown as number

      timeoutIdMap.set(button, timeoutId)
    })
  }

  onMounted(() => {
    const enabled = !isMobile() || __CC_SHOW_IN_MOBILE__

    if (enabled) appendCopyButton()

    useEventListener('click', (event) => {
      const el = event.target as HTMLElement

      if (el.matches('div[class*="language-"] > button.copy')) {
        const codeContainer = el.parentElement as HTMLDivElement
        const preBlock = el.nextElementSibling as HTMLPreElement | null

        if (preBlock)
          copyContent(codeContainer, preBlock, el as HTMLButtonElement)
      } else if (el.matches('div[class*="language-"] div.vp-copy-icon')) {
        const buttonElement = el.parentElement as HTMLButtonElement
        const codeContainer = buttonElement.parentElement as HTMLDivElement
        const preBlock =
          buttonElement.nextElementSibling as HTMLPreElement | null

        if (preBlock) copyContent(codeContainer, preBlock, buttonElement)
      }
    })

    watch(
      () => page.value.path,
      () => {
        if (enabled) appendCopyButton()
      },
    )
  })
}
