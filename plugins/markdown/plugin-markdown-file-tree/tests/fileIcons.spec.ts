import { describe, expect, it } from 'vitest'

import {
  getFileIcon,
  getFileIconByExtension,
} from '../src/node/fileIcons/findIcon.js'
import { defaultFile, defaultFolder } from '../src/node/fileIcons/index.js'

describe(getFileIconByExtension, () => {
  it('should resolve icon by extension', () => {
    expect(getFileIconByExtension('index.ts')).toBe(
      'vscode-icons:file-type-typescript',
    )
    expect(getFileIconByExtension('main.js')).toBe('vscode-icons:file-type-js')
    expect(getFileIconByExtension('README.md')).toBe(
      'vscode-icons:file-type-markdown',
    )
  })

  it('should prefer the longest extension', () => {
    expect(getFileIconByExtension('index.spec.ts')).toBe(
      'vscode-icons:file-type-testts',
    )
    expect(getFileIconByExtension('main.test.js')).toBe(
      'vscode-icons:file-type-testjs',
    )
  })

  it('should be case insensitive', () => {
    expect(getFileIconByExtension('INDEX.TS')).toBe(
      'vscode-icons:file-type-typescript',
    )
  })

  it('should return null when there is no extension', () => {
    expect(getFileIconByExtension('Makefile')).toBeNull()
    expect(getFileIconByExtension('LICENSE')).toBeNull()
  })

  it('should return null for an unknown extension', () => {
    expect(getFileIconByExtension('foo.unknown-ext')).toBeNull()
  })
})

describe(getFileIcon, () => {
  it('should resolve icon by file name', () => {
    expect(getFileIcon('pnpm-workspace.yaml')).toBe(
      'vscode-icons:file-type-pnpm',
    )
    expect(getFileIcon('tsconfig.json')).toBe('vscode-icons:file-type-tsconfig')
    expect(getFileIcon('vite.config.ts')).toBe('vscode-icons:file-type-vite')
    expect(getFileIcon('.gitignore')).toBe('vscode-icons:file-type-git')
  })

  it('should resolve icon by extension', () => {
    expect(getFileIcon('src/index.ts')).toBe(
      'vscode-icons:file-type-typescript',
    )
    expect(getFileIcon('src/App.vue')).toBe('vscode-icons:file-type-vue')
  })

  it('should resolve a file name inside a directory', () => {
    // Only the name of the file matters, its directories do not
    expect(getFileIcon('src/package.json')).toBe('vscode-icons:file-type-npm')
    expect(getFileIcon('packages/a/tsconfig.json')).toBe(
      'vscode-icons:file-type-tsconfig',
    )
    expect(getFileIcon('a/b/c/vite.config.ts')).toBe(
      'vscode-icons:file-type-vite',
    )
  })

  it('should be case insensitive', () => {
    expect(getFileIcon('Dockerfile')).toBe('vscode-icons:file-type-docker')
    expect(getFileIcon('LICENSE')).toBe('vscode-icons:file-type-license')
    expect(getFileIcon('src/MAIN.TS')).toBe('vscode-icons:file-type-typescript')
  })

  it('should fallback to the default file icon', () => {
    expect(getFileIcon('foo.unknown-ext')).toBe(defaultFile)
    expect(getFileIcon('no-extension')).toBe(defaultFile)
  })

  it('should resolve folder icon', () => {
    expect(getFileIcon('src', 'folder')).toBe('vscode-icons:folder-type-src')
    expect(getFileIcon('docs', 'folder')).toBe('vscode-icons:folder-type-docs')
    expect(getFileIcon('node_modules', 'folder')).toBe(
      'vscode-icons:folder-type-node',
    )
  })

  it('should resolve folder icon of a nested path', () => {
    expect(getFileIcon('packages/theme/src', 'folder')).toBe(
      'vscode-icons:folder-type-src',
    )
    expect(getFileIcon('a/b/components', 'folder')).toBe(
      'vscode-icons:folder-type-component',
    )
  })

  it('should fallback to the default folder icon', () => {
    expect(getFileIcon('unknown-folder', 'folder')).toBe(defaultFolder)
  })

  it('should resolve the gaps filled by the overlay', () => {
    expect(getFileIcon('a.cjs')).toBe('vscode-icons:file-type-js')
    expect(getFileIcon('a.styl')).toBe('vscode-icons:file-type-light-stylus')
    expect(getFileIcon('a.stylus')).toBe('vscode-icons:file-type-light-stylus')
    expect(getFileIcon('a.njk')).toBe('vscode-icons:file-type-nunjucks')
    expect(getFileIcon('a.tpl')).toBe('vscode-icons:file-type-smarty')
    expect(getFileIcon('.env.local')).toBe('vscode-icons:file-type-dotenv')
    expect(getFileIcon('.env.example')).toBe('vscode-icons:file-type-dotenv')
  })
})
