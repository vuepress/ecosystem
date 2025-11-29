---
icon: lightbulb
layout: CommentPage
---

# Guide

## Configuration

The plugin offers flexible configuration through both the plugin options and the client configuration file.

### Using Plugin Options

```ts title=".vuepress/config.ts"
import { commentPlugin } from '@vuepress/plugin-comment'

export default {
  plugins: [
    commentPlugin({
      provider: 'Artalk', // Artalk | Giscus | Waline | Twikoo
      // provider-specific options
    }),
  ],
}
```

### Using Client Config

```ts title=".vuepress/client.ts"
import {
  defineArtalkConfig,
  // defineGiscusConfig,
  // defineTwikooConfig,
  // defineWalineConfig,
} from '@vuepress/plugin-comment/client'
import { defineClientConfig } from 'vuepress/client'

defineArtalkConfig({
  // options
})
```

### Configuration Logic

To ensure optimal performance and proper serialization, options are split between the plugin configuration and the client configuration:

- **Plugin Options**: Static options such as `provider`, `locales`, and resource links must be set here. This allows the bundler to perform **tree-shaking**, ensuring that code for unused providers is excluded from the final build.

- **Client Config**: Dynamic options, specifically those involving functions or callbacks, must be set here. Since these cannot be serialized in the main config, the client config serves as the runtime entry point.

## Component Usage

The plugin registers a global `<CommentService />` component that you can place anywhere in your layout.

**For Users**:
You can inject the component using aliases or layout slots provided by your theme. A common practice is to place it immediately after the `<PageNav />` component.

**For Theme Developers**:
You should include the `<CommentService />` component directly within your theme's layout files to provide built-in comment support.

### Visibility & Identification

You can control the visibility of the comment section and customize the unique identifier for each page:

- **Global Toggle**: Use the `comment` option in the plugin configuration to set the default visibility for the entire site.
- **Per-Page Toggle**: Use the `comment` key in the frontmatter to enable or disable comments for a specific page, overriding the global setting.
- **Custom Identifier**: Use the `commentID` key in the frontmatter to define a custom identifier for the page's comments (e.g., when migrating posts or changing URLs).

## Available Providers

We support the following comment services. Please refer to their respective guides for setup details: [Giscus](giscus/README.md), [Waline](waline/README.md), [Artalk](artalk/README.md), and [Twikoo](twikoo/README.md).

::: tip Recommendations

- **Giscus**: Ideal for **developers** and technical blogs, as it uses GitHub Discussions to store comments.
- **Waline**: A comprehensive choice for **general users**, offering a rich feature set and backend flexibility.

:::

## Common Options

### provider <Badge text="Plugin Option Only" type="warning"/>

- Type: `"Artalk" | "Giscus" | "Twikoo" | "Waline" | "None"`
- Default: `"None"`
- Details: The comment service provider to use.

### comment

- Type: `boolean`
- Default: `true`
- Details: Whether to enable the comment feature globally by default.
