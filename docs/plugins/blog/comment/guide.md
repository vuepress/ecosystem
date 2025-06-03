---
icon: lightbulb
layout: CommentPage
---

# Guide

## Configuration

Configure the plugin with its options and client config file.

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

### Configuration Limitations

- **Plugin Options Only**: `provider`, locales, and resource-related options must be set in plugin options for tree-shaking optimization.

- **Client Config Only**: Function-based options must be set in client config as they cannot be serialized.

## Using Comments

The plugin registers a global `<CommentService />` component.

**For Users**: Use aliases and layout slots to insert the component. Recommended placement is after `<PageNav />`.

**For Theme Developers**: Insert the component in your theme layout.

### Comment Control

Control comments via plugin options or page frontmatter:

- **Global**: Set `comment: false` in plugin options to disable globally
- **Per Page**: Set `comment: true/false` in frontmatter to enable/disable locally
- **Custom ID**: Set `commentID` in frontmatter to customize comment storage identifier

## Available Providers

Choose from [Giscus](giscus/README.md), [Waline](waline/README.md), [Artalk](artalk/README.md), or [Twikoo](twikoo/README.md).

::: tip Recommendations

- **Developers**: Giscus (GitHub-based)
- **General Users**: Waline (full-featured)

:::

## Common Options

### provider <Badge text="Plugin Option Only" type="warning"/>

- Type: `"Artalk" | "Giscus" | "Twikoo" | "Waline" | "None"`
- Default: `"None"`
- Details: Comment service provider.

### comment

- Type: `boolean`
- Default: `true`
- Details: Whether to enable comment feature by default.
