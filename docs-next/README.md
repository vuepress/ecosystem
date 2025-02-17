---
home: true
title: Home
icon: home
hero:
  image: /images/hero.png
  name: VuePress Ecosystem
  text: VuePress official themes and plugins
actions:
  - text: Themes
    icon: palette
    link: ./themes/
    type: primary

  - text: Plugins
    icon: unplug
    link: ./plugins/
    type: primary

  - text: GitHub →
    icon: github
    link: https://github.com/vuepress/ecosystem
    theme: alt

footer: MIT Licensed | Copyright © 2018-present VuePress Community
---

<style>
:root {
  --vp-home-hero-name-color: transparent;
  --vp-home-hero-name-background: -webkit-linear-gradient(120deg, #5ab880 30%, #5772cd);

  --vp-home-hero-image-background-image: linear-gradient(-45deg, #5ab880 50%, #5772cd 50%);
  --vp-home-hero-image-filter: blur(44px);
}

@media (min-width: 640px) {
  :root {
    --vp-home-hero-image-filter: blur(56px);
  }
}

@media (min-width: 960px) {
  :root {
    --vp-home-hero-image-filter: blur(68px);
  }
}
</style>
