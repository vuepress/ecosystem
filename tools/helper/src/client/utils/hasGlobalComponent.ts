import type { App } from 'vue'
import { camelize, capitalize, getCurrentInstance } from 'vue'

/**
 * Check if a global component with the given name exists
 *
 * 检查给定名称的全局组件是否存在
 *
 * @param name - Component name / 组件名称
 * @param app - Vue app instance / Vue 应用实例
 *
 * @returns Whether the global component exists / 全局组件是否存在
 */
export const hasGlobalComponent = (name: string, app?: App): boolean => {
  const globalComponents = (app?._instance ?? getCurrentInstance())?.appContext
    .components

  if (!globalComponents) return false

  return (
    name in globalComponents ||
    camelize(name) in globalComponents ||
    capitalize(camelize(name)) in globalComponents
  )
}
