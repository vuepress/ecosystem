/**
 * Check if a module is available
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
