<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

defineProps({
  src: { type: String, required: true },
  alt: { type: String, required: true },
  position: { type: String, default: 'center' },
})

const root = ref(null)
let ctx

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const isMobile = window.matchMedia('(max-width: 767px)').matches
  if (reduceMotion || isMobile) return

  ctx = gsap.context(() => {
    gsap.fromTo(
      root.value.querySelector('img'),
      { yPercent: -5, scale: 1.06 },
      {
        yPercent: 5,
        scale: 1,
        ease: 'none',
        scrollTrigger: {
          trigger: root.value,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        },
      },
    )
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <div ref="root" class="parallax-image">
    <img :src="src" :alt="alt" :style="{ objectPosition: position }" loading="lazy" />
  </div>
</template>

<style scoped>
.parallax-image {
  overflow: hidden;
}

img {
  width: 100%;
  height: 112%;
  object-fit: cover;
}
</style>
