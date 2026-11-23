import { describe, expect, it } from 'vitest'

import { getSidebarStructureScopes } from '../../src/node/getSidebarStructureScopes.js'

describe(getSidebarStructureScopes, () => {
  it('should resolve a structure sidebar of the root locale', () => {
    expect(
      getSidebarStructureScopes({
        themeData: { sidebar: 'structure' },
        childrenKey: 'items',
        prefixKey: 'base',
      }),
    ).toStrictEqual(['/'])
  })

  it('should resolve a structure sidebar of a locale', () => {
    expect(
      getSidebarStructureScopes({
        themeData: { locales: { '/zh/': { sidebar: 'structure' } } },
        childrenKey: 'items',
        prefixKey: 'base',
      }),
    ).toStrictEqual(['/zh/'])
  })

  it('should resolve the nested structure groups with an absolute base', () => {
    expect(
      getSidebarStructureScopes({
        themeData: {
          sidebar: [
            { text: 'Guide', items: 'structure', base: '/guide/' },
            {
              text: 'Advanced',
              base: '/advanced/',
              items: [
                { text: 'Deep', items: 'structure', base: '/advanced/deep/' },
              ],
            },
          ],
        },
        childrenKey: 'items',
        prefixKey: 'base',
      }),
    ).toStrictEqual(['/guide/', '/advanced/deep/'])
  })

  it('should resolve the nested structure groups with a relative prefix', () => {
    expect(
      getSidebarStructureScopes({
        themeData: {
          sidebar: [
            { text: 'Guide', children: 'structure', prefix: 'guide/' },
            {
              text: 'Nested',
              prefix: 'nested/',
              children: [
                { text: 'Deep', children: 'structure', prefix: 'deep/' },
              ],
            },
          ],
        },
        childrenKey: 'children',
        prefixKey: 'prefix',
      }),
    ).toStrictEqual(['/guide/', '/nested/deep/'])
  })

  it('should resolve the structure scopes of an object config', () => {
    expect(
      getSidebarStructureScopes({
        themeData: {
          sidebar: {
            '/foo/': 'structure',
            '/bar/': [{ text: 'Bar', children: 'structure' }],
            '/heading/': 'heading',
          },
        },
        childrenKey: 'children',
        prefixKey: 'prefix',
      }),
    ).toStrictEqual(['/foo/', '/bar/'])
  })

  it('should merge the root config with the locale config', () => {
    expect(
      getSidebarStructureScopes({
        themeData: {
          sidebar: 'structure',
          locales: {
            '/zh/': {
              sidebar: [
                { text: 'Guide', children: 'structure', prefix: 'guide/' },
              ],
            },
          },
        },
        childrenKey: 'children',
        prefixKey: 'prefix',
      }),
    ).toStrictEqual(['/', '/zh/guide/'])
  })
})
