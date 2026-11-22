import type { ClientConfig } from 'vuepress/client'

/**
 * Create the client configs of the plugins and of the theme
 *
 * 创建插件与主题的客户端配置
 *
 * @returns The client configs / 客户端配置
 */
export const createClientConfigs = async (): Promise<ClientConfig[]> => {
  const [{ default: themeDataClientConfig }, { default: themeClientConfig }] =
    await Promise.all([
      import('../../../../plugins/development/plugin-theme-data/src/client/config.js'),
      import('../../src/client/config.js'),
    ])

  return [themeDataClientConfig, themeClientConfig]
}
