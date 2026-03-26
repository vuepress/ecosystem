import type { App } from 'vuepress/core'

/**
 * Blog store that maps article page paths to numeric indexes
 *
 * 博客存储，将文章页面路径映射为数字索引
 *
 * @description The store assigns a unique numeric index to each page path,
 * which is used by categories and types to reference articles efficiently.
 */
export class Store {
  /**
   * Map of page paths to their indexes for O(1) lookup
   *
   * 页面路径到索引的映射，实现 O(1) 查找
   */
  private pathToIndex: Map<string, number>

  /**
   * Array of page paths indexed by store index
   *
   * 按存储索引排列的页面路径数组
   */
  private indexToPath: string[]

  /**
   * Stack of free slots available for reuse
   *
   * 可供复用的空闲位置栈
   */
  private freeSlots: number[]

  public constructor() {
    this.pathToIndex = new Map()
    this.indexToPath = []
    this.freeSlots = []
  }

  /**
   * Add an item to the store and return its index
   *
   * 添加条目到存储并返回其索引
   *
   * @param item - Page path to add / 要添加的页面路径
   * @returns Index of the item in the store / 条目在存储中的索引
   */
  public addItem(item: string): number {
    const existing = this.pathToIndex.get(item)

    if (existing !== undefined) return existing

    let index: number

    if (this.freeSlots.length > 0) {
      index = this.freeSlots.pop()!
      this.indexToPath[index] = item
    } else {
      index = this.indexToPath.length
      this.indexToPath.push(item)
    }

    this.pathToIndex.set(item, index)

    return index
  }

  /**
   * Add multiple items and return their indexes
   *
   * 添加多个条目并返回它们的索引
   *
   * @param items - Page paths to add / 要添加的页面路径数组
   * @returns Array of indexes / 索引数组
   */
  public addItems(items: string[]): number[] {
    return items.map((item) => this.addItem(item))
  }

  /**
   * Clear an item from the store and free its slot for reuse
   *
   * 从存储中清除条目并释放其位置供复用
   *
   * @param item - Page path to clear / 要清除的页面路径
   */
  public clearItem(item: string): void {
    const index = this.pathToIndex.get(item)

    if (index !== undefined) {
      this.pathToIndex.delete(item)
      this.indexToPath[index] = ''
      this.freeSlots.push(index)
    }
  }

  /**
   * Serialize the store to JSON string
   *
   * 将存储序列化为 JSON 字符串
   *
   * @returns JSON string of the store as an index-to-path object / 存储的索引到路径对象的 JSON 字符串
   */
  public toJSON(): string {
    const result: Record<number, string> = {}

    for (const [path, index] of this.pathToIndex) result[index] = path

    return JSON.stringify(result)
  }
}

/**
 * Write the blog store to a temp file
 *
 * 将博客存储写入临时文件
 *
 * @param app - VuePress app instance / VuePress 应用实例
 * @param store - Blog store instance / 博客存储实例
 */
export const prepareStore = async (app: App, store: Store): Promise<void> => {
  await app.writeTemp(
    `blog/store.js`,
    `\
export const store = JSON.parse(${JSON.stringify(store.toJSON())});
`,
  )
}
