import { cachePlugin } from '@vuepress/plugin-cache'
import { catalogPlugin } from '@vuepress/plugin-catalog'
import { commentPlugin } from '@vuepress/plugin-comment'
import { docsearchPlugin } from '@vuepress/plugin-docsearch'
import { feedPlugin } from '@vuepress/plugin-feed'
import { iconPlugin } from '@vuepress/plugin-icon'
import { markdownExtPlugin } from '@vuepress/plugin-markdown-ext'
import { markdownImagePlugin } from '@vuepress/plugin-markdown-image'
import { markdownIncludePlugin } from '@vuepress/plugin-markdown-include'
import { markdownMathPlugin } from '@vuepress/plugin-markdown-math'
import { markdownStylizePlugin } from '@vuepress/plugin-markdown-stylize'
import { redirectPlugin } from '@vuepress/plugin-redirect'
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'
import { revealJsPlugin } from '@vuepress/plugin-revealjs'
import { shikiPlugin } from '@vuepress/plugin-shiki'
import { getDirname, path } from 'vuepress/utils'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

export const plugins = [
  cachePlugin(),
  catalogPlugin(),
  commentPlugin({
    provider: 'Giscus',
    repo: 'vuepress/ecosystem',
    repoId: 'R_kgDOKPxScA',
    category: 'Announcements',
    categoryId: 'DIC_kwDOKPxScM4CbWy7',
  }),
  docsearchPlugin({
    appId: 'N7UOPMVZ5B',
    apiKey: 'aa626dfa43a5e32cd519ba84735ad384',
    indexName: 'ecosystem-vuejs',
  }),
  feedPlugin({
    hostname: 'https://ecosystem.vuejs.press',
    atom: true,
    json: true,
    rss: true,
  }),
  iconPlugin({
    prefix: 'lucide:',
  }),
  markdownExtPlugin({
    gfm: true,
    component: true,
    vPre: true,
  }),
  markdownImagePlugin({
    figure: true,
    mark: true,
    size: true,
  }),
  markdownIncludePlugin({
    deep: true,
  }),
  markdownMathPlugin({
    type: 'katex',
  }),
  markdownStylizePlugin({
    align: true,
    attrs: true,
    mark: true,
    spoiler: true,
    sub: true,
    sup: true,
    custom: [
      {
        matcher: 'Recommended',
        replacer: ({ tag }) => {
          if (tag === 'em')
            return {
              tag: 'Badge',
              attrs: { type: 'tip' },
              content: 'Recommended',
            }

          return null
        },
      },
    ],
  }),
  redirectPlugin({
    switchLocale: 'modal',
  }),
  registerComponentsPlugin({
    components: {
      NpmBadge: path.resolve(__dirname, '../components/NpmBadge.vue'),
    },
  }),
  revealJsPlugin({
    plugins: ['highlight', 'math', 'search', 'notes', 'zoom'],
    themes: [
      'auto',
      'beige',
      'black',
      'blood',
      'league',
      'moon',
      'night',
      'serif',
      'simple',
      'sky',
      'solarized',
      'white',
    ],
  }),
  shikiPlugin({
    themes: {
      light: 'one-light',
      dark: 'one-dark-pro',
    },
    lineNumbers: 10,
    notationDiff: true,
    notationErrorLevel: true,
    notationFocus: true,
    notationHighlight: true,
    notationWordHighlight: true,
    whitespace: true,
    collapsedLines: false,
    twoslash: true,
  }),
]
