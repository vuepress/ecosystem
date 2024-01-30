
# Frontmatter Config

## sitemap

- Type: `SitemapFrontmatterOptions | false`
- Required: No

`false` means exclude the page from sitemap.

### sitemap.changefreq

- Type: `"always" | "hourly" | "daily" | "weekly" | "monthly" | "yearly" | "never"`
- Default: `"daily"`

Page default update frequency. This will override [changefreq](./config.md#changefreq) in Plugin Options.

### sitemap.priority

- Type: `number`
- Default: `0.5`

Page priority, range from `0` to `1`.
