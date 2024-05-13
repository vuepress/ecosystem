<script lang="ts" setup>
defineProps<{
  active: boolean
}>()

defineEmits<(e: 'click') => void>()
</script>

<template>
  <button
    type="button"
    class="vpNavBarHamburger"
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
.vpNavBarHamburger {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 48px;
  height: var(--vp-nav-height);
}

@media (min-width: 768px) {
  .vpNavBarHamburger {
    display: none;
  }
}

.container {
  position: relative;
  width: 16px;
  height: 14px;
  overflow: hidden;
}

.vpNavBarHamburger:hover .top {
  top: 0;
  left: 0;
  transform: translateX(4px);
}
.vpNavBarHamburger:hover .middle {
  top: 6px;
  left: 0;
  transform: translateX(0);
}
.vpNavBarHamburger:hover .bottom {
  top: 12px;
  left: 0;
  transform: translateX(8px);
}

.vpNavBarHamburger.active .top {
  top: 6px;
  transform: translateX(0) rotate(225deg);
}
.vpNavBarHamburger.active .middle {
  top: 6px;
  transform: translateX(16px);
}
.vpNavBarHamburger.active .bottom {
  top: 6px;
  transform: translateX(0) rotate(135deg);
}

.vpNavBarHamburger.active:hover .top,
.vpNavBarHamburger.active:hover .middle,
.vpNavBarHamburger.active:hover .bottom {
  background-color: var(--vp-c-text-2);
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
  background-color: var(--vp-c-text-1);
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
