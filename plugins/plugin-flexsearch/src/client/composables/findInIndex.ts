import { searchIndex as searchIndexRaw } from '@internal/searchIndex'
import FS from 'flexsearch'

export interface SearchIndexRet {
  path: string
  title: string
  content: string
}

export type ClientSideSearchIndex = (string, number) => SearchIndexRet[]

const index = FS.create({
  async: false,
  doc: {
    id: 'id',
    field: ['title', 'content'],
  },
})
index.import(searchIndexRaw.idx)

export const findInIndex: ClientSideSearchIndex = (q: string, c: number) => {
  const searchResult: any = index.search(q, c)
  return searchResult.map((r) => {
    return {
      path: searchIndexRaw.paths[r.id],
      title: r.title,
      content: r.content,
    }
  })
}
