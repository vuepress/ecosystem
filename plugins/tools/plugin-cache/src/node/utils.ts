import { createHash } from 'node:crypto'
import { fs } from 'vuepress/utils'

export const hash = (data: string): string =>
  createHash('md5').update(data).digest('hex')

export const readFile = async <T = any>(filepath: string): Promise<T> => {
  try {
    const content = await fs.readFile(filepath, 'utf-8')
    return JSON.parse(content) as T
  } catch {
    return {} as T
  }
}

export const writeFile = async <T = any>(
  filepath: string,
  data: T,
): Promise<void> => await fs.writeFile(filepath, JSON.stringify(data), 'utf-8')
