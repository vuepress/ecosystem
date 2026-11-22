<template>
  <button class="vp-switch" type="button" role="switch">
    <span class="check">
      <span class="icon" v-if="$slots.default">
        <slot />
      </span>
    </span>
  </button>
</template>

<style scoped>
.vp-switch {
  position: relative;

  display: block;
  flex-shrink: 0;

  width: 2.5rem;
  height: 1.375rem;
  border: 1px solid var(--vp-input-border-color);
  border-radius: 0.6875rem;

  background-color: var(--vp-input-switch-bg-color);

  transition: border-color 0.25s !important;
}

.vp-switch:hover {
  border-color: var(--vp-c-brand);
}

.check {
  position: absolute;
  inset-inline-start: 1px;
  top: 1px;

  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;

  background-color: var(--vp-c-neutral-inverse);
  box-shadow: var(--vp-shadow-1);

  transition: transform 0.25s !important;
}

.icon {
  position: relative;

  display: block;

  overflow: hidden;

  width: 1.125rem;
  height: 1.125rem;
  border-radius: 50%;
}

.icon :deep([class^='vpi-']) {
  position: absolute;
  inset-inline-start: 0.1875rem;
  top: 0.1875rem;

  width: 0.75rem;
  height: 0.75rem;

  color: var(--vp-c-text-mute);
}

[data-theme='dark'] .icon :deep([class^='vpi-']) {
  color: var(--vp-c-text);
  transition: opacity 0.25s !important;
}
</style>
