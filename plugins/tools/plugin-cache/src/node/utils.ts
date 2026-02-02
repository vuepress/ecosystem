import { fs, path } from 'vuepress/utils'

export const readFile = async <T = unknown>(
  filepath: string,
): Promise<T | null> => {
  try {
    return (await fs.readJSON(filepath, 'utf8')) as T
  } catch {
    return null
  }
}

export const readFileSync = <T = unknown>(filepath: string): T | null => {
  try {
    return fs.readJSONSync(filepath, 'utf8') as T
  } catch {
    return null
  }
}

export const writeFile = (filepath: string, data: unknown): Promise<void> =>
  fs.writeJSON(filepath, data, 'utf8')

const FALLBACK_SPEED = 0.15

export const checkIOSpeed = (cwd = process.cwd()): number => {
  try {
    const tmp = path.join(cwd, 'tmp')
    fs.writeFileSync(tmp, '{}', 'utf8')
    const start = performance.now()
    readFileSync(tmp)
    const end = performance.now()
    fs.unlinkSync(tmp)
    return end - start
  } catch {
    return FALLBACK_SPEED
  }
}
