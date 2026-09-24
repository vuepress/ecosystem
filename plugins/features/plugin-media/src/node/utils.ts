import { entries, isModuleAvailable } from '@vuepress/helper'

import {
  AVAILABLE_COMPONENTS,
  COMPONENT_PKGS,
  EMBED_COMPONENTS,
  VIDEOJS_PROVIDER_COMPONENTS,
} from './constants.js'
import { logger } from './logger.js'
import type { MediaPluginOptions } from './options.js'

/**
 * Whether an optional peer package is installed
 *
 * 可选的 peer 包是否已安装
 *
 * @param pkg - Package name / 包名
 * @returns Whether the package is available / 包是否可用
 */
export const isInstalled = (pkg: string): boolean =>
  isModuleAvailable(pkg, import.meta)

/**
 * Get the components the plugin options enable
 *
 * 获取插件配置启用的组件
 *
 * A component whose package is missing is skipped with a warning, so the client
 * config and the link syntax always agree on the enabled components.
 *
 * 缺少依赖包的组件会被跳过并给出警告，因此客户端配置与链接语法对启用组件的判断始终一致。
 *
 * @param options - Plugin options / 插件配置
 * @returns Names of the enabled components / 启用组件的名称
 */
export const getEnabledComponents = (options: MediaPluginOptions): string[] => {
  const enabledComponents = [
    ...entries(AVAILABLE_COMPONENTS)
      .filter(([key]) => options[key as keyof MediaPluginOptions])
      .map(([, component]) => component),
    ...(options.embeds ?? []).map((name) => EMBED_COMPONENTS[name]),
    ...(options.videojsProviders ?? []).map(
      (name) => VIDEOJS_PROVIDER_COMPONENTS[name],
    ),
  ]

  const components: string[] = []

  for (const component of new Set(enabledComponents)) {
    const missing = COMPONENT_PKGS[component]?.filter(
      (pkg) => !isInstalled(pkg),
    )

    if (missing?.length) {
      logger.warn(
        `Component ${component} is skipped, because ${missing.join(', ')} is not installed.`,
      )
      continue
    }

    components.push(component)
  }

  return components
}

/**
 * Get the HLS video element to use
 *
 * 获取要使用的 HLS 视频元素
 *
 * The larger `hlsjs-video` is only used when it is asked for **and** installed,
 * so the site falls back to the lightweight `hls-video` instead of failing to
 * build.
 *
 * 只有在明确要求**且**已安装时才使用体积更大的 `hlsjs-video`，否则回退到精简的 `hls-video`，避免构建失败。
 *
 * @param videojs - Value of the `videojs` option / `videojs` 选项的值
 * @returns Name of the element / 元素名称
 */
export const getHlsVideoElement = (
  videojs: MediaPluginOptions['videojs'],
): string =>
  videojs === 'hlsjs' && isInstalled('@videojs/hlsjs-video')
    ? 'hlsjs-video'
    : 'hls-video'
