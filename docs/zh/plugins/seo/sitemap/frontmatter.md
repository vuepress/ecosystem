---
icon: captions
---

# Frontmatter

::: fields
@`sitemap` type=`SitemapFrontmatterOption | false`

是否将页面包含在 sitemap 中，或页面的 sitemap 配置。

设置为 `false` 可将页面排除在 sitemap 之外。

@@`sitemap.changefreq` type=`'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'` default=`'daily'`

页面默认更新频率。它会覆盖插件选项中的 [changefreq](./config.md#changefreq)。

@@`sitemap.priority` type=number default=`0.5`

页面优先级，范围 `0` 至 `1`。

:::
