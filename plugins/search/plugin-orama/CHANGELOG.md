# Change Log

All notable changes to this project will be documented in this file. See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [2.0.0-rc.138](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.137...v2.0.0-rc.138) (2026-11-13)

### ⚠ BREAKING CHANGES

- rename search index fields to full names ([#938](https://github.com/vuepress/ecosystem/issues/938))

### ✨ Features

- add flexsearch plugin ([#934](https://github.com/vuepress/ecosystem/issues/934)) ([aee5b03](https://github.com/vuepress/ecosystem/commit/aee5b0334278ea1f21c5b0c0418f594524604eea))
- support rspack bundler and upgrade dependencies ([#1100](https://github.com/vuepress/ecosystem/issues/1100)) ([73269fc](https://github.com/vuepress/ecosystem/commit/73269fc84d3373a21298215eb59958bcaf9f3d80))

### 🐛 Bug Fixes

- make dev search worker work with webpack bundler ([#996](https://github.com/vuepress/ecosystem/issues/996)) ([3aa7e8c](https://github.com/vuepress/ecosystem/commit/3aa7e8ce413ad7fcb9af0c827c0f46abfdbfd41b))
- **plugin-orama:** guard dev hot reload and drop stale documents ([#937](https://github.com/vuepress/ecosystem/issues/937)) ([d123bda](https://github.com/vuepress/ecosystem/commit/d123bdadd540441b2ca2153fff39cc8154d60d8b))

### Code Refactoring

- rename search index fields to full names ([#938](https://github.com/vuepress/ecosystem/issues/938)) ([3ee16c5](https://github.com/vuepress/ecosystem/commit/3ee16c54e488267c869259eda02d9e0b0da503c1))

### Tests

- **plugin-orama:** add unit tests ([#981](https://github.com/vuepress/ecosystem/issues/981)) ([35e00ad](https://github.com/vuepress/ecosystem/commit/35e00adccbf28e5349cfcb98bbcc8ac09a0547e7))
- **search-helper:** add unit tests ([#993](https://github.com/vuepress/ecosystem/issues/993)) ([282bf47](https://github.com/vuepress/ecosystem/commit/282bf47cc866b68a61e0da969929839e68ffc71e))

### Build System

- bump non-major dependencies ([#1086](https://github.com/vuepress/ecosystem/issues/1086)) ([610d109](https://github.com/vuepress/ecosystem/commit/610d109648def86c7208ce8831b9f7f54b540d2b))
- update config and bump deps ([cb16411](https://github.com/vuepress/ecosystem/commit/cb1641182f3cefca632e77073571fa16a1743ca7))

# [2.0.0-rc.137](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.136...v2.0.0-rc.137) (2026-09-28)

**Note:** Version bump only for package @vuepress/plugin-orama

# [2.0.0-rc.136](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.135...v2.0.0-rc.136) (2026-09-25)

### Features

- add search helper and an out-of-the-box Orama tokenizer ([#876](https://github.com/vuepress/ecosystem/issues/876)) ([993857b](https://github.com/vuepress/ecosystem/commit/993857bf1cca35b55a734ec03b233fe72a53f80f))

# [2.0.0-rc.135](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.134...v2.0.0-rc.135) (2026-09-24)

### Features

- **plugin-orama:** add Orama search plugin ([#841](https://github.com/vuepress/ecosystem/issues/841)) ([45ce2f4](https://github.com/vuepress/ecosystem/commit/45ce2f4a4e61122b4596468c7453871596f84dce))
