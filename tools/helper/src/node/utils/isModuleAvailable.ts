/**
 * Check if a module is available
 *
 * 检查模块是否可用
 *
 * @param module - Module name / 模块名称
 * @param meta - Import meta object / 导入元数据对象
 *
 * @returns Whether the module is available / 模块是否可用
 */
export const isModuleAvailable = (
  module: string,
  meta: ImportMeta,
): boolean => {
  try {
    if (module) meta.resolve(module)

    return true
  } catch {
    return false
  }
}
