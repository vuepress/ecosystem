/**
 * Initialize the runtime globals that the client code reads
 *
 * Unlike the other VuePress defines, `__VUEPRESS_SSR__` is a runtime global,
 * because a unit test may render a component both as a string (SSR) and in the
 * DOM (client).
 *
 * 初始化客户端代码读取的运行时全局变量
 *
 * 与其他 VuePress define 不同，`__VUEPRESS_SSR__`
 * 是运行时全局变量，因为单元测试可能既以字符串形式（SSR）渲染组件，也在 DOM 中（客户端）渲染组件。
 */
const globals = globalThis as Record<string, unknown>

globals.__VUEPRESS_SSR__ ??= false

export {}
