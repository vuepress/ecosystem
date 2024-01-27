# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-rc.2](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.1...v2.0.0-rc.2) (2024-01-26)

### Features

* **create-vuepress:** update packages version ([68d5005](https://github.com/vuepress/ecosystem/commit/68d5005b3d5eabc8e9e473bf498038edd3043901))

# 2.0.0-rc.1 (2024-01-26)

### Bug Fixes

* **theme-default:** avoid calling hooks in computed ([6d78f5d](https://github.com/vuepress/ecosystem/commit/6d78f5d0972c023027f44ae891833657f1da0adb))
* **theme-default:** code group accessibility ([#10](https://github.com/vuepress/ecosystem/issues/10)) ([aae5916](https://github.com/vuepress/ecosystem/commit/aae591671fd18497fb5448b1cfdc9e89040c8a64))
* **theme-default:** fix navbar brand logo a11y (close [#20](https://github.com/vuepress/ecosystem/issues/20)) ([8e6e57e](https://github.com/vuepress/ecosystem/commit/8e6e57ea2de65e30c5b033f1498b6a264f03ab20))
* **theme-default:** fix new anchor style ([046ea1c](https://github.com/vuepress/ecosystem/commit/046ea1cff8c1f2f40bdded2ff713314d78f59501))

### Features

* bump to vp2rc1 and declare vuepress as peer ([af4f00b](https://github.com/vuepress/ecosystem/commit/af4f00b24dc64dfd3ec5f45053e78fdcf147da61))
* **create-vuepress:** add create-helper (close [#1](https://github.com/vuepress/ecosystem/issues/1)) ([#15](https://github.com/vuepress/ecosystem/issues/15)) ([531a7e8](https://github.com/vuepress/ecosystem/commit/531a7e8c77b4145cb6da6247b695ef4bc38d4f98))
* **plugin-shiki:** bump to shikiji v0.10 ([e24c1cb](https://github.com/vuepress/ecosystem/commit/e24c1cb83a392dbb6182003b155cfa5cf417e67a))
* **plugin-shiki:** migrate to esm-based shikiji (close [#12](https://github.com/vuepress/ecosystem/issues/12)) ([#13](https://github.com/vuepress/ecosystem/issues/13)) ([df11c04](https://github.com/vuepress/ecosystem/commit/df11c046854016e7d9ad043d0fc46b40beb9bddf))
* **theme-default:** make use of data-title attr for code blocks (close [#18](https://github.com/vuepress/ecosystem/issues/18)) ([fbf5e32](https://github.com/vuepress/ecosystem/commit/fbf5e3248d87819c6e78121c082187b4458a3525))
* **theme-default:** sync anchor permalink function updates for better a11y ([93e6a04](https://github.com/vuepress/ecosystem/commit/93e6a0489f023578625fc9421d4c67990eba3610))

### BREAKING CHANGES

* **plugin-shiki:** now `langs` option is required, you need to set the languages list explicitly

Co-authored-by: meteorlxy <meteor.lxy@foxmail.com>
