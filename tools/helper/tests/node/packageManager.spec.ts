import { describe, expect, it } from 'vitest'
import { getDirname, path } from 'vuepress/utils'
import {
  getPackageManager,
  isPackageManagerInstalled,
} from '../../src/node/utils/packageManager.js'

const __dirname = getDirname(import.meta.url)

const fixtures = path.resolve(__dirname, '../__fixtures__/package-manager')

it('Should detect global package manager', () => {
  expect(isPackageManagerInstalled('npm')).toBeTruthy()
  expect(isPackageManagerInstalled('pnpm')).toBeTruthy()
})

describe('Should detect lockfile', () => {
  it('Should be npm', () => {
    expect(getPackageManager(path.resolve(fixtures, 'lock-file/npm'))).toEqual(
      'npm',
    )
  })

  it('Should be yarn', () => {
    expect(getPackageManager(path.resolve(fixtures, 'lock-file/yarn'))).toEqual(
      'yarn',
    )
  })

  it('Should be pnpm', () => {
    expect(getPackageManager(path.resolve(fixtures, 'lock-file/pnpm'))).toEqual(
      'pnpm',
    )
  })
})
