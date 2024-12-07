<script setup lang="ts">
import PaletteDemo from './PaletteDemo.vue'
</script>

<template>
  <div class="bg border bg-wrapper">
    <div class="bg-hint">bg</div>
    <PaletteDemo />
  </div>
  <div class="bg-alt border bg-wrapper">
    <div class="bg-hint">bg alt</div>
    <PaletteDemo />
  </div>
</template>

<style>
.bg-wrapper {
  margin: 0.5rem 0;
  padding: 0.5rem;
  border-radius: 8px;
}

.bg-hint {
  float: right;
  font-size: 0.75rem;
}
</style>
