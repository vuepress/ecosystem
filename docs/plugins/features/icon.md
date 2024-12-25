# icon

<NpmBadge package="@vuepress/plugin-icon" />

Provides icon component.

## Usage

```bash
npm i -D @vuepress/plugin-icon@next
```

```ts
import { iconPlugin } from '@vuepress/plugin-icon'

export default {
  plugins: [
    iconPlugin({
      // options
    }),
  ],
}
```

We support multiple types of icons as well:

- `iconify` (default)
- `fontawesome`
- `iconfont`

Also, images links are supported with any icon types (relative links are NOT supported).

If you want a new type of icon, please open an issue or submit a PR.

### Iconify

For full icon list, see <https://icon-sets.iconify.design/>. To use a icon, copy it's icon name of `iconify-icon` in the selector.

Additionally, iconify support the following props:

- `mode`: `svg` (default) `style` `bg` or `mask` to change the render icon mode
- `inline`: `false` to disable inline icon
- `flip`: `horizontal` or `vertical` to flip the icon
- `rotate`: `90`, `180`, `270` to rotate the icon

If you use 1 icon set mostly, you can set the prefix to the icon set name (E.g.: `mdi:`), Then you can use the icon name without the prefix. Manually declaring a full icon name will override the prefix:

```md
<VPIcon icon="home" /> <!-- mdi:home -->
<VPIcon icon="svg-spinners:180-ring" /> <!-- svg-spinners:180-ring -->
```

### Font Awesome

For free icon list, see <https://fontawesome.com/v6/search?o=r&m=free>. To use a icon, copy it's icon name in the selector.

The `fontawesome` keyword only includes the free solid and regular icons. If you want to use the brand icons, you need to use the `fontawesome-with-brands` keyword.

Solid icons can be used directly. if you want to use regular or brand icons, you need to add the `regular:` or `brands:` prefix to the icon name:

```md
<VPIcon icon="home" /> <!-- fas fa-home (solid is default) -->
<VPIcon icon="solid:home" /> <!-- fas fa-home -->
<VPIcon icon="regular:heart" /> <!-- far fa-heart -->
<VPIcon icon="brands:apple" /> <!-- fab fa-apple -->
```

Besides, a three letter prefix, first letter or full class name are also supported:

```md
<VPIcon icon="s:home" /> <!-- fas fa-home -->
<VPIcon icon="fas:home" /> <!-- fas fa-home -->
<VPIcon icon="fa-solid:home" /> <!-- fa-solid fa-home -->

<VPIcon icon="b:apple" /> <!-- fab fa-apple -->
<VPIcon icon="fab:apple" /> <!-- fab fa-apple -->
<VPIcon icon="fa-brands:apple" /> <!-- fa-brands fa-apple -->

<VPIcon icon="r:heart" /> <!-- far fa-heart -->
<VPIcon icon="far:heart" /> <!-- far fa-heart -->
<VPIcon icon="fa-regular:heart" /> <!-- fa-regular fa-heart -->
```

You can add other classes that fontawesome supports after the icon name and split them with a space, where `fa-` prefix is optional:

```md
<!-- a small size icon -->

<VPIcon icon="home fa-sm" /> <!-- fas fa-home fa-sm -->

<!-- rotate 180deg -->

<VPIcon icon="home rotate-180" /> <!-- fas fa-home fa-rotate-180 -->
```

See <https://docs.fontawesome.com/web/style/styling> for all available classes.

::: tip Fontaweome Kits and Pro features

By default, we use jsdelivr CDN to load V6 version of fontawesome free icons. This should be enough for most open source projects.

Besides, you can purchase at [fontawesome.com](https://fontawesome.com) to use kits.

Fontawesome kits with pro features support pro icons, more icon styles and uploading your own icons.

For details, please follow [fontawesome document](https://docs.fontawesome.com/).

- [Full Icon List](https://fontawesome.com/search)

:::

### Iconfont

[Iconfont](https://iconfont.cn) is a vector icon management and communication platform created by Alimama MUX.

Every designer can upload icons to Iconfont platform, and users are allow to create projects from these icons. The project can be used in a variety of formats.

### Generating Your Own Iconfont Links

#### Create a project

First, you need to create a new project to set and manage your website's icons:

1. Log in to Iconfont.
1. Find "Resources → My Projects" at the top of the website, and click the "New Project" icon in the upper right corner.
1. Set a recognizable project name
1. Fill in `FontClass/Symbol prefix` with `icon-`. You can also fill in according to your preference, but you need to manually set this value to `prefix` option with an extra `"iconfont"` class in the front, e.g.: `iconfont icon-`

![New Project](./assets/iconfont-new.png)

#### Import Icon

Search and find the icon you want to use, and click the "Add to Library" button on the icon

![Add to library](./assets/iconfont-add.png)

When you complete searching, click the "Add to Library" icon in the upper right corner, click "Add to Project" below, select the project you created then confirm.

#### Edit Icon

On the project page, you can edit the icons in the project, including adjustments with position, size, rotate, color, Unicode number and Font Class / Symbol.

![Edit icon](./assets/iconfont-edit.png)

#### Generate Links

Click the "Font Class" button above the project and click Generate.

![Generate link](./assets/iconfont-generate.png)

Then set `assets` option with the generated link.

::: tip

You need to regenerate and update the link every time you add a new icon.

:::

### Images

Images links are supported with any icon types (relative links are NOT supported).

```md
<!-- A full link -->
<VPIcon icon="https://example.com/icon.png" />

<!-- icon.png should be placed in .vuepress/public folder -->
<VPIcon icon="/icon.png" />
```

## Demo

- <VPIcon icon="mdi:home" color="blue" />: home icon
- <VPIcon icon="mdi:apple" size="2rem" vertical-align="text-bottom" />: apple icon

## Options

### assets

- Type: `IconAsset`

  ```ts
  export type BuiltInIcon =
    | 'fontawesome-with-brands'
    | 'fontawesome'
    | 'iconify'

  export type IconLink =
    | `//${string}`
    | `/${string}`
    | `http://${string}`
    | `https://${string}`

  export type IconAsset = (BuiltInIcon | IconLink)[] | BuiltInIcon | IconLink
  ```

- Details:

  Icon assets to be used.

  The following keywords are supported and you may use other CDN links or even your own.:

  - `iconify`: Iconify
  - `fontawesome`: Font Awesome free icons only
  - `fontawesome-with-brands`: Font Awesome free icons and brand icons

### type

- Type: `IconType`

  ```ts
  export type IconType = 'fontawesome' | 'iconfont' | 'iconify' | 'unknown'
  ```

- Default: Inferred from the `assets`

- Details:

  Type of the icon, the plugin will try to infer the type from the assets, and fallbacks to `unknown`.

  Notably, the plugin can recognize:

  - iconfont css links
  - fontawesome kits
  - CDN links for fontawesome and iconify

### prefix

- Type: `string`
- Default: Infer from the `assets` and `type`
- Details:

  Prefix for the icon component. By default, the plugin will use:

  - `iconfont icon-` for iconfont type
  - `fas fa-` for fontawesome type
  - empty string for all other types

### component

- Type: `string | null`
- Default: `VPIcon`
- Details:

  Name of the icon component. If set to `null`, the plugin will not register the icon component globally.

## Component Props

### icon

- Type: `string`
- Required: Yes
- Details: Icon name

### color

- Type: `string`
- Default: `'inherit'`
- Details: Color used for icon.

### size

- Type: `number | string`
- Default: `Current font size`
- Details: Icon size.

### verticalAlign

- Type: `string`
- Default: `-0.125em`
- Details: Vertical alignment of the icon.
