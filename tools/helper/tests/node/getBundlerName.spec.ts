import { describe, expect, it } from 'vitest'
import type { App } from 'vuepress/core'

import { getBundlerName } from '../../src/node/bundler/getBundlerName.js'

describe('should get bundler name', () => {
  it('official bundler', () => {
    const app1 = {
      options: {
        bundler: {
          name: '@vuepress/bundler-webpack',
        },
      },
    }
    const app2 = {
      options: {
        bundler: {
          name: '@vuepress/bundler-vite',
        },
      },
    }

    const ans1 = getBundlerName(app1 as App)
    const ans2 = getBundlerName(app2 as App)

    expect(ans1).toBe('webpack')
    expect(ans2).toBe('vite')
  })

  it('3rd party bundler', () => {
    const app1 = {
      options: {
        bundler: {
          name: 'vuepress-bundler-snowpack',
        },
      },
    }
    const app2 = {
      options: {
        bundler: {
          name: 'vuepress-bundler-turbopack',
        },
      },
    }

    const ans1 = getBundlerName(app1 as App)
    const ans2 = getBundlerName(app2 as App)

    expect(ans1).toBe('vuepress-bundler-snowpack')
    expect(ans2).toBe('vuepress-bundler-turbopack')
  })
})
