<template>
  <button type="button" class="vp-navbar-ask-ai-button">
    <span class="vpi-sparkles" aria-hidden="true"></span>
  </button>
</template>

<style scoped>
.vp-navbar-ask-ai-button {
  display: flex;
  align-items: center;

  height: var(--vp-nav-height);
  padding: 0.5rem 0.875rem;

  font-size: 1.25rem;
}

@media (min-width: 48rem) {
  .vp-navbar-ask-ai-button {
    height: auto;
    padding: 0.71875rem;
    border-radius: 0.5rem;

    background-color: var(--vp-c-bg-alt);
    color: var(--vp-c-text-2);

    font-size: 0.9375rem;

    transition: color 0.3s ease;
  }

  .vp-navbar-ask-ai-button:hover {
    color: var(--vp-c-brand-1);
  }
}
</style>
