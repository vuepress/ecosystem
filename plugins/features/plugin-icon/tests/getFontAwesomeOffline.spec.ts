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

/**
 * Resolver used to make the resolved paths visible in the generated code
 *
 * 用于让生成代码中解析后的路径可见的解析函数
 *
 * @param module - Module name / 模块名称
 * @returns Resolved path / 解析后的路径
 */
const resolver = (module: string): string => `/resolved/${module}`

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
    const code = getFontAwesomeOfflineCode(true, resolver)

    expect(code).toContain(
      'import { config, dom, library } from "/resolved/@fortawesome/fontawesome-svg-core";',
    )
    expect(code).toContain(
      'import { fab } from "/resolved/@fortawesome/free-brands-svg-icons";',
    )
    expect(code).toContain(
      'import { far } from "/resolved/@fortawesome/free-regular-svg-icons";',
    )
    expect(code).toContain(
      'import { fas } from "/resolved/@fortawesome/free-solid-svg-icons";',
    )
    expect(code).toContain('config.autoReplaceSvg = "nest";')
    expect(code).toContain('library.add(fab, far, fas);')
    expect(code).toContain('dom.watch();')
  })

  it('should register only the given icons', () => {
    const code = getFontAwesomeOfflineCode(
      {
        brands: ['apple'],
        solid: ['house', 'user'],
      },
      resolver,
    )

    expect(code).toContain(
      'import { faApple } from "/resolved/@fortawesome/free-brands-svg-icons/faApple";',
    )
    expect(code).toContain(
      'import { faHouse } from "/resolved/@fortawesome/free-solid-svg-icons/faHouse";',
    )
    expect(code).toContain(
      'import { faUser } from "/resolved/@fortawesome/free-solid-svg-icons/faUser";',
    )
    expect(code).not.toContain('free-regular-svg-icons')
    expect(code).toContain('library.add(faApple, faHouse, faUser);')
  })

  it('should not register anything when there is no icon', () => {
    expect(getFontAwesomeOfflineCode({}, resolver)).toContain('library.add();')
  })

  it('should resolve the packages from the plugin instead of from the site', () => {
    const code = getFontAwesomeOfflineCode({ solid: ['house'] }, resolver)

    // a bare specifier is resolved from the generated entry, which lives in the
    // temp folder of the site and may not see the packages
    expect(code).not.toContain('from "@fortawesome/')
    expect(code).toContain('from "/resolved/@fortawesome/')
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
