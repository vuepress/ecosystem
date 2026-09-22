import { describe, expect, it } from 'vitest'

import {
  getFontAwesomeOfflineCode,
  getFontAwesomePackages,
  getFontAwesomeStylePackage,
  getIconExportName,
  isFontAwesomeIconAvailable,
  isFontAwesomeInstalled,
  isFontAwesomeStyleInstalled,
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

  it('should return every style package when enabled', () => {
    const packages = [
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-brands-svg-icons',
      '@fortawesome/free-regular-svg-icons',
      '@fortawesome/free-solid-svg-icons',
    ]

    expect(getFontAwesomePackages(true)).toStrictEqual(packages)
  })
})

describe(getFontAwesomeOfflineCode, () => {
  it('should register every style bundle when all icons are bundled', () => {
    const code = getFontAwesomeOfflineCode(true)

    expect(code).toContain(
      'import { config, dom, library } from "@fortawesome/fontawesome-svg-core";',
    )
    expect(code).toContain(
      'import { fab } from "@fortawesome/free-brands-svg-icons";',
    )
    expect(code).toContain(
      'import { far } from "@fortawesome/free-regular-svg-icons";',
    )
    expect(code).toContain(
      'import { fas } from "@fortawesome/free-solid-svg-icons";',
    )
    expect(code).toContain('config.autoReplaceSvg = "nest";')
    expect(code).toContain('library.add(fab, far, fas);')
    expect(code).toContain('dom.watch();')
  })

  it('should register only the given icons', () => {
    const code = getFontAwesomeOfflineCode({
      brands: ['apple'],
      solid: ['house', 'user'],
    })

    expect(code).toContain(
      'import { faApple } from "@fortawesome/free-brands-svg-icons/faApple";',
    )
    expect(code).toContain(
      'import { faHouse } from "@fortawesome/free-solid-svg-icons/faHouse";',
    )
    expect(code).toContain(
      'import { faUser } from "@fortawesome/free-solid-svg-icons/faUser";',
    )
    expect(code).not.toContain('free-regular-svg-icons')
    expect(code).toContain('library.add(faApple, faHouse, faUser);')
  })

  it('should not register anything when there is no icon', () => {
    expect(getFontAwesomeOfflineCode({})).toContain('library.add();')
  })
})

describe(isFontAwesomeInstalled, () => {
  it('should detect the installed packages', () => {
    expect(isFontAwesomeInstalled()).toBe(true)
  })
})

describe(isFontAwesomeStyleInstalled, () => {
  it('should detect the installed style packages', () => {
    expect(isFontAwesomeStyleInstalled('solid')).toBe(true)
    expect(isFontAwesomeStyleInstalled('regular')).toBe(true)
    expect(isFontAwesomeStyleInstalled('brands')).toBe(true)
  })
})

describe(isFontAwesomeIconAvailable, () => {
  it('should detect the icons of every free style', () => {
    expect(isFontAwesomeIconAvailable('solid', 'house')).toBe(true)
    expect(isFontAwesomeIconAvailable('regular', 'heart')).toBe(true)
    expect(isFontAwesomeIconAvailable('brands', 'apple')).toBe(true)
  })

  it('should detect the aliases of an icon', () => {
    expect(isFontAwesomeIconAvailable('solid', 'home-alt')).toBe(true)
  })

  it('should reject unknown icons', () => {
    expect(isFontAwesomeIconAvailable('solid', 'not-an-icon')).toBe(false)
    // the icon only exists in another style
    expect(isFontAwesomeIconAvailable('solid', 'apple')).toBe(false)
  })
})

describe(getFontAwesomeStylePackage, () => {
  it('should map every style to its package', () => {
    expect(getFontAwesomeStylePackage('solid')).toBe(
      '@fortawesome/free-solid-svg-icons',
    )
    expect(getFontAwesomeStylePackage('regular')).toBe(
      '@fortawesome/free-regular-svg-icons',
    )
    expect(getFontAwesomeStylePackage('brands')).toBe(
      '@fortawesome/free-brands-svg-icons',
    )
  })
})
