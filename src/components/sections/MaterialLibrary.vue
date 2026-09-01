<script setup>
import { ref } from 'vue'
import RevealText from '../motion/RevealText.vue'
import materialStudy from '../../assets/textures/material-study.jpg'

const materials = [
  { name: 'Cashmere', place: 'House archive', origin: '34% 46%' },
  { name: 'Merino', place: 'Private mill', origin: '74% 86%' },
  { name: 'Silk', place: 'House archive', origin: '83% 18%' },
  { name: 'Linen', place: 'House archive', origin: '84% 55%' },
  { name: 'Suede', place: 'Private tannery', origin: '12% 83%' },
  { name: 'Horn', place: 'Natural finish', origin: '52% 65%' },
  { name: 'Wool', place: 'Small-run cloth', origin: '18% 14%' },
]

const active = ref(0)
</script>

<template>
  <section class="section materials">
    <div class="shell materials-head">
      <RevealText as="h2" class="display">THE MATERIAL<br />LIBRARY</RevealText>
      <p class="body-copy">Natural fibres are selected for handle, recovery and the way they improve with wear.</p>
    </div>

    <div class="shell materials-layout">
      <div class="material-visual" data-cursor="DISCOVER">
        <img
          :src="materialStudy"
          alt="A study of wool, cashmere, silk, linen, suede and horn"
          :style="{ transformOrigin: materials[active].origin }"
          loading="lazy"
        />
        <div class="material-caption">
          <strong>{{ materials[active].name }}</strong>
          <span>{{ materials[active].place }}</span>
        </div>
      </div>

      <div class="material-list">
        <button
          v-for="(material, index) in materials"
          :key="material.name"
          type="button"
          :class="{ active: active === index }"
          @mouseenter="active = index"
          @focus="active = index"
          @click="active = index"
        >
          <span>0{{ index + 1 }}</span>
          <strong>{{ material.name }}</strong>
        </button>
      </div>
    </div>
  </section>
</template>

<style scoped>
.materials {
  background: var(--ivory);
}

.materials-head {
  display: grid;
  align-items: end;
  gap: 2rem;
  grid-template-columns: 1.25fr 0.75fr;
}

.materials-head h2 {
  font-size: clamp(4.2rem, 9vw, 9rem);
}

.materials-layout {
  display: grid;
  margin-top: clamp(4rem, 8vw, 8rem);
  gap: clamp(2rem, 5vw, 5rem);
  grid-template-columns: minmax(0, 1.4fr) minmax(15rem, 0.6fr);
}

.material-visual {
  position: relative;
  min-height: 42rem;
  overflow: hidden;
}

.material-visual img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 1.35s var(--ease-out);
}

.material-visual:hover img {
  transform: scale(1.12);
}

.material-caption {
  position: absolute;
  right: 1.5rem;
  bottom: 1.5rem;
  left: 1.5rem;
  display: flex;
  padding-top: 1rem;
  border-top: 1px solid rgba(250, 248, 242, 0.48);
  color: var(--white);
  justify-content: space-between;
}

.material-caption strong {
  font-family: var(--font-display);
  font-size: 1.8rem;
  font-weight: 400;
}

.material-caption span {
  align-self: flex-end;
  font-size: 0.57rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.material-list {
  display: grid;
  align-content: center;
}

.material-list button {
  display: grid;
  padding: 1.15rem 0;
  border-bottom: 1px solid var(--hairline-dark);
  background: transparent;
  color: var(--muted-dark);
  cursor: pointer;
  align-items: baseline;
  grid-template-columns: 3rem 1fr;
  text-align: left;
  transition: color 500ms var(--ease-out), transform 500ms var(--ease-out);
}

.material-list button:hover,
.material-list button:focus-visible,
.material-list button.active {
  color: var(--ink);
  transform: translateX(0.5rem);
}

.material-list span {
  font-size: 0.55rem;
  letter-spacing: 0.1em;
}

.material-list strong {
  font-family: var(--font-display);
  font-size: clamp(1.55rem, 2.3vw, 2.3rem);
  font-weight: 400;
}

@media (max-width: 800px) {
  .materials-head,
  .materials-layout {
    grid-template-columns: 1fr;
  }

  .materials-head h2 {
    font-size: clamp(4rem, 17vw, 6rem);
  }

  .material-visual {
    min-height: 28rem;
  }
}
</style>
