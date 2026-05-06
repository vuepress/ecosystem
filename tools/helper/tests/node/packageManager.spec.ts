import { describe, expect, it } from 'vitest'
import { getDirname, path } from 'vuepress/utils'

import {
  getPackageManager,
  getPackageManagerSetting,
  getTypeofLockFile,
  isPackageManagerInstalled,
} from '../../src/node/utils/packageManager.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

const fixtures = path.resolve(__dirname, '../__fixtures__/package-manager')

describe(isPackageManagerInstalled, () => {
  it('should check existing package managers', () => {
    expect(isPackageManagerInstalled('npm')).toBe(true)
    expect(isPackageManagerInstalled('pnpm')).toBe(true)
  })
})

describe(getPackageManagerSetting, () => {
  it('should be npm', () => {
    expect(
      getPackageManagerSetting(path.resolve(fixtures, 'config/npm')),
    ).toBe('npm')
  })

  it('should be yarn', () => {
    expect(
      getPackageManagerSetting(path.resolve(fixtures, 'config/yarn')),
    ).toBe('yarn')
  })

  it('should be pnpm', () => {
    expect(
      getPackageManagerSetting(path.resolve(fixtures, 'config/pnpm')),
    ).toBe('pnpm')
  })
})

describe(getTypeofLockFile, () => {
  it('should be npm', () => {
    expect(getTypeofLockFile(path.resolve(fixtures, 'lock-file/npm'))).toBe(
      'npm',
    )
  })

  it('should be yarn', () => {
    expect(getTypeofLockFile(path.resolve(fixtures, 'lock-file/yarn'))).toBe(
      'yarn',
    )
  })

  it('should be pnpm', () => {
    expect(getTypeofLockFile(path.resolve(fixtures, 'lock-file/pnpm'))).toBe(
      'pnpm',
    )
  })
})

describe(getPackageManager, () => {
  it('should be npm', () => {
    expect(getPackageManager(path.resolve(fixtures, 'config/npm'))).toBe(
      'npm',
    )
    expect(getPackageManager(path.resolve(fixtures, 'lock-file/npm'))).toBe(
      'npm',
    )
  })

  it('should be yarn', () => {
    expect(getPackageManager(path.resolve(fixtures, 'config/yarn'))).toBe(
      'yarn',
    )
    expect(getPackageManager(path.resolve(fixtures, 'lock-file/yarn'))).toBe(
      'yarn',
    )
  })

  it('should be pnpm', () => {
    expect(getPackageManager(path.resolve(fixtures, 'config/pnpm'))).toBe(
      'pnpm',
    )
    expect(getPackageManager(path.resolve(fixtures, 'lock-file/pnpm'))).toBe(
      'pnpm',
    )
  })
})
