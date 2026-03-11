import type { App } from 'vuepress/core'

/**
 * Blog store that maps article page paths to numeric indexes
 *
 * 博客存储，将文章页面路径映射为数字索引
 *
 * @description The store assigns a unique numeric index to each page path,
 * which is used by categories and types to reference articles efficiently.
 * Indexes are stable: removing an item clears its slot rather than shifting others.
 *
 * 存储为每个页面路径分配唯一的数字索引，分类和类型使用这些索引高效地引用文章。
 * 索引是稳定的：删除条目会清空其位置而不是移动其他条目。
 */
export class Store {
  /**
   * Internal array of page paths, where the array index is the store index
   *
   * 页面路径的内部数组，数组索引即为存储索引
   */
  public store: string[]

  public constructor() {
    this.store = []
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
    const index = this.store.indexOf(item)

    if (index === -1) {
      this.store.push(item)

      return this.store.length - 1
    }

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
   * Clear an item from the store by setting its slot to empty string
   *
   * 通过将其位置设为空字符串来清除存储中的条目
   *
   * @description This preserves index stability for other items
   *
   * 这样做可以保持其他条目的索引稳定性
   *
   * @param item - Page path to clear / 要清除的页面路径
   */
  public clearItem(item: string): void {
    const index = this.store.indexOf(item)

    if (index !== -1) this.store[index] = ''
  }

  /**
   * Serialize the store to JSON string
   *
   * 将存储序列化为 JSON 字符串
   *
   * @returns JSON string of the store array / 存储数组的 JSON 字符串
   */
  public toJSON(): string {
    return JSON.stringify(this.store)
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
