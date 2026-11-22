import markdownIt from 'markdown-it'
import postcss from 'postcss'
import type { AcceptedPlugin } from 'postcss'
import { describe, expect, it } from 'vitest'
import type { App, BundlerOptions, PluginObject } from 'vuepress/core'
import type { Markdown } from 'vuepress/markdown'

import { markdownRawPlugin } from '../../src/node/markdownRawPlugin.js'
import type { MarkdownRawPluginOptions } from '../../src/node/options.js'

interface PostcssPluginLike {
  postcssPlugin?: string
}

interface ViteBundlerOptionsLike {
  viteOptions?: {
    css?: {
      postcss?: {
        plugins?: PostcssPluginLike[]
      }
    }
  }
}

interface ChainHook {
  chainWebpack?: (config: unknown, isServer: boolean, isBuild: boolean) => void
  chainRspack?: (config: unknown, isServer: boolean, isBuild: boolean) => void
}

const createApp = (bundlerName: string): App =>
  ({ options: { bundler: { name: bundlerName } } }) as unknown as App

const applyPlugin = async (
  options: MarkdownRawPluginOptions,
  bundlerName: string,
  bundlerOptions: BundlerOptions,
): Promise<void> => {
  const plugin = markdownRawPlugin(options) as PluginObject

  await plugin.extendsBundlerOptions?.(bundlerOptions, createApp(bundlerName))
}

const createMarkdown = (
  options: MarkdownRawPluginOptions,
  bundlerName: string,
): Markdown => {
  const plugin = markdownRawPlugin(options) as PluginObject
  const md: Markdown = markdownIt()

  void plugin.extendsMarkdown?.(md, createApp(bundlerName))

  return md
}

const createChainConfig = (
  postcssOptions: unknown,
): { config: unknown; calls: Record<string, unknown>[] } => {
  const calls: Record<string, unknown>[] = []

  const use = {
    get: (key: 'options'): Record<string, unknown> | undefined =>
      key === 'options' ? { postcssOptions } : undefined,
    options: (value: Record<string, unknown>): void => {
      calls.push(value)
    },
  }

  const rule = {
    uses: {
      has: (name: string): boolean => name === 'postcss-loader',
      get: (name: string): typeof use | undefined =>
        name === 'postcss-loader' ? use : undefined,
    },
  }

  return {
    config: {
      module: {
        rules: {
          get: (name: string): typeof rule | undefined =>
            name === 'css' ? rule : undefined,
        },
      },
    },
    calls,
  }
}

const getPostcssPlugins = (
  calls: Record<string, unknown>[],
  index = 0,
): (PostcssPluginLike | string)[] => {
  const call = calls[index] ?? {}

  return (
    call.postcssOptions as {
      plugins: (PostcssPluginLike | string)[]
    }
  ).plugins
}

