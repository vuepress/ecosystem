/**
 * Restore function returned by `setColorMode()`
 *
 * 由 `setColorMode()` 返回的还原函数
 */
export type RestoreColorMode = () => void

/**
 * Options of `setColorMode()`
 *
 * `setColorMode()` 的选项
 */
export interface SetColorModeOptions {
  /**
   * The key of the local storage that holds the color mode
   *
   * 保存颜色模式的本地存储键
   *
   * @default 'vuepress-color-scheme'
   */
  storageKey?: string

  /**
   * The value to store under the storage key
   *
   * It defaults to `colorMode`. Pass `'auto'` to simulate a user that lets the
   * site follow the preferred color scheme.
   *
   * 存储在存储键下的值
   *
   * 默认为 `colorMode`。传入 `'auto'` 可模拟由站点跟随首选颜色方案的用户。
   */
  storage?: 'auto' | 'light' | 'dark'
}

const globals = globalThis as unknown as {
  localStorage?: Storage
  window?: Window & typeof globalThis
}

const DEFAULT_STORAGE_KEY = 'vuepress-color-scheme'

const noopListener = (): void => {
  /* The stub does not support event listeners. */
}

const noopDispatch = (): boolean => false

const createMediaQueryList = (
  query: string,
  matches: boolean,
): MediaQueryList => ({
  addEventListener: noopListener,
  // eslint-disable-next-line typescript/no-deprecated
  addListener: noopListener,
  dispatchEvent: noopDispatch,
  matches,
  media: query,
  onchange: null,
  removeEventListener: noopListener,
  // eslint-disable-next-line typescript/no-deprecated
  removeListener: noopListener,
})

/**
 * Stub the color mode of the site
 *
 * The dark mode of `@vuepress/theme-default` is driven by
 * `(prefers-color-scheme: dark)` and by the `vuepress-color-scheme` local
 * storage key, so a component test cannot reach its dark branch without a DOM
 * stub.
 *
 * `setColorMode()` stubs `window.matchMedia()` so that `(prefers-color-scheme:
 * dark)` matches according to `colorMode`, and writes `storage` (which defaults
 * to `colorMode`) to `localStorage[storageKey]`. It also sets `data-theme` on
 * `<html>`. All other media queries are forwarded to the real
 * `window.matchMedia()`.
 *
 * 为站点伪造颜色模式
 *
 * `@vuepress/theme-default` 的夜间模式由 `(prefers-color-scheme: dark)` 与
 * `vuepress-color-scheme` 本地存储键驱动，因此组件测试在没有 DOM 桩的情况下无法进入其夜间分支。
 *
 * `setColorMode()` 会伪造 `window.matchMedia()`，使 `(prefers-color-scheme: dark)`
 * 根据 `colorMode` 匹配，并把 `storage`（默认为 `colorMode`）写入
 * `localStorage[storageKey]`，同时设置 `<html>` 上的 `data-theme`。其他媒体查询会转发给真实的
 * `window.matchMedia()`。
 *
 * @example
 *   // @vitest-environment happy-dom
 *   const restore = setColorMode('dark')
 *
 *   const wrapper = await mountVuePress({ rootComponent: MyComponent })
 *
 *   expect(wrapper.html()).toContain('dark')
 *
 *   restore()
 *
 * @param colorMode - The color mode to simulate / 需要模拟的颜色模式
 * @param options - Options of the stub / 桩选项
 * @returns A function to restore the previous state / 用于还原先前状态的函数
 */
export const setColorMode = (
  colorMode: 'light' | 'dark',
  options: SetColorModeOptions = {},
): RestoreColorMode => {
  const { storage = colorMode, storageKey = DEFAULT_STORAGE_KEY } = options
  const { localStorage, window: win } = globals
  const originalMatchMedia = win?.matchMedia
  const previousStorage = localStorage?.getItem(storageKey)
  const documentElement = win?.document.documentElement
  const previousTheme = documentElement?.dataset.theme

  localStorage?.setItem(storageKey, storage)

  if (documentElement) documentElement.dataset.theme = colorMode

  if (win) {
    win.matchMedia = (query: string): MediaQueryList => {
      if (query.includes('prefers-color-scheme'))
        return createMediaQueryList(query, colorMode === 'dark')

      return originalMatchMedia
        ? originalMatchMedia.call(win, query)
        : createMediaQueryList(query, false)
    }
  }

  return () => {
    if (win && originalMatchMedia) win.matchMedia = originalMatchMedia

    if (previousStorage == null) localStorage?.removeItem(storageKey)
    else localStorage?.setItem(storageKey, previousStorage)

    if (documentElement) {
      if (previousTheme === undefined)
        Reflect.deleteProperty(documentElement.dataset, 'theme')
      else documentElement.dataset.theme = previousTheme
    }
  }
}
