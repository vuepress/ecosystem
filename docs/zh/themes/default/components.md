---
icon: box
---

# 内置组件 {#built-in-components}

主题导出了它的各个构建块，因此无需复制主题代码，也能用它们组装出自定义布局或首页。下面先以表格逐一列出，再逐个组件说明 props。引用保持为站内链接。

<NpmBadge package="@vuepress/theme-default" />

这些组件由客户端入口导出。在 `<script setup>` 块中导入页面用到的组件：

```md
<script setup>
import { VPButton, VPImage } from '@vuepress/theme-default/client'
</script>
```

有两个组件是全局注册的，因此在 markdown 中无需导入即可使用：

- `Badge` —— 即 [`VPBadge`](#vpbadge) 组件，保留了 `@vuepress/theme-classic` 中 `<Badge text="..." type="..." />` 的写法。
- `VPIcon` —— 由 `@vuepress/plugin-icon` 注册，用于渲染导航栏、侧边栏和特性卡片中出现的图标名称。

## 概览 {#overview}

| 组件                      | 渲染内容                                            |
| ------------------------- | --------------------------------------------------- |
| `VPHomeHero`              | 首页的 hero 区域，取自其 `hero` frontmatter         |
| `VPHomeFeatures`          | 首页的特性卡片，取自其 `features` frontmatter       |
| `VPHomeContent`           | 首页 markdown 内容的通栏容器                        |
| `VPHomeSponsors`          | 首页的赞助商区块                                    |
| `VPFeatures`              | 由 prop 传入的特性卡片网格                          |
| `VPTeamPage`              | 团队页面的容器                                      |
| `VPTeamPageTitle`         | 团队页面的标题块                                    |
| `VPTeamPageSection`       | 团队页面的一个区块                                  |
| `VPTeamMembers`           | 团队成员网格                                        |
| `VPSponsors`              | 赞助商区块，支持分级                                |
| `VPDocAsideSponsors`      | 文档页面侧栏的赞助商网格                            |
| `VPButton`                | 带主题样式的链接或按钮                              |
| `VPBadge`                 | 小徽标，同时以 `Badge` 之名注册                     |
| `VPImage`                 | 带亮色和暗色两种来源的图片                          |
| `VPLink`                  | 带主题外链处理逻辑的链接                            |
| `VPSocialLinks`           | 一行社交链接                                        |
| `VPNavBarSearch`          | 导航栏的搜索占位符                                  |
| `VPThemeIcon`             | 来自 `@vuepress/plugin-icon` 的图标或主题图标 class |
| `VPDocFooterContributors` | 文档页脚的贡献者一行                                |

每个组件也会连同其类型一起从 `@vuepress/theme-default/client` 导出。

## 首页组件 {#home-components}

这些组件会自行读取[首页 frontmatter](./frontmatter.md#home-page)，因此首页内容通常直接组合它们，而无需传入 props：

```md
---
type: home
hero:
  name: Theme Default
  text: The default theme of VuePress
features:
  - title: A thin layout layer
    details: The layout of VitePress, with the plugin system of VuePress.
---

The markdown below the hero and the features.
```

### VPHomeHero {#vphomehero}

从 `hero` frontmatter 渲染 hero 区域。它没有 props；可用的插槽就是 hero 的插槽：`home-hero-info-before`、`home-hero-info`、`home-hero-info-after`、`home-hero-actions-before-actions`、`home-hero-actions-after`、`home-hero-image`。

### VPHomeFeatures {#vphomefeatures}

从 `features` frontmatter 渲染特性卡片。它没有 props。

### VPHomeContent {#vphomecontent}

把首页的 markdown 内容包进一个文档样式的容器中：

```md
<VPHomeContent>

## Why another theme

The markdown of the home page goes here.

</VPHomeContent>
```

该容器会让其中的团队区块和赞助商区块拉伸到视口全宽。

### VPHomeSponsors {#vphomesponsors}

::: fields
@`data` type=`Sponsors[]` required

赞助商分级。每个分级为 `{ tier: string; size?: 'medium' | 'big'; items: Sponsor[] }`，每个赞助商为 `{ name: string; img: string; url: string }`。

@`message` type=string

显示在赞助商上方的文案。

@`actionText` type=string default=`'Become a sponsor'`

行动号召按钮的文本。

@`actionLink` type=string

行动号召按钮的链接。未提供时按钮会隐藏。
:::

```md
<VPHomeSponsors
  message="Thanks to our sponsors!"
  action-text="Become a sponsor"
  action-link="https://github.com/sponsors/vuepress"
  :data="[
    {
      tier: 'Platinum',
      items: [{ name: 'Sponsor', img: '/sponsor.svg', url: 'https://example.com' }],
    },
  ]"
/>
```

## 团队组件 {#team-components}

团队页面由首页内容内部的团队组件组成。容器是 `VPHomeContent`，它会让各区块拉伸到全宽：

```md
<VPHomeContent>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>Our Team</template>
    <template #lead>The people who build the project.</template>
  </VPTeamPageTitle>

  <VPTeamPageSection>
    <template #title>Core Team</template>
    <template #lead>The maintainers of the repository.</template>
    <template #members>
      <VPTeamMembers :members="members" />
    </template>
  </VPTeamPageSection>
</VPTeamPage>

</VPHomeContent>

<script setup>
import {
  VPHomeContent,
  VPTeamMembers,
  VPTeamPage,
  VPTeamPageSection,
  VPTeamPageTitle,
} from '@vuepress/theme-default/client'

const members = [
  {
    avatar: 'https://github.com/vuepress.png',
    name: 'VuePress',
    title: 'Maintainer',
    org: 'VuePress',
    orgLink: 'https://vuepress.vuejs.org/',
    desc: 'The team behind the theme.',
    links: [{ icon: 'github', link: 'https://github.com/vuepress' }],
  },
]
</script>
```

### VPTeamPage {#vpteampage}

团队各区块的容器，带一个默认插槽。

### VPTeamPageTitle {#vpteampagetitle}

页面的标题块。它提供 `title` 和 `lead` 插槽。

### VPTeamPageSection {#vpteampagesection}

页面的一个区块。它提供 `title`、`lead` 和 `members` 插槽。

### VPTeamMembers {#vpteammembers}

::: fields
@`members` type=`DefaultTheme.TeamMember[]` required

要渲染的成员。每个成员包含下面的字段。

@`size` type=`'small' | 'medium'` default=`'medium'`

卡片的大小。

@@`members[*].avatar` type=string required

头像图片的 URL。

@@`members[*].name` type=string required

成员的名称。

@@`members[*].title` type=string

成员的职位，例如 `'Maintainer'`。

@@`members[*].org` type=string

成员所属的组织。

@@`members[*].orgLink` type=string

组织的链接。

@@`members[*].desc` type=string

成员的简短介绍。允许使用 HTML。

@@`members[*].sponsor` type=string

指向成员赞助主页的链接。设置后卡片会显示赞助链接。

@@`members[*].actionText` type=string

赞助链接的文本。

@@`members[*].links` type=`DefaultTheme.SocialLink[]`

成员的社交链接，每个为 `{ icon: string | { svg: string }; link: string; ariaLabel?: string; target?: string }`。
:::

## 赞助商组件 {#sponsor-components}

### VPSponsors {#vpsponsors}

::: fields
@`data` type=`Sponsors[] | Sponsor[]` required

赞助商。传入分级数组可对它们分组，也可以传入扁平的赞助商数组表示单个分组。

@`tier` type=string

当 `data` 是扁平的赞助商数组时，该分组的标题。

@`size` type=`'xmini' | 'mini' | 'small' | 'medium' | 'big'`

当 `data` 是扁平的赞助商数组时，logo 的大小。分级也可以自行设置 `size`。

@`mode` type=`'normal' | 'aside'` default=`'normal'`

网格的布局。`aside` 是文档侧栏使用的紧凑布局。
:::

### VPDocAsideSponsors {#vpdocasidesponsors}

::: fields
@`data` type=`Sponsors[] | Sponsor[]` required

要渲染的赞助商，数据形状与 `VPSponsors` 相同。

@`tier` type=string

赞助商分组的标题。

@`size` type=`'xmini' | 'mini' | 'small'`

logo 的大小。
:::

主题自身不会挂载该组件。自定义布局可以用它填充默认布局的 `aside-ads-after` 插槽，详见[继承](./extending.md#custom-layouts)。

## 通用组件 {#generic-components}

### VPButton {#vpbutton}

::: fields
@`text` type=string

按钮的文本。未使用默认插槽时渲染。

@`href` type=string

按钮的链接。未提供时组件渲染为 `<button>`。

@`tag` type=string

要渲染的标签，`a` 或 `button`。

@`theme` type=`'brand' | 'alt' | 'sponsor'` default=`'brand'`

按钮的样式。

@`size` type=`'medium' | 'big'` default=`'medium'`

按钮的大小。

@`target` type=string

链接的 `target` 属性。

@`rel` type=string

链接的 `rel` 属性。
:::

```md
<VPButton text="Get Started" href="/guide/" />
<VPButton text="GitHub" href="https://github.com/vuepress" theme="alt" />
```

### VPBadge {#vpbadge}

::: fields
@`text` type=string

徽标的文本。默认插槽优先。

@`type` type=`'info' | 'note' | 'tip' | 'important' | 'caution' | 'warning' | 'danger'` default=`'tip'`

徽标的颜色。
:::

```md
A badge <Badge text="New" type="tip" /> in a sentence.
```

### VPImage {#vpimage}

::: fields
@`image` type=`DefaultTheme.ThemeableImage` required

图片。它接受 URL 字符串、`{ src, alt? }`，或用于跟随颜色模式切换的 `{ light, dark, alt? }`。

@`alt` type=string

图片的替代文本。
:::

### VPLink {#vplink}

::: fields
@`href` type=string

链接目标。它会带上站点的 base 进行规范化，外部目标会在新标签页中打开。

@`tag` type=string

要渲染的标签。设置了 `href` 时默认为 `a`，否则为 `span`。

@`noIcon` type=boolean

是否隐藏外链图标。

@`external` type=boolean

强制把链接视为外部链接；设为 `false` 时强制视为内部链接。未设置时从 `href` 和 `target` 推断。

@`target` type=string

链接的 `target` 属性。

@`rel` type=string

链接的 `rel` 属性。
:::

### VPSocialLinks {#vpsociallinks}

::: fields
@`links` type=`DefaultTheme.SocialLink[]` required

要渲染的社交链接，每个为 `{ icon: string | { svg: string }; link: string; ariaLabel?: string; target?: string }`。

@`me` type=boolean default=`true`

链接是否指向站点所有者的个人主页。它会被传给链接的 `rel` 属性。
:::

### VPNavBarSearch {#vpnarbarsearch}

当有搜索插件注册了搜索框时渲染 `SearchBox` 占位符，否则不渲染任何内容。它没有 props。主题会在导航栏中渲染它；自定义布局可以用它保持搜索可用。

### VPThemeIcon {#vpthemeicon}

::: fields
@`icon` type=string required

要渲染的图标。来自 `@vuepress/plugin-icon` 的名称会通过全局 `VPIcon` 解析，以 `vpi-` 开头的 class 名则渲染对应的主题图标。
:::

### VPDocFooterContributors {#vpdocfootercontributors}

根据页面的 git 数据渲染文档页脚的贡献者一行。它没有 props，并从[语言配置](./locale.md)读取 `contributorsText` 标签。
