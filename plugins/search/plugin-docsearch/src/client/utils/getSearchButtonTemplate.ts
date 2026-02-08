import type { DocSearchProps } from '@docsearch/react'
import { isMacOS, isiPad, isiPhone } from '@vuepress/helper/client'

type DocSearchTranslation = Exclude<DocSearchProps['translations'], undefined>

/**
 * Get the search button template
 *
 * Similar to content as in `@docsearch/js`, the key are rendered by text instead of svg
 *
 * @param buttonText - The text of the search button / 搜索按钮的文本
 * @param buttonAriaLabel - The aria-label of the search button / 搜索按钮的 aria-label
 * @returns Search button template / 搜索按钮模板
 */
export const getSearchButtonTemplate = ({
  buttonText = 'Search',
  buttonAriaLabel = buttonText,
}: DocSearchTranslation['button'] = {}): string => {
  const isApple = !__VUEPRESS_SSR__ && (isMacOS() || isiPad() || isiPhone())

  return `<button type="button" aria-label="${buttonAriaLabel}" aria-keyshortcuts="${isApple ? 'Command' : 'Control'}+k" class="DocSearch DocSearch-Button"><span class="DocSearch-Button-Container"><svg width="20" height="20" viewBox="0 0 24 24" aria-hidden="true" class="DocSearch-Search-Icon"><circle cx="11" cy="11" r="8" stroke="currentColor" fill="none" stroke-width="1.4"></circle><path d="m21 21-4.3-4.3" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"></path></svg><span class="DocSearch-Button-Placeholder">${buttonText}</span></span><span class="DocSearch-Button-Keys"><kbd class="DocSearch-Button-Key ${isApple ? '' : 'DocSearch-Button-Key--ctrl'}">${isApple ? '⌘' : 'Ctrl'}</kbd><kbd class="DocSearch-Button-Key">K</kbd></span></button>`
}
