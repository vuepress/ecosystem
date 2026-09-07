---
url: /plugins/blog/comment/artalk/index.md
---
# Artalk

Artalk is a clean self-hosted commenting system that you can easily deploy on your server and integrate into your front-end pages.

Deploy the Artalk comment box on your blog or any other page to add rich social functionality.

## Install

```bash
npm i -D artalk
```

## Deploy Artalk Server

See the [Artalk documentation](https://artalk.js.org/guide/deploy.html).

## Configuration

Please set `provider: "Artalk"` and pass your server link to `server` in the plugin options.

For other configuration items, see [Artalk Config](./config.md).

::: tip

The plugin retains the `el` option and inserts Artalk itself on the page. At the same time, the plugin will automatically set the `pageTitle`, `pageKey` and `site` options for you according to the VuePress information.

:::

## Dark Mode

To let Artalk apply the correct theme, you need to pass a boolean value to `<CommentService />` through `darkmode` prop, representing whether the dark mode is currently enabled.
