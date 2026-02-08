import type { MeiliSearchLocaleData } from '../../shared/index.js'

/**
 * Get the search button template
 *
 * Use the same content as in `@docsearch/js`
 *
 * TODO: the meta key text should also be dynamic
 *
 * @param buttonText - The button text
 * @param buttonAriaLabel - The button aria-label
 * @returns The search button template
 */
export const getSearchButtonTemplate = ({
  buttonText = 'Search',
  buttonAriaLabel = buttonText,
}: Partial<MeiliSearchLocaleData['button']> = {}): string =>
  `<button type="button" class="docsearch-btn" aria-label="${buttonAriaLabel}"><span class="docsearch-btn-icon-container"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" class="docsearch-modal-btn-icon"><path fill="currentColor" d="M21.71 20.29L18 16.61A9 9 0 1 0 16.61 18l3.68 3.68a1 1 0 0 0 1.42 0a1 1 0 0 0 0-1.39ZM11 18a7 7 0 1 1 7-7a7 7 0 0 1-7 7Z"></path></svg></span><span class="docsearch-btn-placeholder">${buttonText}</span><span class="docsearch-btn-keys"><kbd class="docsearch-btn-key">Ctrl</kbd><kbd class="docsearch-btn-key">K</kbd></span></button>`
