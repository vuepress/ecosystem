import { entries } from '@vuepress/helper'

/**
 * Create regex to match template variable in format `{key}`
 *
 * @param key - Template variable name to match
 * @returns Case-insensitive regex that detects `{key}` occurrences
 *
 * @example
 * ```ts
 * const regex = templateVariable('name')
 * console.log(regex.test('Hello {name}')) // true
 * ```
 */
const templateVariable = (key: string): RegExp =>
  new RegExp(`(\\n\\s*\\n)?\\{${key}\\}`, 'gi')

/**
 * Replace template variable `{variable}` with provided value
 *
 * Falls back to fallback value if value is empty or undefined
 *
 * @param content - Template string containing placeholders
 * @param variable - Template variable name to replace
 * @param value - Value to replace the variable with
 * @param fallback - Optional fallback value if `value` is empty
 * @returns String with template variable replaced
 *
 * @example
 * ```ts
 * const template = 'Hello {name}!'
 * const result = replaceTemplateVariable(template, 'name', 'Alice', 'User')
 * console.log(result) // 'Hello Alice!'
 * ```
 */
export const replaceTemplateVariable = (
  content: string,
  variable: string,
  value: string | undefined,
  fallback?: string,
): string =>
  content.replace(templateVariable(variable), (_, prefix) => {
    const val = value?.length ? value : fallback?.length ? fallback : ''
    return val ? `${prefix ? '\n\n' : ''}${val}` : ''
  })

/**
 * Expand template string by replacing multiple variables with their values
 *
 * @param template - Template string containing placeholders
 * @param variables - Object mapping variable names to their values
 * @returns String with all template variables replaced
 */
export const expandTemplate = (
  template: string,
  variables: Record<string, string | undefined>,
): string => {
  let res = template
  for (const [key, value] of entries(variables))
    res = replaceTemplateVariable(res, key, value)

  return res
}
