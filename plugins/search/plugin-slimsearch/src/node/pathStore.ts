export class PathStore {
  private pathToIndex: Map<string, number>
  private indexToPath: string[]
  private freeSlots: number[]

  constructor() {
    this.pathToIndex = new Map()
    this.indexToPath = []
    this.freeSlots = []
  }

  addPath(item: string): number {
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

  addPaths(items: string[]): number[] {
    return items.map((item) => this.addPath(item))
  }

  deletePath(item: string): void {
    const index = this.pathToIndex.get(item)

    if (index !== undefined) {
      this.pathToIndex.delete(item)
      this.indexToPath[index] = ''
      this.freeSlots.push(index)
    }
  }

  clear(): void {
    this.pathToIndex = new Map()
    this.indexToPath = []
    this.freeSlots = []
  }

  toJSON(): string {
    const result: Record<number, string> = {}

    for (const [path, index] of this.pathToIndex) result[index] = path

    return JSON.stringify(result)
  }
}
