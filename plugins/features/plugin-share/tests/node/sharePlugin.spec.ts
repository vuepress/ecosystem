import { collectClientDefines, createTestApp } from '@vuepress/test-utils'
import { describe, expect, it } from 'vitest'

import { sharePlugin } from '../../src/node/index.js'
import { getShareServices } from '../../src/node/services/index.js'
import type { ShareServiceOptions } from '../../src/shared/index.js'

describe('share services', () => {
  it('should use the default services', () => {
    expect(getShareServices().map(({ name }) => name)).toStrictEqual([
      'x',
      'facebook',
      'reddit',
      'telegram',
      'whatsapp',
      'email',
    ])
  })

  it('should resolve built-in services and ignore unknown names', () => {
    const services = getShareServices({
      services: ['qq', 'unknown' as never, 'weibo'],
    })

    expect(services.map(({ name }) => name)).toStrictEqual(['qq', 'weibo'])
    expect(services[0].shape).toContain('<svg')
  })

  it('should add the X user name as the via parameter', () => {
    const [service] = getShareServices({
      services: ['x'],
      xUserName: 'vuepress',
    })

    expect(service.label).toBe('X')
    expect(service.link).toContain('https://x.com/intent/tweet')
    expect(service.link).toContain('via=vuepress')
    expect(service.link).not.toContain('[x-user]')
  })

  it('should keep a valid custom service and ignore an invalid one', () => {
    const custom: ShareServiceOptions = {
      name: 'custom',
      link: 'https://example.com/share?url=[url]&title=[title]',
      shape: '<svg></svg>',
    }

    expect(
      getShareServices({
        services: [custom, { name: 'invalid' } as never],
      }),
    ).toStrictEqual([custom])
  })
})

describe('share plugin', () => {
  it('should provide the configured defaults and every built-in service', async () => {
    const app = await createTestApp({
      plugins: [sharePlugin({ services: ['qq'] })],
    })

    try {
      const defines = await collectClientDefines(app)
      const services = defines.__SHARE_SERVICES__ as ShareServiceOptions[]

      expect(defines.__SHARE_DEFAULT_SERVICES__).toStrictEqual(['qq'])
      expect(services).toHaveLength(24)
      expect(services.map(({ name }) => name)).toContain('x')
      expect(services.every(({ name }) => typeof name === 'string')).toBe(true)
    } finally {
      app.cleanup()
    }
  })

  it('should include a custom service in the client defines', async () => {
    const custom: ShareServiceOptions = {
      name: 'custom',
      link: 'https://example.com/share?url=[url]',
      shape: '<svg></svg>',
    }
    const app = await createTestApp({
      plugins: [sharePlugin({ services: [custom] })],
    })

    try {
      const defines = await collectClientDefines(app)

      expect(defines.__SHARE_DEFAULT_SERVICES__).toStrictEqual(['custom'])
      expect(defines.__SHARE_SERVICES__).toContainEqual(custom)
    } finally {
      app.cleanup()
    }
  })
})
