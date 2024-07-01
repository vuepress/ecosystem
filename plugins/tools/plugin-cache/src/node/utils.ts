import { createHash } from 'node:crypto'
import { fs, path } from 'vuepress/utils'

export const hash = (data: string): string =>
  createHash('md5').update(data).digest('hex')

export const normalizeFilename = (filename: string): string =>
  hash(filename).slice(0, 10)

export const readFile = async <T = any>(
  filepath: string,
): Promise<T | null> => {
  try {
    const content = await fs.readFile(filepath, 'utf-8')
    return JSON.parse(content) as T
  } catch {
    return null
  }
}

export const readFileSync = <T = any>(filepath: string): T | null => {
  try {
    const content = fs.readFileSync(filepath, 'utf-8')
    return JSON.parse(content) as T
  } catch {
    return null
  }
}

export const writeFile = async <T = any>(
  filepath: string,
  data: T,
): Promise<void> => await fs.writeFile(filepath, JSON.stringify(data), 'utf-8')

export const checkIOSpeed = (cwd = process.cwd()): number => {
  try {
    const tmp = path.join(cwd, 'tmp')
    fs.writeFileSync(tmp, '{}', 'utf-8')
    const start = performance.now()
    readFileSync(tmp)
    const end = performance.now()
    fs.unlinkSync(tmp)
    return end - start
  } catch {
    return 0.15
  }
}
