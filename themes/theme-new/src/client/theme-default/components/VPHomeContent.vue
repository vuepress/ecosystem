<template>
  <div class="vp-home-content vp-doc container">
    <slot />
  </div>
</template>

<style scoped>
.container {
  width: 100%;
  max-width: 80rem;
  margin: auto;
  padding: 0 1.5rem;
}

@media (min-width: 40rem) {
  .container {
    padding: 0 3rem;
  }
}

@media (min-width: 60rem) {
  .container {
    width: 100%;
    padding: 0 4rem;
  }
}

/* stretch to full viewport width, overflow is clipped by .vp-home */
.vp-doc :deep(.vp-home-sponsors),
.vp-doc :deep(.vp-team-page) {
  margin-inline: calc(50% - 50vw);
}

.vp-doc :deep(.vp-team-page a) {
  text-decoration: none;
}
</style>
