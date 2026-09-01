<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

const props = defineProps({
  as: { type: String, default: 'div' },
  delay: { type: Number, default: 0 },
  once: { type: Boolean, default: true },
})

const root = ref(null)
let ctx

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  if (reduceMotion) return

  ctx = gsap.context(() => {
    gsap.from(root.value, {
      autoAlpha: 0,
      y: 28,
      duration: 1.15,
      delay: props.delay,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: root.value,
        start: 'top 88%',
        toggleActions: props.once ? 'play none none none' : 'play none none reverse',
      },
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <component :is="as" ref="root">
    <slot />
  </component>
</template>
