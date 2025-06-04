import { fileURLToPath } from 'node:url'
import { path } from 'vuepress/utils'

/**
 * Get file path of a given module url
 *
 * 获取给定模块 URL 的文件路径
 *
 * @param module - Module name / 模块名称
 * @param meta - Import meta object / 导入元数据对象
 *
 * @returns Normalized file path / 标准化的文件路径
 */
export const getModulePath = (module: string, meta: ImportMeta): string =>
  path.normalize(fileURLToPath(meta.resolve(module)))
