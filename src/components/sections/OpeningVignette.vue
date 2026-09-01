<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

const emit = defineEmits(['complete'])
const root = ref(null)
let ctx

onMounted(() => {
  document.body.classList.add('modal-open')
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

  if (reduceMotion) {
    gsap.set(root.value, { autoAlpha: 0 })
    document.body.classList.remove('modal-open')
    emit('complete')
    return
  }

  ctx = gsap.context(() => {
    const timeline = gsap.timeline({
      defaults: { ease: 'power3.out' },
      onComplete: () => {
        document.body.classList.remove('modal-open')
        emit('complete')
      },
    })

    timeline
      .from('.vignette-monogram', { autoAlpha: 0, scale: 0.94, duration: 0.34 })
      .from('.vignette-rule', { scaleX: 0, duration: 0.28 }, '-=0.12')
      .from('.vignette-est', { autoAlpha: 0, y: 6, duration: 0.26 }, '-=0.16')
      .from('.vignette-name', { autoAlpha: 0, y: 7, duration: 0.28 }, '-=0.14')
      .to('.vignette-content', { autoAlpha: 0, duration: 0.22 }, '+=0.08')
      .to('.vignette-panel.left', { xPercent: -100, duration: 0.54, ease: 'expo.inOut' }, '<')
      .to('.vignette-panel.right', { xPercent: 100, duration: 0.54, ease: 'expo.inOut' }, '<')
      .set(root.value, { display: 'none' })
  }, root.value)
})

onUnmounted(() => {
  ctx?.revert()
  document.body.classList.remove('modal-open')
})
</script>

<template>
  <div ref="root" class="vignette" role="status" aria-label="Opening Alderwyck and Vale">
    <div class="vignette-panel left"></div>
    <div class="vignette-panel right"></div>
    <div class="vignette-content">
      <div class="vignette-monogram">A<span>&amp;</span>V</div>
      <div class="vignette-rule"></div>
      <p class="vignette-est">EST. 1908</p>
      <p class="vignette-name">ALDERWYCK &amp; VALE</p>
    </div>
  </div>
</template>

<style scoped>
.vignette {
  position: fixed;
  inset: 0;
  z-index: 100;
  display: grid;
  place-items: center;
  color: var(--forest);
}

.vignette-panel {
  position: absolute;
  top: 0;
  bottom: 0;
  width: 50.1%;
  background: var(--ivory);
}

.vignette-panel.left {
  left: 0;
  transform-origin: left;
}

.vignette-panel.right {
  right: 0;
  transform-origin: right;
}

.vignette-content {
  position: relative;
  z-index: 1;
  display: grid;
  justify-items: center;
}

.vignette-monogram {
  font-family: var(--font-display);
  font-size: clamp(4.2rem, 9vw, 7rem);
  font-weight: 300;
  letter-spacing: -0.12em;
  line-height: 0.8;
  text-shadow: 0 1px 0 rgba(255, 255, 255, 0.9), 0 -1px 0 rgba(32, 34, 31, 0.14);
}

.vignette-monogram span {
  display: inline-block;
  margin-inline: -0.03em 0.06em;
  font-size: 0.48em;
  font-style: italic;
}

.vignette-rule {
  width: 5rem;
  height: 1px;
  margin: 2rem 0 1rem;
  background: currentColor;
}

.vignette-est,
.vignette-name {
  margin: 0;
  font-size: 0.62rem;
  font-weight: 500;
  letter-spacing: 0.28em;
}

.vignette-name {
  margin-top: 1.2rem;
  font-family: var(--font-display);
  font-size: 0.92rem;
  letter-spacing: 0.18em;
}
</style>
