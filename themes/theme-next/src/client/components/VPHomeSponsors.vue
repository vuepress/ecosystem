<script setup lang="ts">
import VPButton from '@theme/VPButton.vue'
import VPSponsors from '@theme/VPSponsors.vue'
import type { Sponsors } from '../../shared/index.js'

interface Props {
  message?: string
  actionText?: string
  actionLink?: string
  data: Sponsors[]
}

withDefaults(defineProps<Props>(), {
  actionText: 'Become a sponsor',
  message: undefined,
  actionLink: undefined,
})
</script>

<template>
  <section class="vpHomeSponsors">
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
.vpHomeSponsors {
  border-top: 1px solid var(--vp-c-gutter);
  padding-top: 88px !important;
}

.vpHomeSponsors {
  margin: 96px 0;
}

@media (min-width: 768px) {
  .vpHomeSponsors {
    margin: 128px 0;
  }
}

.vpHomeSponsors {
  padding: 0 24px;
}

@media (min-width: 768px) {
  .vpHomeSponsors {
    padding: 0 48px;
  }
}

@media (min-width: 960px) {
  .vpHomeSponsors {
    padding: 0 64px;
  }
}

.container {
  margin: 0 auto;
  max-width: 1152px;
}

.love {
  margin: 0 auto;
  width: fit-content;
  font-size: 28px;
  color: var(--vp-c-text-3);
}

.icon {
  display: inline-block;
}

.message {
  margin: 0 auto;
  padding-top: 10px;
  max-width: 320px;
  text-align: center;
  line-height: 24px;
  font-size: 16px;
  font-weight: 500;
  color: var(--vp-c-text-2);
}

.sponsors {
  padding-top: 32px;
}

.action {
  padding-top: 40px;
  text-align: center;
}
</style>
