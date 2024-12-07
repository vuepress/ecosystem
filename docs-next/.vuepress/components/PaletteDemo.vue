<script setup lang="ts">
import { useLocaleConfig } from '@vuepress/helper/client'

const locale = useLocaleConfig({
  '/': {
    text: 'Text Colors',
    accent: 'Accent Colors',
    border: 'Border Colors',
    shadow: 'Shadow Colors',
    control: 'Control Colors',
  },
  '/zh/': {
    text: '文字颜色',
    accent: '强调色',
    border: '边框颜色',
    shadow: '阴影色',
    control: '控件颜色',
  },
})
</script>

<template>
  <div class="header">{{ locale.text }}</div>
  <div class="demo">
    <div class="text">text</div>
    <div class="text-mute">text mute</div>
    <div class="text-subtle">text subtle</div>
  </div>
  <div class="header">{{ locale.border }}</div>
  <div class="demo">
    <div class="border-display border">border</div>
    <div class="border-display border-hard">border hard</div>
    <div class="border-display gutter">gutter</div>
  </div>
  <div class="header">{{ locale.accent }}</div>
  <div class="demo">
    <button type="button" class="button-reset accent">accent</button>
    <button type="button" class="button-reset accent-bg">accent bg</button>
    <button type="button" class="button-reset accent-hover">
      accent hover
    </button>
    <button type="button" class="button-reset accent-soft">accent soft</button>
  </div>
  <div class="header">{{ locale.shadow }}</div>
  <div class="demo">
    <button type="button" class="button-reset bg shadow">shadow with bg</button>
    <button type="button" class="button-reset bg-alt shadow">
      shadow with bg alt
    </button>
    <button type="button" class="button-reset accent-bg shadow">
      shadow with accent
    </button>
    <button type="button" class="button-reset accent-hover shadow">
      shadow with accent hover
    </button>
  </div>
  <div class="header">{{ locale.control }}</div>
  <div class="demo">
    <div class="item">
      <label class="label">
        control
        <input class="input-reset border control" />
      </label>
    </div>
    <div class="item">
      <label class="label">
        control hover
        <input class="input-reset control-hover" />
      </label>
    </div>
    <div class="item">
      <label class="label">
        control disabled
        <input class="input-reset control-disabled" disabled />
      </label>
    </div>
    <div class="item">
      <button type="button" class="button-reset control">control</button>
      <button type="button" class="button-reset control-hover">
        control hover
      </button>
      <button type="button" class="button-reset control-disabled">
        control disabled
      </button>
    </div>
  </div>
</template>

<style lang="scss">
.header {
  margin: 0.75rem 0 0.25rem;
  font-size: 1.25rem;
}

.button-reset {
  margin: 4px;
  padding: 4px 8px;
  border: none;
  border-radius: 8px;

  background: transparent;
  outline: none;
}

.border-display {
  position: relative;
  text-align: center;

  &::before {
    content: ' ';

    position: absolute;
    top: 100%;
    right: 0%;
    left: 0%;

    border-width: 1px;
    border-style: solid;
    border-color: inherit;
  }
}

.input-reset {
  margin: 4px;
  padding: 2px 8px;
  border-radius: 8px;

  background: transparent;
  outline: none;

  line-height: 1.5;
}

.bg {
  background: var(--vp-c-bg);
}

.bg-alt {
  background: var(--vp-c-bg-alt);
}

.border {
  border-color: var(--vp-c-border);
}

.border-hard {
  border-color: var(--vp-c-border-hard);
}

.gutter {
  border-color: var(--vp-c-gutter);
}

.shadow {
  box-shadow: 1px 2px 4px 2px var(--vp-c-shadow);
}

.text {
  color: var(--vp-c-text);
}

.text-mute {
  color: var(--vp-c-text-mute);
}

.text-subtle {
  color: var(--vp-c-text-subtle);
}

.accent {
  color: var(--vp-c-accent);
}

.accent-bg {
  background: var(--vp-c-accent-bg);
  color: var(--vp-c-accent-text);
}

.accent-hover {
  background: var(--vp-c-accent-hover);
  color: var(--vp-c-accent-text);
}

.accent-soft {
  background: var(--vp-c-accent-soft);
  color: var(--vp-c-accent);
}

.control {
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-control);
}

.control-hover {
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-control-hover);
}

.control-disabled {
  border: 1px solid var(--vp-c-border);
  background: var(--vp-c-control-disabled);
}
</style>
