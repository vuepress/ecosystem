# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-rc.5](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.4...v2.0.0-rc.5) (2024-01-31)

### Bug Fixes

- **helper:** improve types of useLocaleConfig ([0fcc7f6](https://github.com/vuepress/ecosystem/commit/0fcc7f6bdb5f1a18899ad6e74849003d5e0e70e3))
- **plugin-seo:** fix logger name and remove debug logger ([a692d7a](https://github.com/vuepress/ecosystem/commit/a692d7ad813372188d2283e065a41c64114ed3df))

### Features

- **helper:** add data utils ([#43](https://github.com/vuepress/ecosystem/issues/43)) ([ebd6f63](https://github.com/vuepress/ecosystem/commit/ebd6f630652a1d8ee858ff2e9a3f260014d1353e))
- **helper:** add locales helper ([#44](https://github.com/vuepress/ecosystem/issues/44)) ([f1be46f](https://github.com/vuepress/ecosystem/commit/f1be46f1c80a3a373da49852d6cb96967c2c74d3))

# [2.0.0-rc.4](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.3...v2.0.0-rc.4) (2024-01-31)

### Features

- **helper:** add shared export ([da50bcf](https://github.com/vuepress/ecosystem/commit/da50bcf7fe18ff743696092ca5aa78a45d518657))

# [2.0.0-rc.3](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.2...v2.0.0-rc.3) (2024-01-31)

### Bug Fixes

- **create-vuepress:** sync output folder with docs ([#29](https://github.com/vuepress/ecosystem/issues/29)) ([e7887aa](https://github.com/vuepress/ecosystem/commit/e7887aa3e0b8af278844d0d74e4df8d481ee9915))
- **helper:** add missing export ([049da22](https://github.com/vuepress/ecosystem/commit/049da224a22e0ce0a1927df2f24c3764d97f4f5b))
- **helper:** add missing exports ([2dc8ea5](https://github.com/vuepress/ecosystem/commit/2dc8ea53493b5e625ed8d8e5fbe701d0a8ccf9d5))

### Features

- **helper:** add date helper ([20e5e46](https://github.com/vuepress/ecosystem/commit/20e5e46e4b5f2e321dae7b4943454626cdb1e5dc))
- **helper:** add getPageText ([#39](https://github.com/vuepress/ecosystem/issues/39)) ([d666d1b](https://github.com/vuepress/ecosystem/commit/d666d1bcc55122e0ebcff386b6190d0c9d7ddb67))
- **helper:** add helper package ([#33](https://github.com/vuepress/ecosystem/issues/33)) ([fadf122](https://github.com/vuepress/ecosystem/commit/fadf1225c643ab0bf9c4c0f46d0b3b3f1aa15ac6))
- **helper:** add logger utils ([#35](https://github.com/vuepress/ecosystem/issues/35)) ([a92c710](https://github.com/vuepress/ecosystem/commit/a92c710298a07dbbce5434c18a504cade47effe4))
- **plugin-feed:** add feed plugin ([#41](https://github.com/vuepress/ecosystem/issues/41)) ([b0b2aa4](https://github.com/vuepress/ecosystem/commit/b0b2aa49b4904fb903ec8b312a2e48f6b9affc17))
- **plugin-seo:** add seo plugin ([#42](https://github.com/vuepress/ecosystem/issues/42)) ([8a999c5](https://github.com/vuepress/ecosystem/commit/8a999c58c20006b3a36de52a8502d03344af099d))
- **plugin-sitemap:** add sitemap plugin ([#37](https://github.com/vuepress/ecosystem/issues/37)) ([267f388](https://github.com/vuepress/ecosystem/commit/267f388c6ee4d3d5a44f42ddd16583569cfe97af))
- **theme-default:** heading-sidebar ([#30](https://github.com/vuepress/ecosystem/issues/30)) ([0ac591d](https://github.com/vuepress/ecosystem/commit/0ac591dfe469e25cf42f1870dd6466d4e5bb3c4c))
- **theme-default:** image alt option and set aria hidden on title if same as image alt (close [#20](https://github.com/vuepress/ecosystem/issues/20)) ([#23](https://github.com/vuepress/ecosystem/issues/23)) ([dc8042e](https://github.com/vuepress/ecosystem/commit/dc8042e40d15b290b8d100b9b39bf3e17a1d8e77))

# [2.0.0-rc.2](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.1...v2.0.0-rc.2) (2024-01-26)

### Features

- **create-vuepress:** update packages version ([68d5005](https://github.com/vuepress/ecosystem/commit/68d5005b3d5eabc8e9e473bf498038edd3043901))

# 2.0.0-rc.1 (2024-01-26)

### Bug Fixes

- **theme-default:** avoid calling hooks in computed ([6d78f5d](https://github.com/vuepress/ecosystem/commit/6d78f5d0972c023027f44ae891833657f1da0adb))
- **theme-default:** code group accessibility ([#10](https://github.com/vuepress/ecosystem/issues/10)) ([aae5916](https://github.com/vuepress/ecosystem/commit/aae591671fd18497fb5448b1cfdc9e89040c8a64))
- **theme-default:** fix navbar brand logo a11y (close [#20](https://github.com/vuepress/ecosystem/issues/20)) ([8e6e57e](https://github.com/vuepress/ecosystem/commit/8e6e57ea2de65e30c5b033f1498b6a264f03ab20))
- **theme-default:** fix new anchor style ([046ea1c](https://github.com/vuepress/ecosystem/commit/046ea1cff8c1f2f40bdded2ff713314d78f59501))

### Features

- bump to vp2rc1 and declare vuepress as peer ([af4f00b](https://github.com/vuepress/ecosystem/commit/af4f00b24dc64dfd3ec5f45053e78fdcf147da61))
- **create-vuepress:** add create-helper (close [#1](https://github.com/vuepress/ecosystem/issues/1)) ([#15](https://github.com/vuepress/ecosystem/issues/15)) ([531a7e8](https://github.com/vuepress/ecosystem/commit/531a7e8c77b4145cb6da6247b695ef4bc38d4f98))
- **plugin-shiki:** bump to shikiji v0.10 ([e24c1cb](https://github.com/vuepress/ecosystem/commit/e24c1cb83a392dbb6182003b155cfa5cf417e67a))
- **plugin-shiki:** migrate to esm-based shikiji (close [#12](https://github.com/vuepress/ecosystem/issues/12)) ([#13](https://github.com/vuepress/ecosystem/issues/13)) ([df11c04](https://github.com/vuepress/ecosystem/commit/df11c046854016e7d9ad043d0fc46b40beb9bddf))
- **theme-default:** make use of data-title attr for code blocks (close [#18](https://github.com/vuepress/ecosystem/issues/18)) ([fbf5e32](https://github.com/vuepress/ecosystem/commit/fbf5e3248d87819c6e78121c082187b4458a3525))
- **theme-default:** sync anchor permalink function updates for better a11y ([93e6a04](https://github.com/vuepress/ecosystem/commit/93e6a0489f023578625fc9421d4c67990eba3610))

### BREAKING CHANGES

- **plugin-shiki:** now `langs` option is required, you need to set the languages list explicitly

Co-authored-by: meteorlxy <meteor.lxy@foxmail.com>
