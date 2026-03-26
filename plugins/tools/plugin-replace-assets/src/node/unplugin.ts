import type {
  UnpluginFactory,
  VitePlugin,
  WebpackPluginInstance,
} from 'unplugin'
import { createVitePlugin, createWebpackPlugin } from 'unplugin'

import { transformAssets } from './transformAssets.js'
import type { ReplacementRule } from './types.js'
import { createAssetPattern } from './utils.js'

const replaceAssetsFactory: UnpluginFactory<ReplacementRule[]> = (
  rules,
  meta,
) => {
  const pattern = createAssetPattern('/[^/]')
  return {
    name: 'vuepress:replace-assets',
    enforce: meta?.framework === 'vite' ? 'pre' : undefined,
    transform: {
      filter: { id: { exclude: [/\.json(?:$|\?)/, /\.html?$/] } },
      handler(code) {
        return transformAssets(code, pattern, rules)
      },
    },
  }
}

export const createVitePluginReplaceAssets: () => (
  options: ReplacementRule[],
) => VitePlugin | VitePlugin[] = () => createVitePlugin(replaceAssetsFactory)

export const createWebpackPluginReplaceAssets: () => (
  options: ReplacementRule[],
) => WebpackPluginInstance = () => createWebpackPlugin(replaceAssetsFactory)
