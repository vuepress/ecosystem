import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from 'node:fs'
import { tmpdir } from 'node:os'
import path from 'node:path'

import type { AppConfig, BuildApp, Bundler, Theme } from 'vuepress/core'
import { createBuildApp } from 'vuepress/core'

import { emptyTheme } from './emptyTheme.js'

/**
 * Options to create a test app
 *
 * 创建测试 app 的选项
 */
export type TestAppOptions = Omit<Partial<AppConfig>, 'bundler' | 'source'> & {
  /**
   * Source directory of the app
   *
   * It defaults to a temporary directory, which will be removed by
   * `app.cleanup()`.
   *
   * App 的 source 目录
   *
   * 默认为临时目录，会被 `app.cleanup()` 删除。
   */
  source?: string

  /**
   * Markdown files to be generated in the source directory
   *
   * The key is the relative path, and the value is the file content.
   *
   * 需要在 source 目录中生成的 Markdown 文件
   *
   * 键为相对路径，值为文件内容。
   */
  files?: Record<string, string>

  /**
   * Theme of the app
   *
   * App 的主题
   *
   * @default emptyTheme
   */
  theme?: Theme

  /**
   * Whether to initialize the app
   *
   * 是否初始化 app
   *
   * @default true
   */
  init?: boolean

  /**
   * Whether to prepare the app after initialization
   *
   * 是否在初始化后准备 app
   *
   * @default false
   */
  prepare?: boolean
}

/**
 * A test app with a cleanup method
 *
 * 带有清理方法的测试 app
 */
export interface TestApp extends BuildApp {
  /**
   * Cleanup the app
   *
   * It clears the temp file cache, and removes the temporary source directory
   * if it is created by `createTestApp`.
   *
   * 清理 app
   *
   * 它会清空临时文件缓存，并在 source 目录由 `createTestApp` 创建时移除该临时目录。
   *
   * @example
   *   afterAll(() => app.cleanup())
   */
  cleanup: () => void
}

/**
 * Create a VuePress build app for testing
 *
 * It uses an empty bundler and an empty source directory by default, so that
 * plugins and themes can be unit tested without a real site.
 *
 * 创建用于测试的 VuePress build app
 *
 * 它默认使用空 bundler 与空 source 目录，因此无需真实站点即可对插件与主题进行单元测试。
 *
 * @example
 *   const app = await createTestApp({
 *     plugins: [myPlugin({ foo: 'bar' })],
 *     files: { 'README.md': '# Home' },
 *   })
 *
 *   expect(app.pages).toHaveLength(1)
 *
 * @param options - Options to create the test app / 创建测试 app 的选项
 * @returns The test app / 测试 app
 */
export const createTestApp = async (
  options: TestAppOptions = {},
): Promise<TestApp> => {
  const {
    files = {},
    init = true,
    prepare = false,
    source: sourceDir,
    theme = emptyTheme,
    ...config
  } = options

  const source = sourceDir ?? mkdtempSync(path.join(tmpdir(), 'vuepress-test-'))
  const isTemporary = sourceDir === undefined

  for (const [file, content] of Object.entries(files)) {
    const filePath = path.join(source, file)

    mkdirSync(path.dirname(filePath), { recursive: true })
    writeFileSync(filePath, content)
  }

  const app = createBuildApp({
    ...config,
    bundler: {} as Bundler,
    source,
    theme,
  }) as TestApp

  app.cleanup = (): void => {
    app.writeTemp.cleanup()

    if (isTemporary) rmSync(source, { force: true, recursive: true })
  }

  if (init) await app.init()
  if (prepare) await app.prepare()

  return app
}
