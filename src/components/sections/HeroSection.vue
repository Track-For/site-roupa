<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import heroImage from '../../assets/imagery/hero-estate.jpg'

const root = ref(null)
let ctx

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  ctx = gsap.context(() => {
    const timeline = gsap.timeline({
      defaults: { duration: 1.25, ease: 'power3.out' },
      delay: 1.55,
    })

    timeline
      .fromTo('.hero-image', { scale: 1.05 }, { scale: 1, duration: 2.2, ease: 'sine.inOut' })
      .from('.hero-kicker', { autoAlpha: 0, y: 12 }, 0.32)
      .from('.hero-title', { autoAlpha: 0, y: 20 }, 0.42)
      .from('.hero-copy', { autoAlpha: 0, y: 14 }, 0.58)
      .from('.hero-action', { autoAlpha: 0, y: 10 }, 0.7)

    gsap.to('.hero-image', {
      yPercent: 7,
      ease: 'none',
      scrollTrigger: {
        trigger: root.value,
        start: 'top top',
        end: 'bottom top',
        scrub: 1,
      },
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="hero" ref="root" class="hero">
    <img
      class="hero-image will-transform"
      :src="heroImage"
      alt="A tailored couple standing on the stone stair of a misty country estate"
      fetchpriority="high"
    />
    <div class="hero-scrim"></div>
    <div class="hero-content">
      <p class="label hero-kicker">AUTUMN / WINTER 26</p>
      <h1 class="display hero-title">THE COUNTRY<br />COLLECTION</h1>
      <p class="hero-copy">Quietly made. Intentionally worn.</p>
      <a class="text-link hero-action" href="#estate" data-cursor="ENTER">Discover the collection</a>
    </div>
  </section>
</template>

<style scoped>
.hero {
  position: relative;
  min-height: 100dvh;
  overflow: hidden;
  background: var(--forest);
  color: var(--white);
}

.hero-image {
  position: absolute;
  inset: -5% 0 0;
  width: 100%;
  height: 110%;
  object-fit: cover;
  object-position: center;
}

.hero-scrim {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(10, 14, 11, 0.78) 0%, rgba(10, 14, 11, 0.32) 43%, rgba(10, 14, 11, 0.08) 70%),
    linear-gradient(0deg, rgba(10, 14, 11, 0.42) 0%, transparent 48%);
}

.hero-content {
  position: relative;
  z-index: 1;
  display: flex;
  width: min(100%, 1600px);
  min-height: 100dvh;
  margin-inline: auto;
  padding: calc(var(--nav-height) + 4rem) var(--page-gutter) 4.5rem;
  align-items: flex-start;
  flex-direction: column;
  justify-content: flex-end;
}

.hero-kicker {
  margin-bottom: 1.4rem;
}

.hero-title {
  max-width: 8ch;
  font-size: clamp(4.2rem, 8.1vw, 8.5rem);
}

.hero-copy {
  margin: 1.35rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(1.35rem, 2vw, 1.9rem);
  font-style: italic;
  line-height: 1.2;
}

.hero-action {
  margin-top: 1.45rem;
}

@media (max-width: 767px) {
  .hero-image {
    object-position: 63% center;
  }

  .hero-scrim {
    background:
      linear-gradient(0deg, rgba(10, 14, 11, 0.88) 0%, rgba(10, 14, 11, 0.22) 70%),
      linear-gradient(90deg, rgba(10, 14, 11, 0.34), transparent 80%);
  }

  .hero-content {
    padding-bottom: 3rem;
  }

  .hero-title {
    font-size: clamp(3.65rem, 18vw, 5.6rem);
  }
}
</style>
