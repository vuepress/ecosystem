<script setup lang="ts">
import VPButton from '@theme/VPButton.vue'
import VPSponsors from '@theme/VPSponsors.vue'
import type { Sponsors } from '../../shared/index.js'

interface Props {
  /**
   * Sponsor message
   */
  message?: string
  /**
   * Sponsor action
   */
  actionText?: string
  /**
   * Sponsor action
   */
  actionLink?: string
  /**
   * Sponsor data
   */
  data: Sponsors[]
}

const {
  actionText = 'Become a sponsor',
  message = undefined,
  actionLink = undefined,
} = defineProps<Props>()
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
        <VPSponsors :data="data" />
      </div>

      <div v-if="actionLink" class="action">
        <VPButton theme="sponsor" :text="actionText" :href="actionLink" />
      </div>
    </div>
  </section>
</template>

<style scoped>
.vp-home-sponsors {
  margin: 96px 0;
  padding: 0 24px;
  padding-top: 88px !important;
  border-top: 1px solid var(--vp-c-gutter);
}

@media (min-width: 768px) {
  .vp-home-sponsors {
    margin: 128px 0;
  }
}

@media (min-width: 768px) {
  .vp-home-sponsors {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .vp-home-sponsors {
    padding: 0 64px;
  }
}

.container {
  max-width: 1152px;
  margin: 0 auto;
}

.love {
  width: fit-content;
  margin: 0 auto;
  color: var(--vp-c-text-subtle);
  font-size: 28px;
}

.icon {
  display: inline-block;
}

.message {
  max-width: 320px;
  margin: 0 auto;
  padding-top: 10px;

  color: var(--vp-c-text-mute);

  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
}

.sponsors {
  padding-top: 32px;
}

.action {
  padding-top: 40px;
  text-align: center;
}
</style>
