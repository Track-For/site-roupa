<script setup>
import { computed, nextTick, onUnmounted, ref, watch } from 'vue'
import { gsap } from 'gsap'
import { wardrobeOptions } from '../../data/collections'
import { products } from '../../data/products'

const contexts = ['CITY', 'COUNTRY', 'EVENING', 'WEEKEND']
const attitudes = ['Classic', 'Relaxed', 'Formal', 'Understated']
const selectedContext = ref('COUNTRY')
const selectedAttitude = ref('Understated')
const resultRoot = ref(null)
let ctx

const result = computed(() => wardrobeOptions[selectedContext.value][selectedAttitude.value])

function productImage(index) {
  const contextMap = {
    CITY: [1, 2, 3],
    COUNTRY: [0, 5, 3],
    EVENING: [1, 3, 4],
    WEEKEND: [0, 5, 4],
  }
  return products[contextMap[selectedContext.value][index]].image
}

watch([selectedContext, selectedAttitude], async () => {
  await nextTick()
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
  ctx?.revert()
  ctx = gsap.context(() => {
    gsap.fromTo(
      '.wardrobe-piece',
      { autoAlpha: 0, y: 24 },
      { autoAlpha: 1, y: 0, duration: 0.8, stagger: 0.09, ease: 'power3.out' },
    )
  }, resultRoot.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section class="section wardrobe">
    <div class="shell wardrobe-heading">
      <h2 class="display">BUILD YOUR<br />WARDROBE</h2>
      <p class="body-copy">Begin with the life you dress for. We will suggest three pieces.</p>
    </div>

    <div class="shell wardrobe-builder">
      <div class="builder-choices">
        <fieldset>
          <legend>Where will you wear it?</legend>
          <button
            v-for="context in contexts"
            :key="context"
            type="button"
            :class="{ active: selectedContext === context }"
            @click="selectedContext = context"
          >
            {{ context }}
          </button>
        </fieldset>

        <fieldset>
          <legend>How should it feel?</legend>
          <button
            v-for="attitude in attitudes"
            :key="attitude"
            type="button"
            :class="{ active: selectedAttitude === attitude }"
            @click="selectedAttitude = attitude"
          >
            {{ attitude }}
          </button>
        </fieldset>
      </div>

      <div ref="resultRoot" class="wardrobe-result">
        <div class="result-title">
          <span>Your edit</span>
          <h3 class="display">{{ selectedContext.charAt(0) + selectedContext.slice(1).toLowerCase() }}</h3>
        </div>

        <div class="result-pieces">
          <article v-for="(piece, index) in result" :key="piece" class="wardrobe-piece">
            <img :src="productImage(index)" :alt="piece" loading="lazy" />
            <span>0{{ index + 1 }}</span>
            <h4>{{ piece }}</h4>
          </article>
        </div>

        <a class="text-link" href="#collection" data-cursor="VIEW">View the edit</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.wardrobe {
  background: var(--forest);
  color: var(--white);
}

.wardrobe-heading {
  display: grid;
  grid-template-columns: 1fr;
}

.wardrobe-heading h2 {
  max-width: 9ch;
  margin-top: 1.2rem;
  font-size: clamp(4.8rem, 10vw, 10.2rem);
}

.wardrobe-heading .body-copy {
  margin-top: 1.8rem;
  color: var(--muted-light);
}

.wardrobe-builder {
  display: grid;
  margin-top: clamp(4.5rem, 9vw, 9rem);
  border-top: 1px solid var(--hairline-light);
  gap: clamp(3rem, 8vw, 8rem);
  grid-template-columns: 0.65fr 1.35fr;
}

.builder-choices {
  padding-top: 2rem;
}

.builder-choices fieldset {
  display: grid;
  margin: 0 0 2.8rem;
  padding: 0;
  border: 0;
}

.builder-choices legend {
  margin-bottom: 1rem;
  color: var(--muted-light);
  font-size: 0.59rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.builder-choices button {
  width: fit-content;
  padding: 0.35rem 0;
  background: transparent;
  color: rgba(250, 248, 242, 0.43);
  cursor: pointer;
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 3vw, 2.8rem);
  text-align: left;
  transition: color 450ms var(--ease-out), transform 450ms var(--ease-out);
}

.builder-choices button.active,
.builder-choices button:hover,
.builder-choices button:focus-visible {
  color: var(--white);
  transform: translateX(0.5rem);
}

.wardrobe-result {
  padding-top: 2rem;
}

.result-title span {
  color: var(--muted-light);
  font-size: 0.59rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.result-title h3 {
  margin-top: 0.45rem;
  font-size: clamp(3.5rem, 6vw, 6rem);
}

.result-pieces {
  display: grid;
  margin-top: 2.2rem;
  gap: 1rem;
  grid-template-columns: repeat(3, 1fr);
}

.wardrobe-piece {
  position: relative;
}

.wardrobe-piece:nth-child(2) {
  transform: translateY(2rem);
}

.wardrobe-piece img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
}

.wardrobe-piece span {
  display: block;
  margin-top: 1rem;
  color: var(--muted-light);
  font-size: 0.55rem;
  letter-spacing: 0.12em;
}

.wardrobe-piece h4 {
  margin: 0.35rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(1.15rem, 2vw, 1.75rem);
  font-weight: 400;
  line-height: 1.1;
}

.wardrobe-result > .text-link {
  margin-top: 5rem;
}

@media (max-width: 850px) {
  .wardrobe-heading h2 {
    font-size: clamp(4rem, 17vw, 6rem);
  }

  .wardrobe-builder {
    grid-template-columns: 1fr;
  }

  .builder-choices {
    display: grid;
    gap: 1.5rem;
    grid-template-columns: 1fr 1fr;
  }

  .result-pieces {
    overflow-x: auto;
    padding-bottom: 1rem;
    grid-template-columns: repeat(3, minmax(15rem, 76vw));
    scroll-snap-type: x mandatory;
  }

  .wardrobe-piece {
    scroll-snap-align: start;
  }

  .wardrobe-piece:nth-child(2) {
    transform: none;
  }
}

@media (max-width: 520px) {
  .builder-choices {
    grid-template-columns: 1fr;
  }
}
</style>
