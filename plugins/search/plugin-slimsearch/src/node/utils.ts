import { Logger, ensureEndingSlash } from '@vuepress/helper'
import { getDirname, path } from 'vuepress/utils'

const __dirname = getDirname(import.meta.url)

export const CLIENT_FOLDER = ensureEndingSlash(
  path.resolve(__dirname, '../client/'),
)

export const WORKER_FILE = path.resolve(__dirname, '../worker/index.js')

export const PLUGIN_NAME = '@vuepress/plugin-slimsearch'

export const logger = new Logger(PLUGIN_NAME)

export const getLocaleChunkName = (locale: string): string =>
  locale.replace(/\//g, '') || 'root'

export const inferFilePath = (vuePath: string): string =>
  vuePath
    .replace(/^pages\//, '')
    .replace(/\/index\.html\.vue/, '/README.md')
    .replace(/\.html\.vue/, '.md')

export class IDStore {
  private store: string[]

  public constructor() {
    this.store = []
  }

  public addItem(item: string): number {
    const index = this.store.indexOf(item)

    if (index === -1) {
      this.store.push(item)

      return this.store.length - 1
    }

    return index
  }

  public addItems(items: string[]): number[] {
    return items.map((item) => this.addItem(item))
  }

  public clearItem(item: string): void {
    const index = this.store.indexOf(item)

    if (index !== -1) this.store[index] = ''
  }

  public clear(): void {
    this.store = []
  }

  public toJSON(): string {
    return JSON.stringify(this.store)
  }
}
