import fs from 'node:fs'
import os from 'node:os'
// The `path` of `vuepress/utils` normalizes `\` to `/`, which would mangle the
// file names of the fixtures, so the node path is used here
import path from 'node:path'

import { codeBlockTitle } from '@vuepress/highlighter-helper'
import MarkdownIt from 'markdown-it'
import { describe, expect, it, vi } from 'vitest'
import type { App } from 'vuepress/core'

import { embedCodeTree } from '../src/node/embedCodeTree.js'
import type { CodeTreeEnv } from '../src/node/renderCodeTree.js'

const FIXTURES_DIR = path.resolve(import.meta.dirname, '__fixtures__')
const isWindows = process.platform === 'win32'

/**
 * Create a temporary source directory
 *
 * @param files - Files to create, keyed by path / 要创建的文件，以路径为键
 * @returns Path of the directory / 目录的路径
 */
const createTempSource = (files: Record<string, string | Buffer>): string => {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'code-tree-'))

  for (const [file, content] of Object.entries(files)) {
    const filepath = path.join(dir, file)

    fs.mkdirSync(path.dirname(filepath), { recursive: true })
    fs.writeFileSync(filepath, content)
  }

  return dir
}

/**
 * Remove a temporary source directory
 *
 * @param dir - Path of the directory / 目录的路径
 */
const removeTempSource = (dir: string): void => {
  fs.rmSync(dir, { recursive: true, force: true })
}

/**
 * Create a minimal app stub, only `app.dir.source()` is used by the plugin
 *
 * @param source - Source directory / 源目录
 * @returns App stub / App 桩对象
 */
const createApp = (source = FIXTURES_DIR): App =>
  ({ dir: { source: () => source } }) as unknown as App

const createMarkdown = (source = FIXTURES_DIR): MarkdownIt => {
  const md = new MarkdownIt({ linkify: true }).use(codeBlockTitle, {
    codeBlockTitle: true,
  })

  md.use(embedCodeTree, createApp(source), {})

  return md
}

const createEnv = (file: string, source = FIXTURES_DIR): CodeTreeEnv => ({
  filePath: path.resolve(source, file),
})

/**
 * Decode a HTML entity
 *
 * @param entity - Entity text / 实体文本
 * @returns Decoded character, or the input when it is not an entity /
 *   解码后的字符，不是实体时返回原文本
 */
const decodeEntity = (entity: string): string => {
  const numeric = /^&#(?<code>\d+);$/u.exec(entity)

  if (numeric) return String.fromCodePoint(Number(numeric.groups?.code))

  return (
    {
      '&lt;': '<',
      '&gt;': '>',
      '&quot;': '"',
      '&#39;': "'",
      '&amp;': '&',
    }[entity] ?? entity
  )
}

/**
 * Read an attribute value of a rendered HTML string, as a browser would
 *
 * @param html - Rendered HTML / 渲染结果
 * @param start - Index of the first character of the value / 值的第一个字符的索引
 * @returns Value of the attribute / 属性值
 */
const readAttrValue = (html: string, start: number): string => {
  let index = start
  let value = ''

  while (index < html.length && html[index] !== '"') {
    if (html[index] === '&') {
      const semi = html.indexOf(';', index)

      if (semi !== -1 && semi - index <= 12) {
        const entity = html.slice(index, semi + 1)
        const decoded = decodeEntity(entity)

        if (decoded !== entity) {
          value += decoded
          index = semi + 1
          continue
        }
      }
    }

    value += html[index]
    index += 1
  }

  return value
}

/**
 * Read an attribute of a rendered HTML string, as a browser would
 *
 * @param html - Rendered HTML / 渲染结果
 * @param attr - Attribute name / 属性名
 * @returns Values of the attribute / 属性值
 */
const readAttr = (html: string, attr: string): string[] => {
  const values: string[] = []
  const pattern = new RegExp(`${attr}="`, 'gu')
  let match: RegExpExecArray | null

  while ((match = pattern.exec(html)))
    values.push(readAttrValue(html, match.index + match[0].length))

  return values
}

