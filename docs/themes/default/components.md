---
icon: box
---

# Built-in Components

The theme exports its building blocks, so a custom layout or a home page can be composed from them without copying the theme. Document them all in a table first, then give per-component props. Keep references to our own pages internal.

<NpmBadge package="@vuepress/theme-default" />

The components are exported by the client entry. Import the ones a page uses in a `<script setup>` block:

```md
<script setup>
import { VPButton, VPImage } from '@vuepress/theme-default/client'
</script>
```

Two components are registered globally, so they work in markdown without an import:

- `Badge` — the [`VPBadge`](#vpbadge) component, which keeps the `<Badge text="..." type="..." />` syntax of `@vuepress/theme-classic`.
- `VPIcon` — registered by `@vuepress/plugin-icon`, which renders the icon names used by the navbar, the sidebar and the feature cards.

## Overview

| Component                 | Renders                                                           |
| ------------------------- | ----------------------------------------------------------------- |
| `VPHomeHero`              | The hero of a home page, from its `hero` frontmatter              |
| `VPHomeFeatures`          | The feature cards of a home page, from its `features` frontmatter |
| `VPHomeContent`           | A full-width container for the markdown content of a home page    |
| `VPHomeSponsors`          | A sponsor section of a home page                                  |
| `VPFeatures`              | A grid of feature cards, from a prop                              |
| `VPTeamPage`              | The container of a team page                                      |
| `VPTeamPageTitle`         | The title block of a team page                                    |
| `VPTeamPageSection`       | A section of a team page                                          |
| `VPTeamMembers`           | A grid of team members                                            |
| `VPSponsors`              | A sponsor section, with tiers                                     |
| `VPDocAsideSponsors`      | A sponsor grid for the aside of a document page                   |
| `VPButton`                | A themed link or button                                           |
| `VPBadge`                 | A small badge, also registered as `Badge`                         |
| `VPImage`                 | An image with a light and a dark source                           |
| `VPLink`                  | A link with the external-link handling of the theme               |
| `VPSocialLinks`           | A row of social links                                             |
| `VPNavBarSearch`          | The search placeholder of the navbar                              |
| `VPThemeIcon`             | An icon from `@vuepress/plugin-icon` or a theme icon class        |
| `VPDocFooterContributors` | The contributors line of the document footer                      |

Every component is also exported with its types from `@vuepress/theme-default/client`.

## Home Components

These components read the [home page frontmatter](./frontmatter.md#home-page) themselves, so the home page content usually composes them without props:

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

### VPHomeHero

Renders the hero from the `hero` frontmatter. It has no props; the slots are the ones of the hero: `home-hero-info-before`, `home-hero-info`, `home-hero-info-after`, `home-hero-actions-before-actions`, `home-hero-actions-after`, `home-hero-image`.

### VPHomeFeatures

Renders the feature cards from the `features` frontmatter. It has no props.

### VPHomeContent

Wraps the markdown content of the home page in a document-styled container:

```md
<VPHomeContent>

## Why another theme

The markdown of the home page goes here.

</VPHomeContent>
```

The container stretches the team and sponsor sections inside it to the full width of the viewport.

### VPHomeSponsors

::: fields
@`data` type=`Sponsors[]` required

The sponsor tiers. Each tier is `{ tier: string; size?: 'medium' | 'big'; items: Sponsor[] }`, and each sponsor is `{ name: string; img: string; url: string }`.

@`message` type=string

The message shown above the sponsors.

@`actionText` type=string default=`'Become a sponsor'`

The text of the call-to-action button.

@`actionLink` type=string

The link of the call-to-action button. The button is hidden when it is missing.
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

## Team Components

A team page is composed of the team components inside the home content. The container is `VPHomeContent`, which makes the sections stretch to the full width:

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

### VPTeamPage

The container of the team sections, with a default slot.

### VPTeamPageTitle

The title block of the page. It has the `title` and the `lead` slots.

### VPTeamPageSection

A section of the page. It has the `title`, the `lead` and the `members` slots.

### VPTeamMembers

::: fields
@`members` type=`DefaultTheme.TeamMember[]` required

The members to render. Each member has the fields below.

@`size` type=`'small' | 'medium'` default=`'medium'`

The size of the cards.

@@`members[*].avatar` type=string required

The avatar image URL.

@@`members[*].name` type=string required

The name of the member.

@@`members[*].title` type=string

The title of the member, such as `'Maintainer'`.

@@`members[*].org` type=string

The organization of the member.

@@`members[*].orgLink` type=string

The link of the organization.

@@`members[*].desc` type=string

A short description of the member. HTML is allowed.

@@`members[*].sponsor` type=string

A link to the sponsor profile of the member. When it is set, the card shows a sponsor link.

@@`members[*].actionText` type=string

The text of the sponsor link.

@@`members[*].links` type=`DefaultTheme.SocialLink[]`

The social links of the member, each being `{ icon: string | { svg: string }; link: string; ariaLabel?: string; target?: string }`.
:::

## Sponsor Components

### VPSponsors

::: fields
@`data` type=`Sponsors[] | Sponsor[]` required

The sponsors. Pass an array of tiers to group them, or a flat array of sponsors for a single group.

@`tier` type=string

The title of the group when `data` is a flat array of sponsors.

@`size` type=`'xmini' | 'mini' | 'small' | 'medium' | 'big'`

The size of the logos when `data` is a flat array of sponsors. A tier may set its own `size`.

@`mode` type=`'normal' | 'aside'` default=`'normal'`

The layout of the grid. `aside` is the compact layout of the document aside.
:::

### VPDocAsideSponsors

::: fields
@`data` type=`Sponsors[] | Sponsor[]` required

The sponsors to render, with the same shapes as `VPSponsors`.

@`tier` type=string

The title of the sponsor group.

@`size` type=`'xmini' | 'mini' | 'small'`

The size of the logos.
:::

The theme does not mount this component itself. A custom layout fills the `aside-ads-after` slot of the default layout with it, as shown in [Extending](./extending.md#custom-layouts).

## Generic Components

### VPButton

::: fields
@`text` type=string

The text of the button. It is rendered when the default slot is not used.

@`href` type=string

The link of the button. Without it, the component renders a `<button>`.

@`tag` type=string

The tag to render, `a` or `button`.

@`theme` type=`'brand' | 'alt' | 'sponsor'` default=`'brand'`

The style of the button.

@`size` type=`'medium' | 'big'` default=`'medium'`

The size of the button.

@`target` type=string

The `target` attribute of the link.

@`rel` type=string

The `rel` attribute of the link.
:::

```md
<VPButton text="Get Started" href="/guide/" />
<VPButton text="GitHub" href="https://github.com/vuepress" theme="alt" />
```

### VPBadge

::: fields
@`text` type=string

The text of the badge. The default slot takes precedence.

@`type` type=`'info' | 'note' | 'tip' | 'important' | 'caution' | 'warning' | 'danger'` default=`'tip'`

The color of the badge.
:::

```md
A badge <Badge text="New" type="tip" /> in a sentence.
```

### VPImage

::: fields
@`image` type=`DefaultTheme.ThemeableImage` required

The image. It accepts a URL string, `{ src, alt? }`, or `{ light, dark, alt? }` for a color-mode-aware image.

@`alt` type=string

The alternative text of the image.
:::

### VPLink

::: fields
@`href` type=string

The link target. It is normalized with the base of the site, and an external target opens in a new tab.

@`tag` type=string

The tag to render. It defaults to `a` when `href` is set, and to `span` otherwise.

@`noIcon` type=boolean

Whether to hide the external link icon.

@`external` type=boolean

Force the link to be treated as external, or as internal when set to `false`. It is detected from `href` and `target` otherwise.

@`target` type=string

The `target` attribute of the link.

@`rel` type=string

The `rel` attribute of the link.
:::

### VPSocialLinks

::: fields
@`links` type=`DefaultTheme.SocialLink[]` required

The social links to render, each being `{ icon: string | { svg: string }; link: string; ariaLabel?: string; target?: string }`.

@`me` type=boolean default=`true`

Whether the links point to the profiles of the site owner. It is passed to the `rel` attribute of the links.
:::

### VPNavBarSearch

Renders the `SearchBox` placeholder when a search plugin has registered it, and nothing otherwise. It has no props. The theme renders it in the navbar; a custom layout uses it to keep the search working.

### VPThemeIcon

::: fields
@`icon` type=string required

The icon to render. A name from `@vuepress/plugin-icon` is resolved through the global `VPIcon`, while a class name starting with `vpi-` renders the matching theme icon.
:::

### VPDocFooterContributors

Renders the contributors line of the document footer from the git data of the page. It has no props, and reads the `contributorsText` label from the [locale config](./locale.md).
