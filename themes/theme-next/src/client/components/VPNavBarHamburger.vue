<script setup lang="ts">
const { active } = defineProps<{
  /**
   * Whether the navbar hamburger is active
   */
  active: boolean
}>()

defineEmits<{
  click: []
}>()
</script>

<template>
  <button
    type="button"
    class="vp-navbar-hamburger"
    :class="{ active }"
    aria-label="mobile navigation"
    :aria-expanded="active"
    aria-controls="VPNavScreen"
    @click="$emit('click')"
  >
    <span class="container">
      <span class="top" />
      <span class="middle" />
      <span class="bottom" />
    </span>
  </button>
</template>

<style scoped>
.vp-navbar-hamburger {
  display: flex;
  align-items: center;
  justify-content: center;

  width: 48px;
  height: 48px;
}

@media (min-width: 768px) {
  .vp-navbar-hamburger {
    display: none;
  }
}

.container {
  position: relative;
  overflow: hidden;
  width: 16px;
  height: 14px;
}

.vp-navbar-hamburger:hover .top {
  top: 0;
  left: 0;
  transform: translateX(4px);
}

.vp-navbar-hamburger:hover .middle {
  top: 6px;
  left: 0;
  transform: translateX(0);
}

.vp-navbar-hamburger:hover .bottom {
  top: 12px;
  left: 0;
  transform: translateX(8px);
}

.vp-navbar-hamburger.active .top {
  top: 6px;
  transform: translateX(0) rotate(225deg);
}

.vp-navbar-hamburger.active .middle {
  top: 6px;
  transform: translateX(16px);
}

.vp-navbar-hamburger.active .bottom {
  top: 6px;
  transform: translateX(0) rotate(135deg);
}

.vp-navbar-hamburger.active:hover .top,
.vp-navbar-hamburger.active:hover .middle,
.vp-navbar-hamburger.active:hover .bottom {
  background-color: var(--vp-c-text-mute);
  transition:
    top 0.25s,
    background-color 0.25s,
    transform 0.25s;
}

.top,
.middle,
.bottom {
  position: absolute;

  width: 16px;
  height: 2px;

  background-color: var(--vp-c-text);

  transition:
    top 0.25s,
    background-color 0.5s,
    transform 0.25s;
}

.top {
  top: 0;
  left: 0;
  transform: translateX(0);
}

.middle {
  top: 6px;
  left: 0;
  transform: translateX(8px);
}

.bottom {
  top: 12px;
  left: 0;
  transform: translateX(4px);
}
</style>
