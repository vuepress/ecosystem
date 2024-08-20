import { fs, path } from 'vuepress/utils'

export const readFile = async <T = unknown>(
  filepath: string,
): Promise<T | null> => {
  try {
    return (await fs.readJSON(filepath, 'utf-8')) as T
  } catch {
    return null
  }
}

// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-parameters
export const readFileSync = <T = unknown>(filepath: string): T | null => {
  try {
    return fs.readJSONSync(filepath, 'utf-8') as T
  } catch {
    return null
  }
}

export const writeFile = (filepath: string, data: unknown): Promise<void> =>
  fs.writeJSON(filepath, data, 'utf-8')

const FALLBACK_SPEED = 0.15

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
    return FALLBACK_SPEED
  }
}
