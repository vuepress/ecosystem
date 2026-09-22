import { describe, expect, it, vi } from 'vitest'

import { resolveOffline } from '../src/node/offline.js'
import { logger } from '../src/node/utils.js'

describe(resolveOffline, () => {
  it('should resolve the offline mode of the icon type', () => {
    expect(resolveOffline('fontawesome', true)).toStrictEqual({
      type: 'fontawesome',
      all: false,
    })
    expect(resolveOffline('iconify', true)).toStrictEqual({
      type: 'iconify',
      all: false,
    })
  })

  it('should support bundling every icon for FontAwesome', () => {
    expect(resolveOffline('fontawesome', 'all')).toStrictEqual({
      type: 'fontawesome',
      all: true,
    })
  })

  it('should fall back to the icons in use for Iconify', () => {
    const errorSpy = vi.spyOn(logger, 'error').mockImplementation(() => {})

    expect(resolveOffline('iconify', 'all')).toStrictEqual({
      type: 'iconify',
      all: false,
    })
    expect(errorSpy).toHaveBeenCalledWith(
      expect.stringContaining('only supported by the FontAwesome'),
    )

    errorSpy.mockRestore()
  })

  it('should reject the icon types that cannot be bundled', () => {
    expect(() => resolveOffline('iconfont', true)).toThrow(
      'only bundles the FontAwesome and the Iconify icons',
    )
    expect(() => resolveOffline('unknown', true)).toThrow(
      'icon type is "unknown"',
    )
  })
})
