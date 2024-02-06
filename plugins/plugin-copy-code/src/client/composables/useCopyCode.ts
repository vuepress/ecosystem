import { useLocaleConfig } from '@vuepress/helper/client'
import { useClipboard, useEventListener } from '@vueuse/core'
import { nextTick, onMounted, watch } from 'vue'
import { usePageData } from 'vuepress/client'
import type { CopyCodeLocaleConfig } from '../../shared/index.js'
import { isMobile } from '../utils/index.js'

const timeoutIdMap = new Map<HTMLElement, number>()

export interface UseCopyCodeOptions {
  locales: CopyCodeLocaleConfig
  selector: string[]

  /** @default 500 */
  delay: number
  /** @default 2000 */
  duration: number
  /** @default false */
  showInMobile?: boolean
}

export const useCopyCode = ({
  delay = 500,
  duration = 2000,
  locales,
  selector,
  showInMobile,
}: UseCopyCodeOptions): void => {
  const { copy } = useClipboard({ legacy: true })
  const locale = useLocaleConfig(locales)
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
        selector.forEach((item) => {
          document.querySelectorAll<HTMLElement>(item).forEach(insertCopyButton)
        })
      }, delay),
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
      }, duration) as unknown as number

      timeoutIdMap.set(button, timeoutId)
    })
  }

  onMounted(() => {
    const enabled = !isMobile() || showInMobile

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
