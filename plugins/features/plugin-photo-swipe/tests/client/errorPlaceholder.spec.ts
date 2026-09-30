import { describe, expect, it } from 'vitest'

import { createErrorPlaceholder } from '../../src/client/utils/errorPlaceholder.js'

describe('error placeholder', () => {
  it('should render the message with the PhotoSwipe error markup', () => {
    expect(createErrorPlaceholder('The image cannot be loaded')).toStrictEqual({
      type: 'html',
      html: '<div class="photo-swipe-error"><div class="pswp__error-msg">The image cannot be loaded</div></div>',
    })
  })

  it('should not treat the message as markup', () => {
    expect(createErrorPlaceholder('<b>&</b>')).toMatchObject({
      html: '<div class="photo-swipe-error"><div class="pswp__error-msg">&lt;b&gt;&amp;&lt;/b&gt;</div></div>',
    })
  })
})
