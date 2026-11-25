import { watch } from 'chokidar'
import type { App } from 'vuepress/core'

import type {
  SidebarStructureData,
  SidebarStructureItem,
} from '../shared/index.js'
import type { SidebarStructureDataOptions } from './getSidebarStructureData.js'
import { getSidebarStructureData } from './getSidebarStructureData.js'
import { logger } from './logger.js'

/**
 * Prepare the sidebar data and write it to the temp directory
 *
 * The client side imports the data from `@temp/theme-helper/sidebar.js`.
 *
 * 准备侧边栏数据并写入临时目录
 *
 * 客户端从 `@temp/theme-helper/sidebar.js` 中导入数据。
 *
 * @param app - VuePress app / VuePress 应用
 * @param options - Options of the function / 函数的选项
 * @returns The sidebar structure data / 侧边栏结构数据
 */
export const prepareSidebarData = async <
  Item extends { text: string } = SidebarStructureItem,
>(
  app: App,
  options: SidebarStructureDataOptions<Item>,
): Promise<SidebarStructureData<Item>> => {
  const sidebarData = getSidebarStructureData(app, options)

  if (app.env.isDebug) logger.info('Sidebar structure data:', sidebarData)

  await app.writeTemp(
    'theme-helper/sidebar.js',
    `export const sidebarData = ${JSON.stringify(sidebarData)};\n`,
  )

  return sidebarData
}

/**
 * Watch the pages of the app and regenerate the sidebar data on changes
 *
 * The watcher is pushed to `watchers` and will be closed by VuePress.
 *
 * 监听应用页面并在变化时重新生成侧边栏数据
 *
 * 监听器会被推入 `watchers`，并由 VuePress 关闭。
 *
 * @param app - VuePress app / VuePress 应用
 * @param watchers - Watchers of the app / 应用的监听器
 * @param options - Options of the function / 函数的选项
 */
export const watchSidebarData = <
  Item extends { text: string } = SidebarStructureItem,
>(
  app: App,
  watchers: { close: () => void }[],
  options: SidebarStructureDataOptions<Item>,
): void => {
  const watcher = watch('pages', {
    cwd: app.dir.temp(),
    ignoreInitial: true,
    ignored: (filePath, stats) =>
      Boolean(stats?.isFile() && !filePath.endsWith('.vue')),
  })

  watcher.on('add', () => {
    void prepareSidebarData(app, options)
  })
  watcher.on('change', () => {
    void prepareSidebarData(app, options)
  })
  watcher.on('unlink', () => {
    void prepareSidebarData(app, options)
  })

  watchers.push(watcher)
}
