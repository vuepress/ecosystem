---
icon: flask
---

# test-utils

<NpmBadge package="@vuepress/test-utils" />

Unit testing utilities for VuePress.

`vuepress/client` imports generated modules (`@internal/*`) and compile-time defines (`__VUEPRESS_DEV__`, ...) at module scope, so it cannot be imported in a unit test. This package replaces them, so that the client code of a plugin or a theme can be rendered and interacted with in a unit test, instead of running the heavy e2e tests.

## Usage

```bash
npm i -D @vuepress/test-utils@next @vue/test-utils happy-dom
```

```ts title="vitest.config.ts"
import { defineConfig } from 'vitest/config'
import { vuepressTestPlugin } from '@vuepress/test-utils'

export default defineConfig({
  plugins: [vuepressTestPlugin()],
})
```

To test `.vue` single file components, add a Vue plugin (e.g. `@vitejs/plugin-vue`) to `plugins` as usual.

If your packages use a module alias that cannot be expressed by `resolve.alias` (e.g. the `@theme/*` alias of `@vuepress/theme-default`, which may resolve to different directories), pass a `resolve` function to the plugin.

```ts title="vitest.config.ts"
export default defineConfig({
  plugins: [
    vue(),
    vuepressTestPlugin({
      resolve: (id) =>
        id.startsWith('@theme/') ? resolveThemeFile(id) : undefined,
    }),
  ],
})
```

## Guide

### Rendering client code

`renderVuePress()` renders the client app to a string, and works in the `node` environment. It is the cheapest way to assert the markup of every option combination.

```ts
import { renderVuePress } from '@vuepress/test-utils/client'

const html = await renderVuePress({
  content: MyComponent,
  page: { path: '/', title: 'Home' },
  site: { title: 'My Site' },
})
```

`mountVuePress()` mounts the client app with `@vue/test-utils`, which requires a DOM environment:

```ts
// @vitest-environment happy-dom
import { mountVuePress } from '@vuepress/test-utils/client'

const wrapper = await mountVuePress({
  content: MyComponent,
  page: { path: '/', title: 'Home' },
})

await wrapper.find('.my-button').trigger('click')
```

::: tip

Put `// @vitest-environment happy-dom` at the top of the file, before every import, otherwise Vitest does not read it. `renderVuePress()` does not need it, so prefer it for the tests that do not interact with the DOM.

:::

Both accept the same options as `createTestClient()`, which returns a client that can render and mount multiple times, and exposes the client data and the router:

```ts
const client = await createTestClient({ page: { path: '/', title: 'Home' } })

expect(await client.renderToString()).toContain('Home')

await client.router.push('/other/')
```

The `content` option is the content of the current page (the page chunk), and the layout renders it. `vuepress/client`'s `Content` component is the default layout, so the content is rendered directly when no layout is given. To render a single component without the layout and the root components of the client configs, use the `rootComponent` option instead.

`clientConfigs` accepts the client configs of the plugins and the theme, and applies their `setup`, `enhance`, `layouts` and `rootComponents`, which is required when a composable relies on a provider of a client config. For example, the theme data of `@vuepress/theme-default` is read through `useThemeData()`, which is provided by the theme data plugin, so its client config must be passed to `clientConfigs`.

### Testing option combinations

Plugin options are passed to the client through `define` globals rather than through props. `collectClientDefines()` reads them from a real plugin, and `stubClientDefines()` applies them to `globalThis`, exactly like the bundler does.

```ts
import {
  collectClientDefines,
  createTestApp,
  stubClientDefines,
} from '@vuepress/test-utils'
import { mountVuePress } from '@vuepress/test-utils/client'

import myClientConfig from '../src/client/config.js'
import { myPlugin } from '../src/node/index.js'

const app = await createTestApp({ plugins: [myPlugin({ duration: 3000 })] })

const restore = stubClientDefines(await collectClientDefines(app))

const wrapper = await mountVuePress({
  clientConfigs: [myClientConfig],
  content: '...',
})

restore()
```

::: tip

A module that reads a define at module scope must be imported after `stubClientDefines()`. Use `vi.resetModules()` with a dynamic import in that case.

:::

### Stubbing generated modules

VuePress generates the client modules that a plugin imports at build time: the `@internal/*` modules, and the `@temp/*` modules created by a generated client config (e.g. `@temp/revealjs/index.js` of `@vuepress/plugin-revealjs`). They do not exist in a unit test, so a module that imports them cannot be imported at all. `stubModule()` registers the exports of such a module and makes it resolvable, in both the `node` and the `happy-dom` environment.

```ts
import { stubModule, stubTempModule } from '@vuepress/test-utils'

const restoreNotice = stubModule('@internal/noticeOptions', {
  NOTICE_OPTIONS: [{ path: '/', title: 'Notice' }],
})
const restoreReveal = stubTempModule('revealjs', {
  useRevealJs: () => Promise.resolve([Reveal]),
})

vi.resetModules()
const { useNoticeOptions } =
  await import('../src/client/composables/useNoticeOptions.js')

restoreNotice()
restoreReveal()
```

`stubTempModule(name, ...)` is a shortcut for `stubModule('@temp/<name>/index.js', ...)`. Any module id can be stubbed, including a sub-path alias that only exists at build time, such as `@vuepress/plugin-comment/service` of `@vuepress/plugin-comment`.

The module id is mapped to a generated file in a temporary directory: the id is appended to that directory, and a `.js` extension is added when the id does not end with `.js`. The id, the export names and the module that imports them must match the real generated module. Only identifiers and `default` are supported as export names, because the generated module re-exports them.

::: warning

