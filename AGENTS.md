# VuePress Ecosystem — Agent Guide

This document provides guidance for AI agents working on the **VuePress Ecosystem** monorepo. Read it before making any changes.

## Content Rules

Concise, clear, essential information only, with no typos or grammar errors.

## Repository Overview

This is a [pnpm workspaces](https://pnpm.io/workspaces) monorepo that contains the official VuePress 2 plugins, themes, and tooling. All published packages are under the `@vuepress/` scope (except `create-vuepress` and `vp-update`), and the workspace also includes some private / non-published packages.

```plain
plugins/      # Official plugins (grouped into sub-categories)
themes/       # Official themes
tools/        # CLI tools and shared helpers
docs/         # Documentation site (VuePress site)
e2e/          # End-to-end Playwright tests
scripts/      # Shared build scripts (tsdown config, release helpers)
```

## Requirements

- **Node.js** ≥ 22.12.0
- **pnpm** ≥ 10 (`packageManager` is pinned in `package.json`)

## Essential Commands

| Command               | What it does                                                  |
| --------------------- | ------------------------------------------------------------- |
| `pnpm run bundle`     | Build every package with `tsdown` (required before e2e tests) |
| `pnpm run test:unit`  | Run Vitest unit tests                                         |
| `pnpm run test:e2e`   | Run Playwright e2e tests                                      |
| `pnpm run test`       | Run `test:unit` + `test:e2e`                                  |
| `pnpm run lint`       | OxLint + Oxfmt + Stylelint (auto-fix)                         |
| `pnpm run lint:check` | Same checks without auto-fix                                  |
| `pnpm run format`     | Format all files with Oxfmt                                   |
| `pnpm run clean`      | Delete all `dist/` outputs                                    |
| `pnpm run type:check` | TypeScript type checking (no emit)                            |

> **Important:** All packages compile TypeScript to `./dist/` via `tsdown`. The `dist/` directories are git-ignored. Run `pnpm bundle` before running e2e tests or working with the docs site. Unit tests (`pnpm test:unit`) run Vitest directly against TypeScript sources via aliases and do **not** require a build step.

## Directory Structure

### `plugins/`

Plugins are grouped into sub-categories:

| Category       | Plugins                                                                                                                                                                                                                                                                                                                                                                                                             |
| -------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `ai/`          | `plugin-llms` — generates `llms.txt` / `llms-full.txt` for LLM crawlers                                                                                                                                                                                                                                                                                                                                             |
| `analytics/`   | `plugin-baidu-analytics`, `plugin-clarity-analytics`, `plugin-google-analytics`, `plugin-umami-analytics`                                                                                                                                                                                                                                                                                                           |
| `blog/`        | `plugin-blog`, `plugin-comment`, `plugin-feed`                                                                                                                                                                                                                                                                                                                                                                      |
| `development/` | `plugin-active-header-links`, `plugin-git`, `plugin-palette`, `plugin-reading-time`, `plugin-rtl`, `plugin-sass-palette`, `plugin-theme-data`, `plugin-toc`                                                                                                                                                                                                                                                         |
| `features/`    | `plugin-back-to-top`, `plugin-catalog`, `plugin-copy-code`, `plugin-copyright`, `plugin-icon`, `plugin-medium-zoom`, `plugin-notice`, `plugin-nprogress`, `plugin-photo-swipe`, `plugin-watermark`                                                                                                                                                                                                                  |
| `markdown/`    | `plugin-append-date`, `plugin-links-check`, `plugin-markdown-chart`, `plugin-markdown-container`, `plugin-markdown-ext`, `plugin-markdown-field`, `plugin-markdown-file-tree`, `plugin-markdown-hint`, `plugin-markdown-image`, `plugin-markdown-include`, `plugin-markdown-math`, `plugin-markdown-preview`, `plugin-markdown-stylize`, `plugin-markdown-tab`, `plugin-prismjs`, `plugin-revealjs`, `plugin-shiki` |
| `pwa/`         | `plugin-pwa`, `plugin-remove-pwa`                                                                                                                                                                                                                                                                                                                                                                                   |
| `search/`      | `plugin-docsearch`, `plugin-meilisearch`, `plugin-search`, `plugin-slimsearch`, `plugin-orama`, `plugin-flexsearch`                                                                                                                                                                                                                                                                                                 |
| `seo/`         | `plugin-seo`, `plugin-sitemap`                                                                                                                                                                                                                                                                                                                                                                                      |
| `tools/`       | `plugin-auto-frontmatter`, `plugin-cache`, `plugin-google-tag-manager`, `plugin-redirect`, `plugin-register-components`, `plugin-replace-assets`                                                                                                                                                                                                                                                                    |

### `themes/`

- `theme-default` — The official VuePress default theme (`@vuepress/theme-default`)

### `tools/`

| Package                                               | Description                                                    |
| ----------------------------------------------------- | -------------------------------------------------------------- |
| `helper` (`@vuepress/helper`)                         | Shared utilities for node, client, and shared environments     |
| `highlighter-helper` (`@vuepress/highlighter-helper`) | Shared utilities for syntax highlighter plugins (Shiki, Prism) |
| `search-helper` (`@vuepress/search-helper`)           | Shared utilities for local search plugins (SlimSearch, Orama)  |
| `shiki-twoslash` (`@vuepress/shiki-twoslash`)         | TwoSlash integration for the Shiki plugin                      |
| `create-vuepress`                                     | CLI scaffolding tool (`npm create vuepress`)                   |
| `vp-update` (`vp-update`)                             | CLI for updating VuePress project dependencies                 |

## Package Anatomy

Each plugin/theme follows this layout:

```plain
src/
  client/      # Browser-only code (Vue components, composables, styles)
  node/        # Node.js-only code (plugin factory, markdown-it extensions)
  shared/      # Code that runs in both environments (types, constants, utils)
  index.ts     # Re-exports node entry (consumed by VuePress core)
tests/         # Vitest unit tests (*.spec.ts)
tsdown.config.ts   # Per-package tsdown build config (imports tsdownConfig from scripts/)
package.json
```

All source files are in `src/`.

Plugins that must inject client-side styles or register components **conditionally** based on options use a `src/node/prepareClientConfigFile.ts` that generates a client config at build time. It returns `app.writeTemp('<plugin>/config.js', ...)` and the plugin exposes it via `clientConfigFile: () => prepareClientConfigFile(app, options)`. This is required when the set of imports depends on options (e.g. only import a style when the matching option is enabled); otherwise use a static `src/client/config.ts`.

## Coding Standards

### Import / Export Rules

- **Relative imports must use `.js` extension** even though the source files are `.ts`:

  ```ts
  import { foo } from './utils.js' // ✅
  import { foo } from './utils' // ❌
  ```

- **No cross-folder imports** between `client`, `node`, and `shared`:
  - `client/` — no Node.js APIs, no imports from `node/`
  - `node/` — no browser APIs, no imports from `client/`
  - `shared/` — no Node.js or browser APIs, no imports from `client/` or `node/`
- **No bundled external dependencies** — the `bundle` command must not emit warnings about bundled externals.
- **Avoid shadowing imports with option names** — when a plugin option shares a name with an imported markdown-it plugin (e.g. `steps`), alias the import: `import { steps as stepsPlugin } from './steps.js'`.

### CSS / SCSS

- All CSS classes must start with the `vp-` prefix (e.g. `vp-copy-code`).
  - **Exception:** Classes for third-party integrations (e.g. `waline-wrapper`).
- CSS custom property naming:
  - Color variables must contain `-c-` (e.g. `--vp-c-brand`).
  - Plugin-scoped variables are prefixed with the plugin name.
  - Theme-scoped variables are prefixed with `vp-`.
  - Icon variables inside class definitions must use `--icon`.
- Reuse theme-default CSS variables instead of hardcoding colors. Commonly used: `--vp-c-bg-alt`, `--vp-c-bg-elv`, `--vp-c-text`, `--vp-c-text-mute`, `--vp-c-divider`, `--vp-c-border`, `--vp-c-accent`, `--vp-c-shadow`, `--vp-t-color`, `--vp-t-transform`.
- Use logical properties (`inset-inline-start`, `padding-inline-start`, `margin-inline-start`) rather than `left`/`right` physical properties to support RTL.
- SCSS files that use `@use 'pkg:@vuepress/helper'` require the package to declare `@vuepress/helper` as a runtime `dependency` or `peerDependency` in its `package.json` (not only as a `devDependency`), so downstream SCSS builds can resolve the import.

### TypeScript / JSDoc

- All user-visible exports **must have JSDoc comments**.
  - Comments are **bilingual**: English description first, then Chinese, separated by a blank line.
  - Include `@param` (bilingual, separated with `/`) for every parameter.
  - Include `@returns` (bilingual) for every non-`void` return value.
  - Include `@default` for every option that has a default value (including `@default false`).
  - Include `@example` only on exported functions.
  - `@description` is optional — add only when extra explanation is genuinely needed.
- Internal implementations do not require JSDoc, but existing ones must remain correct.
- Plugin entrypoint files (`*Plugin.ts`, `*Theme.ts`) are exempt from `@param` / `@returns` and complexity rules.

**JSDoc template:**

```typescript
/**
 * English description
 *
 * (optional) English detailed description
 *
 * 中文描述
 *
 * （可选）中文详细描述
 *
 * @param paramName - English description / 中文描述
 *
 * @default defaultValue
 * @example
 *   // Example code in TypeScript
 */
```

### Commit Messages

Commits follow [Conventional Commits](https://www.conventionalcommits.org/). The allowed scopes are the package directory names (e.g. `plugin-shiki`, `theme-default`, `helper`) plus `e2e` and `release`. Examples:

```plain
feat(plugin-shiki): add line number toggle
fix(theme-default): correct sidebar scroll position
chore(e2e): update playwright version
```

### Export Requirements

- Plugin and theme factory exports:
  - The exported function name must match the package name (camelCase, e.g. `pluginShiki`, `themeDefault`).
  - All types used in the public API must also be exported from the package index.
- Single-function files: the filename must match the exported function/class name.

## Build System

All packages use a shared `tsdownConfig` factory defined in `scripts/tsdown.ts`:

- Output format: **ESM only** (`format: 'esm'`).
- Output directory: `./dist/` per package.
- Source maps are always emitted; code is minified in production (`NODE_ENV=production`).
- CSS is processed by the `@tsdown/css` plugin with SCSS support via `sass-embedded`. CSS chunks are split and emitted as separate files.
- Packages that emit CSS must declare `"./dist/**/*.css"` in `sideEffects` in `package.json`.
- To emit SCSS/CSS from `src/client/styles/`, add a wildcard entry to `tsdown.config.ts`: `tsdownConfig(['node/index', { 'client/styles/*': './src/client/styles/*.scss' }])`. The CSS lands in `dist/client/styles/*.css`.
- If a CSS chunk must be importable at runtime (e.g. from a generated client config), map it in `package.json` `exports`, e.g. `"./<name>.css": "./dist/client/styles/<name>.css"`, and reference it with `getModulePath('<pkg>/<name>.css', import.meta)` from `@vuepress/helper`.
- The `tsdownConfig` helper accepts `onlyBundle`, `alwaysBundle`, and `neverBundle` options for fine-grained dependency bundling control. Modules starting with `@internal/` and `@temp/` are never bundled.
- `pnpm run type:check` resolves `@vuepress/<plugin-name>` from the package `dist/`, so build the affected package (`pnpm --filter <pkg> build`) before type-checking.

## Testing

- **Unit tests**: located at `<package>/tests/**/*.spec.ts`, run with Vitest (`pnpm test:unit`).
- **E2e tests**: located in `e2e/`, run with Playwright (`pnpm test:e2e`).
- Vitest aliases resolve `@vuepress/<plugin-name>` directly to the TypeScript source so you do not need to build before unit testing an individual package.
- Time-sensitive tests should be run with `TZ=Etc/UTC` (already set by the `test:unit` script).

### Writing a unit test

`vuepress/client` cannot be imported on its own, because it reads generated modules and compile-time defines at module scope. `@vuepress/test-utils` makes it importable: its Vite plugin (`vuepressTestPlugin()`) is installed in the root `vitest.config.ts`, so it applies to every unit test.

- `renderVuePress()` renders the client app to a string and works in the `node` environment. `mountVuePress()` mounts it with `@vue/test-utils` and needs a DOM, so put `// @vitest-environment happy-dom` as the very first line of the file, before every import, or Vitest does not read it. Both accept `content` (the page chunk), `rootComponent` (render a single component without a layout) and `clientConfigs` (the plugin and theme client configs). Use `renderVuePress()` when the test does not interact with the DOM.
- Node helpers are exported from `@vuepress/test-utils`: `createTestApp()` builds an app with a temporary source directory, an empty theme and an empty bundler; `createTestMarkdown()` and `createTestPage()` cover the markdown and page sides; `mockLogger()` silences the logs and returns spies.
- Plugin options reach the client through `define` globals rather than props. Read them from the real plugin with `collectClientDefines(app)` and apply them with `stubClientDefines(defines)`.
- Generated modules (`@internal/*`, `@temp/*`) and sub-path aliases that only exist at build time (e.g. `@vuepress/plugin-comment/service`) do not exist in a unit test. Register them with `stubModule()` or `stubTempModule()`, or map them in the `resolve` option of `vuepressTestPlugin()` when they must be imported statically.
- Test the dark mode with `setColorMode()` from `@vuepress/test-utils/client`, which stubs the `(prefers-color-scheme: dark)` media query and the `vuepress-color-scheme` storage key.
- Vite resolves imports when a module is transformed, which happens before the test runs. A module that reads a define, a generated module or the color mode at module scope must be imported dynamically after the stub, with `vi.resetModules()` when it may already be cached.

### What to assert

Assert the observable behavior and the design intent, not the current implementation. A test that merely restates the implementation passes even when the implementation is wrong. Prefer the public API and the rendered output, and verify that a new test fails before committing it.

## Adding or Modifying Packages

1. Create the package directory under the appropriate `plugins/<category>/`, `themes/`, or `tools/` subfolder.
2. Add a `package.json` with `name`, `version`, `description`, `type: "module"`, and the standard `exports` / `files` fields (reference an existing package).
3. Add a `tsdown.config.ts` that calls `tsdownConfig(...)` from `../../scripts/tsdown.ts` (adjust the relative path as needed).
4. Write source in `src/{client,node,shared}/` following the API usage restrictions above.
5. Export everything from `src/index.ts`.
6. Add unit tests under `tests/`.

## Documentation

The documentation site lives in `docs/` and is built with VuePress. Each plugin has English and Chinese documentation pages. When changing plugin options or behavior, update the matching docs.

### General Requirements

- Consistent with code behaviors
- Chinese/English content must be consistent in structure and content
- Keep content concise and clear, prefer shorter over longer
- Use "你" instead of "您" in Chinese
- Ignore errors from the `@[code ...` import grammar, which is not standard markdown.
- Ignore errors from VuePress components in markdown, which are valid in VuePress but not standard markdown.
- Always keep a blank line before a container closing marker (`:::`, `::::`). Without it oxfmt treats the marker as a list continuation and drops it, leaving the container unclosed.
- Do not repeat the built-in locale data of a plugin in its documentation. Link to [Locales](docs/plugins/supported-locales.md) instead.

### Locale Data

Each plugin stores its built-in translations in `src/node/locales.ts` as a `DefaultLocaleInfo<T>` table. Every plugin must ship **all** of the supported languages, in the canonical order below, so a site works the same no matter which plugin it uses.

| #   | Language                | Locale codes             | Endonym              |
| --- | ----------------------- | ------------------------ | -------------------- |
| 1   | English (United States) | `en`, `en-US`            | English              |
| 2   | Simplified Chinese      | `zh`, `zh-CN`, `zh-Hans` | 简体中文             |
| 3   | Traditional Chinese     | `zh-TW`, `zh-Hant`       | 繁體中文             |
| 4   | German                  | `de`, `de-DE`            | Deutsch              |
| 5   | German (Austria)        | `de-AT`                  | Deutsch (Österreich) |
| 6   | Vietnamese              | `vi`, `vi-VN`            | Tiếng Việt           |
| 7   | Ukrainian               | `uk`, `uk-UA`            | Українська           |
| 8   | Russian                 | `ru`, `ru-RU`            | Русский              |
| 9   | Portuguese              | `pt`, `pt-PT`            | Português            |
| 10  | Portuguese (Brazil)     | `pt-BR`                  | Português (Brasil)   |
| 11  | Polish                  | `pl`, `pl-PL`            | Polski               |
| 12  | Slovak                  | `sk`, `sk-SK`            | Slovenčina           |
| 13  | French                  | `fr`, `fr-FR`            | Français             |
| 14  | Spanish                 | `es`, `es-ES`            | Español              |
| 15  | Italian                 | `it`, `it-IT`            | Italiano             |
| 16  | Japanese                | `ja`, `ja-JP`            | 日本語               |
| 17  | Turkish                 | `tr`, `tr-TR`            | Türkçe               |
| 18  | Korean                  | `ko`, `ko-KR`            | 한국어               |
| 19  | Finnish                 | `fi`, `fi-FI`            | Suomi                |
| 20  | Hungarian               | `hu`, `hu-HU`            | Magyar               |
| 21  | Indonesian              | `id`, `id-ID`            | Bahasa Indonesia     |
| 22  | Dutch                   | `nl`, `nl-NL`            | Nederlands           |

Rules:

- **Order**: write the entries in the order above. Never reorder an existing table.
- **Codes**: a language code must be a valid BCP 47 tag. `ko-KR` is Korean, not `ko-KO`; Brazilian Portuguese is `pt-BR`, not `br`. Include the language code and the region/variant codes a user may set as `lang`, so that exact and short-code lookup both hit.
- **Fields**: every entry has exactly the same fields as the first one. Do not omit a field in a language; translate it.
- **Placeholders**: keep every placeholder unchanged in shape — `$1`, `$word`, `$time`, `:author`, `:license`, `:link`. Only the surrounding text is translated. A placeholder may take language-specific suffixes (e.g. Finnish `$1:een`).
- **Endonyms**: the value of a `name` field is the language's own name, from the table above.
- **Translation quality**: translate the meaning and the tone of the English entry. Keep it concise; UI text should be no longer than needed. Do not translate product names (`VuePress`, `Markdown`, `Reveal.js`, ...).
- **Docs**: `docs/plugins/supported-locales.md` (and its Chinese counterpart) is the single place that lists the languages. Plugin pages must link to it instead of repeating the list.

### Page Structure

Feature descriptions and option references are separated, so that the options section stays short:

- `## Usage`: install command and a minimal config example.
- `## Guide`: one `###` section per feature, explaining what it does and how to use it, with syntax examples and `::: preview` demos. This is where behavior, syntax markers and caveats belong.
- `## Options`: only what each option configures, its type and its default. Link to the matching guide section with `See also: [Title](#anchor).` / `参考：[标题](#锚点)。` instead of repeating the explanation.

### Options Documentation Format

Options are documented with the `::: fields` container provided by `@vuepress/plugin-markdown-field`, not with `###` headings and `- Type:` lists.

```md
## Options

::: fields
@`optionName` type=boolean default=`true`

Whether to enable this feature.

@`requiredOption` type=string required

The required configuration.

@`optionWithNonStandardDefault` type=number default=`100`

Custom timeout value.

@`objectOption` type=`SomeOptions | boolean`

Whether to enable this feature. You can also pass an object to configure it.

@@`objectOption.child` type=string

A child option of `objectOption`.

:::
```

**Field items**

- A field item is a line starting with `@` followed by an inline code (the name, closed on the same line), then its attributes.
- The content after the marker, until the next field item or the closing marker, is the description. It supports full markdown, including lists, code fences and containers.
- Sub-options of an object option are nested by adding one more `@`: `` @@`parent.child` ``. Nesting is also used to expand a type definition instead of pasting a TypeScript interface in a code fence.
- When a path goes into an array of objects, append `[*]` to every indexed level so it reads as a member type rather than a single value, e.g. `` @@`contributors.info[*].username` `` for `contributors.info: ContributorInfo[]`, or `` @@@`config[*].actions[*].text` `` for `config: NoticeOptions[]` with `actions: NoticeActionOption[]`.
- When a path goes into a `Record<string, T>`, use a placeholder for the key, e.g. `` @@`locales.<localePath>.title` `` for `locales: LocaleConfig<...>`, where the key is a locale path (`/`, `/zh/`, ...). `LocaleConfig<T>` and `ExactLocaleConfig<T>` are both `Record<string, T>`, so they always need this level.
- Content that applies to the parent option as a whole — a list of accepted values, a note about the option group — belongs right after the parent field's own description, **before** the first sub-field. After the last sub-field it reads as if it belonged to that sub-option.
- Each field item gets a unique `id` from its name, so it can be linked to directly. Ids already used by headings are reserved first, so avoid naming a guide heading the same as an option (its id would get a `-1` suffix). `[*]` and `<...>` are stripped when generating the id.

**Descriptions**

- State the unit whenever the value is not unitless, e.g. `delay` in milliseconds, `offset` in pixels, a size in pixels, a duration in seconds. Write it in the sentence rather than in the type, e.g. `The delay in milliseconds of the debounced scroll event listener.`

**Attributes**

- `type`: the option type. Always rendered as inline code.
- `default`: the default value. Rendered as inline code **only when wrapped in backticks**, and as plain text otherwise.
- `required`, `optional`, `deprecated`: rendered as badges. A deprecated field's name is colored red and struck through.
- Any other attribute is rendered as a `Name: value` badge, which is useful for marking conditional support, e.g. `gfm=Yes`.

**Attribute values**

An unquoted value ends at the first whitespace, so values containing spaces must be quoted. Prefer the shortest form that parses correctly:

- Unquoted when the value has no whitespace and no quote, e.g. `type=boolean`, `default=true`, `default={}`.
- Backticks for literal values, especially `default`, so that they render as inline code and no escaping is applied, e.g. `` default=`'nord'` ``, `` type=`boolean | 'error'` ``.
- Double quotes for descriptive text, which renders as plain text and supports escaping with `\`, e.g. `default="Determined by the theme, set it explicitly to override"`.

**Defaults**

- Include `default` when the value is not the expected/obvious one.
- Omit `default` when it is expected/obvious: `boolean` options defaulting to `false`, `string` options defaulting to `''`, and `object` options defaulting to `undefined`.
- A multi-line default cannot be written as an attribute. Describe it in the field content instead, e.g. `Its default value is:` followed by a code fence.

**Escaping**

- To keep a marker-like line as content, escape the `@`: `` \@`not-a-field` ``.

**Containers inside fields**

- Use one more colon for the fields container when it contains a `:::` container, e.g. `:::: fields` with `::: tip` inside, closed by `::::`.

## CI

The following table covers the PR / build / release workflows. The repo also has issue-triage automation (`issue-commented.yml`, `issue-daily.yml`, `issue-labeled.yml`) which are not relevant to code changes.

| Workflow       | Trigger        | What it does                       |
| -------------- | -------------- | ---------------------------------- |
| `check.yml`    | Push / PR      | Lint, type-check, unit tests       |
| `e2e.yml`      | Push / PR      | Playwright e2e tests (dev + build) |
| `coverage.yml` | Push to `main` | Code coverage report (Coveralls)   |
| `docs.yml`     | Push to `main` | Deploys the documentation site     |
| `release.yml`  | Manual         | Full release pipeline              |
