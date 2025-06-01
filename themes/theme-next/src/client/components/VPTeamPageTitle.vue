<template>
  <div class="vp-team-page-title">
    <h1 v-if="$slots.title" class="title">
      <slot name="title" />
    </h1>
    <p v-if="$slots.lead" class="lead">
      <slot name="lead" />
    </p>
  </div>
</template>

<style scoped>
.vp-team-page-title {
  padding: 48px 32px;
  text-align: center;
}

@media (min-width: 768px) {
  .vp-team-page-title {
    padding: 64px 48px 48px;
  }
}

@media (min-width: 960px) {
  .vp-team-page-title {
    padding: 80px 64px 48px;
  }
}

.title {
  font-weight: 500;
  font-size: 36px;
  line-height: 44px;
  letter-spacing: 0;
}

@media (min-width: 768px) {
  .title {
    font-size: 48px;
    line-height: 56px;
    letter-spacing: -0.5px;
  }
}

.lead {
  max-width: 512px;
  margin: 0 auto;
  padding-top: 12px;

  color: var(--vp-c-text-mute);

  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
}

@media (min-width: 768px) {
  .lead {
    max-width: 592px;
    font-size: 20px;
    line-height: 28px;
    letter-spacing: 0.15px;
  }
}
</style>
