# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-rc.39](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.38...v2.0.0-rc.39) (2024-07-19)

### Features

- make styles built-in for highlighter plugins ([#217](https://github.com/vuepress/ecosystem/issues/217)) ([25e1ea2](https://github.com/vuepress/ecosystem/commit/25e1ea2c755bb7858b397a93982d6b92ec8d18c5))

# [2.0.0-rc.38](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.37...v2.0.0-rc.38) (2024-07-13)

### Features

- **plugin-shiki:** rename `getHighlighter` to `createHighlighter` ([#208](https://github.com/vuepress/ecosystem/issues/208)) ([bb739df](https://github.com/vuepress/ecosystem/commit/bb739dfa0893bc8a46d9e40000f43eef28be856b))

### Performance Improvements

- **plugin-shiki:** improve logging when language is not available ([#215](https://github.com/vuepress/ecosystem/issues/215)) ([b84ce08](https://github.com/vuepress/ecosystem/commit/b84ce08df9c72dc56fabb8790afc192bc45abfda))

# [2.0.0-rc.37](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.36...v2.0.0-rc.37) (2024-06-21)

**Note:** Version bump only for package @vuepress/plugin-shiki

# [2.0.0-rc.36](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.35...v2.0.0-rc.36) (2024-06-18)

### Features

- add support for highlight whitespace ([#204](https://github.com/vuepress/ecosystem/issues/204)) ([b91d04e](https://github.com/vuepress/ecosystem/commit/b91d04e5cc44adcff7405f2cdc14c4b9a6d9834d))
- add support for word highlight ([#201](https://github.com/vuepress/ecosystem/issues/201)) ([6f37277](https://github.com/vuepress/ecosystem/commit/6f372774488f79e8570e1d8b4b1e26a5744be807))

# [2.0.0-rc.34](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.33...v2.0.0-rc.34) (2024-06-04)

### Features

- extract lineNumbers plugin to @vuepress/highlighter-helper ([#193](https://github.com/vuepress/ecosystem/issues/193)) ([969a744](https://github.com/vuepress/ecosystem/commit/969a744155f9e37f05ce52e61537e65b757d5649))

# [2.0.0-rc.33](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.32...v2.0.0-rc.33) (2024-05-30)

### Features

- add `shiki`/`prismjs` class names to differentiate highlight plugins ([#181](https://github.com/vuepress/ecosystem/issues/181)) ([0ef4c98](https://github.com/vuepress/ecosystem/commit/0ef4c98abed7dc52d0a44753c78c2c132db0897b))
- **plugin-shiki:** add langAlias option ([#178](https://github.com/vuepress/ecosystem/issues/178)) ([f11014a](https://github.com/vuepress/ecosystem/commit/f11014a8a970d6bb701065382fca41e8aa179865))

# [2.0.0-rc.32](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.31...v2.0.0-rc.32) (2024-05-27)

### Bug Fixes

- fix preWrapper plugin ([#157](https://github.com/vuepress/ecosystem/issues/157)) ([28359b9](https://github.com/vuepress/ecosystem/commit/28359b95181ef0961ea8e5e0058319615f0a5f67))

# [2.0.0-rc.31](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.30...v2.0.0-rc.31) (2024-05-27)

### Features

- improve types ([#149](https://github.com/vuepress/ecosystem/issues/149)) ([ac8c497](https://github.com/vuepress/ecosystem/commit/ac8c4974b9bb6c570b5a6c0711e5888e14497ea7))
- migrate the `codePlugin` from `@vuepress/markdown` to `plugin-shiki` and `plugin-prismjs` ([#137](https://github.com/vuepress/ecosystem/issues/137)) ([49f96cf](https://github.com/vuepress/ecosystem/commit/49f96cfe5f2f43f6c5346164e4c96df2388b7887))
- support vuepress2 rc12 ([#156](https://github.com/vuepress/ecosystem/issues/156)) ([6a5b916](https://github.com/vuepress/ecosystem/commit/6a5b9161eb74eb44e40111257fdf11a616f5ee91))

# [2.0.0-rc.30](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.29...v2.0.0-rc.30) (2024-05-16)

### Features

- update to latest vuepress rc ([#144](https://github.com/vuepress/ecosystem/issues/144)) ([129d05d](https://github.com/vuepress/ecosystem/commit/129d05d6d6da0565a7b443f5d2265d27a4d40893))

# [2.0.0-rc.28](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.27...v2.0.0-rc.28) (2024-05-08)

**Note:** Version bump only for package @vuepress/plugin-shiki

# [2.0.0-rc.25](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.24...v2.0.0-rc.25) (2024-04-17)

**Note:** Version bump only for package @vuepress/plugin-shiki

# [2.0.0-rc.24](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.23...v2.0.0-rc.24) (2024-04-06)

**Note:** Version bump only for package @vuepress/plugin-shiki

# [2.0.0-rc.22](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.21...v2.0.0-rc.22) (2024-04-01)

**Note:** Version bump only for package @vuepress/plugin-shiki

# [2.0.0-rc.21](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.20...v2.0.0-rc.21) (2024-03-25)

### Features

- **plugin-shiki:** add transformers option, close [#92](https://github.com/vuepress/ecosystem/issues/92) ([4cfaace](https://github.com/vuepress/ecosystem/commit/4cfaace02365d50f519c9448d840a3e3e0eec8b0))

# [2.0.0-rc.18](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.17...v2.0.0-rc.18) (2024-02-29)

**Note:** Version bump only for package @vuepress/plugin-shiki

# [2.0.0-rc.17](https://github.com/vuepress/ecosystem/compare/v2.0.0-ci-test.0...v2.0.0-rc.17) (2024-02-21)

**Note:** Version bump only for package @vuepress/plugin-shiki

# [2.0.0-rc.15](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.14...v2.0.0-rc.15) (2024-02-19)

**Note:** Version bump only for package @vuepress/plugin-shiki

# [2.0.0-rc.14](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.13...v2.0.0-rc.14) (2024-02-08)

**Note:** Version bump only for package @vuepress/plugin-shiki

# [2.0.0-rc.12](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.11...v2.0.0-rc.12) (2024-02-06)

### Features

- **plugin-shiki:** use shiki v1 ([#68](https://github.com/vuepress/ecosystem/issues/68)) ([2e4343c](https://github.com/vuepress/ecosystem/commit/2e4343c9b89c8577f28970eca915128f9983c124))

# [2.0.0-rc.11](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.10...v2.0.0-rc.11) (2024-02-05)

**Note:** Version bump only for package @vuepress/plugin-shiki

# [2.0.0-rc.10](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.9...v2.0.0-rc.10) (2024-02-05)

### Features

- compatible with visual routes ([#57](https://github.com/vuepress/ecosystem/issues/57)) ([f1281be](https://github.com/vuepress/ecosystem/commit/f1281be141b9a5cb71d80048a2042b669cd4823e))

# [2.0.0-rc.7](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.6...v2.0.0-rc.7) (2024-02-02)

**Note:** Version bump only for package @vuepress/plugin-shiki

# [2.0.0-rc.3](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.2...v2.0.0-rc.3) (2024-01-31)

**Note:** Version bump only for package @vuepress/plugin-shiki

# 2.0.0-rc.1 (2024-01-26)

### Features

- bump to vp2rc1 and declare vuepress as peer ([af4f00b](https://github.com/vuepress/ecosystem/commit/af4f00b24dc64dfd3ec5f45053e78fdcf147da61))
- **plugin-shiki:** bump to shikiji v0.10 ([e24c1cb](https://github.com/vuepress/ecosystem/commit/e24c1cb83a392dbb6182003b155cfa5cf417e67a))
- **plugin-shiki:** migrate to esm-based shikiji (close [#12](https://github.com/vuepress/ecosystem/issues/12)) ([#13](https://github.com/vuepress/ecosystem/issues/13)) ([df11c04](https://github.com/vuepress/ecosystem/commit/df11c046854016e7d9ad043d0fc46b40beb9bddf))

### BREAKING CHANGES

- **plugin-shiki:** now `langs` option is required, you need to set the languages list explicitly

Co-authored-by: meteorlxy <meteor.lxy@foxmail.com>
