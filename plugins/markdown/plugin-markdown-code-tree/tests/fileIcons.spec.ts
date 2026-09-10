import { describe, expect, it } from 'vitest'

import {
  defaultFile,
  defaultFolder,
} from '../src/node/fileIcons/definitions.js'
import {
  getFileIcon,
  getFileIconByExtension,
} from '../src/node/fileIcons/findIcon.js'

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
  })

  it('should return null when there is no extension', () => {
    expect(getFileIconByExtension('Makefile')).toBeNull()
    expect(getFileIconByExtension('LICENSE')).toBeNull()
  })

  it('should return null for unknown extension', () => {
    expect(getFileIconByExtension('foo.unknown-ext')).toBeNull()
  })
})

describe(getFileIcon, () => {
  it('should resolve icon by file name', () => {
    expect(getFileIcon('pnpm-workspace.yaml')).toBe(
      'vscode-icons:file-type-light-pnpm',
    )
    expect(getFileIcon('tsconfig.json')).toBe('vscode-icons:file-type-tsconfig')
    expect(getFileIcon('vite.config.ts')).toBe('vscode-icons:file-type-vite')
    expect(getFileIcon('CHANGELOG.md')).toBe('catppuccin:changelog')
  })

  it('should resolve icon by extension', () => {
    expect(getFileIcon('src/index.ts')).toBe(
      'vscode-icons:file-type-typescript',
    )
    expect(getFileIcon('src/App.vue')).toBe('vscode-icons:file-type-vue')
  })

  it('should resolve icon by partial name', () => {
    expect(getFileIcon('LICENSE')).toBe('vscode-icons:file-type-license')
    expect(getFileIcon('Makefile')).toBe('vscode-icons:file-type-makefile')
  })

  it('should prefer extension over partial name', () => {
    expect(getFileIcon('docker-compose.yml')).toBe(
      'vscode-icons:file-type-light-yaml',
    )
  })

  it('should fallback to the default file icon', () => {
    expect(getFileIcon('foo.unknown-ext')).toBe(defaultFile)
  })

  it('should resolve folder icon', () => {
    expect(getFileIcon('src', 'folder')).toBe('vscode-icons:folder-type-src')
    expect(getFileIcon('docs', 'folder')).toBe('vscode-icons:folder-type-docs')
    expect(getFileIcon('node_modules', 'folder')).toBe(
      'vscode-icons:folder-type-light-node',
    )
  })

  it('should resolve folder icon by the folder name of a path', () => {
    expect(getFileIcon('packages/theme/src', 'folder')).toBe(
      'vscode-icons:folder-type-src',
    )
  })

  it('should fallback to the default folder icon', () => {
    expect(getFileIcon('unknown-folder', 'folder')).toBe(defaultFolder)
  })

  it('should not contain any invalid icon set', () => {
    // The upstream data has a `vvscode-icons` typo, which is fixed here
    expect(getFileIcon('index.asax')).toBe('vscode-icons:file-type-aspx')
  })
})
