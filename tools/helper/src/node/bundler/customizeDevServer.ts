import type { IncomingMessage, ServerResponse } from 'node:http'

import type {
  RspackBundlerOptions,
  RspackDevServer,
} from '@vuepress/bundler-rspack'
import type { ViteBundlerOptions } from '@vuepress/bundler-vite'
import type {
  WebpackBundlerOptions,
  WebpackDevServerConfiguration,
} from '@vuepress/bundler-webpack'
import type { HandleFunction } from 'connect'
import type { Plugin } from 'vite'
import type { App } from 'vuepress/core'
import { removeLeadingSlash } from 'vuepress/shared'

import { getBundlerName } from './getBundlerName.js'
import { mergeViteConfig } from './vite/index.js'

type WebpackSetupMiddlewares = NonNullable<
  WebpackDevServerConfiguration['setupMiddlewares']
>

type RspackSetupMiddlewares = NonNullable<
  RspackBundlerOptions['devServerSetupMiddlewares']
>

/** Options for customizing VuePress Dev Server */
export interface DevServerOptions {
  /** Path to be responded */
  path: string
  /** Respond handler */
  response: (
    request: IncomingMessage,
    response: ServerResponse,
  ) => Promise<Buffer | string>

  /** Error msg */
  errMsg?: string
}

/**
 * Handle specific path when running VuePress Dev Server
 *
 * 在运行 VuePress 开发服务器时处理特定路径
 *
 * @param bundlerOptions - VuePress Bundler config / VuePress 打包器配置
 * @param app - VuePress Node App / VuePress Node 应用
 * @param options - Dev server options / 开发服务器选项
 */
export const customizeDevServer = (
  bundlerOptions: unknown,
  app: App,
  {
    errMsg = 'The server encountered an error',
    response: responseHandler,
    path,
  }: DevServerOptions,
): void => {
  const { base } = app.siteData
  const bundlerName = getBundlerName(app)

  // in dev
  if (app.env.isDev) {
    // for vite
    if (bundlerName === 'vite') {
      const viteBundlerOptions = bundlerOptions as ViteBundlerOptions
      const handler: HandleFunction = (
        request: IncomingMessage,
        response: ServerResponse,
      ) => {
        responseHandler(request, response)
          .then((data) => {
            response.statusCode = 200
            response.end(data)
          })
          .catch(() => {
            response.statusCode = 500
            response.end(errMsg)
          })
      }

      const viteMockRequestPlugin: Plugin = {
        name: `virtual:dev-server-mock/${path}`,
        configureServer: ({ middlewares }) => {
          middlewares.use(`${base}${removeLeadingSlash(path)}`, handler)
        },
      }

      viteBundlerOptions.viteOptions = mergeViteConfig(
        viteBundlerOptions.viteOptions ?? {},
        { plugins: [viteMockRequestPlugin] },
      )
    }

    // for webpack and rspack
    else if (bundlerName === 'webpack' || bundlerName === 'rspack') {
      const route = `${base}${removeLeadingSlash(path)}`

      const requestHandler = (
        request: IncomingMessage,
        response: ServerResponse,
      ): void => {
        responseHandler(request, response)
          .then((data) => {
            response.statusCode = 200
            response.end(data)
          })
          .catch(() => {
            response.statusCode = 500
            response.end(errMsg)
          })
      }

      if (bundlerName === 'webpack') {
        const webpackBundlerOptions = bundlerOptions as WebpackBundlerOptions
        const { devServerSetupMiddlewares } = webpackBundlerOptions
        const setupMiddlewares: WebpackSetupMiddlewares = (
          middlewares,
          server,
        ) => {
          server.app?.get(route, requestHandler)

          return devServerSetupMiddlewares?.(middlewares, server) ?? middlewares
        }

        webpackBundlerOptions.devServerSetupMiddlewares = setupMiddlewares
      } else {
        const rspackBundlerOptions = bundlerOptions as RspackBundlerOptions
        const { devServerSetupMiddlewares } = rspackBundlerOptions
        const setupMiddlewares: RspackSetupMiddlewares = (
          middlewares,
          server: RspackDevServer,
        ) => {
          server.app?.use(route, requestHandler)

          return devServerSetupMiddlewares?.(middlewares, server) ?? middlewares
        }

        rspackBundlerOptions.devServerSetupMiddlewares = setupMiddlewares
      }
    }
  }
}
