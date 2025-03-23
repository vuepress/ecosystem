import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

interface PackageJson extends Record<string, unknown> {
  version: string
  devDependencies: Record<string, string>
}

const packageJSON = JSON.parse(
  readFileSync(
    fileURLToPath(import.meta.resolve('create-vuepress/package.json')),
    'utf-8',
  ),
) as PackageJson

export const { devDependencies, version } = packageJSON
