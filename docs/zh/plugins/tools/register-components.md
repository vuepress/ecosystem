---
icon: puzzle
---

# register-components

<NpmBadge package="@vuepress/plugin-register-components" />

根据组件文件或目录自动注册 Vue 组件。

## 使用方法

```bash
npm i -D @vuepress/plugin-register-components@next
```

```ts title=".vuepress/config.ts"
import { registerComponentsPlugin } from '@vuepress/plugin-register-components'

export default {
  plugins: [
    registerComponentsPlugin({
      // 配置项
    }),
  ],
}
```

## 指南

### 从目录注册

将 `componentsDir` 设为组件目录的绝对路径。该目录下匹配 `componentsPatterns` 的文件会被自动注册为 Vue 组件，组件名称由 `getComponentName` 根据相对于 `componentsDir` 的文件路径生成。

对于以下组件目录：

```bash
components
├─ FooBar.vue
└─ Baz.vue
```

组件会像这样被注册：

```ts
import { defineAsyncComponent } from 'vue'

app.component(
  'FooBar',
  defineAsyncComponent(() => import('/path/to/components/FooBar.vue')),
)

app.component(
  'Baz',
  defineAsyncComponent(() => import('/path/to/components/Baz.vue')),
)
```

## 选项

::: fields
@`components` type=`Record<string, string>` default={}

一个定义了组件名称和其对应文件路径的对象。

键会被用作组件名称，值是组件文件的绝对路径。

如果该配置项中的组件名称和 [componentsDir](#componentsdir) 配置项发生冲突，那么该配置项会有更高的优先级。

```ts title=".vuepress/config.ts"
import { path } from 'vuepress/utils'

const __dirname = import.meta.dirname

export default {
  plugins: [
    registerComponentsPlugin({
      components: {
        FooBar: path.resolve(__dirname, './components/FooBar.vue'),
      },
    }),
  ],
}
```

@`componentsDir` type=`string | null` default=null

组件目录的绝对路径。

```ts title=".vuepress/config.ts"
import { path } from 'vuepress/utils'

const __dirname = import.meta.dirname

export default {
  plugins: [
    registerComponentsPlugin({
      componentsDir: path.resolve(__dirname, './components'),
    }),
  ],
}
```

参考：[从目录注册](#从目录注册)。

@`componentsPatterns` type=`string[]` default=`['**/*.vue']`

使用 [tinyglobby](https://github.com/SuperchupuDev/tinyglobby) 来匹配组件文件的 Patterns。

该 Patterns 是相对于 [componentsDir](#componentsdir) 目录的。

@`getComponentName` type=`(filename: string) => string` @default=`(filename) => path.trimExt(filename.replaceAll(/\/|\\/gu, '-'))`

用于从文件名获取对应组件名称的函数。

它只会对 [componentsDir](#componentsdir) 目录下匹配了 [componentsPatterns](#componentspatterns) 的文件生效。

注意，这里的 `filename` 是相对于 [componentsDir](#componentsdir) 目录的文件路径。

:::
