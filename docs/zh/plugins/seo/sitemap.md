---
icon: network
---

# sitemap

<NpmBadge package="@vuepress/plugin-sitemap" />

为你的站点生成网站地图。

## 使用 {#usage}

```bash
npm i -D @vuepress/plugin-sitemap@next
```

```ts title=".vuepress/config.ts"
import { sitemapPlugin } from '@vuepress/plugin-sitemap'

export default {
  plugins: [
    sitemapPlugin({
      hostname: 'https://example.com',
    }),
  ],
}
```

`hostname` 选项是必须的，网站地图的链接由它生成。

插件会使用来自 `@vuepress/plugin-git` 的最后更新时间，并根据多语言配置声明每个页面的其他语言版本地址。

### 链接控制 {#link-control}

默认情况下，除 404 页面外站点的所有链接都会被包含在网站地图中。

- 使用 [extraUrls](#extraurls) 选项包含非 VuePress 生成的页面，通常是 public 目录下的文件；
- 使用 [excludePaths](#excludepaths) 选项，或将页面的 `sitemap` Frontmatter 设置为 `false`，来排除页面。

### 更新周期 {#update-frequency}

页面默认的更新周期为 `daily`，可以通过 [changefreq](#changefreq) 选项修改，也可以通过页面的 `sitemap.changefreq` Frontmatter 单独设置。

合法的周期为 `always`、`hourly`、`daily`、`weekly`、`monthly`、`yearly` 与 `never`。

### 修改时间 {#modify-time}

[modifyTimeGetter](#modifytimegetter) 选项以 ISO 字符串格式返回页面的最后修改时间，默认来自 `@vuepress/plugin-git`。

```ts
// 基于文件的最后修改时间
;({
  modifyTimeGetter: (page, app) =>
    fs.statSync(app.dir.source(page.filePathRelative)).mtime.toISOString(),
})
```

### robots.txt

网站地图会被搜索引擎读取，因此你应当在 `.vuepress/public` 目录下提供有效的 `robots.txt` 以允许爬虫访问。最简单的写法为：

```txt
User-agent: *

Allow: /
```

## 选项 {#options}

::: fields
@`hostname` type=string required

站点部署的域名。

@`extraUrls` type=`string[]`

需要额外包含的链接，例如 `['/about.html', '/api/']`。

@`excludePaths` type=`string[]` default=`['/404.html']`

不需要收录的页面路径，请以绝对路径开头。

@`sitemapFilename` type=string default=`'sitemap.xml'`

网站地图的输出文件名，相对于输出目录。

@`sitemapXSLFilename` type=string default=`'sitemap.xsl'`

XSL 文件的输出文件名，相对于输出目录。

@`sitemapXSLTemplate` type=string

XSL 模板的内容，默认为内置的 `sitemap.xsl`。

@`changefreq` type=`'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'` default=`'daily'`

页面默认的更新周期。参考：[更新周期](#update-frequency)。

@`modifyTimeGetter` type=`(page: Page, app: App) => string`

页面最后修改时间的获取器。参考：[修改时间](#modify-time)。

@`xmlNameSpace` type=`{ news: boolean; video: boolean; xhtml: boolean; image: boolean; custom?: string[] }`

需要启用的 XML 命名空间，默认全部启用。

@`devServer` type=boolean

是否在开发服务器中生成网站地图。

@`devHostname` type=string default=`'http://localhost:${port}'`

开发服务器中使用的域名。

:::

## Frontmatter

::: fields
@`sitemap` type=`SitemapFrontmatterOption | false`

是否将页面包含在网站地图中，或页面的网站地图配置。

@`sitemap.changefreq` type=`'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never'` default=`'daily'`

页面的更新周期。

@`sitemap.priority` type=number

页面的优先级，范围 `0` 至 `1`。

@`sitemap.img` type=`SitemapImageOption[]`

页面的图片。

@`sitemap.video` type=`SitemapVideoOption[]`

页面的视频。

@`sitemap.news` type=`SitemapNewsOption[]`

页面的新闻。

:::

## 相关 {#related}

- [Sitemaps 协议](https://www.sitemaps.org/protocol.html)
