<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { estateRooms } from '../../data/collections'

const root = ref(null)
let ctx

onMounted(() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const desktop = window.matchMedia('(min-width: 768px)').matches
  if (reduceMotion || !desktop) return

  ctx = gsap.context(() => {
    const layers = gsap.utils.toArray('.estate-layer')
    const copies = gsap.utils.toArray('.estate-copy')
    const indexes = gsap.utils.toArray('.estate-index button')
    const timeline = gsap.timeline({
      defaults: { ease: 'none' },
      scrollTrigger: {
        trigger: root.value,
        start: 'top top',
        end: '+=2800',
        pin: '.estate-pin',
        scrub: 1.1,
        anticipatePin: 1,
      },
    })

    gsap.set(layers.slice(1), { autoAlpha: 0, clipPath: 'inset(100% 0 0 0)', scale: 1.06 })
    gsap.set(copies.slice(1), { autoAlpha: 0, y: 28 })
    gsap.set(indexes.slice(1), { opacity: 0.42 })

    for (let index = 1; index < layers.length; index += 1) {
      const at = index * 1.5
      timeline
        .to(layers[index - 1], { scale: 1.08, duration: 1.5 }, at - 0.55)
        .to(layers[index], { autoAlpha: 1, clipPath: 'inset(0% 0 0 0)', scale: 1, duration: 1.5 }, at)
        .to(copies[index - 1], { autoAlpha: 0, y: -22, duration: 0.45 }, at)
        .to(copies[index], { autoAlpha: 1, y: 0, duration: 0.7 }, at + 0.35)
        .to(indexes[index - 1], { opacity: 0.42, duration: 0.25 }, at)
        .to(indexes[index], { opacity: 1, duration: 0.25 }, at)
    }
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="estate" ref="root" class="estate">
    <div class="estate-pin">
      <div class="estate-layers">
        <article v-for="room in estateRooms" :key="room.number" class="estate-layer">
          <img :src="room.image" :alt="`${room.name} collection environment`" loading="lazy" />
          <div class="estate-shade"></div>
          <div class="estate-mobile-copy">
            <span>{{ room.number }}</span>
            <h2 class="display">{{ room.title }}</h2>
            <p>{{ room.copy }}</p>
          </div>
        </article>
      </div>

      <div class="estate-index" aria-hidden="true">
        <button v-for="room in estateRooms" :key="room.number" type="button" tabindex="-1">
          {{ room.number }}
        </button>
      </div>

      <div class="estate-copies">
        <article v-for="room in estateRooms" :key="room.title" class="estate-copy">
          <p class="label">THE ESTATE</p>
          <h2 class="display">{{ room.title }}</h2>
          <p>{{ room.copy }}</p>
          <span>{{ room.garment }}</span>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.estate {
  position: relative;
  background: var(--forest);
  color: var(--white);
}

.estate-pin {
  position: relative;
  min-height: 100dvh;
  overflow: hidden;
}

.estate-layers,
.estate-layer,
.estate-shade {
  position: absolute;
  inset: 0;
}

.estate-layer img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.estate-layer:nth-child(1) img {
  object-position: 35% center;
}

.estate-layer:nth-child(2) img {
  object-position: center;
}

.estate-layer:nth-child(3) img {
  object-position: 67% center;
}

.estate-shade {
  background:
    linear-gradient(90deg, rgba(10, 11, 9, 0.66) 0%, rgba(10, 11, 9, 0.06) 58%),
    linear-gradient(0deg, rgba(10, 11, 9, 0.72), transparent 58%);
}

.estate-index {
  position: absolute;
  top: 50%;
  left: var(--page-gutter);
  z-index: 3;
  display: grid;
  gap: 1.4rem;
  transform: translateY(-50%);
}

.estate-index::before {
  content: '';
  position: absolute;
  top: -1rem;
  bottom: -1rem;
  left: -0.85rem;
  width: 1px;
  background: var(--hairline-light);
}

.estate-index button {
  padding: 0;
  background: transparent;
  color: inherit;
  font-family: var(--font-display);
  font-size: 1rem;
}

.estate-copies {
  position: absolute;
  right: var(--page-gutter);
  bottom: clamp(3.2rem, 8vh, 6.5rem);
  left: clamp(5rem, 10vw, 10rem);
  z-index: 2;
  min-height: 14rem;
}

.estate-copy {
  position: absolute;
  inset: auto 0 0;
}

.estate-copy h2 {
  margin-top: 1rem;
  font-size: clamp(5.2rem, 12vw, 12.5rem);
  white-space: nowrap;
}

.estate-copy > p:not(.label) {
  max-width: 27ch;
  margin: 1.5rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(1.2rem, 2vw, 1.7rem);
  line-height: 1.25;
}

.estate-copy span {
  position: absolute;
  right: 0;
  bottom: 0.25rem;
  color: var(--muted-light);
  font-size: 0.64rem;
  letter-spacing: 0.16em;
  text-transform: uppercase;
}

.estate-mobile-copy {
  display: none;
}

@media (max-width: 767px) {
  .estate-pin {
    min-height: auto;
  }

  .estate-layers {
    position: relative;
  }

  .estate-layer {
    position: relative;
    min-height: 86dvh;
  }

  .estate-layer img,
  .estate-shade {
    position: absolute;
    inset: 0;
  }

  .estate-layer img {
    object-position: center;
  }

  .estate-index,
  .estate-copies {
    display: none;
  }

  .estate-mobile-copy {
    position: absolute;
    right: 1.15rem;
    bottom: 2rem;
    left: 1.15rem;
    z-index: 2;
    display: block;
  }

  .estate-mobile-copy span {
    font-size: 0.58rem;
    letter-spacing: 0.14em;
  }

  .estate-mobile-copy h2 {
    margin-top: 0.85rem;
    font-family: var(--font-display);
    font-size: clamp(3.9rem, 17vw, 5.4rem);
    line-height: 0.88;
  }

  .estate-mobile-copy p {
    max-width: 27ch;
    margin: 1rem 0 0;
    color: var(--muted-light);
    font-size: 0.78rem;
  }
}
</style>
