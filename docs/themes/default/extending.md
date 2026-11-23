---
icon: puzzle
---

# Extending

The theme renders every page through a single layout component. Pages are differentiated by their [page type](./frontmatter.md#page-type) instead of by their layout name, and the parts of the layout are exposed as slots. That makes a custom page or a custom layout a matter of registering a component and, when the layout of the theme is still wanted, wrapping it.

<NpmBadge package="@vuepress/theme-default" />

## Custom Layouts

The theme registers two layouts: `Layout` and `NotFound`. The `layout` frontmatter selects one of the registered layouts by name, and it defaults to `Layout`:

```md
---
layout: CommentPage
---
```

A layout is registered in the client config file of the site, `.vuepress/client.ts`:

```ts
import { defineClientConfig } from 'vuepress/client'

import CommentPage from './layouts/CommentPage.vue'

export default defineClientConfig({
  layouts: {
    CommentPage,
  },
})
```

The name of a layout must be registered, otherwise VuePress throws `Cannot resolve layout: <name>` when the page is rendered. A layout that is registered here replaces the layout of the theme for that page, so it is responsible for the whole page markup.

## Wrapping the Theme Layout

The most common custom layout keeps the theme layout and adds something to it. The default export of `@vuepress/theme-default/client` exposes the layout component as `Layout`, so a wrapper renders it and fills one or more of its slots:

```vue
<!-- .vuepress/layouts/CommentPage.vue -->
<script setup lang="ts">
import theme, { useDarkMode } from '@vuepress/theme-default/client'

const ParentLayout = theme.Layout
const isDarkMode = useDarkMode()
</script>

<template>
  <ParentLayout>
    <template #page-bottom>
      <CommentService :darkmode="isDarkMode" />
    </template>
  </ParentLayout>
</template>
```

The wrapper inherits the page type, the sidebar, the navbar and the dark mode of the theme, so `page-bottom` is filled on every page type that renders it.

## Layout Slots

The slots below are forwarded by the layout of the theme. A slot only renders on the page types that render its area: the home slots render on a `type: home` page, the document slots on a `type: doc` page, and the page slots on a `type: page` page.

### Layout

| Slot            | Description                                  |
| --------------- | -------------------------------------------- |
| `layout-top`    | Above the navbar, inside the page container. |
| `layout-bottom` | Below the footer, inside the page container. |

### Navbar

| Slot                        | Description                                                                    |
| --------------------------- | ------------------------------------------------------------------------------ |
| `nav-bar-title-before`      | Before the logo and the site title.                                            |
| `nav-bar-title-after`       | After the logo and the site title.                                             |
| `nav-bar-content-before`    | Before the navigation items.                                                   |
| `nav-bar-content-after`     | After the navigation items, before the appearance switch and the social links. |
| `nav-screen-content-before` | At the top of the mobile menu.                                                 |
| `nav-screen-content-after`  | At the bottom of the mobile menu.                                              |

### Sidebar

| Slot                 | Description                         |
| -------------------- | ----------------------------------- |
| `sidebar-nav-before` | Above the sidebar navigation items. |
| `sidebar-nav-after`  | Below the sidebar navigation items. |

### Document Page

| Slot                | Description                                                         |
| ------------------- | ------------------------------------------------------------------- |
| `doc-top`           | Above the content and the aside.                                    |
| `doc-before`        | Above the content, below the document title.                        |
| `doc-after`         | Below the content, above the footer of the document.                |
| `doc-bottom`        | Below the content and the aside.                                    |
| `doc-footer-before` | Above the edit link, the last updated time and the page navigation. |

### Aside

| Slot                   | Description                              |
| ---------------------- | ---------------------------------------- |
| `aside-top`            | Above the outline.                       |
| `aside-outline-before` | Above the outline list, below its title. |
| `aside-outline-after`  | Below the outline list.                  |
| `aside-ads-before`     | Above the aside ads, below the outline.  |
| `aside-ads-after`      | Below the aside ads.                     |
| `aside-bottom`         | Below everything else in the aside.      |

### Page

| Slot          | Description                                                             |
| ------------- | ----------------------------------------------------------------------- |
| `page-top`    | Above the page content, inside the page container.                      |
| `page-bottom` | Below the page content, inside the page container.                      |
| `not-found`   | The content of the 404 page. It replaces the default not-found content. |

### Home Page

| Slot                               | Description                                                           |
| ---------------------------------- | --------------------------------------------------------------------- |
| `home-hero-before`                 | Above the hero section.                                               |
| `home-hero-info-before`            | At the top of the hero information.                                   |
| `home-hero-info`                   | The hero information. It replaces the name, the text and the tagline. |
| `home-hero-info-after`             | At the bottom of the hero information.                                |
| `home-hero-actions-before-actions` | Above the hero actions.                                               |
| `home-hero-actions-after`          | Below the hero actions.                                               |
| `home-hero-image`                  | The hero image.                                                       |
| `home-hero-after`                  | Below the hero section.                                               |
| `home-features-before`             | Above the features section.                                           |
| `home-features-after`              | Below the features section, above the content.                        |

## Enhancing the App

The client config file of the site can also register a component globally or run code when the app is created:

```ts
import { defineClientConfig } from 'vuepress/client'

import MyComponent from './components/MyComponent.vue'

export default defineClientConfig({
  enhance({ app }) {
    app.component('MyComponent', MyComponent)
  },
})
```

The theme does the same for the `Badge` component, which is why `<Badge text="new" />` works in Markdown without importing anything.

::: tip
The enhancement runs on both the server and the client. Guard browser-only code with `onMounted` or wrap the component in `<ClientOnly>`, so that the server render does not fail.
:::

## Custom Pages

A page with `type: content` renders its content without the layout of the theme — no navbar, no sidebar, no footer. Use it for a landing page or an embedded page whose markup is written entirely in the Markdown file:

```md
---
type: content
---
```

For a page that needs the theme around it, keep the default layout and add the content through the Markdown file or through a slot. On a home page, the Markdown body renders below the hero and the features, inside the home content container:

```md
---
type: home

hero:
  name: My Project
  text: A short description.
---

Any Markdown content here is rendered below the features section.
```

## Reading the Layout State

A custom layout can read the state of the layout with `useLayout()` from `@vuepress/theme-default/client`:

```ts
import { useLayout } from '@vuepress/theme-default/client'

const {
  isHome,
  sidebar,
  sidebarGroups,
  hasSidebar,
  isSidebarEnabled,
  hasAside,
  leftAside,
  headers,
  hasLocalNav,
} = useLayout()
```

`headers` is the outline tree of the current page, `sidebarGroups` the sidebar items grouped by section, and `hasAside` / `leftAside` tell whether the aside renders and on which side.

## Extending the Theme Options

The theme factory returns a theme object that can be decorated, since `defaultTheme()` returns the object VuePress consumes. Add plugins to it, for example:

```ts
import { defaultTheme } from '@vuepress/theme-default'

import { myPlugin } from './plugins/myPlugin.js'

const theme = defaultTheme({
  siteTitle: 'My Project',
})

export default {
  ...theme,
  plugins: [...(theme.plugins ?? []), myPlugin()],
}
```

Keep the `clientConfigFile` of the base theme: it registers `Layout` and `NotFound` and provides the dark mode state. The layout of the theme is not built from replaceable aliases — unlike the classic theme, the default theme exposes no `@theme/*` alias — so extend it through its slots, or write a layout that renders its own markup.

## Next

- [Built-in Components](./components.md) — the components the theme exports.
- [Frontmatter](./frontmatter.md) — the `layout` and `type` frontmatter.
- [Config](./config.md) — the theme options.
