import type { DemoOptions } from '../../shared/index.js'

declare const __DEMO_OPTIONS__: Partial<DemoOptions>

const { jsLib, cssLib, ...options } = __DEMO_OPTIONS__

export const getDemoOptions = (config: Partial<DemoOptions>): DemoOptions => ({
  transpile: false,
  ...options,
  ...config,
  jsLib: Array.from(new Set([...(jsLib ?? []), ...(config.jsLib ?? [])])),
  cssLib: Array.from(new Set([...(cssLib ?? []), ...(config.cssLib ?? [])])),
})
