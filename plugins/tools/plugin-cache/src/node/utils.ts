import { fs, path } from 'vuepress/utils'

export const readJson = async <Data = unknown>(
  filepath: string,
): Promise<Data | null> => {
  try {
    return (await fs.readJSON(filepath, 'utf-8')) as Data
  } catch {
    return null
  }
}

export const readJSONSync = <Data = unknown>(filepath: string): Data | null => {
  try {
    return fs.readJSONSync(filepath, 'utf-8') as Data
  } catch {
    return null
  }
}

export const writeJSON = (filepath: string, data: unknown): Promise<void> =>
  fs.writeJSON(filepath, data, 'utf-8')

const FALLBACK_SPEED = 0.15

export const checkIOSpeed = (cwd = process.cwd()): number => {
  try {
    const tmp = path.join(cwd, 'tmp')
    fs.writeFileSync(tmp, '{}', 'utf-8')
    const start = performance.now()
    readJSONSync(tmp)
    const end = performance.now()
    fs.unlinkSync(tmp)
    return end - start
  } catch {
    return FALLBACK_SPEED
  }
}
