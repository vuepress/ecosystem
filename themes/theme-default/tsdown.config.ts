import { readdir } from 'node:fs/promises'
import path from 'node:path'

import { tsdownConfig } from '../../scripts/tsdown.ts'

const __dirname = import.meta.dirname

const [composableFiles, utilFiles] = await Promise.all([
  readdir(path.resolve(__dirname, './src/client/composables')),
  readdir(path.resolve(__dirname, './src/client/utils')),
])

export default tsdownConfig(
  [
    'node/index',
    'client/config',
    'client/index',
    ...composableFiles
      .filter((file) => file.endsWith('.ts'))
      .map((file) => `client/composables/${file.slice(0, -3)}`),
    ...utilFiles
      .filter((file) => file.endsWith('.ts'))
      .map((file) => `client/utils/${file.slice(0, -3)}`),
  ],
  {
    neverBundle: [/^@theme\//u, /\.vue$/u, /\.s?css$/u],
    copy: [
      'client/components/global/*.vue',
      'client/components/*.vue',
      'client/layouts/*.vue',
      'client/styles/**/*.scss',
    ],
  },
)
