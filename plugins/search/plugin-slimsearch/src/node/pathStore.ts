export class PathStore {
  private store: string[]

  public constructor() {
    this.store = []
  }

  public addPath(item: string): number {
    const index = this.store.indexOf(item)

    if (index === -1) {
      this.store.push(item)

      return this.store.length - 1
    }

    return index
  }

  public addPaths(items: string[]): number[] {
    return items.map((item) => this.addPath(item))
  }

  public deletePath(item: string): void {
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
