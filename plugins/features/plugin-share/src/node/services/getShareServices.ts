import { isPlainObject, isString } from '@vuepress/helper'

import type {
  SharePluginOptions,
  ShareService,
  ShareServiceOptions,
} from '../../shared/index.js'
import { AVAILABLE_SERVICES, SHARE_CONFIG } from './config.js'

/**
 * Default share services
 *
 * 默认分享服务
 */
export const DEFAULT_SHARE_SERVICES: ShareService[] = [
  'x',
  'facebook',
  'reddit',
  'telegram',
  'whatsapp',
  'email',
]

/**
 * Resolve the share services from plugin options
 *
 * Built-in services are expanded to their configuration, while custom services
 * are kept as provided. Unknown built-in names and invalid custom services are
 * ignored.
 *
 * 从插件配置中解析分享服务
 *
 * 内置服务会展开为对应配置，自定义服务保持原样。未知的内置服务名和无效的自定义服务会被忽略。
 *
 * @param options - Plugin options / 插件配置
 * @returns Resolved share services / 解析后的分享服务
 */
export const getShareServices = (
  options: SharePluginOptions = {},
): ShareServiceOptions[] => {
  const services = options.services ?? DEFAULT_SHARE_SERVICES
  const result: ShareServiceOptions[] = []

  for (const service of services) {
    if (isString(service)) {
      if (service === 'x') {
        result.push({
          name: service,
          ...SHARE_CONFIG.x,
          link: SHARE_CONFIG.x.link.replaceAll(
            '[x-user]',
            options.xUserName ?? '',
          ),
        })
      } else if (AVAILABLE_SERVICES.includes(service)) {
        result.push({ name: service, ...SHARE_CONFIG[service] })
      }
    } else if (
      isPlainObject<ShareServiceOptions>(service) &&
      isString(service.name) &&
      isString(service.link) &&
      isString(service.shape)
    ) {
      result.push(service)
    }
  }

  return result
}
