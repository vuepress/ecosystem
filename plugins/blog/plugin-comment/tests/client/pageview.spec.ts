import { describe, expect, it } from 'vitest'

import { isSupported, usePageview } from '../../src/client/pageview/noop.js'
import type { PageviewOptions } from '../../src/client/pageview/typings.js'

describe('noop pageview', () => {
  it('should be reported as unsupported', () => {
    expect(isSupported).toBe(false)
  })

  it('should return an update function that does nothing', () => {
    const updatePageview = usePageview()

    expect(updatePageview).toBeTypeOf('function')
    expect(() =>
      updatePageview({ selector: '.vp-pageview' } satisfies PageviewOptions),
    ).not.toThrow()
    expect(updatePageview({})).toBeUndefined()
  })
})