describe(markdownRawPlugin, () => {
  it('should register the raw container', () => {
    const md = createMarkdown({}, '@vuepress/bundler-vite')

    expect(md.render('::: raw\nhello\n:::\n')).toContain('class="vp-raw"')
  })

  it('should inject the PostCSS plugin into Vite', async () => {
    const bundlerOptions: BundlerOptions & ViteBundlerOptionsLike = {}

    await applyPlugin(
      { isolateStyles: true },
      '@vuepress/bundler-vite',
      bundlerOptions,
    )

    expect(
      bundlerOptions.viteOptions?.css?.postcss?.plugins?.map(
        (plugin) => plugin.postcssPlugin,
      ),
    ).toContain('postcss-isolate-styles')
  })

  it('should inject the PostCSS plugin into webpack', async () => {
    const bundlerOptions: BundlerOptions & ChainHook = {}

    await applyPlugin(
      { isolateStyles: true },
      '@vuepress/bundler-webpack',
      bundlerOptions,
    )

    const { config, calls } = createChainConfig({ plugins: ['autoprefixer'] })

    bundlerOptions.chainWebpack?.(config, false, false)

    expect(calls).toHaveLength(1)

    const plugins = getPostcssPlugins(calls)

    expect(plugins).toHaveLength(2)
    expect(plugins[0]).toBe('autoprefixer')
    expect(plugins[1]).toMatchObject({
      postcssPlugin: 'postcss-isolate-styles',
    })
  })

  it('should inject the PostCSS plugin into rspack', async () => {
    const bundlerOptions: BundlerOptions & ChainHook = {}

    await applyPlugin(
      { isolateStyles: true },
      '@vuepress/bundler-rspack',
      bundlerOptions,
    )

    const { config, calls } = createChainConfig({ plugins: [] })

    bundlerOptions.chainRspack?.(config, false, false)

    const plugins = getPostcssPlugins(calls)

    expect(plugins).toHaveLength(1)
    expect(plugins[0]).toMatchObject({
      postcssPlugin: 'postcss-isolate-styles',
    })
  })

  it('should support the function form of postcssOptions', async () => {
    const bundlerOptions: BundlerOptions & ChainHook = {}

    await applyPlugin(
      { isolateStyles: true },
      '@vuepress/bundler-webpack',
      bundlerOptions,
    )

    const { config, calls } = createChainConfig(
      (): { plugins: (PostcssPluginLike | string)[] } => ({
        plugins: ['autoprefixer'],
      }),
    )

    bundlerOptions.chainWebpack?.(config, false, false)

    const postcssOptions = calls[0]?.postcssOptions as (context: unknown) => {
      plugins: (PostcssPluginLike | string)[]
    }
    const { plugins } = postcssOptions({})

    expect(plugins).toHaveLength(2)
    expect(plugins[1]).toMatchObject({
      postcssPlugin: 'postcss-isolate-styles',
    })
  })

  it('should not inject anything by default', async () => {
    const bundlerOptions: BundlerOptions & ViteBundlerOptionsLike & ChainHook =
      {}

    await applyPlugin({}, '@vuepress/bundler-vite', bundlerOptions)
    await applyPlugin({}, '@vuepress/bundler-webpack', bundlerOptions)

    expect(bundlerOptions.viteOptions).toBeUndefined()
    expect(bundlerOptions.chainWebpack).toBeUndefined()
  })

  it('should propagate the isolation options to the injected plugin', async () => {
    const bundlerOptions: BundlerOptions & ChainHook = {}

    await applyPlugin(
      { isolateStyles: { includeFiles: [/custom\.css/u] } },
      '@vuepress/bundler-webpack',
      bundlerOptions,
    )

    const { config, calls } = createChainConfig({ plugins: [] })

    bundlerOptions.chainWebpack?.(config, false, false)

    const plugins = getPostcssPlugins(calls) as unknown as AcceptedPlugin[]

    expect(plugins[0]).toMatchObject({
      postcssPlugin: 'postcss-isolate-styles',
    })

    const isolated = await postcss(plugins).process('h1 { color: red; }', {
      from: 'custom.css',
    })
    expect(isolated.css).toContain(':not(:where(.vp-raw, .vp-raw *))')

    const untouched = await postcss(plugins).process('h1 { color: red; }', {
      from: 'other.css',
    })
    expect(untouched.css).toBe('h1 { color: red; }')
  })

  it('should ignore style rules without postcss-loader', async () => {
    const bundlerOptions: BundlerOptions & ChainHook = {}

    await applyPlugin(
      { isolateStyles: true },
      '@vuepress/bundler-webpack',
      bundlerOptions,
    )

    const calls: Record<string, unknown>[] = []
    const config = {
      module: {
        rules: {
          get: (): { uses: { has: () => boolean } } => ({
            uses: { has: () => false },
          }),
        },
      },
    }

    expect(() =>
      bundlerOptions.chainWebpack?.(config, false, false),
    ).not.toThrow()
    expect(calls).toHaveLength(0)
  })

  it('should not inject anything for an unknown bundler', async () => {
    const bundlerOptions: BundlerOptions & ChainHook = {}

    await applyPlugin(
      { isolateStyles: true },
      '@vuepress/bundler-unknown',
      bundlerOptions,
    )

    expect(bundlerOptions.chainWebpack).toBeUndefined()
  })
})
