<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'

const container = ref<HTMLElement | null>(null)

function toggleCodeGroupItem(e: MouseEvent): void {
  const el = e.target as HTMLInputElement

  if (el.matches('.vp-code-group input')) {
    // input <- .tabs <- .vp-code-group
    const group = el.parentElement?.parentElement
    if (!group) return

    const i = Array.from(group.querySelectorAll('input')).indexOf(el)
    if (i < 0) return

    const blocks = group.querySelector('.blocks')
    if (!blocks) return

    const current = Array.from(blocks.children).find((child) =>
      child.classList.contains('active'),
    )
    if (!current) return

    const next = blocks.children[i]
    if (!next || current === next) return

    current.classList.remove('active')
    next.classList.add('active')

    const label = group?.querySelector(`label[for="${el.id}"]`)
    label?.scrollIntoView({ block: 'nearest' })
  }
}

onMounted(() => {
  if (!container.value) return

  container.value.addEventListener('click', toggleCodeGroupItem)

  const tabs = Array.from(
    container.value.querySelectorAll('.tabs input'),
  ) as HTMLInputElement[]
  const blocks = container.value.querySelector('.blocks')
  const children = blocks?.children
  tabs.forEach((tab, index) => {
    children?.[index].classList.toggle('active', tab.checked)
  })
})
onUnmounted(() => {
  container.value?.removeEventListener('click', toggleCodeGroupItem)
})
</script>

<template>
  <div ref="container" class="vpCodeGroup">
    <slot />
  </div>
</template>
