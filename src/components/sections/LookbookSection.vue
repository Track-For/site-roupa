<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import lookbookImage from '../../assets/imagery/lookbook-arch.jpg'
import libraryImage from '../../assets/imagery/estate-library.jpg'
import gardenImage from '../../assets/imagery/estate-garden.jpg'
import clubImage from '../../assets/imagery/estate-club.jpg'

const root = ref(null)
let ctx

const frames = [
  { image: lookbookImage, alt: 'A tailored couple walking beneath a stone arch', line: 'CUT QUIETLY.' },
  { image: gardenImage, alt: 'A woman in a racing green trench in a misty garden', line: 'WORN CONFIDENTLY.' },
  { image: libraryImage, alt: 'A man in tailored tweed seated in a private library', line: 'KEPT FOR YEARS.' },
  { image: clubImage, alt: 'A man in evening tailoring in a private room', line: 'AFTER SIX.' },
]

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const desktop = window.matchMedia('(min-width: 900px)').matches
  if (reduceMotion || !desktop) return

  ctx = gsap.context(() => {
    const images = gsap.utils.toArray('.lookbook-frame')
    images.forEach((frame, index) => {
      if (index === 0) return
      gsap.from(frame, {
        yPercent: 14,
        clipPath: 'inset(100% 0 0 0)',
        ease: 'none',
        scrollTrigger: {
          trigger: frame,
          start: 'top 86%',
          end: 'top 18%',
          scrub: 1,
        },
      })
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section ref="root" class="lookbook">
    <div class="shell lookbook-intro">
      <h2 class="display">A STUDY IN<br /><em>RESTRAINT</em></h2>
    </div>

    <div class="lookbook-frames">
      <article v-for="(frame, index) in frames" :key="frame.line" class="lookbook-frame">
        <img :src="frame.image" :alt="frame.alt" loading="lazy" />
        <div class="frame-shade"></div>
        <p>{{ frame.line }}</p>
        <span>0{{ index + 1 }}</span>
      </article>
    </div>
  </section>
</template>

<style scoped>
.lookbook {
  padding-top: var(--section-space);
  background: var(--ivory);
}

.lookbook-intro {
  position: relative;
  z-index: 5;
  padding-bottom: clamp(4rem, 8vw, 8rem);
}

.lookbook-intro h2 {
  max-width: 9ch;
  margin-top: 1rem;
  font-size: clamp(4.7rem, 10vw, 10.5rem);
}

.lookbook-intro em {
  display: inline-block;
  padding-bottom: 0.08em;
  font-weight: 300;
}

.lookbook-frames {
  position: relative;
}

.lookbook-frame {
  position: sticky;
  top: 0;
  height: 100dvh;
  overflow: hidden;
  background: var(--charcoal);
  color: var(--white);
}

.lookbook-frame img,
.frame-shade {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
}

.lookbook-frame img {
  object-fit: cover;
}

.lookbook-frame:nth-child(1) img {
  object-position: center 61%;
}

.lookbook-frame:nth-child(2) img,
.lookbook-frame:nth-child(3) img {
  object-position: center;
}

.lookbook-frame:nth-child(4) img {
  object-position: 70% center;
}

.frame-shade {
  background: linear-gradient(0deg, rgba(10, 12, 10, 0.72), transparent 55%);
}

.lookbook-frame p {
  position: absolute;
  right: var(--page-gutter);
  bottom: 3rem;
  left: var(--page-gutter);
  z-index: 2;
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(4rem, 10vw, 10rem);
  font-weight: 300;
  letter-spacing: -0.04em;
  line-height: 0.9;
}

.lookbook-frame span {
  position: absolute;
  top: calc(var(--nav-height) + 1.5rem);
  right: var(--page-gutter);
  z-index: 2;
  font-size: 0.61rem;
  letter-spacing: 0.15em;
}

@media (max-width: 899px) {
  .lookbook-intro h2 {
    font-size: clamp(4rem, 17vw, 6rem);
  }

  .lookbook-frame {
    position: relative;
    height: 78dvh;
  }

  .lookbook-frame p {
    font-size: clamp(3.25rem, 15vw, 5rem);
  }
}
</style>
