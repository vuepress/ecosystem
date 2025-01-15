import type { App } from 'vuepress/core'

export class Store {
  public store: string[]

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

  public toJSON(): string {
    return JSON.stringify(this.store)
  }
}

export const prepareStore = async (app: App, store: Store): Promise<void> => {
  await app.writeTemp(
    `blog/store.js`,
    `\
export const store = JSON.parse(${JSON.stringify(store.toJSON())});
`,
  )
}
