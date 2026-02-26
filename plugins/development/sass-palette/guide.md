---
url: /ecosystem/plugins/development/sass-palette/guide.md
---
# Guide

Compared to [`@vuepress/plugin-palette`](../palette.md), this plugin offers advanced styling capabilities:

* **Derived Styles:** Generate related styles based on user configuration.
* **Theme-like Customization:** Allow plugins to offer style customization similar to themes.
* **Style Isolation/Sharing:** Group applications across multiple plugins or themes via the `id` option.

To use this plugin effectively, you need to understand the **ID option** and three core styling concepts: **Configuration**, **Palette**, and **Generator**.

## ID Option

This plugin is designed to work across both plugins and themes (unlike the official palette plugin, which is restricted to themes).

The `id` option is the key mechanism for scoping. Calling `useSassPalette` creates a style system isolated by this ID. All generated aliases and module names will be prefixed with this ID.

This mechanism allows you to:

* **Share a style system:**
  By using the same ID, multiple plugins (or a theme and its plugins) can share variables.

  Since aliases are prefixed with the ID, you can use a unified set of style variables. Users can configure color variables, breakpoints, and other settings in a single file, and the changes will automatically apply to all themes and plugins using that ID.

  ::: tip Example
  `vuepress-theme-hope` uses the ID `hope`. Any plugin that also uses the ID `hope` will inherit the styles configured by the user for the theme.
  :::

* **Isolate styles:**
  By using different IDs, plugins will not affect each other. We recommend setting the `id` to your plugin name to ensure isolation.

  With default settings, users configure your plugin styles in the `.vuepress/styles` directory using Sass files starting with your ID. You access these variables via `${id}-config` and `${id}-palette`.

  ::: tip Example
  If `vuepress-theme-hope` uses ID `hope` and a separate plugin uses ID `abc`, they are completely independent. They access their specific variables via modules like `hope-config`/`hope-palette` and `abc-config`/`abc-palette` respectively.
  :::

* **Avoid side effects:**
  Calling the plugin multiple times with the same ID is safe and causes no conflicts.

## Config

The **Config** file is dedicated to **Sass variables**. These variables can be accessed via the `${id}-config` module.

You can specify a user configuration file (typically in `.vuepress/styles/`) and provide a default configuration file. The default file should use the `!default` flag to allow user overrides.

::: details Example

Invoking the plugin in `vuepress-plugin-abc`:

```js
useSassPalette(app, {
  id: 'abc',
  defaultConfig: 'vuepress-plugin-abc/styles/config.scss',
})
```

**User config file:**

```scss title=".vuepress/styles/abc-palette.scss"
$navbar-height: 3.5rem;
```

**Default config file:**

```scss title="vuepress-plugin-abc/styles/palette.scss"
$navbar-height: 2rem !default;
$sidebar-width: 18rem !default;
```

**Usage in plugin Sass files:**

```scss
// <style lang="scss"> block or directly imported scss
@debug abc-config.$navbar-height; // 3.5rem
@debug abc-config.$sidebar-width; // 18rem
```

:::

### Limitations

The plugin uses the `additionalData` option to inject the `${id}-config` module. This comes with limitations:

The `${id}-config` module is only available in:

* `<style lang="scss">` blocks in Vue SFC files.
* Sass files imported directly by script files (e.g., `import "./styles.scss"`).

If a Sass file is imported via `@use` or `@import` within another Sass file, the module will **not** be automatically available. In such cases, you must manually import it using `@use "@sass-palette/${id}-config";`.

## Palette

The **Palette** file is used for **CSS Variable** injection. Every variable defined here will be injected into the root stylesheet as a CSS variable with a kebab-case name.

The default user palette filename is `${id}-palette.scss`. Like the config file, you can provide a default palette file containing fallback values with `!default`.

::: details Example

Invoking the plugin in `vuepress-plugin-abc`:

```js
useSassPalette(app, {
  id: 'abc',
  defaultPalette: 'vuepress-plugin-abc/styles/palette.scss',
})
```

**User palette:**

```scss title=".vuepress/styles/abc-palette.scss"
$color-a: red;
```

**Default palette:**

```scss title="vuepress-plugin-abc/styles/palette.scss"
$color-a: blue !default;
$color-b: green !default;
```

**Resulting CSS:**

```scss
:root {
  --color-a: red;
  --color-b: green;
}
```

:::

The palette module is named `${id}-palette`. It shares the same `additionalData` limitations as the config module, requiring manual import in nested Sass files.

### Color Settings (Dark Mode)

To support light and dark modes, you can define color variables as a map containing `light` and `dark` keys. The plugin will automatically generate the appropriate CSS variables for each mode.

::: details Example

```scss
// User palette
$text-color: (
  light: #222,
  dark: #999,
);

// Default palette
$text-color: (
  light: #2c3e50,
  dark: #9e9e9e,
) !default;
$bg-color: (
  light: #fff,
  dark: #1e1e1e,
) !default;
```

**Generated CSS:**

```scss
:root {
  --text-color: #222;
  --bg-color: #fff;
}

[data-theme='dark'] {
  --text-color: #999;
  --bg-color: #1e1e1e;
}
```

:::

### Allowed Variable Types

Only **colors** (including light/dark maps), **lengths**, and **strings** are allowed in the palette. Other types will be discarded to ensure valid CSS variable generation.

:::: tip Why this limitation?

CSS variables usually represent visual properties (colors, dimensions). Restricting types prevents compilation errors. Complex values can still be passed as strings.

::: details Example

If you want a variable for transition properties:

```scss
// ❌ Incorrect: Regarded as a Sass list.
// Triggers a warning and will be dropped.
$moveTransition: width 0.3s ease;

// ✅ Correct: Wrapped in quotes.
// Result: :root { --move-transition: width 0.3s ease; }
$moveTransition: 'width 0.3s ease';
```

:::

::::

## Helper

The plugin exposes its internal Sass functions via a helper module. You can use this alias `@sass-palette/helper` to access utility functions for your own style logic.

## Generator

The **Generator** file allows you to create **derived values** based on variables from the palette or config files.

Variables defined in the generator are:

1. Injected as CSS variables (just like the Palette).
2. Available in the palette module for Sass usage.

::: details Example

You might need a lighter version of the user's theme color.

```scss
@use 'sass:color';
@use '@sass-palette/helper';

// Define a new variable based on an existing palette variable ($theme-color)
$theme-color-light: (
  light: color.scale(helper.get-color($theme-color), $lightness: 10%),
  dark: color.scale(helper.get-dark-color($theme-color), $lightness: 10%),
) !default;
```

You can also rely on config variables:

```scss
// Generator with id "abc"
@use 'sass:color';
@use '@sass-palette/abc-config';
@use '@sass-palette/helper';

$code-c-bg: abc-config.$highlighter == 'shiki'? #fff: #f8f8f8;
```

:::

## User Styles

Theme developers can use the `style` option to allow users to customize the site's appearance with standard CSS/Sass.

You must manually include the user style file by importing the alias `@sass-palette/${id}-style`. This should be imported **after** your theme's base styles to ensure user overrides take precedence.

::: tip
`@sass-palette/${id}-style` is a direct alias to the user's style file and can be imported in JS, TS, or Sass.
:::
