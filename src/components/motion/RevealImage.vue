<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  loading: { type: String, default: 'lazy' },
})

const root = ref(null)
let ctx

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  ctx = gsap.context(() => {
    gsap.fromTo(
      root.value,
      { clipPath: 'inset(0 0 100% 0)' },
      {
        clipPath: 'inset(0 0 0% 0)',
        duration: 1.45,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: root.value,
          start: 'top 84%',
          once: true,
        },
      },
    )
    gsap.from(root.value.querySelector('img'), {
      scale: 1.08,
      duration: 1.8,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: root.value,
        start: 'top 84%',
        once: true,
      },
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <div ref="root" class="reveal-image">
    <img :src="src" :alt="alt" :loading="loading" />
  </div>
</template>

<style scoped>
.reveal-image {
  overflow: hidden;
}

img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
</style>
