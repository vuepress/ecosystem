/**
 * Load the Video.js elements, skins and locales
 *
 * 加载 Video.js 的元素、皮肤与语言包
 *
 * Video.js registers custom elements when its modules are imported, which
 * requires a DOM. The plugin generates `@temp/media/videojs.js` with the
 * elements enabled by the plugin options, so this module is only safe to call
 * on the client.
 *
 * Video.js 在导入模块时会注册自定义元素，这需要 DOM。插件会根据插件配置生成 `@temp/media/videojs.js`
 * 并注册其中的元素，因此本模块只可在客户端调用。
 *
 * @returns Promise resolved when Video.js is ready / Video.js 就绪后 resolve 的
 *   Promise
 */
export const loadVideoJs = async (): Promise<void> => {
  await import(/* webpackChunkName: "videojs" */ '@temp/media/videojs.js')
}
