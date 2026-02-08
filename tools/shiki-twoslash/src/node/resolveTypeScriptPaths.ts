import { entries } from '@vuepress/helper'
import fs from 'node:fs/promises'
import path from 'node:path'
import process from 'node:process'

/**
 * TypeScript paths mapping configuration
 *
 * TypeScript 路径映射配置
 */
export type TypeScriptPaths = Record<string, string[]>

/**
 * Resolve TypeScript paths from tsconfig.json
 *
 * 从 tsconfig.json 解析 TypeScript 路径
 *
 * @returns The resolved paths configuration or null if not found / 解析的路径配置，如果未找到则返回 null
 *
 * @example
 * ```ts
 * const paths = await resolveTypeScriptPaths()
 * console.log(paths) // { "@/*": ["/src/*"] }
 * ```
 */
export const resolveTypeScriptPaths =
  async (): Promise<TypeScriptPaths | null> => {
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

        for (const [key, value] of entries(paths)) {
          paths[key] = Array.isArray(value)
            ? value.map((val) => path.resolve(dirname, val))
            : [path.resolve(dirname, value)]
        }
      }

      return paths
    } catch {
      return null
    }
  }
