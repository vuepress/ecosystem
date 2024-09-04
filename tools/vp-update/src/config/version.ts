import { createRequire } from 'node:module'

export const VERSION = (
  createRequire(import.meta.url)('vp-update/package.json') as {
    version: string
  }
).version
