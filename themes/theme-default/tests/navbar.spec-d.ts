import { assertType, expectTypeOf, it } from 'vitest'
import type { NavbarOptions } from '../src/shared/index.js'

it('navbar options', () => {
  const navbarOptions1 = ['/README.md', '/test.md', '/nested/test.md']
  const navbarOptions2 = [
    { text: 'title', link: '/README.md' },
    '/test.md',
    '/nested/test.md',
  ]
  const navbarOptions3 = [
    { text: 'title', link: '/README.md' },
    '/test.md',
    {
      text: 'Nested',
      prefix: '/nested/',
      children: ['test1.md', 'test2.md'],
    },
  ]
  const navbarOptions4 = [
    { text: 'title', link: '/README.md' },
    '/test.md',
    {
      text: 'Nested',
      prefix: '/nested/',
      children: [
        'test1.md',
        {
          text: 'Nested test2',
          link: '/nested/test2.md',
        },
      ],
    },
  ]
  const navbarOptions5 = [
    { text: 'title', link: '/README.md' },
    '/test.md',
    {
      text: 'Nested',
      prefix: '/nested/',
      children: [
        'test1.md',
        {
          text: 'Nested test2',
          prefix: 'test2/',
          children: [
            '1.md',
            { text: 'Nested test2-2', link: '/nested/test2/2.md' },
          ],
        },
      ],
    },
  ]
  const navbarOptions6 = [
    { text: 'title', link: '/README.md' },
    '/test.md',
    {
      text: 'Nested',
      prefix: '/nested/',
      children: [
        'test1.md',
        {
          text: 'Nested test2',
          prefix: 'test2/',
          children: [
            '1.md',
            {
              text: 'Nested test2-2-2',
              prefix: 'test2/',
              children: ['test.md'],
            },
          ],
        },
      ],
    },
  ]

  expectTypeOf(navbarOptions1).toMatchTypeOf<NavbarOptions>()
  expectTypeOf(navbarOptions2).toMatchTypeOf<NavbarOptions>()
  expectTypeOf(navbarOptions3).toMatchTypeOf<NavbarOptions>()
  expectTypeOf(navbarOptions4).toMatchTypeOf<NavbarOptions>()
  expectTypeOf(navbarOptions5).toMatchTypeOf<NavbarOptions>()
  // @ts-expect-error: navbar can only support 3 level nesting
  assertType<NavbarOptions>(navbarOptions6)
})
