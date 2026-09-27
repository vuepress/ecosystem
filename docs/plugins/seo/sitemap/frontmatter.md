---
icon: captions
---

# Frontmatter

::: fields
@`sitemap` type=`SitemapFrontmatterOption | false`

Whether to include the page in the sitemap, or the sitemap config of the page.

Set it to `false` to exclude the page from the sitemap.

@@`sitemap.changefreq` type=`'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'` default=`'daily'`

Page default update frequency. It overrides the [changefreq](./config.md#changefreq) plugin option.

@@`sitemap.priority` type=number default=`0.5`

Page priority, range from `0` to `1`.

:::
