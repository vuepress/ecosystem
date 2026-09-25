import type { SearchParamsFullText } from '@orama/orama'
import type {
  IndexItem,
  SearchableProperty,
  WorkerMessageData as BaseWorkerMessageData,
} from '@vuepress/search-helper/shared'

import type { SearchIndex } from './data.js'

/** Search options of Orama. Orama 的搜索选项。 */
export type WorkerSearchOptions = Omit<
  Pick<
    SearchParamsFullText<SearchIndex, IndexItem>,
    | 'boost'
    | 'exact'
    | 'limit'
    | 'offset'
    | 'properties'
    | 'sortBy'
    | 'threshold'
    | 'tolerance'
  >,
  'properties'
> & {
  /**
   * The properties of the document to search in.
   *
   * Accepts a readonly array because the option may be made readonly when
   * injected through a readonly ref.
   *
   * 需要搜索的文档属性。
   *
   * 接受只读数组，因为该选项在通过只读 ref 注入时可能会变为只读。
   */
  properties?: '*' | readonly SearchableProperty[]
}

/** Data of the message sent to the search worker. 发送到搜索工作线程的消息数据。 */
export type WorkerMessageData = BaseWorkerMessageData<WorkerSearchOptions>
