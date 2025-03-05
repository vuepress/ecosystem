import { rollupBundle } from '../../../scripts/rollup.js'

export default [
  ...rollupBundle('node/index', {
    external: ['execa'],
  }),
  ...rollupBundle(
    {
      base: 'client',
      files: ['components/Changelog', 'components/Contributors', 'index'],
    },
    {
      dtsExternal: ['@vuepress/helper/client'],
    },
  ),
]
