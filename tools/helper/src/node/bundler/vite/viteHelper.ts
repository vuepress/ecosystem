import type { ViteBundlerOptions } from '@vuepress/bundler-vite'
import type { App } from 'vuepress/core'
import { isString } from '../../../shared/index.js'
import { getPackageManager } from '../../utils/index.js'
import { getBundlerName } from '../getBundlerName.js'
import { mergeViteConfig } from './mergeViteConfig.js'

/**
 * Add Vite config
 *
 * 添加 Vite 配置
 *
 * @param bundlerOptions - VuePress Bundler config / VuePress 打包器配置
 * @param app - VuePress Node App / VuePress Node 应用
 * @param config - Vite config / Vite 配置
 */
export const addViteConfig = (
  bundlerOptions: unknown,
  app: App,
  config: Record<string, unknown>,
): void => {
  if (getBundlerName(app) === 'vite') {
    const viteBundlerOptions = bundlerOptions as ViteBundlerOptions

    viteBundlerOptions.viteOptions = mergeViteConfig(
      viteBundlerOptions.viteOptions ?? {},
      config,
    )
  }
}

/**
 * Add modules to Vite `optimizeDeps.include` list
 *
 * 将模块添加到 Vite `optimizeDeps.include` 列表
 *
 * @param bundlerOptions - VuePress Bundler config / VuePress 打包器配置
 * @param app - VuePress Node App / VuePress Node 应用
 * @param module - Module name(s) to include / 要包含的模块名称
 * @param isDeep - Whether the module is deep dependency / 模块是否为深度依赖
 */
export const addViteOptimizeDepsInclude = (
  bundlerOptions: unknown,
  app: App,
  module: string[] | string,
  isDeep = false,
): void => {
  if (
    getPackageManager() !== 'pnpm' ||
    // pnpm is not able to optimize deps in tree at first startup
    ('FORCE_OPTIMIZE_DEPS' in process.env
      ? Boolean(process.env.FORCE_OPTIMIZE_DEPS)
      : !isDeep)
  ) {
    addViteConfig(bundlerOptions, app, {
      optimizeDeps: {
        include: isString(module) ? [module] : module,
      },
    })
  }
}

/**
 * Add modules to Vite `optimizeDeps.exclude` list
 *
 * 将模块添加到 Vite `optimizeDeps.exclude` 列表
 *
 * @param bundlerOptions - VuePress Bundler config / VuePress 打包器配置
 * @param app - VuePress Node App / VuePress Node 应用
 * @param module - Module name(s) to exclude / 要排除的模块名称
 */
export const addViteOptimizeDepsExclude = (
  bundlerOptions: unknown,
  app: App,
  module: string[] | string,
): void => {
  addViteConfig(bundlerOptions, app, {
    optimizeDeps: {
      exclude: isString(module) ? [module] : module,
    },
  })
}

/**
 * Add modules to Vite `optimizeDeps.needsInterop` list
 *
 * 将模块添加到 Vite `optimizeDeps.needsInterop` 列表
 *
 * @param bundlerOptions - VuePress Bundler config / VuePress 打包器配置
 * @param app - VuePress Node App / VuePress Node 应用
 * @param module - Module name(s) that needs interop / 需要互操作的模块名称
 */
export const addViteOptimizeDepsNeedsInterop = (
  bundlerOptions: unknown,
  app: App,
  module: string[] | string,
): void => {
  addViteConfig(bundlerOptions, app, {
    optimizeDeps: {
      needsInterop: isString(module) ? [module] : module,
    },
  })
}

/**
 * Add modules to Vite `ssr.external` list
 *
 * 将模块添加到 Vite `ssr.external` 列表
 *
 * @param bundlerOptions - VuePress Bundler config / VuePress 打包器配置
 * @param app - VuePress Node App / VuePress Node 应用
 * @param module - Module name(s) to externalize / 要外部化的模块名称
 */
export const addViteSsrExternal = (
  bundlerOptions: unknown,
  app: App,
  module: string[] | string,
): void => {
  addViteConfig(bundlerOptions, app, {
    ssr: {
      external: isString(module) ? [module] : module,
    },
  })
}

/**
 * Add modules to Vite `ssr.noExternal` list
 *
 * 将模块添加到 Vite `ssr.noExternal` 列表
 *
 * @param bundlerOptions - VuePress Bundler config / VuePress 打包器配置
 * @param app - VuePress Node App / VuePress Node 应用
 * @param module - Module name(s) to not externalize / 不要外部化的模块名称
 */
export const addViteSsrNoExternal = (
  bundlerOptions: unknown,
  app: App,
  module: string[] | string,
): void => {
  addViteConfig(bundlerOptions, app, {
    ssr: {
      noExternal: isString(module) ? [module] : module,
    },
  })
}
