import type { Page } from 'vuepress'
import type {
  DefaultThemeData,
  DefaultThemePageData,
} from '../../shared/index.js'

export function resolvePageHead(
  page: Page<Partial<DefaultThemePageData>>,
  options: DefaultThemeData,
): void {
  page.frontmatter.head ??= []

  if (options?.appearance ?? true) {
    // if appearance mode set to light or dark, default to the defined mode
    // in case the user didn't specify a preference - otherwise, default to auto
    const fallbackPreference =
      typeof options?.appearance === 'string'
        ? options?.appearance
        : typeof options?.appearance === 'object'
          ? options.appearance.initialValue ?? 'auto'
          : 'auto'

    page.frontmatter.head.push([
      'script',
      { id: 'check-dark-mode' },
      fallbackPreference === 'force-dark'
        ? `document.documentElement.classList.add('dark')`
        : `;(() => {
                const preference = localStorage.getItem('vuepress-color-scheme') || '${fallbackPreference}'
                const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
                if (!preference || preference === 'auto' ? prefersDark : preference === 'dark')
                  document.documentElement.classList.add('dark')
              })()`,
    ])
  }

  page.frontmatter.head?.push([
    'script',
    { id: 'check-mac-os' },
    `document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))`,
  ])
}
