import { describe, expect, it, vi } from 'vitest'
import type { App } from 'vuepress/core'

import {
  extractIconsFromComponents,
  parseComponentField,
} from '../src/node/extractIconsFromComponents.js'
import { logger } from '../src/node/utils.js'

const createApp = (contentRendered: string, template?: string): App =>
  ({
    pages: [
      {
        contentRendered,
        sfcBlocks: { template: template ? { content: template } : null },
      },
    ],
  }) as unknown as App

const fields = ['VPCustom.icon', 'VPTest.files[*]']
  .map((field) => parseComponentField(field))
  .filter((field) => field != null)

describe(parseComponentField, () => {
  it('should parse a component field', () => {
    expect(parseComponentField('VPCustom.icon')).toStrictEqual({
      component: 'VPCustom',
      field: 'icon',
    })
    expect(parseComponentField('VPTest.files[*]')).toStrictEqual({
      component: 'VPTest',
      field: 'files[*]',
    })
  })

  it('should reject an invalid component field', () => {
    expect(parseComponentField('icon')).toBeNull()
    expect(parseComponentField('.icon')).toBeNull()
    expect(parseComponentField('VPCustom.')).toBeNull()
  })
})

describe(extractIconsFromComponents, () => {
  it('should read a static prop', () => {
    expect(
      extractIconsFromComponents(
        createApp('<VPCustom icon="mdi:home" />'),
        fields,
      ),
    ).toStrictEqual(['mdi:home'])
  })

  it('should read the kebab-case form of the component', () => {
    expect(
      extractIconsFromComponents(
        createApp('<v-p-custom icon="mdi:home" />'),
        fields,
      ),
    ).toStrictEqual(['mdi:home'])
  })

  it('should read the elements of a bound array prop', () => {
    expect(
      extractIconsFromComponents(
        createApp(`<VPTest :files="['mdi:a', 'mdi:b']" />`),
        fields,
      ),
    ).toStrictEqual(['mdi:a', 'mdi:b'])
  })

  it('should decode the entities of a bound prop', () => {
    expect(
      extractIconsFromComponents(
        createApp('<VPTest :files="[&#39;mdi:a&#39;]" />'),
        fields,
      ),
    ).toStrictEqual(['mdi:a'])
  })

  it('should read the icons in the template block', () => {
    expect(
      extractIconsFromComponents(
        createApp('<p>Text</p>', '<VPCustom icon="mdi:home" />'),
        fields,
      ),
    ).toStrictEqual(['mdi:home'])
  })

  it('should ignore the other components and the missing props', () => {
    expect(
      extractIconsFromComponents(createApp('<Other icon="mdi:x" />'), fields),
    ).toStrictEqual([])
    expect(
      extractIconsFromComponents(createApp('<VPCustom />'), fields),
    ).toStrictEqual([])
  })

  it('should report the bound props that cannot be parsed', () => {
    const warnSpy = vi.spyOn(logger, 'warn').mockImplementation(() => {})

    expect(
      extractIconsFromComponents(
        createApp('<VPTest :files="myFiles" />'),
        fields,
      ),
    ).toStrictEqual([])
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('cannot be detected'),
    )

    warnSpy.mockRestore()
  })

  it('should report a spread prop object', () => {
    const warnSpy = vi.spyOn(logger, 'warn').mockImplementation(() => {})

    expect(
      extractIconsFromComponents(
        createApp('<VPCustom v-bind="props" />'),
        fields,
      ),
    ).toStrictEqual([])
    expect(warnSpy).toHaveBeenCalledWith(
      expect.stringContaining('cannot be detected'),
    )

    warnSpy.mockRestore()
  })
})
