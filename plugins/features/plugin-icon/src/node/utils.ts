import { getModulePath, isModuleAvailable, Logger } from '@vuepress/helper'

export const PLUGIN_NAME = '@vuepress/plugin-icon'

export const logger = new Logger(PLUGIN_NAME)

/**
 * Resolve the path of a module from the plugin
 *
 * 从插件解析模块的路径
 *
 * The generated entries live in the temp folder of the site, so a bare
 * specifier in them is resolved from the site. Resolving from the plugin keeps
 * them next to the checks of `isModuleInstalled`, which would otherwise pass
 * while the build fails later with a confusing unresolved import error.
 *
 * 生成的入口位于站点的临时目录中，因此其中的裸导入会从站点解析。从插件解析能让它们与 `isModuleInstalled`
 * 的检查位置一致，否则检查会通过，而构建会在稍后因难以理解的无法解析导入错误而失败。
 *
 * @param module - Module name / 模块名称
 * @returns Resolved file path / 解析后的文件路径
 */
export const resolveModule = (module: string): string =>
  getModulePath(module, import.meta)

/**
 * Whether a module is installed, resolved from the plugin
 *
 * 模块是否已安装，从插件解析
 *
 * @param module - Module name / 模块名称
 * @returns Whether the module is available / 模块是否可用
 */
export const isModuleInstalled = (module: string): boolean =>
  isModuleAvailable(module, import.meta)
