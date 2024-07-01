import { markdownContainerPlugin } from '@vuepress/plugin-markdown-container'
import { nanoid } from 'nanoid'
import type { Plugin } from 'vuepress'

export const createCodeGroupPlugin = (): Plugin => {
  return markdownContainerPlugin({
    type: 'code-group',
    render: (tokens, idx) => {
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

        return `<VPCodeGroup class="vp-code-group"><div class="tabs">${tabs}</div><div class="blocks">`
      }
      return `</div></VPCodeGroup>`
    },
  })
}

const extractTitle = (info: string, html = false): string => {
  if (html) {
    return (
      info.replace(/<!--[^]*?-->/g, '').match(/data-title="(.*?)"/)?.[1] || ''
    )
  }
  return info.match(/\[(.*)\]/)?.[1] || extractLang(info) || 'txt'
}

const extractLang = (info: string): string => {
  return info
    .trim()
    .replace(/=(\d*)/, '')
    .replace(/:(no-)?line-numbers({| |$|=\d*).*/, '')
    .replace(/:(no-)?v-pre/, '')
    .replace(/^ansi$/, '')
}
