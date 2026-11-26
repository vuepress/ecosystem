import { describe, expect, it } from 'vitest'

import { isLinkActive } from '../../src/client/theme-default/shared.js'

describe(isLinkActive, () => {
  it('should match the page of the link', () => {
    expect(isLinkActive('guide/install.html', '', '/guide/install.html')).toBe(
      true,
    )
    expect(isLinkActive('config/index.html', '', '/guide/install.html')).toBe(
      false,
    )
  })

  it('should be active on the pages under the link by default', () => {
    expect(isLinkActive('guide/install.html', '', '/guide/')).toBe(true)
  })

  it('should be active on the exact page of the link with `exact`', () => {
    expect(
      isLinkActive('guide/install.html', '', '/guide/install.html', {
        exact: true,
      }),
    ).toBe(true)
    expect(
      isLinkActive('guide/install.html', '', '/guide/', { exact: true }),
    ).toBe(false)
  })

  it('should test the path with `activeMatch`', () => {
    expect(
      isLinkActive('guide/install.html', '', '/guide/', {
        activeMatch: '^/guide/',
      }),
    ).toBe(true)
    expect(
      isLinkActive('config/index.html', '', '/guide/', {
        activeMatch: '^/guide/',
      }),
    ).toBe(false)
  })

  it('should prefer `activeMatch` over `exact`', () => {
    expect(
      isLinkActive('guide/install.html', '', '/guide/install.html', {
        activeMatch: '^/guide/',
        exact: true,
      }),
    ).toBe(true)
  })

  it('should not match the root link by prefix', () => {
    expect(isLinkActive('guide/install.html', '', '/')).toBe(false)
  })

  it('should never match an empty link', () => {
    expect(isLinkActive('guide/install.html', '', '')).toBe(false)
  })

  it('should compare the hash for a hash link', () => {
    expect(isLinkActive('guide/install.html', '#api', '#api')).toBe(true)
    expect(isLinkActive('guide/install.html', '#other', '#api')).toBe(false)
  })
})
