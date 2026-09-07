---
url: /plugins/blog/feed/guide.md
---
# Guide

## Usage

The plugin generates feeds in the following three formats:

* Atom 1.0
* JSON 1.1
* RSS 2.0

Enable the formats you need by setting `atom`, `json`, or `rss` to `true` in the plugin options.

To ensure feed links are generated correctly, the `hostname` option is required.

## Readable Preview

Atom and RSS feeds include XSL templates, allowing them to be rendered as human-readable HTML when opened in a browser. Check out the [atom](/atom.xml) and [rss](/rss.xml) feeds of this site for a live demo.

To preview feeds in your development environment, set `devServer: true` in the plugin options. If your local setup differs from the default `http://localhost:{port}`, you should also configure `devHostname`.

## Channel Settings

You can customize global feed metadata via the `channel` option.

We recommend configuring the following fields:

* `channel.pubDate`: Set to the current ISOString to indicate the feed generation time.
* `channel.ttl`: Define the content update frequency (in minutes).
* `channel.copyright`: Specify copyright information.
* `channel.author`: Set the default author for the channel.

For a complete list of options and their default values, please refer to [Channel Config](./channel.md).

## Feed Generation

By default, all articles are included in the feed.

You can control individual feed items using the `feed` option in the page frontmatter. See [Frontmatter Config](./frontmatter.md) for mapping details.

For complete control over the item generation logic, you can configure the `getter` function in the plugin options. See [Configuration → Feed Getter](./getter.md) for details.

### I18n Support

The plugin automatically generates separate feeds for each language.

You can provide language-specific configurations via the `locales` option.
