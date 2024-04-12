import { searchIndex as searchIndexRaw } from '@internal/searchIndex'
import FS from 'flexsearch'

export interface SearchIndexRet {
  path: string
  title: string
  content: string
}

export type ClientSideSearchIndex = (string, number) => SearchIndexRet[]

const index = new FS.Document({
  document: {
    id: 'id',
    index: ['title', 'content'],
  },
})
for (const key in searchIndexRaw.idx) {
  index.import(key, searchIndexRaw.idx[key])
}

export const findInIndex: ClientSideSearchIndex = (q: string, c: number) => {
  const searchResult: any = index.search(q, { enrich: true, limit: c })
  return searchResult.flatMap((r) => {
    return r.result.map((fieldResult) => {
      return {
        path: searchIndexRaw.paths[fieldResult.id],
        title: fieldResult.doc.title,
        content: fieldResult.doc.content,
      }
    })
  })
}
