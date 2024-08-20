import { get } from 'node:https'
import semver from 'semver'
import type { PackageManager } from './packageManager.js'
import { getRegistry } from './registry.js'

export const getVersion = async (
  packageManager: PackageManager,
  packageName: string,
  tag: 'auto' | 'latest' | 'next' = 'auto',
  retries = 3,
): Promise<string> => {
  const registry = getRegistry(packageManager)
  const infoUrl = `${registry}-/package/${packageName}/dist-tags`

  const getVersionInfo = async (): Promise<Record<string, string>> =>
    new Promise((resolve, reject) => {
      get(infoUrl, (res) => {
        if (res.statusCode === 200) {
          let body = ''

          res.on('data', (data: string) => {
            body += data
          })
          res.on('end', () => {
            resolve(JSON.parse(body) as Record<string, string>)
          })
        } else {
          reject(new Error('Failed to get version info'))
        }
      }).on('error', reject)
    })

  for (let times = 1; times <= retries; times++) {
    const versionInfo = await getVersionInfo().catch(() => {
      // eslint-disable-next-line no-console
      console.log(`Get ${packageName} version failed, [${times}/${retries}]`)
    })

    if (versionInfo) {
      const { next, latest } = versionInfo

      return tag === 'latest'
        ? latest
        : tag === 'next'
          ? next
          : next && semver.gt(next, latest)
            ? next
            : latest
    }
  }

  throw new Error(
    `Failed to get ${packageName} version!\n Can not get version info from ${infoUrl}`,
  )
}
