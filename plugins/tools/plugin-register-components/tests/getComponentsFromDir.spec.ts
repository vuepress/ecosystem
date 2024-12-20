import { describe, expect, it } from 'vitest'
import { getDirname, path } from 'vuepress/utils'
import { getComponentsFromDir } from '../src/node/index.js'

const __dirname = import.meta.dirname || getDirname(import.meta.url)

describe('plugin-register-components > node > getComponentsFromDir', () => {
  it('should get empty object if `componentsDir` is `null`', async () => {
    const result = await getComponentsFromDir({
      componentsDir: null,
      componentsPatterns: ['**/*.vue'],
      getComponentName: (filename) =>
        path.trimExt(filename.replace(/\/|\\/g, '-')),
    })
    expect(result).toEqual({})
  })

  it('should get vue components correctly', async () => {
    const result = await getComponentsFromDir({
      componentsDir: path.resolve(__dirname, './__fixtures__/components'),
      componentsPatterns: ['**/*.vue'],
      getComponentName: (filename) =>
        path.trimExt(filename.replace(/\/|\\/g, '-')),
    })
    expect(result).toEqual({
      FooBar: path.resolve(__dirname, './__fixtures__/components/FooBar.vue'),
    })
  })

  it('should get vue and ts components correctly', async () => {
    const result = await getComponentsFromDir({
      componentsDir: path.resolve(__dirname, './__fixtures__/components'),
      componentsPatterns: ['**/*.{vue,ts}'],
      getComponentName: (filename) =>
        path.trimExt(filename.replace(/\/|\\/g, '-')),
    })
    expect(result).toEqual({
      FooBar: path.resolve(__dirname, './__fixtures__/components/FooBar.vue'),
      FooBaz: path.resolve(__dirname, './__fixtures__/components/FooBaz.ts'),
    })
  })
})
