import type { TwoslashRenderer } from '@shikijs/twoslash'
import { rendererRich } from '@shikijs/twoslash'
import type { Element, ElementContent, Text } from 'hast'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { gfmFromMarkdown } from 'mdast-util-gfm'
import { defaultHandlers, toHast } from 'mdast-util-to-hast'
import type { ShikiTransformerContextCommon } from 'shiki'
import type { TwoslashFloatingVueRendererOptions } from './options.js'

const addVPreProp = <T extends ElementContent>(el: T): T => {
  if (el.type === 'element') {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    ;(el.properties ??= {})['v-pre'] = ''
  }
  return el
}

const compose = (parts: {
  token: Element | Text
  popup: Element
}): Element[] => {
  return [
    {
      type: 'element',
      tagName: 'span',
      properties: {},
      children: [parts.token],
    },
    {
      type: 'element',
      tagName: 'template',
      properties: {
        'v-slot:popper': '{}',
      },
      content: {
        type: 'root',
        children: [addVPreProp(parts.popup)],
      },
      children: [],
    },
  ]
}

function renderMarkdown(
  this: ShikiTransformerContextCommon,
  md: string,
): ElementContent[] {
  const mdast = fromMarkdown(
    md.replace(/\{@link ([^}]*)\}/g, '$1'), // replace jsdoc links
    { mdastExtensions: [gfmFromMarkdown()] },
  )

  return (
    toHast(mdast, {
      handlers: {
        code: (state, node: Parameters<typeof defaultHandlers.code>[1]) => {
          const _node = node as { lang?: string; value: string }
          const lang = _node.lang ?? ''
          const { children } = this.codeToHast(_node.value, {
            ...this.options,
            transformers: [],
            lang,
            structure: _node.value.trim().includes('\n') ? 'classic' : 'inline',
          })

          if (lang) {
            return {
              type: 'element',
              tagName: 'div',
              properties: {
                'class': `language-${lang}`,
                'data-ext': lang,
                'data-title': lang,
                'data-highlighter': 'shiki',
                'style':
                  children[0]?.type === 'element' &&
                  children[0].tagName === 'pre'
                    ? children[0].properties.style
                    : '',
              },
              children,
            } as Element
          }
          return defaultHandlers.code(state, node)
        },
      },
    }) as Element
  ).children
}

function renderMarkdownInline(
  this: ShikiTransformerContextCommon,
  md: string,
  context?: string,
): ElementContent[] {
  const str = context === 'tag:param' ? md.replace(/^([\w$-]+)/, '`$1` ') : md
  const children = renderMarkdown.call(this, str)

  // return the children (content) of the first paragraph if it's the only one
  if (
    children.length === 1 &&
    children[0].type === 'element' &&
    children[0].tagName === 'p'
  )
    return children[0].children

  return children
}

export const rendererFloatingVue = (
  options: TwoslashFloatingVueRendererOptions = {},
): TwoslashRenderer => {
  const {
    classCopyIgnore = 'vp-copy-ignore',
    classFloatingPanel = 'twoslash-floating',
    classCode = 'vp-code',
    classMarkdown = '',
    attrMarkdown = 'vp-content',
    floatingVueTheme = 'twoslash',
    floatingVueThemeQuery = 'twoslash-query',
    floatingVueThemeCompletion = 'twoslash-completion',
  } = options.floatingVue ?? {}

  const { errorRendering = 'line' } = options

  const hoverBasicProps = {
    'class': 'twoslash-hover',
    'popper-class': [
      'shiki',
      classFloatingPanel,
      classCopyIgnore,
      classCode,
    ].join(' '),
    'theme': floatingVueTheme,
  }

  const richRenderer = rendererRich({
    classExtra: classCopyIgnore,
    ...options,
    renderMarkdown,
    renderMarkdownInline,
    hast: {
      hoverToken: {
        tagName: 'v-menu',
        properties: hoverBasicProps,
      },
      hoverCompose: compose,
      queryToken: {
        tagName: 'v-menu',
        properties: {
          ...hoverBasicProps,
          ':shown': 'true',
          'theme': floatingVueThemeQuery,
        },
      },
      queryCompose: compose,
      popupDocs: {
        class: `twoslash-popup-docs ${classMarkdown}`,
        properties: {
          [attrMarkdown]: '',
        },
      },
      popupDocsTags: {
        class: `twoslash-popup-docs twoslash-popup-docs-tags ${classMarkdown}`,
        properties: {
          [attrMarkdown]: '',
        },
      },
      popupError: {
        class: `twoslash-popup-error ${classMarkdown}`,
        properties: {
          [attrMarkdown]: '',
        },
      },
      errorToken:
        errorRendering === 'line'
          ? undefined
          : {
              tagName: 'v-menu',
              properties: {
                ...hoverBasicProps,
                class: 'twoslash-error twoslash-error-hover',
              },
            },
      errorCompose: compose,
      completionCompose({ popup, cursor }) {
        return [
          {
            type: 'element',
            tagName: 'v-menu',
            properties: {
              'popper-class': [
                'shiki twoslash-completion',
                classCopyIgnore,
                classFloatingPanel,
              ],
              'theme': floatingVueThemeCompletion,
              ':shown': 'true',
            },
            children: [
              cursor,
              {
                type: 'element',
                tagName: 'template',
                properties: {
                  'v-slot:popper': '{}',
                },
                content: {
                  type: 'root',
                  children: [addVPreProp(popup)],
                },
              },
            ],
          } as Element,
        ]
      },
    },
  })

  return richRenderer
}
