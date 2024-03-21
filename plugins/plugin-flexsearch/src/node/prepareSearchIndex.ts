import FS from 'flexsearch'
import he from 'he/he.js'
import type { App } from 'vuepress/core'
import type { FlexsearchPluginOptions } from './flexsearchPlugin.js'

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateSearchIndex) {
    __VUE_HMR_RUNTIME__.updateSearchIndex(searchIndex)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ searchIndex }) => {
    __VUE_HMR_RUNTIME__.updateSearchIndex(searchIndex)
  })
}
`

const prepContent = (html: string): string => {
  const text = he.decode(
    // decode HTML entities like &quot;
    html
      .replace(/<[^>]*(>|$)/g, ' ') // remove HTML tag
      .replace(/^\s*#\s/gm, ''), // remove header anchors inserted by vuepress
  )
  return text
}

export const prepareSearchIndex = async ({
  app,
  isSearchable,
  getExtraFields,
}: {
  app: App
  isSearchable: Required<FlexsearchPluginOptions>['isSearchable']
  getExtraFields: Required<FlexsearchPluginOptions>['getExtraFields']
}): Promise<string> => {
  // generate search index
  const pages = app.pages.filter(isSearchable)

  const index = FS.create({
    doc: {
      id: 'id',
      field: ['title', 'content'],
    },
  })

  const paths: string[] = []
  let nextId = 0
  pages.forEach((p) => {
    paths.push(p.path)
    const id = nextId++
    const d = { id, title: p.title, content: prepContent(p.contentRendered) }
    index.add(d)
  })

  const data = index.export()

  // search index file content
  let content = `\
export const searchIndex = {
  paths: ${JSON.stringify(paths, null, 2)},
  idx: ${JSON.stringify(data, null, 2)}
}
`

  // inject HMR code
  if (app.env.isDev) {
    content += HMR_CODE
  }

  return app.writeTemp('internal/searchIndex.js', content)
}
