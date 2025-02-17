/* eslint-disable no-console */
import {
  COMMON_PEERS,
  DEPRECATED_PACKAGES,
  OFFICIAL_PACKAGES,
  OFFICIAL_PLUGINS_AND_THEMES_REGEXP,
  REMOVED_PACKAGES,
  THIRD_PARTY_PLUGINS,
  THIRD_PARTY_THEMES,
  VUE_RELATED_PACKAGES,
} from '../config/index.js'
import { getVersion } from './getVersion.js'
import type { PackageManager } from './packageManager.js'

export const updatePackages = async (
  packageManager: PackageManager,
  dependencies: Record<string, string>,
): Promise<void> => {
  await Promise.all(
    Object.keys(dependencies).map(async (dependency) => {
      if (REMOVED_PACKAGES.includes(dependency)) {
        console.error(
          `Removing "${dependency}" from your dependencies, as it's no longer maintained.`,
        )
        delete dependencies[dependency]

        return
      }

      if (DEPRECATED_PACKAGES.includes(dependency)) {
        console.error(
          `"${dependency}"is deprecated, please remove it from your dependencies and import "${dependency.substring(
            1,
          )}" directly.`,
        )

        dependencies[dependency] = `^${await getVersion(
          packageManager,
          dependency,
          'next',
        )}`

        return
      }

      if (
        OFFICIAL_PACKAGES.includes(dependency) ||
        OFFICIAL_PLUGINS_AND_THEMES_REGEXP.test(dependency)
      ) {
        dependencies[dependency] = await getVersion(
          packageManager,
          dependency,
          'next',
        )

        return
      }

      if (
        VUE_RELATED_PACKAGES.includes(dependency) ||
        COMMON_PEERS.includes(dependency)
      ) {
        dependencies[dependency] = `^${await getVersion(
          packageManager,
          dependency,
          'latest',
        )}`

        return
      }

      if (
        THIRD_PARTY_PLUGINS.test(dependency) ||
        THIRD_PARTY_THEMES.test(dependency)
      ) {
        dependencies[dependency] = await getVersion(
          packageManager,
          dependency,
          'auto',
        )
      }
    }),
  )
}
