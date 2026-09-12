import { describe, expect, it } from 'vitest'

import {
  getFontAwesomeOfflineCode,
  getFontAwesomePackages,
  getIconExportName,
} from '../src/node/getFontAwesomeOffline.js'

describe(getIconExportName, () => {
  it('should convert kebab-case icon names to export names', () => {
    expect(getIconExportName('house')).toBe('faHouse')
    expect(getIconExportName('arrow-left')).toBe('faArrowLeft')
    expect(getIconExportName('arrow-rotate-left-15')).toBe(
      'faArrowRotateLeft15',
    )
    expect(getIconExportName('x-ray')).toBe('faXRay')
    expect(getIconExportName('1')).toBe('fa1')
  })
})

describe(getFontAwesomePackages, () => {
  it('should return nothing when disabled', () => {
    expect(getFontAwesomePackages()).toStrictEqual([])
    expect(getFontAwesomePackages(false)).toStrictEqual([])
  })

  it('should return every style package when enabled with `true`', () => {
    expect(getFontAwesomePackages(true)).toStrictEqual([
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-brands-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-solid-svg-icons',
    ])
  })

  it('should return only the used style packages', () => {
    expect(getFontAwesomePackages({ solid: ['house'] })).toStrictEqual([
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons',
    ])
  })
})

describe(getFontAwesomeOfflineCode, () => {
  it('should register every style bundle when enabled with `true`', () => {
    const code = getFontAwesomeOfflineCode(true)

    expect(code).toContain(
      'import { config, dom, library } from "@fortawesome/fontawesome-svg-core";',
    )
    expect(code).toContain(
      'import { fas } from "@fortawesome/free-solid-svg-icons";',
    )
    expect(code).toContain(
      'import { far } from "@fortawesome/free-regular-svg-icons";',
    )
    expect(code).toContain(
      'import { fab } from "@fortawesome/free-brands-svg-icons";',
    )
    expect(code).toContain('config.autoReplaceSvg = "nest";')
    expect(code).toContain('library.add(fab, far, fas);')
    expect(code).toContain('dom.watch();')
  })

  it('should register only the listed icons', () => {
    const code = getFontAwesomeOfflineCode({
      solid: ['user', 'house'],
      brands: ['apple'],
    })

    expect(code).toContain(
      'import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";',
    )
    expect(code).toContain(
      'import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";',
    )
    expect(code).toContain(
      'import { faApple } from "@fortawesome/free-brands-svg-icons/faApple";',
    )
    expect(code).not.toContain('free-regular-svg-icons')
    // icons are sorted for stable output
    expect(code).toContain('library.add(faHouse, faUser, faApple);')
  })

  it('should not register anything when every style is empty', () => {
    const code = getFontAwesomeOfflineCode({ solid: [] })

    expect(code).toContain('library.add();')
  })
})
