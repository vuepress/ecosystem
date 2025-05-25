import fs from 'node:fs/promises'
import type { FSWatcher } from 'chokidar'
import { watch } from 'chokidar'
import type { App } from 'vuepress'
import { path } from 'vuepress/utils'
import type { NoticeOptions } from '../shared/index.js'
import { getNoticeOptions } from './getNoticeOptions.js'

const HMR_CODE = `
if (import.meta.webpackHot) {
  import.meta.webpackHot.accept()
  if (__VUE_HMR_RUNTIME__.updateNoticeOptions) {
    __VUE_HMR_RUNTIME__.updateNoticeOptions(NOTICE_OPTIONS)
  }
}

if (import.meta.hot) {
  import.meta.hot.accept(({ NOTICE_OPTIONS }) => {
    __VUE_HMR_RUNTIME__.updateNoticeOptions(NOTICE_OPTIONS)
  })
}
`

const readFile = async (filepath: string): Promise<string> => {
  try {
    const content = await fs.readFile(filepath, 'utf-8')
    return content
  } catch {
    return ''
  }
}

// [filepath]: NoticeOptions
const noticeCache = new Map<string, NoticeOptions>()

const resolveNoticeItem = async (
  app: App,
  notice: NoticeOptions,
): Promise<NoticeOptions> => {
  // eslint-disable-next-line prefer-const
  let { contentType = 'html', contentFile, content = '', ...item } = notice

  if (contentFile) {
    contentFile = path.resolve(contentFile)

    if (noticeCache.has(contentFile)) {
      return noticeCache.get(contentFile)!
    }

    contentType = contentFile.endsWith('.md') ? 'markdown' : 'html'
    content = await readFile(contentFile)
  }

  if (contentType === 'markdown') {
    content = app.markdown.render(content, {
      filePath: contentFile,
    })
  }

  const resolved: NoticeOptions = { content, ...item }

  if (contentFile) {
    noticeCache.set(contentFile, resolved)
  }

  return resolved
}

export const prepareNoticeOptions = async (
  app: App,
  options: NoticeOptions[] = [],
): Promise<void> => {
  const noticeOptions: NoticeOptions[] = []

  for (const item of options) {
    noticeOptions.push(await resolveNoticeItem(app, item))
  }

  const noticeAttrOptions = getNoticeOptions(noticeOptions)

  let content = `\
export const NOTICE_OPTIONS = JSON.parse(${JSON.stringify(
    JSON.stringify(noticeAttrOptions),
  )})
`
  if (app.env.isDev) {
    content += HMR_CODE
  }

  await app.writeTemp('internal/noticeOptions.js', content)
}

export const watchNoticeOptions = (
  app: App,
  options: NoticeOptions[],
): FSWatcher => {
  const filepaths = options
    .map(({ contentFile }) => contentFile)
    .filter(Boolean) as string[]

  const watcher = watch(filepaths, {
    ignoreInitial: true,
  })

  const onChange = async (file: string): Promise<void> => {
    const filepath = path.resolve(file)
    const cached = noticeCache.get(filepath)

    if (cached) {
      const contentType = filepath.endsWith('.md') ? 'markdown' : 'html'
      const content = await readFile(filepath)
      cached.content =
        contentType === 'markdown'
          ? app.markdown.render(content, {
              filePath: filepath,
            })
          : content
    }

    await prepareNoticeOptions(app, options)
  }

  watcher.on('change', (filepath: string) => {
    void onChange(filepath)
  })

  return watcher
}
