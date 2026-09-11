import { isModuleAvailable } from '@vuepress/helper'

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
