import { createHash } from 'node:crypto'
import { tmpdir } from 'node:os'
import path from 'node:path'

/**
 * Root directory of the `@vuepress/test-utils` package
 *
 * It is resolved from this file, so it is the same in the Node.js plugin (which
 * runs in the Vite main thread) and in the test files (which run in the Vitest
 * worker). It is used to derive a per-installation directory, so that parallel
 * checkouts do not share generated modules.
 *
 * `@vuepress/test-utils` 包的根目录
 *
 * 它从本文件解析，因此在 Node.js 插件（运行于 Vite 主线程）与测试文件（运行于 Vitest worker）中一致。
 * 它用于派生每个安装目录，使并行 checkout 不会共享生成模块。
 */
const packageRoot = path.resolve(import.meta.dirname, '../..')

const packageHash = createHash('sha1')
  .update(packageRoot)
  .digest('hex')
  .slice(0, 8)

/**
 * Directory that holds the generated modules created by `stubModule()`
 *
 * It lives in the OS temp directory, because the Vite main thread and the
 * Vitest workers are different threads and can only share state through the
 * filesystem.
 *
 * 由 `stubModule()` 创建的生成模块所在的目录
 *
 * 它位于操作系统临时目录，因为 Vite 主线程与 Vitest worker 是不同的线程，只能通过文件系统共享状态。
 */
export const TEST_MODULES_DIR = path.join(
  tmpdir(),
  `vuepress-test-utils-${packageHash}`,
)

/**
 * Get the generated file path of a stubbed module
 *
 * The mapping is deterministic: the module id is appended to
 * `TEST_MODULES_DIR`, and a `.js` extension is added when the id does not
 * already end with `.js`. For example, `@temp/revealjs/index.js` is stored at
 * `<dir>/@temp/revealjs/index.js`, and `@internal/noticeOptions` at
 * `<dir>/@internal/noticeOptions.js`.
 *
 * 获取被 stub 模块的生成文件路径
 *
 * 映射是确定性的：把模块 id 追加到 `TEST_MODULES_DIR`，当 id 不以 `.js` 结尾时补上 `.js` 扩展名。例如
 * `@temp/revealjs/index.js` 存放到 `<dir>/@temp/revealjs/index.js`， 而
 * `@internal/noticeOptions` 存放到 `<dir>/@internal/noticeOptions.js`。
 *
 * @param id - The module id / 模块 id
 * @returns The generated file path / 生成的文件路径
 */
export const getTestModuleFilePath = (id: string): string => {
  const [cleanId = ''] = id.split(/[?#]/u)
  const fileName = cleanId.endsWith('.js') ? cleanId : `${cleanId}.js`

  return path.join(TEST_MODULES_DIR, fileName)
}
