<template>
  <div class="vp-team-page-title">
    <h1 v-if="$slots.title" class="title">
      <bdi><slot name="title" /></bdi>
    </h1>
    <p v-if="$slots.lead" class="lead">
      <bdi><slot name="lead" /></bdi>
    </p>
  </div>
</template>

<style scoped>
.vp-team-page-title {
  padding: 3rem 2rem;
  text-align: center;
}

@media (min-width: 48rem) {
  .vp-team-page-title {
    padding: 4rem 3rem 3rem;
  }
}

@media (min-width: 60rem) {
  .vp-team-page-title {
    padding: 5rem 4rem 3rem;
  }
}

.title {
  font-weight: 500;
  font-size: 2.25rem;
  line-height: 1.2222222;
  letter-spacing: 0;
}

@media (min-width: 48rem) {
  .title {
    font-size: 3rem;
    line-height: 1.1666667;
    letter-spacing: -0.0104167em;
  }
}

.lead {
  max-width: 32rem;
  margin: 0 auto;
  padding-top: 0.75rem;

  color: var(--vp-c-text-2);

  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5;
}

@media (min-width: 48rem) {
  .lead {
    max-width: 37rem;
    font-size: 1.25rem;
    line-height: 1.4;
    letter-spacing: 0.0075em;
  }
}
</style>
