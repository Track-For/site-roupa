<script setup>
import { ref } from 'vue'
import { collectionIndex } from '../../data/collections'

const active = ref(0)
</script>

<template>
  <section class="section collection-index">
    <div class="shell index-layout">
      <div class="index-list">
        <h2 class="index-heading">Collection index</h2>
        <button
          v-for="(collection, index) in collectionIndex"
          :key="collection.name"
          type="button"
          :class="{ active: active === index }"
          @mouseenter="active = index"
          @focus="active = index"
          @click="active = index"
        >
          <span>{{ collection.number }}</span>
          <strong>{{ collection.name }}</strong>
        </button>
      </div>

      <div class="index-images" data-cursor="ENTER">
        <img
          v-for="(collection, index) in collectionIndex"
          :key="collection.image"
          :src="collection.image"
          :alt="collection.name"
          :class="{ active: active === index }"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.collection-index {
  background: var(--charcoal);
  color: var(--white);
}

.index-layout {
  display: grid;
  min-height: 70rem;
  align-items: center;
  gap: clamp(3rem, 8vw, 9rem);
  grid-template-columns: 1fr 0.85fr;
}

.index-list {
  position: relative;
  z-index: 2;
}

.index-heading {
  margin-bottom: 2.5rem;
  color: var(--muted-light);
  font-family: var(--font-display);
  font-size: 1.6rem;
  font-weight: 400;
}

.index-list button {
  display: grid;
  width: 100%;
  padding: 1.25rem 0;
  border-bottom: 1px solid var(--hairline-light);
  background: transparent;
  color: rgba(250, 248, 242, 0.38);
  cursor: pointer;
  align-items: center;
  gap: 1.5rem;
  grid-template-columns: 3rem 1fr;
  text-align: left;
  transition: color 600ms var(--ease-out), transform 600ms var(--ease-out);
}

.index-list button.active,
.index-list button:hover,
.index-list button:focus-visible {
  color: var(--white);
  transform: translateX(0.7rem);
}

.index-list button span {
  font-size: 0.57rem;
  letter-spacing: 0.15em;
}

.index-list button strong {
  font-family: var(--font-display);
  font-size: clamp(2.6rem, 5vw, 5.8rem);
  font-weight: 300;
  letter-spacing: -0.03em;
  line-height: 0.95;
}

.index-images {
  position: sticky;
  top: calc(var(--nav-height) + 3rem);
  height: min(72dvh, 48rem);
  overflow: hidden;
}

.index-images img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.08);
  transition:
    opacity 850ms var(--ease-out),
    transform 1.2s var(--ease-out);
}

.index-images img.active {
  opacity: 1;
  transform: scale(1);
}

@media (max-width: 800px) {
  .index-layout {
    min-height: auto;
    grid-template-columns: 1fr;
  }

  .index-list button strong {
    font-size: clamp(2.35rem, 11vw, 4rem);
  }

  .index-images {
    position: relative;
    top: auto;
    height: 62dvh;
  }
}
</style>
