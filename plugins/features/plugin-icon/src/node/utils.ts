import { getModulePath, Logger } from '@vuepress/helper'

export const PLUGIN_NAME = '@vuepress/plugin-icon'

export const logger = new Logger(PLUGIN_NAME)

/**
 * Resolve the path of a module
 *
 * 解析模块的路径
 *
 * @param module - Module name / 模块名称
 * @returns Resolved file path / 解析后的文件路径
 */
export type ModuleResolver = (module: string) => string

/**
 * Resolve the path of a module from the plugin
 *
 * 从插件解析模块的路径
 *
 * The generated entries resolve a module from the plugin rather than from the
 * site, so that it resolves from the same place where it is checked to be
 * installed. Otherwise a package installed for the site but not resolvable from
 * the plugin passes the check, and the build fails later with a confusing
 * unresolved import error.
 *
 * 生成的入口会从插件而非站点解析模块，因此它会从与检查其是否安装相同的位置解析。否则，为站点安装但从插件无法解析的包会通过检查，构建会在稍后因难以理解的无法解析导入错误而失败。
 *
 * @param module - Module name / 模块名称
 * @returns Resolved file path / 解析后的文件路径
 */
export const resolveModule: ModuleResolver = (module) =>
  getModulePath(module, import.meta)