Vite resolves imports when a module is transformed, which happens before the test runs. The module that imports the stubbed module must therefore be imported dynamically after `stubModule()`, with `vi.resetModules()` when it may already be cached. A statically imported module cannot be stubbed.

:::

For a module that must be imported statically, register the alias in the repo config with the `resolve` option of `vuepressTestPlugin()`:

```ts title="vitest.config.ts"
const CLIENT_ALIASES: Record<string, string> = {
  // A sub-path alias created by a plugin at build time
  '@vuepress/plugin-comment/service':
    './plugins/blog/plugin-comment/src/client/components/WalineComment.js',
}

export default defineConfig({
  plugins: [vuepressTestPlugin({ resolve: (id) => CLIENT_ALIASES[id] })],
})
```

### Testing the color mode

`setColorMode()` stubs the two things that `@vuepress/theme-default` reads to resolve the dark mode: the `(prefers-color-scheme: dark)` media query and the `vuepress-color-scheme` local storage key. It also sets `data-theme` on `<html>`. All other media queries are forwarded to the real `window.matchMedia()`.

```ts
// @vitest-environment happy-dom
import { setColorMode } from '@vuepress/test-utils/client'

const restore = setColorMode('dark')

const wrapper = await mountVuePress({ rootComponent: MyComponent })

expect(wrapper.find('.my-button').classes()).toContain('dark')

restore()
```

Pass `{ storage: 'auto' }` to keep the stored value at `auto` while the media query still reports dark, which exercises the `prefers-color-scheme` branch of `useDarkMode()`.

### Testing Node side code

`createTestApp()` builds a VuePress app with a temporary source directory, an empty theme and an empty bundler, so that the plugin hooks, the page resolution and the markdown extensions can be tested without a real site.

```ts
import {
  createTestApp,
  createTestMarkdown,
  mockLogger,
} from '@vuepress/test-utils'

const app = await createTestApp({
  plugins: [myPlugin()],
  files: { 'README.md': '# Home' },
})

expect(app.pages.map(({ path }) => path)).toContain('/')

app.cleanup()
```

`createTestMarkdown()` creates a markdown-it instance with the VuePress defaults, `createTestPage()` creates a page without a source file, and `mockLogger()` silences the VuePress logs and returns the spies for assertions.

## Options

### vuepressTestPlugin

:::: fields
@`base` type=string default=`'/'`

The value of `__VUEPRESS_BASE__`.

@`dev` type=boolean

The value of `__VUEPRESS_DEV__`. The development mode enables HMR branches, which access `__VUE_HMR_RUNTIME__` that does not exist in unit tests.

@`version` type=string

The value of `__VUEPRESS_VERSION__`. It is read from the installed `vuepress` package by default.

@`resolve` type=`(id: string) => string | undefined`

Resolve the module ids that `resolve.alias` cannot express, e.g. `@theme/*` of `@vuepress/theme-default`, or a sub-path alias that only exists at build time such as `@vuepress/plugin-comment/service`. It is called for every import, and should return the file path or `undefined`. A module registered with `stubModule()` is resolved before it is called.

::::

### setColorMode options

Used by `setColorMode()`.

:::: fields
@`storageKey` type=string default=`'vuepress-color-scheme'`

The local storage key that holds the color mode.

@`storage` type=`'auto' | 'light' | 'dark'`

The value to store under `storageKey`. It defaults to the `colorMode` argument.

::::

### Test client options

Shared by `createTestClient()`, `renderVuePress()` and `mountVuePress()`.

:::: fields
@`content` type=`Component | string`

The content of the current page, i.e. the page chunk. A string is rendered as raw HTML.

@`rootComponent` type=Component

The root component. When it is given, the layout and the root components of the client configs are skipped.

@`page` type=TestPageOptions

The current page.

@@`page.path` type=string default=`'/'`

The route path of the page.

@@`page.title` type=string default=`''`

The title of the page.

@@`page.lang` type=string default=`''`

The language of the page. It falls back to the language of the site locale.

@@`page.frontmatter` type=PageFrontmatter

The frontmatter of the page.

@@`page.data` type=`Record<string, unknown>`

Extra page data, e.g. `filePathRelative`.

@`route` type=string

The route path of the current page. It defaults to `page.path`.

@`site` type=`Partial<SiteData>`

The site data. For example, its `locales` field switches the site locale data according to the route path.

@`layouts` type=`Record<string, Component>`

The layout components. Its defaults are `Content` for `Layout` and `NotFound`.

@`routes` type=`Record<string, TestRouteOptions>`

Extra routes. Each route accepts `component` and `pageData`.

@`redirects` type=`Record<string, string>`

The redirects.

@`themeData` type=`Record<string, unknown>`

The theme data, read by `useThemeData()` of `@vuepress/plugin-theme-data/client`.

@`clientConfigs` type=`ClientConfig[]`

The client configs to apply. Their `setup`, `enhance`, `layouts` and `rootComponents` all take effect.

@`ssr` type=boolean

Whether to simulate the SSR mode. It defaults to `true` for `renderToString()` and `false` for `mount()`.

::::

### Test app options

Used by `createTestApp()`. It also accepts the other fields of the VuePress app config.

:::: fields
@`files` type=`Record<string, string>`

The markdown files to generate in the source directory. The key is the relative path.

@`source` type=string

The source directory. It defaults to a temporary directory, which is removed by `app.cleanup()`.

@`theme` type=Theme default=`emptyTheme`

The theme of the app.

@`init` type=boolean

Whether to initialize the app.

@`prepare` type=boolean

Whether to prepare the app after the initialization.

::::
