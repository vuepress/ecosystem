import { describe, expect, it } from 'vitest'
import { computed, nextTick, ref } from 'vue'

import {
  defineCopyCodeConfig,
  useCopyCodeOptions,
} from '../../src/client/helpers/copyCode.js'

describe('resolve copy code options', () => {
  it('should use default options', () => {
    defineCopyCodeConfig({})

    expect(useCopyCodeOptions({}).value).toStrictEqual({
      selector: '[vp-content] div[class*="language-"] pre',
      ignoreSelector: '',
      inlineSelector: '',
      duration: 2000,
      showInMobile: false,
      transform: undefined,
    })
  })

  it('should resolve options defined in Node', () => {
    defineCopyCodeConfig({})

    expect(
      useCopyCodeOptions({
        selector: ['div.language-ts', 'div.language-js'],
        ignoreSelector: '.token.comment',
        inline: true,
        duration: 3000,
        showInMobile: true,
      }).value,
    ).toStrictEqual({
      selector: 'div.language-ts,div.language-js',
      ignoreSelector: '.token.comment',
      inlineSelector: '[vp-content] :not(pre) > code',
      duration: 3000,
      showInMobile: true,
      transform: undefined,
    })
  })

  it('should resolve inline code selector', () => {
    defineCopyCodeConfig({})

    expect(
      useCopyCodeOptions({ inline: 'code.custom' }).value.inlineSelector,
    ).toBe('code.custom')
    expect(
      useCopyCodeOptions({ inline: ['code.custom', 'code.extra'] }).value
        .inlineSelector,
    ).toBe('code.custom,code.extra')
    expect(useCopyCodeOptions({ inline: false }).value.inlineSelector).toBe('')
  })

  it('should let client config override options defined in Node', () => {
    defineCopyCodeConfig({
      selector: '.custom-code',
      ignoreSelector: '',
      inline: false,
      duration: 0,
      showInMobile: false,
    })

    expect(
      useCopyCodeOptions({
        selector: 'div.language-ts',
        ignoreSelector: '.token.comment',
        inline: true,
        duration: 3000,
        showInMobile: true,
      }).value,
    ).toStrictEqual({
      selector: '.custom-code',
      ignoreSelector: '',
      inlineSelector: '',
      duration: 0,
      showInMobile: false,
      transform: undefined,
    })
  })

  it('should resolve transform defined in client config', () => {
    const transform = (preElement: HTMLPreElement): void => {
      preElement.querySelectorAll('.ignore').forEach((el) => el.remove())
    }

    defineCopyCodeConfig({ transform })

    expect(useCopyCodeOptions({}).value.transform).toBe(transform)
  })

  it('should update resolved options when client config changes', async () => {
    const selector = ref('.custom-code')

    defineCopyCodeConfig(computed(() => ({ selector: selector.value })))
    await nextTick()

    expect(useCopyCodeOptions({}).value.selector).toBe('.custom-code')

    selector.value = '.another-code'
    await nextTick()

    expect(useCopyCodeOptions({}).value.selector).toBe('.another-code')
  })

  it('should support getter as client config', async () => {
    const duration = ref(1000)

    defineCopyCodeConfig(() => ({ duration: duration.value }))
    await nextTick()

    expect(useCopyCodeOptions({}).value.duration).toBe(1000)

    duration.value = 500
    await nextTick()

    expect(useCopyCodeOptions({}).value.duration).toBe(500)
  })
})
