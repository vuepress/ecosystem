<script setup lang="ts">
import VPButton from './VPButton.vue'
import VPSponsors from './VPSponsors.vue'

export interface Sponsors {
  tier: string
  size?: 'medium' | 'big'
  items: Sponsor[]
}

export interface Sponsor {
  name: string
  img: string
  url: string
}
interface Props {
  message?: string
  actionText?: string
  actionLink?: string
  data: Sponsors[]
}

withDefaults(defineProps<Props>(), {
  actionText: 'Become a sponsor',
})
</script>

<template>
  <section class="vp-home-sponsors">
    <div class="container">
      <div class="header">
        <div class="love">
          <span class="vpi-heart icon" />
        </div>
        <h2 v-if="message" class="message">{{ message }}</h2>
      </div>

      <div class="sponsors">
        <VPSponsors :data />
      </div>

      <div v-if="actionLink" class="action">
        <VPButton theme="sponsor" :text="actionText" :href="actionLink" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.vp-home-sponsors {
  padding-top: 5.5rem !important;
  border-top: 1px solid var(--vp-c-gutter);
}

.vp-home-sponsors {
  margin: 6rem 0;
}

@media (min-width: 48rem) {
  .vp-home-sponsors {
    margin: 8rem 0;
  }
}

.vp-home-sponsors {
  padding: 0 1.5rem;
}

@media (min-width: 48rem) {
  .vp-home-sponsors {
    padding: 0 3rem;
  }
}

@media (min-width: 60rem) {
  .vp-home-sponsors {
    padding: 0 4rem;
  }
}

.container {
  max-width: 72rem;
  margin: 0 auto;
}

.love {
  width: fit-content;
  margin: 0 auto;
  color: var(--vp-c-text-subtle);
  font-size: 1.75rem;
}

.icon {
  display: inline-block;
}

.message {
  max-width: 20rem;
  margin: 0 auto;
  padding-top: 0.625rem;
  border-top: none;

  color: var(--vp-c-text-mute);

  font-weight: 500;
  font-size: 1rem;
  line-height: 1.5;
  letter-spacing: normal;
  text-align: center;
}

.sponsors {
  padding-top: 2rem;
}

.action {
  padding-top: 2.5rem;
  text-align: center;
}
</style>
