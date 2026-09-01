<script setup>
import { onUnmounted, ref, watch } from 'vue'

const props = defineProps({
  open: { type: Boolean, default: false },
  items: { type: Array, default: () => [] },
})

const emit = defineEmits(['close'])
const requested = ref(false)

function onKeydown(event) {
  if (event.key === 'Escape') emit('close')
}

watch(
  () => props.open,
  (open) => {
    document.body.classList.toggle('modal-open', open)
    if (open) {
      requested.value = false
      window.addEventListener('keydown', onKeydown)
    }
    else window.removeEventListener('keydown', onKeydown)
  },
)

onUnmounted(() => {
  document.body.classList.remove('modal-open')
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div class="drawer-wrap" :class="{ 'is-open': open }" :aria-hidden="!open">
      <button class="drawer-backdrop" type="button" aria-label="Close bag" @click="emit('close')"></button>
      <aside class="drawer" role="dialog" aria-modal="true" aria-labelledby="bag-title">
        <div class="drawer-head">
          <div>
            <p class="label">Private selection</p>
            <h2 id="bag-title">Your wardrobe</h2>
          </div>
          <button type="button" @click="emit('close')">Close</button>
        </div>

        <div v-if="items.length" class="drawer-items">
          <article v-for="(item, index) in items" :key="`${item.name}-${index}`" class="drawer-item">
            <img :src="item.image" :alt="item.name" />
            <div>
              <h3>{{ item.name }}</h3>
              <p>{{ item.color || item.collection }}</p>
              <strong>{{ item.price }}</strong>
            </div>
          </article>
        </div>

        <div v-else class="drawer-empty">
          <p class="display">A wardrobe is built slowly.</p>
          <span>Your selected pieces will appear here.</span>
        </div>

        <div v-if="!requested" class="drawer-foot">
          <div><span>Pieces</span><strong>{{ items.length }}</strong></div>
          <button class="button-solid" type="button" :disabled="!items.length" @click="requested = true">
            Request delivery
          </button>
        </div>
        <div v-else class="drawer-confirmation" role="status">
          <strong>Request prepared.</strong>
          <span>A member of the house will contact you privately.</span>
        </div>
      </aside>
    </div>
  </Teleport>
</template>

<style scoped>
.drawer-wrap {
  position: fixed;
  inset: 0;
  z-index: var(--layer-overlay);
  visibility: hidden;
  transition: visibility 0s 500ms;
}

.drawer-wrap.is-open {
  visibility: visible;
  transition-delay: 0s;
}

.drawer-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(15, 17, 14, 0.56);
  cursor: pointer;
  opacity: 0;
  transition: opacity 450ms var(--ease-out);
}

.is-open .drawer-backdrop {
  opacity: 1;
}

.drawer {
  position: absolute;
  top: 0;
  right: 0;
  display: grid;
  width: min(32rem, 100%);
  height: 100%;
  padding: 2rem;
  grid-template-rows: auto 1fr auto;
  background: var(--ivory);
  box-shadow: -30px 0 80px rgba(15, 17, 14, 0.16);
  transform: translateX(100%);
  transition: transform 500ms var(--ease-out);
}

.is-open .drawer {
  transform: translateX(0);
}

.drawer-head,
.drawer-foot,
.drawer-foot div {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.drawer-head {
  padding-bottom: 1.4rem;
  border-bottom: 1px solid var(--hairline-dark);
}

.drawer-head h2 {
  margin: 0.25rem 0 0;
  font-family: var(--font-display);
  font-size: 2.1rem;
  font-weight: 400;
}

.drawer-head button {
  padding: 0.5rem;
  background: transparent;
  cursor: pointer;
  font-size: 0.65rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.drawer-items {
  overflow-y: auto;
  padding: 1rem 0;
}

.drawer-item {
  display: grid;
  padding: 1rem 0;
  border-bottom: 1px solid var(--hairline-dark);
  gap: 1rem;
  grid-template-columns: 6rem 1fr;
}

.drawer-item img {
  width: 6rem;
  aspect-ratio: 4 / 5;
  object-fit: cover;
}

.drawer-item h3 {
  margin: 0;
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 500;
  line-height: 1.1;
}

.drawer-item p {
  margin: 0.4rem 0 0.9rem;
  color: var(--muted-dark);
  font-size: 0.72rem;
}

.drawer-item strong {
  font-size: 0.73rem;
  font-weight: 500;
}

.drawer-empty {
  display: grid;
  padding: 3rem 0;
  align-content: center;
  justify-items: center;
  text-align: center;
}

.drawer-empty p {
  max-width: 8ch;
  font-size: 3.4rem;
}

.drawer-empty span {
  margin-top: 1rem;
  color: var(--muted-dark);
  font-size: 0.78rem;
}

.drawer-foot {
  padding-top: 1.2rem;
  border-top: 1px solid var(--hairline-dark);
  gap: 1rem;
}

.drawer-foot div {
  min-width: 4.5rem;
  flex-direction: column;
  align-items: flex-start;
}

.drawer-foot span {
  color: var(--muted-dark);
  font-size: 0.62rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.drawer-foot strong {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 400;
}

.drawer-foot button {
  flex: 1;
}

.drawer-foot button:disabled {
  cursor: not-allowed;
  opacity: 0.45;
}

.drawer-confirmation {
  display: grid;
  padding-top: 1.4rem;
  border-top: 1px solid var(--hairline-dark);
  gap: 0.25rem;
}

.drawer-confirmation strong {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 400;
}

.drawer-confirmation span {
  color: var(--muted-dark);
  font-size: 0.68rem;
}

@media (max-width: 480px) {
  .drawer {
    padding: 1.25rem;
  }
}
</style>
