# VuePress Ecosystem — Agent Guide

This document provides guidance for AI agents working on the **VuePress Ecosystem** monorepo. Read it before making any changes.

## Repository Overview

This is a [pnpm workspaces](https://pnpm.io/workspaces) monorepo that contains the official VuePress 2 plugins, themes, and tooling. All packages are published under the `@vuepress/` scope (except `create-vuepress` and `vp-update`).

```
plugins/      # Official plugins (grouped into sub-categories)
themes/       # Official themes
tools/        # CLI tools and shared helpers
docs/         # Documentation site (VuePress site)
e2e/          # End-to-end Playwright tests
scripts/      # Shared build scripts (tsdown config, release helpers)
```

## Requirements

- **Node.js** ≥ 20.19.0 or ≥ 22.12.0
- **pnpm** ≥ 10 (`packageManager` is pinned in `package.json`)

## Essential Commands

| Command | What it does |
|---|---|
| `pnpm install` | Install all dependencies |
| `pnpm bundle` | Build every package with `tsdown` (required before tests run) |
| `pnpm test:unit` | Run Vitest unit tests |
| `pnpm test:e2e` | Run Playwright e2e tests |
| `pnpm test` | Run `test:unit` + `test:e2e` |
| `pnpm lint` | OxLint + Oxfmt + Stylelint (auto-fix) |
| `pnpm lint:check` | Same checks without auto-fix |
| `pnpm format` | Format all files with Oxfmt |
| `pnpm clean` | Delete all `dist/` outputs |
| `pnpm type:check` | TypeScript type checking (no emit) |

> **Important:** All packages compile TypeScript to `./dist/` via `tsdown`. The `dist/` directories are git-ignored. Run `pnpm bundle` after cloning or cleaning before running tests.

## Directory Structure

### `plugins/`

Plugins are grouped into sub-categories:

| Category | Plugins |
|---|---|
| `ai/` | `plugin-llms` — generates `llms.txt` / `llms-full.txt` for LLM crawlers |
| `analytics/` | `plugin-baidu-analytics`, `plugin-clarity-analytics`, `plugin-google-analytics`, `plugin-umami-analytics` |
| `blog/` | `plugin-blog`, `plugin-comment`, `plugin-feed` |
| `development/` | `plugin-active-header-links`, `plugin-git`, `plugin-palette`, `plugin-reading-time`, `plugin-rtl`, `plugin-sass-palette`, `plugin-theme-data`, `plugin-toc` |
| `features/` | `plugin-back-to-top`, `plugin-catalog`, `plugin-copy-code`, `plugin-copyright`, `plugin-icon`, `plugin-medium-zoom`, `plugin-notice`, `plugin-nprogress`, `plugin-photo-swipe`, `plugin-watermark` |
| `markdown/` | `plugin-append-date`, `plugin-links-check`, `plugin-markdown-chart`, `plugin-markdown-container`, `plugin-markdown-ext`, `plugin-markdown-file-tree`, `plugin-markdown-hint`, `plugin-markdown-image`, `plugin-markdown-include`, `plugin-markdown-math`, `plugin-markdown-preview`, `plugin-markdown-stylize`, `plugin-markdown-tab`, `plugin-prismjs`, `plugin-revealjs`, `plugin-shiki` |
| `pwa/` | `plugin-pwa`, `plugin-remove-pwa` |
| `search/` | `plugin-docsearch`, `plugin-meilisearch`, `plugin-search`, `plugin-slimsearch` |
| `seo/` | `plugin-seo`, `plugin-sitemap` |
| `tools/` | `plugin-auto-frontmatter`, `plugin-cache`, `plugin-google-tag-manager`, `plugin-redirect`, `plugin-register-components`, `plugin-replace-assets` |

### `themes/`

- `theme-default` — The official VuePress default theme (`@vuepress/theme-default`)

### `tools/`

| Package | Description |
|---|---|
| `helper` (`@vuepress/helper`) | Shared utilities for node, client, and shared environments |
| `highlighter-helper` (`@vuepress/highlighter-helper`) | Shared utilities for syntax highlighter plugins (Shiki, Prism) |
| `shiki-twoslash` (`@vuepress/shiki-twoslash`) | TwoSlash integration for the Shiki plugin |
| `create-vuepress` | CLI scaffolding tool (`npm create vuepress`) |
| `vp-update` (`vp-update`) | CLI for updating VuePress project dependencies |

## Package Anatomy

Each plugin/theme follows this layout:

```
src/
  client/      # Browser-only code (Vue components, composables, styles)
  node/        # Node.js-only code (plugin factory, markdown-it extensions)
  shared/      # Code that runs in both environments (types, constants, utils)
  index.ts     # Re-exports node entry (consumed by VuePress core)
tests/         # Vitest unit tests (*.spec.ts)
tsdown.config.ts   # Per-package tsdown build config (imports tsdownConfig from scripts/)
package.json
```

All source files are in `src/`. Compiled output goes to `dist/` (git-ignored).

## Coding Standards

### Import / Export Rules

- **Relative imports must use `.js` extension** even though the source files are `.ts`:
  ```ts
  import { foo } from './utils.js'  // ✅
  import { foo } from './utils'     // ❌
  ```
- **No cross-folder imports** between `client`, `node`, and `shared`:
  - `client/` — no Node.js APIs, no imports from `node/`
  - `node/` — no browser APIs, no imports from `client/`
  - `shared/` — no Node.js or browser APIs, no imports from `client/` or `node/`
- **No bundled external dependencies** — the `bundle` command must not emit warnings about bundled externals.

### CSS / SCSS

- All CSS classes must start with the `vp-` prefix (e.g. `vp-copy-code`).
  - **Exception:** Classes for third-party integrations (e.g. `waline-wrapper`).
- CSS custom property naming:
  - Color variables must contain `-c-` (e.g. `--vp-c-brand`).
  - Plugin-scoped variables are prefixed with the plugin name.
  - Theme-scoped variables are prefixed with `vp-`.
  - Icon variables inside class definitions must use `--icon`.
- SCSS files that use `@use 'pkg:@vuepress/helper'` require the package to declare `@vuepress/helper` as a runtime `dependency` or `peerDependency` in its `package.json` (not only as a `devDependency`), so downstream SCSS builds can resolve the import.

### TypeScript / JSDoc

- All user-visible exports **must have JSDoc comments**.
  - Comments are **bilingual**: English description first, then Chinese, separated by a blank line.
  - Include `@param` (bilingual, separated with ` / `) for every parameter.
  - Include `@returns` (bilingual) for every non-`void` return value.
  - Include `@default` for every option that has a default value.
  - Include `@example` only on exported functions.
- Internal implementations do not require JSDoc, but existing ones must remain correct.
- Plugin entrypoint files (`*Plugin.ts`, `*Theme.ts`) are exempt from `@param` / `@returns` and complexity rules.

### Commit Messages

Commits follow [Conventional Commits](https://www.conventionalcommits.org/). The allowed scopes are the package directory names (e.g. `plugin-shiki`, `theme-default`, `helper`) plus `e2e` and `release`. Examples:

```
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
- The `tsdownConfig` helper accepts `onlyBundle`, `alwaysBundle`, and `neverBundle` options for fine-grained dependency bundling control. Modules starting with `@internal/` and `@temp/` are never bundled.

## Testing

- **Unit tests**: located at `<package>/tests/**/*.spec.ts`, run with Vitest (`pnpm test:unit`).
- **E2e tests**: located in `e2e/`, run with Playwright (`pnpm test:e2e`).
- Vitest aliases resolve `@vuepress/<plugin-name>` directly to the TypeScript source so you do not need to build before unit testing an individual package.
- Time-sensitive tests should be run with `TZ=Etc/UTC` (already set by the `test:unit` script).

## Adding or Modifying Packages

1. Create the package directory under the appropriate `plugins/<category>/`, `themes/`, or `tools/` subfolder.
2. Add a `package.json` with `name`, `version`, `description`, `type: "module"`, and the standard `exports` / `files` fields (reference an existing package).
3. Add a `tsdown.config.ts` that calls `tsdownConfig(...)` from `../../scripts/tsdown.ts` (adjust the relative path as needed).
4. Write source in `src/{client,node,shared}/` following the API usage restrictions above.
5. Export everything from `src/index.ts`.
6. Add unit tests under `tests/`.

## Documentation

The documentation site lives in `docs/` and is built with VuePress. Each plugin has English and Chinese documentation pages. When changing plugin options or behaviour, update the matching docs. Documentation rules:

- Content must be consistent between English and Chinese versions.
- Use `你` (not `您`) in Chinese text.
- Option documentation order: **Type → Required (only if required) → Default (only if non-obvious) → Details**.
- Omit `Default: false` for boolean options and `Default: ''` for string options.

## CI

| Workflow | Trigger | What it does |
|---|---|---|
| `check.yml` | Push / PR | Lint, type-check, unit tests |
| `e2e.yml` | Push / PR | Playwright e2e tests (dev + build) |
| `coverage.yml` | Push to `main` | Code coverage report (Coveralls) |
| `docs.yml` | Push to `main` | Deploys the documentation site |
| `release.yml` | Manual | Full release pipeline |
