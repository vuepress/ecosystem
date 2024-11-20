import type { App } from 'vue'
import { camelize, capitalize, getCurrentInstance } from 'vue'

/**
 * Check if a global component with the given name exists
 *
 * @param name component name
 * @param app Vue app instance
 * @returns whether the global component with the given name exists
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
