import { describe, expect, it } from 'vitest'
import type { App } from 'vuepress/core'

import {
  addViteConfig,
  addViteOptimizeDepsExclude,
  addViteOptimizeDepsInclude,
  addViteOptimizeDepsNeedsInterop,
  addViteSsrExternal,
  addViteSsrNoExternal,
} from '../../src/node/bundler/vite/index.js'

const appMock = {
  options: {
    bundler: { name: '@vuepress/bundler-vite' },
  },
} as unknown as App

process.env.FORCE_OPTIMIZE_DEPS = 'true'

describe(addViteConfig, () => {
  it('should add vite config', () => {
    const config = {}

    addViteConfig(config, appMock, {})

    expect(config).toEqual({
      viteOptions: {},
    })

    addViteConfig(config, appMock, {
      optimizeDeps: {
        include: ['vue'],
      },
    })

    expect(config).toEqual({
      viteOptions: {
        optimizeDeps: {
          include: ['vue'],
        },
      },
    })
  })

  it('should merge array config', () => {
    const config = {}

    addViteConfig(config, appMock, {
      optimizeDeps: {
        include: ['vue'],
      },
    })

    addViteConfig(config, appMock, {
      optimizeDeps: {
        include: ['vue-router'],
      },
    })

    expect(config).toEqual({
      viteOptions: {
        optimizeDeps: {
          include: ['vue', 'vue-router'],
        },
      },
    })
  })
})

describe(addViteOptimizeDepsInclude, () => {
  it('should add optimizeDeps.include config', () => {
    const config = {}

    addViteOptimizeDepsInclude(config, appMock, 'vue')

    expect(config).toEqual({
      viteOptions: {
        optimizeDeps: {
          include: ['vue'],
        },
      },
    })

    addViteOptimizeDepsInclude(config, appMock, ['vue-router'])

    expect(config).toEqual({
      viteOptions: {
        optimizeDeps: {
          include: ['vue', 'vue-router'],
        },
      },
    })
  })
})

describe(addViteOptimizeDepsExclude, () => {
  it('should add optimizeDeps.exclude config', () => {
    const config = {}

    addViteOptimizeDepsExclude(config, appMock, 'vue')

    expect(config).toEqual({
      viteOptions: {
        optimizeDeps: {
          exclude: ['vue'],
        },
      },
    })

    addViteOptimizeDepsExclude(config, appMock, ['vue-router'])

    expect(config).toEqual({
      viteOptions: {
        optimizeDeps: {
          exclude: ['vue', 'vue-router'],
        },
      },
    })
  })
})

describe(addViteOptimizeDepsNeedsInterop, () => {
  it('should add optimizeDeps.needsInterop config', () => {
    const config = {}

    addViteOptimizeDepsNeedsInterop(config, appMock, 'vue')

    expect(config).toEqual({
      viteOptions: {
        optimizeDeps: {
          needsInterop: ['vue'],
        },
      },
    })

    addViteOptimizeDepsNeedsInterop(config, appMock, ['vue-router'])

    expect(config).toEqual({
      viteOptions: {
        optimizeDeps: {
          needsInterop: ['vue', 'vue-router'],
        },
      },
    })
  })
})

describe(addViteSsrExternal, () => {
  it('should add ssr.external config', () => {
    const config = {}

    addViteSsrExternal(config, appMock, 'vue')

    expect(config).toEqual({
      viteOptions: {
        ssr: {
          external: ['vue'],
        },
      },
    })

    addViteSsrExternal(config, appMock, ['vue-router'])

    expect(config).toEqual({
      viteOptions: {
        ssr: {
          external: ['vue', 'vue-router'],
        },
      },
    })
  })
})

describe(addViteSsrNoExternal, () => {
  it('should add ssr.noExternal config', () => {
    const config = {}

    addViteSsrNoExternal(config, appMock, 'vue')

    expect(config).toEqual({
      viteOptions: {
        ssr: {
          noExternal: ['vue'],
        },
      },
    })

    addViteSsrNoExternal(config, appMock, ['vue-router'])

    expect(config).toEqual({
      viteOptions: {
        ssr: {
          noExternal: ['vue', 'vue-router'],
        },
      },
    })
  })
})
