import type { Markdown, MarkdownEnv } from 'vuepress/markdown'
import type { ShikiLogLevel } from './types.js'
import { logger } from './utils.js'

export interface HighlightLogger {
  debug: (msg: string) => void
  warn: (msg: string) => void
  logLevel: ShikiLogLevel
  filepath?: string | null
}

export const logLevels: Record<ShikiLogLevel, number> = {
  silent: 0,
  warn: 1,
  debug: 2,
}

export const createHighlightLogger = (
  md: Markdown,
  level: ShikiLogLevel = 'warn',
): HighlightLogger => {
  const highlightLogger = {
    logLevel: level,
    filepath: null,
  } as HighlightLogger

  if (level === 'debug') {
    const rawRender = md.render
    md.render = (src, env: MarkdownEnv) => {
      // store file path before each render
      highlightLogger.filepath = env.filePathRelative

      return rawRender(src, env)
    }
  }

  highlightLogger.debug = (msg: string) => {
    if (logLevels[level] >= logLevels.debug) {
      logger.info(msg)
    }
  }

  highlightLogger.warn = (msg: string) => {
    if (logLevels[level] >= logLevels.warn) {
      logger.info(msg)
    }
  }

  return highlightLogger
}
