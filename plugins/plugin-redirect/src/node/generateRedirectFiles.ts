import {
  entries,
  isLinkAbsolute,
  isLinkHttp,
  removeEndingSlash,
  removeLeadingSlash,
} from '@vuepress/helper'
import type { App } from 'vuepress/core'
import { fs, path, withSpinner } from 'vuepress/utils'
import { getRedirectHTML } from './getRedirectHTML.js'

export const generateRedirectFiles = async (
  { dir, options }: App,
  config: Record<string, string>,
  hostname = '',
): Promise<void> => {
  const resolvedHostname = hostname
    ? removeEndingSlash(isLinkHttp(hostname) ? hostname : `https://${hostname}`)
    : ''

  await withSpinner('Generating redirect files')(() =>
    Promise.all(
      entries(config).map(([from, to]) => {
        const filePath = dir.dest(removeLeadingSlash(from))
        const redirectUrl = isLinkAbsolute(to)
          ? `${resolvedHostname}${options.base}${removeLeadingSlash(to)}`
          : to

        return fs.existsSync(filePath)
          ? Promise.resolve()
          : fs
              .ensureDir(path.dirname(filePath))
              .then(() => fs.writeFile(filePath, getRedirectHTML(redirectUrl)))
      }),
    ),
  )
}
