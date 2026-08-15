import type {
  UnpluginFactory,
  VitePlugin,
  WebpackPluginInstance,
} from 'unplugin'
import { createVitePlugin, createWebpackPlugin } from 'unplugin'

import { transformAssets } from './transformAssets.js'
import type { ReplacementRule } from './types.js'
import { createAssetPattern } from './utils.js'

interface ReplaceAssetsFactoryOptions {
  rules: ReplacementRule[]
  base: string
}

const replaceAssetsFactory: UnpluginFactory<ReplaceAssetsFactoryOptions> = (
  options,
  meta,
) => {
  const pattern = createAssetPattern('/[^/]')
  return {
    name: 'vuepress:replace-assets',
    enforce: meta?.framework === 'vite' ? 'pre' : undefined,
    transform: {
      filter: { id: { exclude: [/\.json(?:$|\?)/u, /\.html?$/u] } },
      handler(code) {
        return transformAssets(code, pattern, options)
      },
    },
  }
}

export const createVitePluginReplaceAssets: () => (
  options: ReplaceAssetsFactoryOptions,
) => VitePlugin | VitePlugin[] = () => createVitePlugin(replaceAssetsFactory)

export const createWebpackPluginReplaceAssets: () => (
  options: ReplaceAssetsFactoryOptions,
) => WebpackPluginInstance = () => createWebpackPlugin(replaceAssetsFactory)