describe(embedCodeTree, () => {
  it('should embed a directory as code tree', () => {
    const md = createMarkdown()
    const env = createEnv('index.md')
    const result = md.render('@[code-tree](embed)\n', env)

    expect(result).toContain('<CodeTree height="320px" entry="index.ts">')
    expect(result).toContain('data-title="index.ts"')
    expect(result).toContain("export * from './utils.js'")
    expect(result).toMatchSnapshot()
  })

  it('should build the file tree from the files of the directory', () => {
    const md = createMarkdown()
    const env = createEnv('index.md')
    const result = md.render('@[code-tree](embed)\n', env)

    expect(result).toContain('<CodeTreeFileNode path="index.ts" type="file"')
    expect(result).toContain(
      '<CodeTreeFileNode path="package.json" type="file"',
    )
    expect(result).toContain('<CodeTreeFileNode path="utils.ts" type="file"')
    expect(result).toContain(
      '<CodeTreeFileNode path="src" type="folder" icon="vscode-icons:folder-type-src">',
    )
    expect(result).toContain(
      '<CodeTreeFileNode path="src/App.vue" type="file" icon="vscode-icons:file-type-vue">',
    )
  })

  it('should skip unsupported files', () => {
    const md = createMarkdown()
    const env = createEnv('index.md')
    const result = md.render('@[code-tree](embed)\n', env)

    expect(result).not.toContain('logo.png')
  })

  it('should not be broken by a fenced block inside a file', () => {
    const md = createMarkdown()
    const env = createEnv('index.md')
    const result = md.render('@[code-tree entry="notes.md"](embed)\n', env)

    expect(result).toContain('<CodeTree height="320px" entry="notes.md">')
    expect(result).toContain('data-title="notes.md"')
    // The fenced block inside the file does not close the generated code block,
    // so its content is kept as a whole
    expect(result).toContain('```ts')
    expect(result).toContain('const a = 1')
    expect(result.match(/code-block-with-title/gu)).toHaveLength(5)
  })

  it('should support attributes', () => {
    const md = createMarkdown()
    const env = createEnv('index.md')
    const result = md.render(
      '@[code-tree title="Vue App" height="400" entry="utils.ts"](embed)\n',
      env,
    )

    expect(result).toContain(
      '<CodeTree title="Vue App" height="400px" entry="utils.ts">',
    )
  })

  it('should resolve the directory from the source directory', () => {
    const md = createMarkdown()
    const env = createEnv('nested/index.md')
    const result = md.render('@[code-tree](/embed)\n', env)

    expect(result).toContain('data-title="index.ts"')
  })

  it('should collect the page dependencies', () => {
    const md = createMarkdown()
    const env = createEnv('index.md')
    md.render('@[code-tree](embed)\n', env)

    expect(env).toHaveProperty('codeTreeFiles')
    expect(env.codeTreeFiles).toHaveLength(5)
    expect(env.codeTreeFiles).toContain(
      path.resolve(FIXTURES_DIR, 'embed/index.ts'),
    )
  })

  it('should not pollute the env of the current page', () => {
    const md = createMarkdown()
    const env = createEnv('index.md')
    md.render('@[code-tree](embed)\n', env)

    expect(env).not.toHaveProperty('frontmatter')
    expect(env).not.toHaveProperty('headers')
  })

  it('should warn and render nothing for an invalid directory', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const md = createMarkdown()
    const env = createEnv('index.md')

    expect(md.render('@[code-tree](not-exist)\n', env)).not.toContain(
      '<CodeTree',
    )
    expect(md.render('@[code-tree]()\n', env)).not.toContain('<CodeTree')

    warn.mockRestore()
  })

  it('should ignore a directory outside of the source directory', () => {
    const md = createMarkdown()
    const env = createEnv('index.md')

    expect(md.render('@[code-tree](../../embed)\n', env)).not.toContain(
      '<CodeTree',
    )
  })

  it('should not affect other embed syntax', () => {
    const md = createMarkdown()
    const env = createEnv('index.md')
    const result = md.render('@[code-tree-foo](embed)\n', env)

    expect(result).not.toContain('<CodeTree')
  })

  it('should reject a directory outside of the source directory', () => {
    const md = createMarkdown()
    const env = createEnv('index.md')

    for (const dir of [
      '../../...',
      '/..',
      '/../../',
      String.raw`../..\..\embed`,
    ]) {
      expect(md.render(`@[code-tree](${dir})\n`, env)).not.toContain(
        '<CodeTree',
      )
    }
  })

  it('should reject a file instead of a directory', () => {
    const md = createMarkdown()
    const env = createEnv('index.md')
    const result = md.render('@[code-tree](embed/index.ts)\n', env)

    expect(result).not.toContain('<CodeTree')
  })

  it('should reject a symbolic link pointing outside of the source directory', () => {
    const outside = createTempSource({
      'secret.ts': 'export const secret = 1\n',
    })
    const source = createTempSource({ 'index.md': '' })

    try {
      fs.symlinkSync(outside, path.join(source, 'link'), 'dir')
    } catch {
      removeTempSource(outside)
      removeTempSource(source)
      // Creating a symbolic link may not be allowed
      return
    }

    try {
      const md = createMarkdown(source)
      const env = createEnv('index.md', source)

      expect(md.render('@[code-tree](link)\n', env)).not.toContain('<CodeTree')
    } finally {
      removeTempSource(outside)
      removeTempSource(source)
    }
  })

  it.skipIf(isWindows)(
    'should skip a symbolic link of a file pointing outside',
    () => {
      const outside = createTempSource({
        'secret.ts': 'export const secret = 1\n',
      })
      const source = createTempSource({
        'index.md': '',
        'ok.ts': 'export const ok = 1\n',
      })

      try {
        fs.symlinkSync(
          path.join(outside, 'secret.ts'),
          path.join(source, 'link.ts'),
        )
      } catch {
        removeTempSource(outside)
        removeTempSource(source)
        // Creating a symbolic link may not be allowed
        return
      }

      try {
        const md = createMarkdown(source)
        const env = createEnv('index.md', source)
        const result = md.render('@[code-tree](.)\n', env)

        expect(result).toContain('path="ok.ts"')
        expect(result).not.toContain('link.ts')
        expect(result).not.toContain('secret')
      } finally {
        removeTempSource(outside)
        removeTempSource(source)
      }
    },
  )

  it.skipIf(isWindows)(
    'should skip a symbolic link of a nested directory pointing outside',
    () => {
      const outside = createTempSource({
        'secret.ts': 'export const secret = 1\n',
      })
      const source = createTempSource({
        'index.md': '',
        'ok.ts': 'export const ok = 1\n',
      })

      try {
        fs.mkdirSync(path.join(source, 'nested'))
        fs.symlinkSync(outside, path.join(source, 'nested/link'), 'dir')
      } catch {
        removeTempSource(outside)
        removeTempSource(source)
        // Creating a symbolic link may not be allowed
        return
      }

      try {
        const md = createMarkdown(source)
        const env = createEnv('index.md', source)
        const result = md.render('@[code-tree](.)\n', env)

        expect(result).toContain('path="ok.ts"')
        expect(result).not.toContain('secret')
        expect(result).not.toContain('nested/link')
      } finally {
        removeTempSource(outside)
        removeTempSource(source)
      }
    },
  )

  it('should skip a binary file', () => {
    const source = createTempSource({
      'index.md': '',
      // A binary file without any NUL byte
      'binary.xyz': Buffer.from([1, 2, 3, 4, 5, 6, 7, 8]),
      'nul.xyz': Buffer.from([0x01, 0x02, 0x00, 0x03]),
      'ok.ts': 'export const ok = 1\n',
    })

    try {
      const md = createMarkdown(source)
      const env = createEnv('index.md', source)
      const result = md.render('@[code-tree](.)\n', env)

      expect(result).toContain('path="ok.ts"')
      expect(result).not.toContain('binary.xyz')
      expect(result).not.toContain('nul.xyz')
    } finally {
      removeTempSource(source)
    }
  })

  it('should keep a file at the size limit, and skip a larger one', () => {
    const source = createTempSource({
      'index.md': '',
      // `MAX_FILE_SIZE` is 128 KiB, and the size is measured in bytes
      'exact.ts': `//${'a'.repeat(128 * 1024 - 3)}\n`,
      'large.ts': `export const a = '${'a'.repeat(129 * 1024)}'\n`,
      'ok.ts': 'export const ok = 1\n',
    })

    try {
      const md = createMarkdown(source)
      const env = createEnv('index.md', source)
      const result = md.render('@[code-tree](.)\n', env)

      expect(result).toContain('path="ok.ts"')
      expect(result).toContain('path="exact.ts"')
      expect(result).not.toContain('large.ts')
    } finally {
      removeTempSource(source)
    }
  })

  it.skipIf(isWindows)('should sanitize a backslash of a file name', () => {
    const source = createTempSource({
      'index.md': '',
      'back\\slash.ts': 'export const a = 1\n',
    })

    try {
      const md = createMarkdown(source)
      const env = createEnv('index.md', source)
      const result = md.render('@[code-tree](.)\n', env)

      expect(result).toContain('path="back%5Cslash.ts"')
      expect(result).toContain('data-title="back%5Cslash.ts"')
    } finally {
      removeTempSource(source)
    }
  })

  it('should sanitize unsafe characters of a file name', () => {
    const source = createTempSource({
      'index.md': '',
      'quo"te.ts': 'export const a = 1\n',
      'both\'and".ts': 'export const b = 1\n',
      'a&b.ts': 'export const c = 1\n',
      'ent&amp;ity.ts': 'export const d = 1\n',
    })

    try {
      const md = createMarkdown(source)
      const env = createEnv('index.md', source)
      const result = md.render('@[code-tree](.)\n', env)

      // The rendered title never breaks out of its attribute
      expect(result).not.toContain('quo"te.ts"')
      expect(result).toContain('data-title="quo%22te.ts"')

      // The name a node displays and the name of its code block always match
      expect(readAttr(result, 'data-title').sort()).toStrictEqual(
        readAttr(result, 'path').sort(),
      )
      expect(readAttr(result, 'data-title')).toContain('a&b.ts')
    } finally {
      removeTempSource(source)
    }
  })

  it('should keep an ordinary file name as it is', () => {
    const source = createTempSource({
      '中文文件.ts': "export const a = 'a'\n",
      '文档 说明.md': '# 文档说明\n',
      "it's a file.ts": "export const b = 'b'\n",
    })

    try {
      const md = createMarkdown(source)
      // The page itself does not exist, only its directory is used
      const env = createEnv('page.md', source)
      const result = md.render('@[code-tree](.)\n', env)

      // Neither the file tree nor the code block title encodes the name, so the
      // displayed name, the tree path and the title always match
      expect(readAttr(result, 'path').sort()).toStrictEqual([
        "it's a file.ts",
        '中文文件.ts',
        '文档 说明.md',
      ])
      expect(readAttr(result, 'data-title').sort()).toStrictEqual([
        "it's a file.ts",
        '中文文件.ts',
        '文档 说明.md',
      ])

      expect(result).not.toContain('%')
    } finally {
      removeTempSource(source)
    }
  })

  it('should ignore the git directory and temporary directories', () => {
    const source = createTempSource({
      '.git/HEAD': 'ref: refs/heads/main\n',
      '.git/objects/aa/blob.ts': 'export const blob = 1\n',
      'index.md': '',
      'ok.ts': 'export const ok = 1\n',
      '.cache/x/y/cached.ts': 'export const cached = 1\n',
      '.temp/t.ts': 'export const temp = 1\n',
    })

    try {
      const md = createMarkdown(source)
      const env = createEnv('index.md', source)
      const result = md.render('@[code-tree](.)\n', env)

      expect(result).toContain('path="ok.ts"')
      for (const path_ of ['HEAD', '.cache', '.temp', 'blob.ts'])
        expect(result).not.toContain(path_)
    } finally {
      removeTempSource(source)
    }
  })

  it('should warn when no code file is readable', () => {
    const warn = vi.spyOn(console, 'warn').mockImplementation(() => {})
    const source = createTempSource({
      'large.ts': `export const a = '${'a'.repeat(129 * 1024)}'\n`,
      'nul.ts': Buffer.from([0x00, 0x01, 0x02]),
    })

    try {
      const md = createMarkdown(source)
      const env = createEnv('index.md', source)

      expect(md.render('@[code-tree](.)\n', env)).not.toContain('<CodeTree')
    } finally {
      removeTempSource(source)
      warn.mockRestore()
    }
  })
})
