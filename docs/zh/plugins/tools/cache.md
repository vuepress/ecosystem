---
icon: database-zap
---

# cache

<NpmBadge package="@vuepress/plugin-cache" />

该插件 用于解决 VuePress 启动耗时过长 的问题。

通过在首次启动 VuePress 开发服务时，对 `markdown render` 建立缓存，在二次启动时，直接读取缓存跳过
不必要的 `markdown render` ，从而加快启动速度。

## 使用方法

```bash
npm i -D @vuepress/plugin-cache@next
```

::: tip 作为最后一个插件使用

建议将 `cachePlugin` 放在 `plugins` 配置项中的最后一项，这能够确保缓存最大化的使用。

:::

```ts
import { cachePlugin } from '@vuepress/plugin-cache'

export default {
  plugins: [
    // ... 其它插件

    // 作为最后一个插件使用
    cachePlugin({
      // 配置项
    }),
  ],
}
```

## 配置项

### type

- 类型： `'memory'` | `'filesystem'`

- 默认值： `'memory'`

- 详情:

  缓存类型

  - `'memory'` 为内存缓存，使用内存缓存可以实现最佳的优化效果，但随着项目规模增长，内存占用更多，适合页面较少的项目。
  - `'filesystem'` 为文件系统缓存，对于复杂的项目，包含许多页面，建议使用文件缓存。

### enableInCi

- 类型： `boolean`

- 默认值： `false`

- 详情:

  在 CI 环境中是否启用缓存。

  在大多数情况下，缓存插件可能会减慢 CI 的速度。
