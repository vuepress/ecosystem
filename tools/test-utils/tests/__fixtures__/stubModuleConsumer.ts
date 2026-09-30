import { fixtureValue } from '@internal/test-utils-fixture'
import fixtureDefault, { fixtureNamed } from '@temp/test-utils-fixture/index.js'

/**
 * Read the exports of the stubbed generated modules
 *
 * It is imported dynamically by the tests, after `stubModule()` has been
 * called, because Vite resolves imports when the module is transformed.
 *
 * 读取被打桩的生成模块的导出值
 *
 * 它由测试在调用 `stubModule()` 之后动态导入，因为 Vite 会在模块被转换时解析导入。
 *
 * @returns The values of the two stub modules / 两个桩模块的值
 */
export const getFixtureValues = (): [string, string, string] => [
  fixtureValue,
  fixtureDefault,
  fixtureNamed(),
]
