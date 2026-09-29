/**
 * Restore function returned by `stubClientDefines`
 *
 * 由 `stubClientDefines` 返回的还原函数
 */
export type RestoreClientDefines = () => void

const serialize = (value: unknown): unknown => {
  const json = JSON.stringify(value)

  return json === undefined ? value : JSON.parse(json)
}

/**
 * Stub client defines on `globalThis`
 *
 * The bundler replaces every client define with a literal value at compile
 * time. In unit tests the client code is loaded at runtime instead, so a bare
 * identifier like `__PLUGIN_OPTIONS__` is resolved from `globalThis`.
 *
 * Notice that a module which reads a define at module scope must be imported
 * dynamically after `vi.resetModules()`, otherwise the previous value is cached
 * by the module registry.
 *
 * 在 `globalThis` 上伪造客户端 define
 *
 * Bundler 会在编译期把每个客户端 define 替换为字面量。单元测试中客户端代码是运行时加载的，因此像 `__PLUGIN_OPTIONS__`
 * 这样的裸标识符会从 `globalThis` 解析。
 *
 * 注意：在模块作用域读取 define 的模块，必须在 `vi.resetModules()` 之后动态 import，否则模块注册表会缓存上一次的值。
 *
 * @example
 *   const restore = stubClientDefines(await collectClientDefines(app))
 *
 *   vi.resetModules()
 *   const { default: clientConfig } = await import('./client/config.js')
 *
 *   restore()
 *
 * @param defines - The defines collected by `collectClientDefines` / 由
 *   `collectClientDefines` 收集的 define
 * @returns A function to restore the previous values / 用于还原先前值的函数
 */
export const stubClientDefines = (
  defines: Record<string, unknown>,
): RestoreClientDefines => {
  const globals = globalThis as Record<string, unknown>
  const previous = new Map<string, { existed: boolean; value: unknown }>()

  for (const [key, value] of Object.entries(defines)) {
    previous.set(key, { existed: key in globals, value: globals[key] })
    globals[key] = serialize(value)
  }

  return () => {
    for (const [key, { existed, value }] of previous) {
      if (existed) globals[key] = value
      else Reflect.deleteProperty(globals, key)
    }
  }
}
