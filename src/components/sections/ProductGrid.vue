<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { products } from '../../data/products'
import ProductQuickView from './ProductQuickView.vue'

const emit = defineEmits(['add'])
const root = ref(null)
const selectedProduct = ref(null)
const quickOpen = ref(false)
let ctx

function openProduct(product) {
  selectedProduct.value = product
  quickOpen.value = true
}

function addProduct(product) {
  quickOpen.value = false
  emit('add', product)
}

onMounted(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  ctx = gsap.context(() => {
    gsap.set('.product-item', { autoAlpha: 0, y: 34 })
    ScrollTrigger.batch('.product-item', {
      start: 'top 86%',
      once: true,
      interval: 0.12,
      batchMax: 3,
      onEnter: (elements) => {
        gsap.to(elements, {
          autoAlpha: 1,
          y: 0,
          duration: 1.05,
          stagger: 0.13,
          ease: 'power3.out',
          overwrite: true,
        })
      },
    })
  }, root.value)
})

onUnmounted(() => ctx?.revert())
</script>

<template>
  <section id="collection" ref="root" class="section collection">
    <div class="shell collection-head">
      <h2 class="display">THE HOUSE<br />COLLECTION</h2>
      <p class="body-copy">A concise wardrobe, cut in small runs and intended to settle into daily life.</p>
    </div>

    <div class="shell product-grid">
      <article v-for="(product, index) in products" :key="product.id" class="product-item">
        <button class="product-media" type="button" data-cursor="VIEW" @click="openProduct(product)">
          <img class="primary" :src="product.image" :alt="product.name" loading="lazy" />
          <img class="secondary" :src="product.secondaryImage" :alt="`${product.name} detail`" loading="lazy" />
          <span>Quick view</span>
        </button>
        <div class="product-meta">
          <div>
            <h3>{{ product.name }}</h3>
            <p>{{ product.colors[0] }}</p>
          </div>
          <strong>{{ product.price }}</strong>
        </div>
        <span class="product-number">0{{ index + 1 }}</span>
      </article>
    </div>

    <ProductQuickView
      :open="quickOpen"
      :product="selectedProduct"
      @close="quickOpen = false"
      @add="addProduct"
    />
  </section>
</template>

<style scoped>
.collection {
  background: var(--ivory);
}

.collection-head {
  display: grid;
  align-items: end;
  gap: 2rem;
  grid-template-columns: 1.2fr 0.8fr;
}

.collection-head h2 {
  font-size: clamp(4.5rem, 9vw, 9rem);
}

.product-grid {
  display: grid;
  margin-top: clamp(5rem, 9vw, 9rem);
  align-items: start;
  column-gap: clamp(1rem, 2.5vw, 2.5rem);
  grid-template-columns: repeat(12, 1fr);
  row-gap: clamp(4rem, 8vw, 8rem);
}

.product-item {
  position: relative;
  grid-column: span 5;
}

.product-item:nth-child(2),
.product-item:nth-child(5) {
  grid-column: 7 / span 6;
  margin-top: clamp(4rem, 11vw, 11rem);
}

.product-item:nth-child(3) {
  grid-column: 2 / span 4;
}

.product-item:nth-child(4) {
  grid-column: 7 / span 5;
}

.product-item:nth-child(6) {
  grid-column: 2 / span 5;
}

.product-media {
  position: relative;
  display: block;
  width: 100%;
  padding: 0;
  overflow: hidden;
  background: var(--cream);
  cursor: pointer;
}

.product-media img {
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
  transition:
    opacity 850ms var(--ease-out),
    transform 1.15s var(--ease-out);
}

.product-media .secondary {
  position: absolute;
  inset: 0;
  opacity: 0;
  transform: scale(1.035);
}

.product-media span {
  position: absolute;
  right: 1rem;
  bottom: 1rem;
  left: 1rem;
  padding: 0.85rem 1rem;
  background: rgba(241, 238, 231, 0.9);
  color: var(--ink);
  font-size: 0.59rem;
  letter-spacing: 0.14em;
  opacity: 0;
  text-transform: uppercase;
  transform: translateY(0.7rem);
  transition:
    opacity 650ms var(--ease-out),
    transform 650ms var(--ease-out);
}

.product-media:hover .primary,
.product-media:focus-visible .primary {
  opacity: 0;
}

.product-media:hover .secondary,
.product-media:focus-visible .secondary {
  opacity: 1;
  transform: scale(1);
}

.product-media:hover span,
.product-media:focus-visible span {
  opacity: 1;
  transform: translateY(0);
}

.product-meta {
  display: flex;
  margin-top: 1.2rem;
  align-items: flex-start;
  gap: 1rem;
  justify-content: space-between;
}

.product-meta h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 2.2vw, 2rem);
  font-weight: 500;
  line-height: 1.1;
}

.product-meta p {
  margin: 0.35rem 0 0;
  color: var(--muted-dark);
  font-size: 0.63rem;
}

.product-meta strong {
  font-size: 0.67rem;
  font-weight: 500;
  white-space: nowrap;
}

.product-number {
  position: absolute;
  top: 0.8rem;
  left: -1.7rem;
  color: var(--muted-dark);
  font-size: 0.54rem;
  letter-spacing: 0.1em;
}

@media (max-width: 800px) {
  .collection-head {
    grid-template-columns: 1fr;
  }

  .collection-head h2 {
    font-size: clamp(4rem, 17vw, 6rem);
  }

  .product-grid {
    grid-template-columns: 1fr;
    row-gap: 4.5rem;
  }

  .product-item,
  .product-item:nth-child(2),
  .product-item:nth-child(3),
  .product-item:nth-child(4),
  .product-item:nth-child(5),
  .product-item:nth-child(6) {
    margin-top: 0;
    grid-column: auto;
  }

  .product-number {
    display: none;
  }
}
</style>
