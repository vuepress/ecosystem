import { spawnSync } from 'node:child_process'
import { fs, path } from 'vuepress/utils'

export type PackageManager = 'bun' | 'npm' | 'pnpm' | 'yarn'

const globalCache = new Map<string, boolean>()
const localCache = new Map<string, PackageManager>()

const PACKAGE_CONFIG = 'package.json'
const NPM_LOCK = 'package-lock.json'
const YARN_LOCK = 'yarn.lock'
const PNPM_LOCK = 'pnpm-lock.yaml'
const BUN_LOCK = 'bun.lockb'

const isInstalled = (packageManager: PackageManager): boolean => {
  try {
    return (
      spawnSync(`${packageManager} --version`, { shell: true, stdio: 'ignore' })
        .status === 0
    )
  } catch {
    return false
  }
}

/**
 * Check if a package manager is installed globally.
 *
 * 检查包管理器是否已全局安装
 *
 * @param packageManager - Package manager / 包管理器
 *
 * @returns Whether the package manager is installed / 包管理器是否已安装
 */
export const isPackageManagerInstalled = (
  packageManager: PackageManager,
): boolean => {
  const key = `global:${packageManager}`

  const status = globalCache.get(key)

  if (status != null) return status

  if (isInstalled(packageManager)) {
    globalCache.set(key, true)

    return true
  }

  return false
}

/**
 * Get package manager setting in package.json
 *
 * 获取 package.json 中的包管理器设置
 *
 * @param cwd - Current working directory / 当前工作目录
 * @param deep - Whether to search in parent directories / 是否在父目录中搜索
 *
 * @returns The type of package manager / 包管理器类型
 */
export const getPackageManagerSetting = (
  cwd = process.cwd(),
  deep = true,
): PackageManager | null => {
  const key = `package:${cwd}`

  const status = localCache.get(key)

  if (status != null) return status

  if (fs.existsSync(path.resolve(cwd, PACKAGE_CONFIG))) {
    const { packageManager: packageManagerSettings } = JSON.parse(
      fs.readFileSync(path.resolve(cwd, PACKAGE_CONFIG), 'utf-8'),
    ) as Record<string, unknown> & { packageManager?: string }

    if (packageManagerSettings) {
      const packageManager = packageManagerSettings.split(
        '@',
      )[0] as PackageManager

      localCache.set(key, packageManager)

      return packageManager
    }
  }

  if (deep) {
    let dir = cwd

    while (dir !== path.dirname(dir)) {
      dir = path.dirname(dir)

      if (fs.existsSync(path.resolve(cwd, PACKAGE_CONFIG))) {
        const { packageManager: packageManagerSettings } = JSON.parse(
          fs.readFileSync(path.resolve(cwd, PACKAGE_CONFIG), 'utf-8'),
        ) as Record<string, unknown> & { packageManager?: string }

        if (packageManagerSettings) {
          const packageManager = packageManagerSettings.split(
            '@',
          )[0] as PackageManager

          localCache.set(key, packageManager)

          return packageManager
        }
      }
    }
  }

  return null
}

const getLockFileTypeInDir = (dir: string): PackageManager | null => {
  if (fs.existsSync(path.resolve(dir, PNPM_LOCK))) return 'pnpm'
  if (fs.existsSync(path.resolve(dir, YARN_LOCK))) return 'yarn'
  if (fs.existsSync(path.resolve(dir, BUN_LOCK))) return 'bun'
  if (fs.existsSync(path.resolve(dir, NPM_LOCK))) return 'npm'
  return null
}

/**
 * Get the type of lock file.
 *
 * 获取锁文件的类型
 *
 * @param cwd - Current working directory / 当前工作目录
 * @param deep - Whether to search in parent directories / 是否在父目录中搜索
 *
 * @returns The type of lock file / 锁文件类型
 */
export const getTypeofLockFile = (
  cwd = process.cwd(),
  deep = true,
): PackageManager | null => {
  const key = `local:${cwd}`

  const status = localCache.get(key)

  if (status != null) return status

  let type = getLockFileTypeInDir(cwd)

  if (type) {
    localCache.set(key, type)
    return type
  }

  if (deep) {
    let dir = cwd

    while (dir !== path.dirname(dir)) {
      dir = path.dirname(dir)
      type = getLockFileTypeInDir(dir)

      if (type) {
        localCache.set(key, type)
        return type
      }
    }
  }

  return null
}

/**
 * Detect the package manager used in the current project.
 *
 * 检测当前项目使用的包管理器
 *
 * @param cwd - Current working directory / 当前工作目录
 * @param deep - Whether to search in parent directories / 是否在父目录中搜索
 *
 * @returns The type of package manager / 包管理器类型
 */
export const getPackageManager = (
  cwd = process.cwd(),
  deep = true,
): PackageManager =>
  getPackageManagerSetting(cwd, deep) ??
  getTypeofLockFile(cwd, deep) ??
  (isPackageManagerInstalled('pnpm')
    ? 'pnpm'
    : isPackageManagerInstalled('yarn')
      ? 'yarn'
      : isPackageManagerInstalled('bun')
        ? 'bun'
        : 'npm')
