import { describe, expect, it } from 'vitest'
import type { Bundler } from 'vuepress/core'
import { createBuildApp } from 'vuepress/core'
import { fs, path } from 'vuepress/utils'

import { generateSearchWorker } from '../src/node/generateWorker.js'
import { emptyTheme } from './__fixtures__/theme/empty.js'

const app = createBuildApp({
  bundler: {} as Bundler,
  source: path.resolve(__dirname, './__fixtures__/src'),
  dest: path.resolve(__dirname, './__fixtures__/dist'),
  theme: emptyTheme,
})

// oxlint-disable-next-line node/no-top-level-await
await app.init()

// Create a worker template containing the placeholders
const createTemplate = (): string => {
  const file = app.dir.temp('worker-template.js')

  fs.ensureDirSync(path.dirname(file))
  fs.writeFileSync(
    file,
    `const index = __INDEX__;const sortStrategy = __SORT__;`,
  )

  return file
}

const encode = (index: string): string => `encoded:${index}`

describe(generateSearchWorker, () => {
  it('should embed the encoded index of every locale', async () => {
    await generateSearchWorker(app, {
      workerFile: createTemplate(),
      outputFile: 'search.worker.js',
      indexPlaceholder: '__INDEX__',
      sortPlaceholder: '__SORT__',
      encode,
      searchIndexStore: { '/': 'a', '/zh/': 'b' },
    })

    const worker = fs.readFileSync(app.dir.dest('search.worker.js'), 'utf-8')

    expect(worker).not.toContain('__INDEX__')
    expect(worker).toContain('encoded:a')
    expect(worker).toContain('encoded:b')
    // The locale path is kept as a key of the index store
    expect(worker).toContain('zh')
  })

  it('should embed the sort strategy', async () => {
    await generateSearchWorker(app, {
      workerFile: createTemplate(),
      outputFile: 'search-sort.worker.js',
      indexPlaceholder: '__INDEX__',
      sortPlaceholder: '__SORT__',
      encode,
      sortStrategy: 'total',
      searchIndexStore: { '/': 'a' },
    })

    const worker = fs.readFileSync(
      app.dir.dest('search-sort.worker.js'),
      'utf-8',
    )

    expect(worker).toContain('"total"')
  })

  it('should default the sort strategy to `max`', async () => {
    await generateSearchWorker(app, {
      workerFile: createTemplate(),
      outputFile: 'search-default.worker.js',
      indexPlaceholder: '__INDEX__',
      sortPlaceholder: '__SORT__',
      encode,
      searchIndexStore: { '/': 'a' },
    })

    const worker = fs.readFileSync(
      app.dir.dest('search-default.worker.js'),
      'utf-8',
    )

    expect(worker).toContain('"max"')
  })

  it('should escape the encoded index', async () => {
    // A naive `String.replace` would treat `$&` in the replacement as a
    // back-reference and corrupt the worker
    await generateSearchWorker(app, {
      workerFile: createTemplate(),
      outputFile: 'search-escape.worker.js',
      indexPlaceholder: '__INDEX__',
      sortPlaceholder: '__SORT__',
      encode: () => `$&'"`,
      searchIndexStore: { '/': 'a' },
    })

    const worker = fs.readFileSync(
      app.dir.dest('search-escape.worker.js'),
      'utf-8',
    )

    // `$&` is kept literally instead of being replaced by the placeholder
    expect(worker).toContain('$&')
    expect(worker).not.toContain('__INDEX__')
  })

  it('should create the output directory', async () => {
    await generateSearchWorker(app, {
      workerFile: createTemplate(),
      outputFile: 'nested/search.worker.js',
      indexPlaceholder: '__INDEX__',
      sortPlaceholder: '__SORT__',
      encode,
      searchIndexStore: { '/': 'a' },
    })

    expect(fs.existsSync(app.dir.dest('nested/search.worker.js'))).toBe(true)
  })
})
