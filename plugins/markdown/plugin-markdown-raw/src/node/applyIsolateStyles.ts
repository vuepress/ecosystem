import {
  addViteConfig,
  chainRspack,
  chainWebpack,
  getBundlerName,
} from '@vuepress/helper'
import type { Plugin } from 'postcss'
import type { App } from 'vuepress/core'

import type { IsolateStylesOptions } from './isolateStyles.js'
import { postcssIsolateStyles } from './isolateStyles.js'

const STYLE_RULE_NAMES = [
  'css',
  'postcss',
  'scss',
  'sass',
  'less',
  'stylus',
] as const

const POSTCSS_LOADER_NAME = 'postcss-loader'

/** PostCSS loader options / PostCSS loader 选项 */
type PostcssLoaderOptions = Record<string, unknown>

/** Minimal structure of a webpack-chain loader use / webpack-chain 加载器结构 */
interface LoaderUse {
  get: (key: 'options') => PostcssLoaderOptions | undefined
  options: (options: PostcssLoaderOptions) => unknown
}

/** Minimal structure of a webpack-chain rule use map / webpack-chain 规则使用表 */
interface RuleUseMap {
  has: (name: string) => boolean
  get: (name: string) => LoaderUse | undefined
}

/** Minimal structure of a webpack-chain rule / webpack-chain 规则结构 */
interface ChainRule {
  uses: RuleUseMap
}

/** Minimal structure of a webpack-chain rule map / webpack-chain 规则表结构 */
interface ChainRuleMap {
  get: (name: string) => ChainRule | undefined
}

/** Minimal structure of a webpack-chain config / webpack-chain 配置结构 */
interface ChainConfig {
  module: {
    rules: ChainRuleMap
  }
}

/**
 * Append a PostCSS plugin to the loader options, keeping the existing plugins
 * and the function form of `postcssOptions`.
 *
 * 将 PostCSS 插件追加到加载器选项，保留已有插件及 `postcssOptions` 的函数形式。
 *
 * @param options - Existing loader options / 已有加载器选项
 * @param plugin - PostCSS plugin to append / 要追加的 PostCSS 插件
 * @returns Updated loader options / 更新后的加载器选项
 */
const appendPostcssPlugin = (
  options: PostcssLoaderOptions | undefined,
  plugin: Plugin,
): PostcssLoaderOptions => {
  const { postcssOptions } = options ?? {}

  const mergePostcssOptions = (
    value: PostcssLoaderOptions | undefined,
  ): PostcssLoaderOptions => {
    const plugins = (value?.plugins as unknown[] | undefined) ?? []

    return { ...value, plugins: [...plugins, plugin] }
  }

  return {
    ...options,
    postcssOptions:
      typeof postcssOptions === 'function'
        ? (loaderContext: unknown): PostcssLoaderOptions =>
            mergePostcssOptions(
              (
                postcssOptions as (
                  context: unknown,
                ) => PostcssLoaderOptions | undefined
              )(loaderContext),
            )
        : mergePostcssOptions(
            postcssOptions as PostcssLoaderOptions | undefined,
          ),
  }
}

/**
 * Append the PostCSS plugin to the `postcss-loader` of every style rule.
 *
 * 将 PostCSS 插件追加到所有样式规则的 `postcss-loader`。
 *
 * @param config - Bundler chain config / 打包器链式配置
 * @param plugin - PostCSS plugin to append / 要追加的 PostCSS 插件
 */
const appendPostcssPluginToChain = (config: unknown, plugin: Plugin): void => {
  const rules = (config as ChainConfig).module?.rules

  if (!rules) return

  for (const ruleName of STYLE_RULE_NAMES) {
    const rule = rules.get(ruleName)

    if (!rule?.uses.has(POSTCSS_LOADER_NAME)) continue

    const use = rule.uses.get(POSTCSS_LOADER_NAME)

    if (use) use.options(appendPostcssPlugin(use.get('options'), plugin))
  }
}

/**
 * Apply the style isolation to the bundler, whatever the bundler is.
 *
 * 将样式隔离应用到打包器，无论使用哪种打包器。
 *
 * @param bundlerOptions - VuePress Bundler config / VuePress 打包器配置
 * @param app - VuePress Node App / VuePress Node 应用
 * @param options - Options of the style isolation / 样式隔离选项
 */
export const applyIsolateStyles = (
  bundlerOptions: unknown,
  app: App,
  options: IsolateStylesOptions,
): void => {
  const plugin = postcssIsolateStyles(options)

  switch (getBundlerName(app)) {
    case 'vite': {
      addViteConfig(bundlerOptions, app, {
        css: { postcss: { plugins: [plugin] } },
      })
      break
    }

    case 'webpack': {
      chainWebpack(bundlerOptions, app, (config) => {
        appendPostcssPluginToChain(config, plugin)
      })
      break
    }

    case 'rspack': {
      chainRspack(bundlerOptions, app, (config) => {
        appendPostcssPluginToChain(config, plugin)
      })
      break
    }

    default: {
      break
    }
  }
}
