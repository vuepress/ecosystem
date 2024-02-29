# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [2.0.0-rc.18](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.17...v2.0.0-rc.18) (2024-02-29)

### Bug Fixes

- **plugin-redirect:** fix css variable name, close [#79](https://github.com/vuepress/ecosystem/issues/79) ([176c0e8](https://github.com/vuepress/ecosystem/commit/176c0e8e6290df0d68fac97d5e00a0b53e27f61a))
- **plugin-seo:** only generate description when page has content ([63471d3](https://github.com/vuepress/ecosystem/commit/63471d30f6d78d91889e7d4d388551a27adc6397))

# [2.0.0-rc.17](https://github.com/vuepress/ecosystem/compare/v2.0.0-ci-test.0...v2.0.0-rc.17) (2024-02-21)

### Bug Fixes

- **plugin-photo-swipe:** support frontmatter ([28f29ba](https://github.com/vuepress/ecosystem/commit/28f29ba27776123f5cc1f064653d73ca725c76eb))

### Features

- **helper:** add wait utils ([75a409a](https://github.com/vuepress/ecosystem/commit/75a409ac992ebfbb581febd4a500dc009915a8f3))
- **plugin-links-check:** add links check plugin ([082a953](https://github.com/vuepress/ecosystem/commit/082a9532226d8a6c0672a919c3e2a94811c50d8c))

# [2.0.0-rc.16](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.15...v2.0.0-rc.16) (2024-02-20)

### Bug Fixes

- **plugin-pwa:** fix style files ([7edadbf](https://github.com/vuepress/ecosystem/commit/7edadbff6073af51b27c2fb3b134add60917b471))

# [2.0.0-rc.15](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.14...v2.0.0-rc.15) (2024-02-19)

### Bug Fixes

- **plugin-copy-code:** update default css var ([503b6fd](https://github.com/vuepress/ecosystem/commit/503b6fd54a26e007edb4a7707673b3b6b767e661))
- **theme-default:** fix link active status, close [#37](https://github.com/vuepress/ecosystem/issues/37) ([506e28c](https://github.com/vuepress/ecosystem/commit/506e28c7a5c1cbbf5def5079a34e3575e2449891))
- **vp-update:** fix getRegistry ([3dda81f](https://github.com/vuepress/ecosystem/commit/3dda81f2eedfc9fcc96d588a8a5172219036db99))

### Performance Improvements

- **plugin-blog:** use original ref ([3651a7f](https://github.com/vuepress/ecosystem/commit/3651a7f91d648a4f504705768a64feb4dad8025d))

### BREAKING CHANGES

- **plugin-pwa:** rebuild plugin
- **plugin-pwa-popup**: removed

# [2.0.0-rc.14](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.13...v2.0.0-rc.14) (2024-02-08)

### Bug Fixes

- **plugin-blog:** fix hotReload, close [#62](https://github.com/vuepress/ecosystem/issues/62) ([204cf8f](https://github.com/vuepress/ecosystem/commit/204cf8f735f43902a4289432697f96bc0200e50b))
- **plugin-blog:** override existing page at startup ([a006959](https://github.com/vuepress/ecosystem/commit/a0069597d6052b4353b83291ab05d1d545719824))

### Features

- **plugin-baidu-analytics:** add plugin-baidu-analytics ([#70](https://github.com/vuepress/ecosystem/issues/70)) ([0d5810e](https://github.com/vuepress/ecosystem/commit/0d5810e3d5634c47c9d0f1132637f4e358fb2fce))

# [2.0.0-rc.13](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.12...v2.0.0-rc.13) (2024-02-06)

### Bug Fixes

- **plugin-photo-swipe:** fix styles ([69374ae](https://github.com/vuepress/ecosystem/commit/69374aeac4f0cc67ed805fb98a04334e1ff17698))

# [2.0.0-rc.12](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.11...v2.0.0-rc.12) (2024-02-06)

### Bug Fixes

- **plugin-theme-data:** fix compatibility with vuepress/client ([8f01436](https://github.com/vuepress/ecosystem/commit/8f014362a01cf3fe1fde81f3cc13481020a5cfe8))

### Features

- **create-vuepress:** use plugin-blog in blog template ([#64](https://github.com/vuepress/ecosystem/issues/64)) ([a25014e](https://github.com/vuepress/ecosystem/commit/a25014e7c17f905db88e6e39de8f036f67cb860a))
- **plugin-copy-code:** expose composable api ([#67](https://github.com/vuepress/ecosystem/issues/67)) ([fced29c](https://github.com/vuepress/ecosystem/commit/fced29cc445433c326f25f176f6a5cfa5415f739))
- **plugin-photo-swipe:** add photo-swipe plugin ([#69](https://github.com/vuepress/ecosystem/issues/69)) ([58a9855](https://github.com/vuepress/ecosystem/commit/58a9855414333f389c34ce6e1a66377e72356911))
- **plugin-shiki:** use shiki v1 ([#68](https://github.com/vuepress/ecosystem/issues/68)) ([2e4343c](https://github.com/vuepress/ecosystem/commit/2e4343c9b89c8577f28970eca915128f9983c124))
- **theme-default:** apply styles to photo-swipe plugin ([5d1fd63](https://github.com/vuepress/ecosystem/commit/5d1fd631d8068074befa4935df6aa842168dc672))

# [2.0.0-rc.11](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.10...v2.0.0-rc.11) (2024-02-05)

### Bug Fixes

- **plugin-active-header-links:** fix hash update ([0ee8078](https://github.com/vuepress/ecosystem/commit/0ee80783b87b41e4d5924c4af0faa4e3c4e1bb8c))
- **plugin-docsearch:** hide search while print ([8b35bed](https://github.com/vuepress/ecosystem/commit/8b35bedda22f31b5b91e2724f7aaea46e19a9dbe))

### Features

- **plugin-redirect:** add style variables ([152bfa0](https://github.com/vuepress/ecosystem/commit/152bfa0ebf30e9cacf990fda99cf7efa449b2f2e))
- **plugin-redirect:** improve autoLocale homepage ([0d63fb4](https://github.com/vuepress/ecosystem/commit/0d63fb4ecf9a12c358d6a365582c3d0d0821ab81))

# [2.0.0-rc.10](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.9...v2.0.0-rc.10) (2024-02-05)

### Bug Fixes

- **plugin-redirect:** fix locale config ([ecf5650](https://github.com/vuepress/ecosystem/commit/ecf56503ac0c7674a455547d7589af41945e3a9b))
- **plugin-remove-pwa:** fix plugin name ([a76a639](https://github.com/vuepress/ecosystem/commit/a76a639d1658ee28f89e7f9486bc17a7f913cd47))
- **plugin-search:** fix hot reload ([637db2c](https://github.com/vuepress/ecosystem/commit/637db2ccefd00bea7aee0ed74b829e079d37e2a2))
- **theme-default:** fix back to top style ([10c2847](https://github.com/vuepress/ecosystem/commit/10c2847538013b0a56f557d822aad5a2e9995f0a))

### Features

- compatible with visual routes ([#57](https://github.com/vuepress/ecosystem/issues/57)) ([f1281be](https://github.com/vuepress/ecosystem/commit/f1281be141b9a5cb71d80048a2042b669cd4823e))
- **plugin-blog:** add plugin-blog ([#61](https://github.com/vuepress/ecosystem/issues/61)) ([30779e3](https://github.com/vuepress/ecosystem/commit/30779e33c079d0f62ab81a5c04208efb511718e9))
- **plugin-catalog:** add catalog plugin ([#60](https://github.com/vuepress/ecosystem/issues/60)) ([18ad620](https://github.com/vuepress/ecosystem/commit/18ad620c4d9ebf4398257a3e704a563e35de6629))
- **plugin-copyright:** make plugin options optional ([64bb166](https://github.com/vuepress/ecosystem/commit/64bb1664935f27469b874afc814c7260d09a624e))

### Reverts

- "test: update snapshots" ([8cf90fb](https://github.com/vuepress/ecosystem/commit/8cf90fbcc050232ab63927da0b810d0472f4a4ef))

# [2.0.0-rc.9](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.8...v2.0.0-rc.9) (2024-02-03)

### Bug Fixes

- **helper:** fix getPageExcerpt in edge case ([8004b12](https://github.com/vuepress/ecosystem/commit/8004b12d2c13d1cdd4ff7b635745fe3cd972c6c8))

### Features

- **plugin-back-to-top:** rebuild plugin ([#55](https://github.com/vuepress/ecosystem/issues/55)) ([1900257](https://github.com/vuepress/ecosystem/commit/19002576ab87d2bafcbc145857749ffb6cd17603))

# [2.0.0-rc.8](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.7...v2.0.0-rc.8) (2024-02-03)

### Features

- **plugin-redirect:** add redirect plugin ([#53](https://github.com/vuepress/ecosystem/issues/53)) ([44fba50](https://github.com/vuepress/ecosystem/commit/44fba50a0ee42d661732d81d75d2d69466a02e8e))
- **plugin-remove-pwa:** add remove pwa plugin ([#54](https://github.com/vuepress/ecosystem/issues/54)) ([58b7e32](https://github.com/vuepress/ecosystem/commit/58b7e32fcbdc5a55718fc79fc81b08d7365ebf1c))

# [2.0.0-rc.7](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.6...v2.0.0-rc.7) (2024-02-02)

### Bug Fixes

- **helper:** ensure rootNodes ([afc6f9d](https://github.com/vuepress/ecosystem/commit/afc6f9d697885b112194ad5cd12fe2371ad9f903))
- **plugin-reading-time:** remove noExternal declare ([36a2abe](https://github.com/vuepress/ecosystem/commit/36a2abe8f49a7500ac23c44dea56f66c331840f0))
- **plugin-rtl:** correct plugin name ([4b1ca32](https://github.com/vuepress/ecosystem/commit/4b1ca323861fc26e5312c72648aad474c9c52b8d))
- **plugin-sitemap:** fix output logger ([7389d32](https://github.com/vuepress/ecosystem/commit/7389d325f4d68db9dac243b0736264c5e78796ce))

### Features

- **helper:** add bun support ([ebedb81](https://github.com/vuepress/ecosystem/commit/ebedb81564d2817d7bfbd0a564ca6f33b558948d))
- **plugin-copyright:** add copyright plugin ([#52](https://github.com/vuepress/ecosystem/issues/52)) ([f5e4a18](https://github.com/vuepress/ecosystem/commit/f5e4a1849a37887ab522bfb52b00f1d756fdc0eb))
- **plugin-reading-time:** add reading-time plugin ([#50](https://github.com/vuepress/ecosystem/issues/50)) ([3fce9e4](https://github.com/vuepress/ecosystem/commit/3fce9e4c27066e190b56f496ee1742a6a76f7538))
- **plugin-rtl:** add rtl plugin ([#49](https://github.com/vuepress/ecosystem/issues/49)) ([4a50404](https://github.com/vuepress/ecosystem/commit/4a50404feae553e0f212c11b7a8373dc5773d0dc))
- **vp-update:** add vp-update package ([#51](https://github.com/vuepress/ecosystem/issues/51)) ([c0f94d6](https://github.com/vuepress/ecosystem/commit/c0f94d6ec43609fd88c7fea2ad65521579a92f7f))

# [2.0.0-rc.6](https://github.com/vuepress/ecosystem/compare/v2.0.0-rc.5...v2.0.0-rc.6) (2024-01-31)

### Features

- **helper:** add hasGlobalComponent ([#46](https://github.com/vuepress/ecosystem/issues/46)) ([2472fce](https://github.com/vuepress/ecosystem/commit/2472fce4b1d4482cb5120f736e3c3e0fe4157736))
- **helper:** export slash related functions ([4268fdc](https://github.com/vuepress/ecosystem/commit/4268fdc9a7599f84cbd6b24c12ff9400d3340b7f))
- **helper:** improve getDate utils ([efb5b2e](https://github.com/vuepress/ecosystem/commit/efb5b2e55a5edfcac7db0d31c69079ff2ac64f2b))
- **helper:** improve vite optimizeDeps ([8973871](https://github.com/vuepress/ecosystem/commit/89738718f61b6ed955df89317ab078f0c06a7030))
- **plugin-copy-code:** add copy-code plugin ([#47](https://github.com/vuepress/ecosystem/issues/47)) ([8402530](https://github.com/vuepress/ecosystem/commit/8402530a39b4431efa654e3ba80f8fc6d0d7b96e))
- **plugin-sitemap:** rename excludeUrls to excludePaths ([#45](https://github.com/vuepress/ecosystem/issues/45)) ([247c792](https://github.com/vuepress/ecosystem/commit/247c792961069abbb1b5152be09bdfb1a3aa4458))

### BREAKING CHANGES

- **plugin-sitemap:** `excludeUrls` is renamed to `excludePaths`

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
