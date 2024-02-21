import { useLocaleConfig, wait } from '@vuepress/helper/client'
import { useClipboard, useEventListener } from '@vueuse/core'
import { nextTick, onMounted, watch } from 'vue'
import { usePageData } from 'vuepress/client'
import type { CopyCodePluginLocaleConfig } from '../../shared/index.js'
import { isMobile } from '../utils/index.js'

export interface UseCopyCodeOptions {
  locales: CopyCodePluginLocaleConfig
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
  const { copy, copied } = useClipboard({
    legacy: true,
    copiedDuring: duration,
  })
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
    nextTick()
      .then(() => wait(delay))
      .then(() => {
        selector.forEach((item) => {
          document.querySelectorAll<HTMLElement>(item).forEach(insertCopyButton)
        })
      })
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

      watch(
        copied,
        () => {
          button.classList.remove('copied')
          button.blur()
        },
        { once: true },
      )
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
