<template>
  <section class="vp-team-page-section">
    <div class="title">
      <div class="title-line" />
      <h2 v-if="$slots.title" class="title-text">
        <slot name="title" />
      </h2>
    </div>
    <p v-if="$slots.lead" class="lead">
      <slot name="lead" />
    </p>
    <div v-if="$slots.members" class="members">
      <slot name="members" />
    </div>
  </section>
</template>

<style scoped>
.vp-team-page-section {
  padding: 0 32px;
}

@media (min-width: 768px) {
  .vp-team-page-section {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .vp-team-page-section {
    padding: 0 64px;
  }
}

.title {
  position: relative;

  max-width: 1152px;
  margin: 0 auto;

  color: var(--vp-c-text-2);

  text-align: center;
}

.title-line {
  position: absolute;
  top: 16px;
  left: 0;

  width: 100%;
  height: 1px;

  background-color: var(--vp-c-divider);
}

.title-text {
  position: relative;

  display: inline-block;

  padding: 0 24px;

  background-color: var(--vp-c-bg);

  font-weight: 500;
  font-size: 20px;
  line-height: 32px;
  letter-spacing: 0;
}

.lead {
  max-width: 480px;
  margin: 0 auto;
  padding-top: 12px;

  color: var(--vp-c-text-2);

  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
}

.members {
  padding-top: 40px;
}
</style>
