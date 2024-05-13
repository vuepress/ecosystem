import type MarkdownIt from 'markdown-it'
import type { RenderRule } from 'markdown-it/lib/renderer.mjs'
import type Token from 'markdown-it/lib/token.mjs'
import container from 'markdown-it-container'
import { nanoid } from 'nanoid'
import type { MarkdownEnv } from 'vuepress/markdown'
import { ensureLeadingSlash, resolveLocalePath } from 'vuepress/shared'
import type { ContainerOptions } from '../../shared/index.js'

export const containerPlugin = (
  md: MarkdownIt,
  locales: Record<string, ContainerOptions>,
): void => {
  md.use(...createContainer('tip', locales, md))
  md.use(...createContainer('info', locales, md))
  md.use(...createContainer('warning', locales, md))
  md.use(...createContainer('caution', locales, md))
  md.use(...createContainer('danger', locales, md))
  md.use(...createContainer('important', locales, md))
  md.use(...createContainer('details', locales, md))

  // explicitly escape Vue syntax
  md.use(container, 'v-pre', {
    render: (tokens: Token[], idx: number) =>
      tokens[idx].nesting === 1 ? `<div v-pre>\n` : `</div>\n`,
  })

  md.use(...createCodeGroup())
}

type ContainerArgs = [typeof container, string, { render: RenderRule }]

function createContainer(
  type: string,
  locales: Record<string, ContainerOptions>,
  md: MarkdownIt,
): ContainerArgs {
  return [
    container,
    type,
    {
      render(tokens, idx, _options, env: MarkdownEnv & { references?: any }) {
        const token = tokens[idx]
        const info = token.info.trim().slice(type.length).trim()
        const attrs = md.renderer.renderAttrs(token)
        const { filePathRelative } = env
        const relativePath = ensureLeadingSlash(filePathRelative ?? '')
        const localePath = resolveLocalePath(locales, relativePath)
        const defaultTitle =
          locales[localePath]?.[`${type}Label`] || type.toUpperCase()

        if (token.nesting === 1) {
          const title = md.renderInline(info || defaultTitle, {
            references: env.references,
          })
          if (type === 'details')
            return `<details class="${type} custom-block"${attrs}><summary>${title}</summary>\n`
          return `<div class="${type} custom-block"${attrs}><p class="custom-block-title">${title}</p>\n`
        } else return type === 'details' ? `</details>\n` : `</div>\n`
      },
    },
  ]
}

function createCodeGroup(): ContainerArgs {
  return [
    container,
    'code-group',
    {
      render(tokens, idx) {
        if (tokens[idx].nesting === 1) {
          const name = nanoid(5)
          let tabs = ''
          let checked = 'checked'
          const first = idx + 1

          for (
            let i = idx + 1;
            !(
              tokens[i].nesting === -1 &&
              tokens[i].type === 'container_code-group_close'
            );
            ++i
          ) {
            const isHtml = tokens[i].type === 'html_block'

            if (
              (tokens[i].type === 'fence' && tokens[i].tag === 'code') ||
              isHtml
            ) {
              const title = extractTitle(
                isHtml ? tokens[i].content : tokens[i].info,
                isHtml,
              )
              const active = / active( |$)/.test(tokens[i].info)

              if (title) {
                const id = nanoid(7)
                tabs += `<input type="radio" name="group-${name}" id="tab-${id}" ${i === first ? '{{checked}}' : ''} ${active ? checked : ''}><label for="tab-${id}">${title}</label>`

                active && (checked = '')
              }
            }
          }

          tabs = tabs.replace('{{checked}}', checked)

          return `<VPCodeGroup class="vp-code-group"><div class="tabs">${tabs}</div><div class="blocks">\n`
        }
        return `</div></VPCodeGroup>\n`
      },
    },
  ]
}

function extractTitle(info: string, html = false): string {
  if (html) {
    return (
      info.replace(/<!--[^]*?-->/g, '').match(/data-title="(.*?)"/)?.[1] || ''
    )
  }
  return info.match(/\[(.*)\]/)?.[1] || extractLang(info) || 'txt'
}

function extractLang(info: string): string {
  return info
    .trim()
    .replace(/=(\d*)/, '')
    .replace(/:(no-)?line-numbers({| |$|=\d*).*/, '')
    .replace(/(-vue|{| ).*$/, '')
    .replace(/^vue-html$/, 'template')
    .replace(/^ansi$/, '')
}
