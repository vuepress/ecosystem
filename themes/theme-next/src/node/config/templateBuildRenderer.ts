import type { TemplateRendererContext } from 'vuepress/utils'
import { templateRenderer } from 'vuepress/utils'
import type { DefaultThemeData } from '../../shared/index.js'

export const templateBuildRenderer = (
  template: string,
  context: TemplateRendererContext,
  options: DefaultThemeData,
): Promise<string> | string => {
  // eslint-disable-next-line no-useless-assignment
  let temp = template.replace(
    '<!--vuepress-theme-check-mac-os-->',
    `<script id="check-mac-os">document.documentElement.classList.toggle('mac', /Mac|iPhone|iPod|iPad/i.test(navigator.platform))</script>`,
  )

  if (options.appearance ?? true) {
    const appearance =
      typeof options.appearance === 'string' ? options.appearance : 'auto'
    const script =
      appearance === 'force-dark'
        ? `document.documentElement.dataset.theme = 'dark'`
        : `;(() => {
    const preference = localStorage.getItem('vuepress-color-scheme') || '${appearance}'
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
    const isDark = !preference || preference === 'auto' ? prefersDark : preference === 'dark'
    document.documentElement.dataset.theme = isDark ? 'dark' : 'light'
  })();`
    temp = template.replace(
      '<!--vuepress-theme-appearance-->',
      `<script id="check-dark-mode">${script}</script>`,
    )
  } else {
    temp = template.replace('<!--vuepress-theme-appearance-->', '')
  }

  return templateRenderer(temp, context)
}
