---
icon: flask
---

# test-utils

<NpmBadge package="@vuepress/test-utils" />

VuePress 的单元测试工具。

`vuepress/client` 会在模块作用域引用生成模块（`@internal/*`）与编译期 define（`__VUEPRESS_DEV__` 等），因此无法在单元测试中直接导入。该包会替换它们，使插件或主题的客户端代码可以在单元测试中被渲染与交互，而无需运行沉重的 e2e 测试。

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

若要测试 `.vue` 单文件组件，按常规在 `plugins` 中加入 Vue 插件（如 `@vitejs/plugin-vue`）即可。

若你的包使用了 `resolve.alias` 无法表达的模块别名（如 `@vuepress/theme-default` 的 `@theme/*`，它可能落到不同目录），请给插件传入 `resolve` 函数。

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

### 渲染客户端代码

`renderVuePress()` 将客户端 app 渲染为字符串，可在 `node` 环境下使用，是断言各种选项组合的渲染结果最轻量的方式。

```ts
import { renderVuePress } from '@vuepress/test-utils/client'

const html = await renderVuePress({
  content: MyComponent,
  page: { path: '/', title: 'Home' },
  site: { title: 'My Site' },
})
```

`mountVuePress()` 通过 `@vue/test-utils` 挂载客户端 app，需要 DOM 环境：

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

请把 `// @vitest-environment happy-dom` 放在文件最顶部、所有 import 之前，否则 Vitest 不会读取它。`renderVuePress()` 不需要它，因此不需要与 DOM 交互的测试请优先使用它。

:::

两者的选项与 `createTestClient()` 相同。`createTestClient()` 返回的客户端可以多次渲染与挂载，并暴露客户端数据与路由：

```ts
const client = await createTestClient({ page: { path: '/', title: 'Home' } })

expect(await client.renderToString()).toContain('Home')

await client.router.push('/other/')
```

`content` 选项是当前页面的内容（即 page chunk），由布局渲染它。`vuepress/client` 的 `Content` 组件就是默认布局，因此未指定布局时内容会被直接渲染。若想不经过布局与客户端配置的根组件、直接渲染单个组件，请改用 `rootComponent` 选项。

`clientConfigs` 接受插件与主题的客户端配置，并应用它们的 `setup`、`enhance`、`layouts` 与 `rootComponents`。当某个组合式 API 依赖客户端配置提供的 provider 时，这是必须的。例如 `@vuepress/theme-default` 的主题数据由 `useThemeData()` 读取，而它由主题数据插件提供，因此必须把该插件的客户端配置传给 `clientConfigs`。

### 测试选项组合

插件选项是通过 `define` 全局变量而非 props 传给客户端的。`collectClientDefines()` 从真实插件中读取它们，`stubClientDefines()` 把它们应用到 `globalThis`，与 bundler 的行为完全一致。

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

在模块作用域读取 define 的模块，必须在 `stubClientDefines()` 之后导入。此时请使用 `vi.resetModules()` 配合动态 import。

:::

### 测试 Node 侧代码

`createTestApp()` 使用临时 source 目录、空主题与空 bundler 构建 VuePress app，因此无需真实站点即可测试插件钩子、页面解析与 markdown 扩展。

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

`createTestMarkdown()` 使用 VuePress 默认选项创建 markdown-it 实例，`createTestPage()` 创建无需源文件的页面，`mockLogger()` 静默 VuePress 日志并返回间谍函数以便断言。

## Options

### vuepressTestPlugin

:::: fields
@`base` type=string default=`'/'`

`__VUEPRESS_BASE__` 的值。

@`dev` type=boolean

`__VUEPRESS_DEV__` 的值。开发模式会启用 HMR 分支，它会访问单元测试中不存在的 `__VUE_HMR_RUNTIME__`。

@`version` type=string

`__VUEPRESS_VERSION__` 的值。默认读取已安装的 `vuepress` 包。

@`resolve` type=`(id: string) => string | undefined`

解析 `resolve.alias` 无法表达的模块 id，如 `@vuepress/theme-default` 的 `@theme/*`。它会对每次导入调用，需返回文件路径或 `undefined`。

::::

### Test client options

由 `createTestClient()`、`renderVuePress()` 与 `mountVuePress()` 共用。

:::: fields
@`content` type=`Component | string`

当前页面的内容，即 page chunk。字符串会作为原始 HTML 渲染。

@`rootComponent` type=Component

根组件。提供时会跳过布局与客户端配置的根组件。

@`page` type=TestPageOptions

当前页面。

@@`page.path` type=string default=`'/'`

页面的路由路径。

@@`page.title` type=string default=`''`

页面的标题。

@@`page.lang` type=string default=`''`

页面的语言。它会回退到站点语言环境的语言。

@@`page.frontmatter` type=PageFrontmatter

页面的 frontmatter。

@@`page.data` type=`Record<string, unknown>`

额外的页面数据，如 `filePathRelative`。

@`route` type=string

当前页面的路由路径。默认为 `page.path`。

@`site` type=`Partial<SiteData>`

站点数据。例如它的 `locales` 字段会根据路由路径切换站点语言环境数据。

@`layouts` type=`Record<string, Component>`

布局组件。`Layout` 与 `NotFound` 默认为 `Content`。

@`routes` type=`Record<string, TestRouteOptions>`

额外的路由。每个路由接受 `component` 与 `pageData`。

@`redirects` type=`Record<string, string>`

重定向。

@`themeData` type=`Record<string, unknown>`

主题数据，由 `@vuepress/plugin-theme-data/client` 的 `useThemeData()` 读取。

@`clientConfigs` type=`ClientConfig[]`

需要应用的客户端配置。它们的 `setup`、`enhance`、`layouts` 与 `rootComponents` 都会生效。

@`ssr` type=boolean

是否模拟 SSR 模式。`renderToString()` 默认 `true`，`mount()` 默认 `false`。

::::

### Test app options

由 `createTestApp()` 使用。它同时接受 VuePress app 配置的其余字段。

:::: fields
@`files` type=`Record<string, string>`

需要在 source 目录中生成的 Markdown 文件。键为相对路径。

@`source` type=string

source 目录。默认为临时目录，会被 `app.cleanup()` 删除。

@`theme` type=Theme default=`emptyTheme`

app 的主题。

@`init` type=boolean

是否初始化 app。

@`prepare` type=boolean

是否在初始化后准备 app。

::::
