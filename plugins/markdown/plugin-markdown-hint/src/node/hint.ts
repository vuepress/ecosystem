import type { MarkdownItContainerOptions } from '@mdit/plugin-container'
import { container } from '@mdit/plugin-container'
import type { ExactLocaleConfig } from '@vuepress/helper'
import { ensureLeadingSlash } from '@vuepress/helper'
import type { PluginWithOptions } from 'markdown-it'
import type { MarkdownEnv } from 'vuepress/markdown'
import { resolveLocalePath } from 'vuepress/shared'

import type { MarkdownHintPluginLocaleData } from './options.js'

export type MarkdownItHintOptions =
  ExactLocaleConfig<MarkdownHintPluginLocaleData>

export type MarkdownHintContainerName = keyof MarkdownHintPluginLocaleData

const CONTAINERS: MarkdownHintContainerName[] = [
  'info',
  'note',
  'tip',
  'warning',
  'caution',
  'important',
]

export const hint: PluginWithOptions<MarkdownItHintOptions> = (
  md,
  options = {},
) => {
  CONTAINERS.forEach((name) => {
    md.use<MarkdownItContainerOptions>(container, {
      name,
      openRender: (tokens, index, _options, env: MarkdownEnv) => {
        const token = tokens[index]

        // Resolve info (title)
        let info = token.info.trim().slice(name.length).trim()

        // Get locale
        if (!info) {
          const { filePathRelative } = env
          const relativePath = ensureLeadingSlash(filePathRelative ?? '')
          const localePath = resolveLocalePath(options, relativePath)

          // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
          info = options[localePath]?.[name]
        } else {
          info = md.renderInline(info)
        }

        return `<div class="hint-container ${name}">\n<p class="hint-container-title">${info || name}</p>\n`
      },
      closeRender: () => '</div>\n',
    })
  })

  // Compact with @vuepress/theme-default
  md.use<MarkdownItContainerOptions>(container, {
    name: 'danger',
    openRender: (tokens, index, _options, env: MarkdownEnv) => {
      const token = tokens[index]

      // Resolve info (title)
      let info = token.info.trim().slice(6).trim()

      // Get locale
      if (!info) {
        const { filePathRelative } = env
        const relativePath = ensureLeadingSlash(filePathRelative ?? '')
        const localePath = resolveLocalePath(options, relativePath)

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        info = options[localePath]?.caution
      } else {
        info = md.renderInline(info)
      }

      return `<div class="hint-container caution">\n<p class="hint-container-title">${
        info || 'caution'
      }</p>\n`
    },
    closeRender: () => '</div>\n',
  })

  md.use<MarkdownItContainerOptions>(container, {
    name: 'details',
    openRender: (tokens, index, _options, env: MarkdownEnv) => {
      const token = tokens[index]

      // Resolve info (title)
      let info = token.info
        .trim()
        .slice(
          // Length of "details"
          7,
        )
        .trim()

      // Get locale
      if (!info) {
        const { filePathRelative } = env
        const relativePath = ensureLeadingSlash(filePathRelative ?? '')
        const localePath = resolveLocalePath(options, relativePath)

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        info = options[localePath]?.details
      } else {
        info = md.renderInline(info)
      }

      return `<details class="hint-container details"><summary>${
        info || 'Details'
      }</summary>\n`
    },
    closeRender: () => '</details>\n',
  })
}
