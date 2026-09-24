import { describe, expect, it } from 'vitest'

import { getEnabledComponents } from '../../src/node/utils.js'

describe(getEnabledComponents, () => {
  it('should enable no component by default', () => {
    expect(getEnabledComponents({})).toStrictEqual([])
  })

  it('should enable the components of the embed players', () => {
    expect(
      getEnabledComponents({ embeds: ['bilibili', 'youtube'] }),
    ).toStrictEqual(['BiliBiliEmbed', 'YouTubeEmbed'])
  })
})
