
# Frontmatter 选项

## sitemap

- 类型: `SitemapFrontmatterOptions | false`
- 必填: 否

`false` 代表不输出此页面到 Sitemap

### sitemap.changefreq

- 类型: `"always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"`
- 默认值: `"daily"`

页面默认更新频率。它会覆盖插件选项中的 [changefreq](#changefreq) 选项。

### sitemap.priority

- 类型: `number`
- 默认值: `0.5`

页面优先级，范围 `0` 至 `1`。
