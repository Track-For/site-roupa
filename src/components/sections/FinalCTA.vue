<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import finalImage from '../../assets/imagery/final-estate.jpg'

const root = ref(null)
let ctx

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  ctx = gsap.context(() => {
    gsap.from('.final-copy > *', {
      autoAlpha: 0,
      y: 26,
      duration: 1.1,
      stagger: 0.1,
      ease: 'power3.out',
      scrollTrigger: { trigger: root.value, start: 'top 72%', once: true },
    })
    gsap.fromTo(
      '.final-image',
      { scale: 1.06 },
      {
        scale: 1,
        ease: 'none',
        scrollTrigger: { trigger: root.value, start: 'top bottom', end: 'bottom top', scrub: 1 },
      },
    )
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section ref="root" class="final-cta">
    <img class="final-image" :src="finalImage" alt="A secluded country house at late afternoon" loading="lazy" />
    <div class="final-shade"></div>
    <div class="shell final-copy">
      <h2 class="display">A WARDROBE SHOULD<br />OUTLIVE A SEASON.</h2>
      <p>Discover the house collection.</p>
      <a class="button-ghost" href="#collection" data-cursor="ENTER">Enter the collection</a>
    </div>
  </section>
</template>

<style scoped>
.final-cta {
  position: relative;
  display: grid;
  min-height: 92dvh;
  place-items: center;
  overflow: hidden;
  background: var(--charcoal);
  color: var(--white);
}

.final-image,
.final-shade {
  position: absolute;
  inset: -4%;
  width: 108%;
  height: 108%;
}

.final-image {
  object-fit: cover;
  object-position: center;
}

.final-shade {
  background: linear-gradient(90deg, rgba(9, 12, 9, 0.78), rgba(9, 12, 9, 0.08) 72%);
}

.final-copy {
  position: relative;
  z-index: 1;
}

.final-copy h2 {
  max-width: 11ch;
  font-size: clamp(4.2rem, 8.5vw, 9rem);
}

.final-copy p {
  margin: 1.6rem 0 0;
  font-family: var(--font-display);
  font-size: 1.55rem;
  font-style: italic;
}

.final-copy a {
  margin-top: 2rem;
}

@media (max-width: 700px) {
  .final-cta {
    min-height: 82dvh;
  }

  .final-image {
    object-position: 66% center;
  }

  .final-shade {
    background: rgba(9, 12, 9, 0.58);
  }

  .final-copy h2 {
    font-size: clamp(3.8rem, 16vw, 5.6rem);
  }
}
</style>
