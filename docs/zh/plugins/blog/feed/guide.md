---
icon: lightbulb
---

# 指南

## 使用方法

本插件支持生成以下三种格式的 Feed：

- Atom 1.0
- JSON 1.1
- RSS 2.0

请根据你的需求，在插件选项中将 `atom`、`json` 或 `rss` 设置为 `true` 以启用相应的格式。

为了确保正确生成 Feed 链接，你需要在插件选项中设置 `hostname`。

## 可视化预览

Atom 和 RSS Feed 内置了 XSL 模板，因此在浏览器中打开时会自动渲染为易于阅读的 HTML 页面。你可以查看本站的 [atom](/zh/atom.xml) 和 [rss](/zh/rss.xml) Feed 作为示例。

如果你希望在开发服务器中预览 Feed，请在插件选项中设置 `devServer: true`。如果你的本地环境地址不是默认的 `http://localhost:{port}`，你还需要配置 `devHostname`。

## 频道设置

你可以通过 `channel` 选项自定义 Feed 的频道信息。

我们建议配置以下字段：

- `channel.pubDate`: 将其设置为当前的 ISOString 以表示 Feed 的生成时间。
- `channel.ttl`: 定义内容更新频率（单位：分钟）。
- `channel.copyright`: 指定版权信息。
- `channel.author`: 设置频道的默认作者。

详细的选项列表及其默认值，请参阅 [频道配置](./channel.md)。

## Feed 生成

默认情况下，所有文章都会被添加到 Feed 中。

你可以通过页面 Frontmatter 中的 `feed` 选项来控制单个 Feed 项目的内容。有关转换逻辑的详细信息，请参阅 [Frontmatter 配置](./frontmatter.md)。

如果你需要完全控制 Feed 项目的生成逻辑，可以配置插件选项中的 `getter` 函数。详见 [配置 → Feed Getter](./getter.md)。

### 多语言支持

插件会自动为每种语言生成独立的 Feed 文件。

你可以通过插件选项中的 `locales` 来为不同语言提供特定的配置。
