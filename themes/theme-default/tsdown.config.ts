import { readdirSync } from 'node:fs'
import { resolve } from 'node:path'

import { tsdownConfig } from '../../scripts/tsdown.js'

const __dirname = import.meta.dirname

export default tsdownConfig(
  [
    'node/index',
    'client/config',
    'client/index',
    ...readdirSync(resolve(__dirname, './src/client/composables'))
      .filter((file) => file.endsWith('.ts'))
      .map((file) => `client/composables/${file.slice(0, -3)}`),
    ...readdirSync(resolve(__dirname, './src/client/utils'))
      .filter((file) => file.endsWith('.ts'))
      .map((file) => `client/utils/${file.slice(0, -3)}`),
  ],
  {
    neverBundle: [/^@theme\//, /\.vue$/, /\.s?css$/],
    copy: [
      'client/components/global/*.vue',
      'client/components/*.vue',
      'client/layouts/*.vue',
      'client/styles/**/*.scss',
    ],
  },
)
