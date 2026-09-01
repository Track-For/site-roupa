<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import blazerImage from '../../assets/imagery/marble-blazer.jpg'

const root = ref(null)
const details = ['SUPER 150\'S WOOL', 'HORN BUTTONS', 'FULL CANVAS', 'HAND-FINISHED']
let ctx

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const desktop = window.matchMedia('(min-width: 900px)').matches
  if (reduceMotion || !desktop) return

  ctx = gsap.context(() => {
    const detailElements = gsap.utils.toArray('.detail-stage')
    gsap.set(detailElements.slice(1), { autoAlpha: 0, y: 18 })

    const timeline = gsap.timeline({
      scrollTrigger: {
        trigger: root.value,
        start: 'top top',
        end: '+=2200',
        pin: '.marble-pin',
        scrub: 1,
        anticipatePin: 1,
      },
    })

    timeline.fromTo('.blazer-frame', { rotationY: -6 }, { rotationY: 6, duration: 4, ease: 'none' }, 0)

    detailElements.forEach((detail, index) => {
      if (index === 0) return
      const at = index
      timeline
        .to(detailElements[index - 1], { autoAlpha: 0, y: -18, duration: 0.35 }, at)
        .to(detail, { autoAlpha: 1, y: 0, duration: 0.45 }, at + 0.12)
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section ref="root" class="marble">
    <div class="marble-pin shell">
      <div class="blazer-stage">
        <div class="blazer-frame">
          <img :src="blazerImage" alt="Charcoal double-breasted blazer on a pale marble pedestal" loading="lazy" />
        </div>
      </div>

      <div class="marble-copy">
        <h2 class="display">THE ALDERWYCK<br />BLAZER</h2>
        <p class="price">R$ 7.850</p>

        <div class="detail-stages" aria-label="Garment construction details">
          <div v-for="(detail, index) in details" :key="detail" class="detail-stage">
            <span>0{{ index + 1 }}</span>
            <strong>{{ detail }}</strong>
            <p>
              {{
                [
                  'A dense cloth selected for a clean drape.',
                  'Natural buttons, polished without gloss.',
                  'Structure built to settle with years of wear.',
                  'Every visible edge completed by hand.',
                ][index]
              }}
            </p>
          </div>
        </div>

        <a class="text-link" href="#collection" data-cursor="VIEW">View piece</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.marble {
  position: relative;
  background: #d8d4cc;
}

.marble-pin {
  display: grid;
  min-height: 100dvh;
  align-items: center;
  gap: clamp(3rem, 7vw, 8rem);
  grid-template-columns: minmax(0, 1.2fr) minmax(19rem, 0.8fr);
  perspective: 1200px;
}

.blazer-stage {
  display: grid;
  height: min(82dvh, 58rem);
  place-items: center;
}

.blazer-frame {
  width: min(100%, 41rem);
  height: 100%;
  overflow: hidden;
  box-shadow: 0 30px 80px rgba(32, 34, 31, 0.12);
  transform-style: preserve-3d;
}

.blazer-frame img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.marble-copy h2 {
  margin-top: 1.4rem;
  font-size: clamp(3.5rem, 6.2vw, 6.5rem);
  line-height: 0.88;
}

.price {
  margin: 1.6rem 0 0;
  font-size: 0.75rem;
  letter-spacing: 0.18em;
}

.detail-stages {
  position: relative;
  min-height: 8.5rem;
  margin-top: clamp(3rem, 8vh, 6rem);
}

.detail-stage {
  position: absolute;
  inset: 0;
}

.detail-stage span {
  display: block;
  color: var(--muted-dark);
  font-size: 0.59rem;
  letter-spacing: 0.16em;
}

.detail-stage strong {
  display: block;
  margin-top: 0.65rem;
  font-family: var(--font-display);
  font-size: clamp(1.6rem, 2.6vw, 2.4rem);
  font-weight: 400;
}

.detail-stage p {
  max-width: 32ch;
  margin: 0.4rem 0 0;
  color: var(--muted-dark);
  font-size: 0.75rem;
}

.marble-copy > .text-link {
  margin-top: 2rem;
}

@media (max-width: 899px) {
  .marble-pin {
    min-height: auto;
    padding-top: 6rem;
    padding-bottom: 6rem;
    grid-template-columns: 1fr;
  }

  .blazer-stage {
    height: 68dvh;
    min-height: 34rem;
  }

  .marble-copy h2 {
    font-size: clamp(3.5rem, 13vw, 5.7rem);
  }

  .detail-stages {
    position: static;
    min-height: auto;
    margin-top: 3.5rem;
  }

  .detail-stage {
    position: relative;
    padding: 1.35rem 0;
    border-bottom: 1px solid var(--hairline-dark);
  }
}
</style>
