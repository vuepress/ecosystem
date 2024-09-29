import type { ExactLocaleConfig } from '@vuepress/helper/client'
import {
  isLinkHttp,
  isPlainObject,
  isString,
  removeEndingSlash,
  useLocaleConfig,
} from '@vuepress/helper/client'
import { useEventListener } from '@vueuse/core'
import { computed, onMounted, watchEffect } from 'vue'
import { usePageData, usePageFrontmatter } from 'vuepress/client'
import type {
  CopyrightPluginFrontmatter,
  CopyrightPluginLocaleData,
  CopyrightPluginPageData,
} from '../../shared/index.js'
import type { CopyrightPluginClientOptions } from '../typings.js'

export const setupCopyright = (
  options: CopyrightPluginClientOptions,
  locales: ExactLocaleConfig<CopyrightPluginLocaleData>,
): void => {
  const locale = useLocaleConfig(locales)
  const frontmatter = usePageFrontmatter<CopyrightPluginFrontmatter>()
  const page = usePageData<CopyrightPluginPageData>()

  const enabled = computed(
    () =>
      Boolean(frontmatter.value.copy) ||
      (frontmatter.value.copy !== false && options.global),
  )

  const frontmatterOptions = computed(() =>
    isPlainObject(frontmatter.value.copy) ? frontmatter.value.copy : null,
  )

  const disableCopy = computed(
    () => frontmatterOptions.value?.disableCopy ?? options.disableCopy ?? false,
  )

  const disableSelection = computed(() =>
    enabled.value
      ? (frontmatterOptions.value?.disableSelection ??
        options.disableSelection ??
        false)
      : false,
  )

  const maxLength = computed(() =>
    enabled.value
      ? (frontmatterOptions.value?.maxLength ?? options.maxLength ?? 0)
      : 0,
  )

  const triggerLength = computed(
    () =>
      frontmatterOptions.value?.triggerLength ?? options.triggerLength ?? 100,
  )

  const getLink = (canonical?: string): string =>
    canonical
      ? `${removeEndingSlash(
          isLinkHttp(canonical) ? canonical : `https://${canonical}`,
        )}${page.value.path}`
      : window.location.href

  const getCopyrightContent = (
    authorInfo?: string,
    licenseInfo?: string,
  ): string => {
    const { author, license, link } = locale.value

    return [
      authorInfo ? author.replace(':author', authorInfo) : '',
      licenseInfo ? license.replace(':license', licenseInfo) : '',
      link.replace(':link', getLink(options.canonical)),
    ]
      .filter((item) => item)
      .join('\n')
  }

  const getCopyright = (): string => {
    if (isString(page.value.copyright))
      return page.value.copyright.replace(':link', getLink())

    const { author, license } = page.value.copyright ?? {}

    return getCopyrightContent(
      author ?? options.author,
      license ?? options.license,
    )
  }

  const onCopy = (event: ClipboardEvent): void => {
    const selection = getSelection()

    if (selection) {
      const textRange = selection.getRangeAt(0)

      if (enabled.value) {
        const textLength = textRange.toString().length

        if (
          disableCopy.value ||
          (maxLength.value && textLength > maxLength.value)
        ) {
          event.preventDefault()
          return
        }

        if (textLength >= triggerLength.value) {
          event.preventDefault()

          const copyright = getCopyright()
          const node = document.createElement('div')

          node.appendChild(selection.getRangeAt(0).cloneContents())

          if (event.clipboardData) {
            event.clipboardData.setData(
              'text/html',
              `${node.innerHTML}<hr><div class="copyright">${copyright.replace(
                /\\n/g,
                '<br>',
              )}</div>`,
            )
            event.clipboardData.setData(
              'text/plain',
              `${
                selection.getRangeAt(0).cloneContents().textContent || ''
              }\n------\n${copyright}`,
            )
          }
        }
      }
    }
  }

  onMounted(() => {
    const appElement = document.querySelector<HTMLDivElement>('#app')!

    useEventListener(appElement, 'copy', onCopy)

    watchEffect(() => {
      appElement.style.userSelect = disableSelection.value ? 'none' : 'auto'
    })
  })
}
