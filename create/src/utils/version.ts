import { createRequire } from 'node:module'

export const version = (
  createRequire(import.meta.url)('create-vuepress/package.json') as {
    version: string
  }
).version
