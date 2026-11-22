<template>
  <section class="vp-team-page-section">
    <div class="title">
      <div class="title-line" />
      <h2 v-if="$slots.title" class="title-text">
        <bdi><slot name="title" /></bdi>
      </h2>
    </div>
    <p v-if="$slots.lead" class="lead">
      <bdi><slot name="lead" /></bdi>
    </p>
    <div v-if="$slots.members" class="members">
      <slot name="members" />
    </div>
  </section>
</template>

<style scoped>
.vp-team-page-section {
  padding: 0 2rem;
}

@media (min-width: 48rem) {
  .vp-team-page-section {
    padding: 0 3rem;
  }
}

@media (min-width: 60rem) {
  .vp-team-page-section {
    padding: 0 4rem;
  }
}

.title {
  position: relative;

  max-width: 72rem;
  margin: 0 auto;

  color: var(--vp-c-text-mute);

  text-align: center;
}

.title-line {
  position: absolute;
  inset-inline: 0;
  top: 1rem;

  height: 1px;

  background-color: var(--vp-c-divider);
}

.title-text {
  position: relative;

  display: inline-block;

  margin: 0;
  padding: 0 1.5rem;
  border-top: none;

  background-color: var(--vp-c-bg);

  font-weight: 500;
  font-size: 1.25rem;
  line-height: 1.6;
  letter-spacing: 0;
}

.lead {
  max-width: 30rem;
  margin: 0 auto;
  padding-top: 0.75rem;

  color: var(--vp-c-text-mute);

  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5;
  text-align: center;
}

.members {
  padding-top: 2.5rem;
}
</style>
