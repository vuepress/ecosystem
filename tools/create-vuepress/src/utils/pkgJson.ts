import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'

interface PackageJson extends Record<string, unknown> {
  version: string
  peerDependencies: Record<string, string>
}

const pkg = JSON.parse(
  readFileSync(
    fileURLToPath(import.meta.resolve('create-vuepress/package.json')),
    'utf-8',
  ),
) as PackageJson

export const { peerDependencies, version } = pkg
