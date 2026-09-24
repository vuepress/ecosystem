import type {
  IndexItem,
  WorkerMessageData as BaseWorkerMessageData,
} from '@vuepress/search-helper/shared'
import type { SearchOptions } from 'slimsearch'

/** Search options of SlimSearch. SlimSearch 的搜索选项。 */
export type WorkerSearchOptions = Omit<
  SearchOptions<string, IndexItem>,
  'boostDocument' | 'fields' | 'filter' | 'processTerm' | 'tokenize'
>

/** Data of the message sent to the search worker. 发送到搜索工作线程的消息数据。 */
export type WorkerMessageData = BaseWorkerMessageData<WorkerSearchOptions>
