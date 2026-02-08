import type { IncomingMessage, ServerResponse } from 'node:http'
import type { ViteBundlerOptions } from '@vuepress/bundler-vite'
import type {
  WebpackBundlerOptions,
  WebpackDevServer,
} from '@vuepress/bundler-webpack'
import type { HandleFunction } from 'connect'
import type { Plugin } from 'vite'
import type { App } from 'vuepress/core'
import { removeLeadingSlash } from 'vuepress/shared'
import { getBundlerName } from './getBundlerName.js'
import { mergeViteConfig } from './vite/index.js'

/**
 * Options for customizing VuePress Dev Server
 */
export interface DevServerOptions {
  /**
   * Path to be responded
   */
  path: string
  /**
   * Respond handler
   */
  response: (
    request: IncomingMessage,
    response: ServerResponse,
  ) => Promise<Buffer | string>

  /**
   * error msg
   */
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

    // for webpack
    else if (bundlerName === 'webpack') {
      const webpackBundlerOptions = bundlerOptions as WebpackBundlerOptions

      const { devServerSetupMiddlewares } = webpackBundlerOptions

      /**
       * @see https://webpack.js.org/configuration/dev-server/#devserversetupmiddlewares
       *
       * @param middlewares - Existing middlewares / 现有中间件
       * @param server - Webpack Dev Server instance / Webpack 开发服务器实例
       * @returns Updated middlewares / 更新后的中间件
       */
      webpackBundlerOptions.devServerSetupMiddlewares = (
        middlewares: WebpackDevServer.Middleware[],
        server: WebpackDevServer,
      ): WebpackDevServer.Middleware[] => {
        server.app?.get(
          `${base}${removeLeadingSlash(path)}`,
          (request, response) => {
            responseHandler(request, response)
              .then((data) => response.status(200).send(data))
              .catch(() => response.status(500).send(errMsg))
          },
        )

        return devServerSetupMiddlewares
          ? devServerSetupMiddlewares(middlewares, server)
          : middlewares
      }
    }
  }
}
