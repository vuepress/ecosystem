import { Logger } from '@vuepress/helper'
import type { App } from 'vuepress/core'

/**
 * Create a logger for a search plugin.
 *
 * 为搜索插件创建日志记录器。
 *
 * @param name - Name of the plugin 插件名称
 * @returns Logger 日志记录器
 */
export const createSearchLogger = (name: string): Logger => new Logger(name)

/**
 * Get the language of a locale, which is used to tokenize its search index.
 *
 * 获取语言环境的语言，用于分词该语言环境的搜索索引。
 *
 * @param app - VuePress app VuePress 应用实例
 * @param localePath - Path of the locale 语言环境的路径
 * @returns Language of the locale 语言环境的语言
 */
export const getLocaleLanguage = (app: App, localePath: string): string =>
  app.options.locales[localePath]?.lang ?? app.options.lang

/**
 * Get the name of the temp file chunk of a locale.
 *
 * 获取语言环境临时文件分块的名称。
 *
 * @param locale - Path of the locale 语言环境的路径
 * @returns Name of the chunk 分块的名称
 */
export const getLocaleChunkName = (locale: string): string =>
  locale.replaceAll('/', '') || 'root'
