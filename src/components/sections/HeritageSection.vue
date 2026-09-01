<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

const root = ref(null)
let ctx

const events = [
  { year: '1908', title: 'First atelier', copy: 'Edward Alderwyck and Matthieu Vale begin a private tailoring room.' },
  { year: '1934', title: 'A second cutting table', copy: 'The house expands its small circle of makers.' },
  { year: '1968', title: 'Knitwear introduced', copy: 'Soft structure enters the seasonal wardrobe.' },
  { year: '1997', title: 'Private collection', copy: 'Pieces are offered beyond appointment clients.' },
  { year: '2026', title: 'A new chapter', copy: 'The house collection opens to a wider, still considered audience.' },
]

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  ctx = gsap.context(() => {
    gsap.from('.heritage-line', {
      scaleX: 0,
      duration: 1.7,
      ease: 'power3.out',
      scrollTrigger: { trigger: root.value, start: 'top 72%', once: true },
    })

    gsap.from('.heritage-event', {
      autoAlpha: 0,
      y: 28,
      duration: 0.9,
      stagger: 0.13,
      ease: 'power3.out',
      scrollTrigger: { trigger: '.heritage-events', start: 'top 78%', once: true },
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="heritage" ref="root" class="section heritage">
    <div class="shell heritage-heading">
      <h2 class="display">A HOUSE BUILT<br />BY DEGREES.</h2>
      <p class="body-copy">Founded in 1908 as a private Anglo-Swiss tailoring room. The rest has been careful addition.</p>
    </div>

    <div class="shell heritage-timeline">
      <div class="heritage-line"></div>
      <div class="heritage-events">
        <article v-for="event in events" :key="event.year" class="heritage-event">
          <span>{{ event.year }}</span>
          <h3>{{ event.title }}</h3>
          <p>{{ event.copy }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<style scoped>
.heritage {
  background: var(--ivory);
}

.heritage-heading {
  display: grid;
  align-items: end;
  gap: 2rem;
  grid-template-columns: 1.2fr 0.8fr;
}

.heritage-heading h2 {
  font-size: clamp(4.4rem, 9vw, 9rem);
}

.heritage-timeline {
  margin-top: clamp(5rem, 9vw, 9rem);
}

.heritage-line {
  width: 100%;
  height: 1px;
  background: var(--hairline-dark);
  transform-origin: left;
}

.heritage-events {
  display: grid;
  gap: 2rem;
  grid-template-columns: repeat(5, 1fr);
}

.heritage-event {
  position: relative;
  padding-top: 2rem;
}

.heritage-event::before {
  content: '';
  position: absolute;
  top: -3px;
  left: 0;
  width: 7px;
  height: 7px;
  border: 1px solid var(--ink);
  border-radius: 50%;
  background: var(--ivory);
}

.heritage-event span {
  font-family: var(--font-display);
  font-size: 2rem;
}

.heritage-event h3 {
  margin: 1.1rem 0 0;
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 500;
}

.heritage-event p {
  max-width: 23ch;
  margin: 0.65rem 0 0;
  color: var(--muted-dark);
  font-size: 0.7rem;
  line-height: 1.7;
}

@media (max-width: 850px) {
  .heritage-heading {
    grid-template-columns: 1fr;
  }

  .heritage-heading h2 {
    font-size: clamp(4rem, 17vw, 6rem);
  }

  .heritage-line {
    display: none;
  }

  .heritage-events {
    grid-template-columns: 1fr;
  }

  .heritage-event {
    padding: 1.5rem 0 1.5rem 2rem;
    border-left: 1px solid var(--hairline-dark);
  }

  .heritage-event::before {
    top: 2.1rem;
    left: -4px;
  }
}
</style>
