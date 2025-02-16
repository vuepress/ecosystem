import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

export type TypeScriptPaths = Record<string, string[]>

export async function resolveTypeScriptPaths(): Promise<TypeScriptPaths | null> {
  const tsconfigPath = path.join(process.cwd(), 'tsconfig.json')

  try {
    const tsconfig = JSON.parse(await fs.readFile(tsconfigPath, 'utf-8')) as {
      compilerOptions?: {
        paths?: Record<string, string[]>
        baseUrl?: string
      }
    }

    const baseUrl = tsconfig.compilerOptions?.baseUrl
    const paths = tsconfig.compilerOptions?.paths ?? null

    if (baseUrl && paths) {
      const dirname = path.join(process.cwd(), baseUrl)

      for (const key in paths) {
        const value = paths[key]

        paths[key] = Array.isArray(value)
          ? value.map((v) => path.resolve(dirname, v))
          : [path.resolve(dirname, value)]
      }
    }

    return paths
  } catch {
    return null
  }
}
