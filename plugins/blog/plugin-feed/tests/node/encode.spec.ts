import { describe, expect, it } from 'vitest'

import {
  encodeCDATA,
  encodeXMLContent,
} from '../../src/node/utils/encodeXML.js'

describe(encodeCDATA, () => {
  it('Should encode CDATA', () => {
    expect(encodeCDATA('Certain tokens like ]]> can be difficult')).toBe(
      'Certain tokens like ]]]]><![CDATA[> can be difficult',
    )
  })
})

describe(encodeXMLContent, () => {
  it('Should encode XMLContent', () => {
    const content = '"1 > 2"'

    expect(encodeXMLContent(content)).toBe('&quot;1 &gt; 2&quot;')
  })
})
