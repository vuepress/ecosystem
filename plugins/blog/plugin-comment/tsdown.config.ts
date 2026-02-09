import { tsdownConfig } from '../../../scripts/tsdown.js'

const COMMENT_PROVIDERS = ['Artalk', 'Giscus', 'Twikoo', 'Waline']

export default [
  tsdownConfig('node/index'),
  tsdownConfig(
    {
      base: 'client',
      files: [
        ...COMMENT_PROVIDERS.map((name) => `components/${name}Comment`),
        'pageview/artalk',
        'pageview/noop',
        'pageview/waline',
        'config',
        'index',
      ],
    },
    {
      external: [
        '@vuepress/plugin-comment/service',
        '@waline/client/component',
        '@waline/client/pageview',
        'artalk/dist/Artalk.mjs',
        'giscus',
        'twikoo',
      ],
    },
  ),
]
