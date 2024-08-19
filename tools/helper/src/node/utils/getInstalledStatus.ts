import { createRequire } from 'node:module'

export const getInstalledStatus = (
  pkg: string,
  currentUrl: string,
): boolean => {
  try {
    if (pkg) createRequire(currentUrl).resolve(pkg)

    return true
  } catch {
    return false
  }
}
