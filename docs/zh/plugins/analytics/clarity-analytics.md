---
icon: chart-no-axes-combined
---

# clarity-analytics

<NpmBadge package="@vuepress/plugin-clarity-analytics" />

将 [Clarity Analytics](https://clarity.microsoft.com/) 集成到 VuePress 中。

## 使用方法

```bash
npm i -D @vuepress/plugin-clarity-analytics@next
```

```ts title=".vuepress/config.ts"
import { clarityAnalyticsPlugin } from '@vuepress/plugin-clarity-analytics'

export default {
  plugins: [
    clarityAnalyticsPlugin({
      // 配置项
    }),
  ],
}
```

### 事件上报

本插件可帮助你更好地了解用户跟你的网站的交互。

[支持的功能](https://learn.microsoft.com/en-us/clarity/setup-and-installation/about-clarity#supported-features)

- 访问录制
- 热点地图
- 事件和漏斗跟踪
- 使用 Copilot 聊天和汇总

引入插件后，全局 `clarity()` 函数会挂载到 `window` 对象，可用于 [高级特性](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api)。

## 选项

### id

- 类型: `string`
- 必填：是
- 详情: Clarity Analytics 项目 ID.

### crossOrigin

- 类型: `string`
- 默认值: `undefined`
- 详情: `crossorigin` 属性，它提供对 `CORS` 的支持。
