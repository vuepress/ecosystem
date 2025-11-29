---
icon: chart-no-axes-combined
---

# clarity-analytics

<NpmBadge package="@vuepress/plugin-clarity-analytics" />

将 [Microsoft Clarity](https://clarity.microsoft.com/) 无缝集成到 VuePress 项目中。

## 使用方法

```bash
npm i -D @vuepress/plugin-clarity-analytics@next
```

```ts title=".vuepress/config.ts"
import { clarityAnalyticsPlugin } from '@vuepress/plugin-clarity-analytics'

export default {
  plugins: [
    clarityAnalyticsPlugin({
      // 选项
    }),
  ],
}
```

## 功能介绍

Microsoft Clarity 是一款免费且易用的行为分析工具，旨在帮助你深入了解用户如何与网站进行交互。本插件简化了集成流程，无需复杂的配置即可获取可付诸行动的洞察数据。

主要功能包括：

- **会话录像 (Session Recordings)：** 完整回放用户会话，直观地查看用户在网站上的浏览路径与操作细节。
- **热力图 (Heatmaps)：** 通过可视化点击、滚动和区域互动数据，精准识别用户最关注的内容区域。
- **智能洞察 (Smart Insights)：** 利用 Copilot 的 AI 分析能力，快速总结用户行为模式与趋势。

如需了解更多功能详情，请参阅 [Clarity 功能概览](https://learn.microsoft.com/en-us/clarity/setup-and-installation/about-clarity#supported-features)。

### 高级用法

插件启用后，全局 `window` 对象上将暴露 `clarity()` 函数。你可以通过该函数调用 [Clarity Client API](https://learn.microsoft.com/en-us/clarity/setup-and-installation/clarity-api) 来处理高级任务，例如：

- 识别特定用户身份。
- 追踪自定义事件 (Custom Events)。
- 管理 Cookie 同意状态。

## 选项

### id

- 类型：`string`
- 必填：是
- 详情：Microsoft Clarity 分配的项目 ID (Project ID)。你可以在 Clarity 控制台的“设置 (Settings)”页面中找到此 ID。

### crossOrigin

- 类型：`string`
- 默认值：`undefined`
- 详情：注入脚本标签的 `crossorigin` 属性。用于配置加载 Clarity 资源时的 [CORS](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/CORS) 设置。
