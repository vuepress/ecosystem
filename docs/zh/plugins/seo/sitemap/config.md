---
icon: settings-2
---

# 配置

## 选项

:::: fields
@hostname@ type=string required

当前网站部署到的域名，插件需要此选项才能工作。

@extraUrls@ type=`string[]`

需要额外包含的网址。

如果你有一些不包含在 VuePress 路由中的链接 (如: 存放在 public 文件夹下的页面或其他插件或工具直接生成的页面)，你可能需要设置此项。

参考：[控制 Sitemap 链接](./guide.md#控制-sitemap-链接)。

例如：`['/about.html', '/api/']`。

@excludePaths@ type=`string[]` default=`['/404.html']`

不需要收录的页面路径，请以绝对路径开头。

默认情况下 VuePress 自动生成的所有路径 (除 404 页) 都会被添加进 Sitemap。

参考：[控制 Sitemap 链接](./guide.md#控制-sitemap-链接)。

@devServer@ type=boolean

是否在开发服务器中启用。

::: tip

由于性能原因，我们不提供热更新。重启开发服务器以同步你的变更。

:::

@devHostname@ type=string default=`'http://localhost:${port}'`

开发服务器使用的主机名。

@sitemapFilename@ type=string default=`'sitemap.xml'`

输出的文件名，相对于输出目录。

参考：[输出位置](./guide.md#输出位置)。

@sitemapXSLFilename@ type=string default=`'sitemap.xsl'`

输出的 xsl 文件名，相对于输出目录。

@sitemapXSLTemplate@ type=string default="`@vuepress/plugin-sitemap/templates/sitemap.xsl` 的内容"

用作模板的 XSL 文件内容。

@changefreq@ type=`'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'` default=`'daily'`

页面默认更新频率，会被 Frontmatter 中的 [sitemap.changefreq](./frontmatter.md#sitemap-changefreq) 覆盖。

参考：[更新周期](./guide.md#更新周期)。

@priority@ type=number default=`0.5`

页面优先级，范围 `0` 至 `1`。

参考：[优先级](./guide.md#优先级)。

@modifyTimeGetter@ type=`(page: Page, app: App) => string`

最后修改时间的获取器。默认情况下，插件会使用 Git 插件生成的时间戳。

参考：[修改时间获取](./guide.md#修改时间获取)。

::::
