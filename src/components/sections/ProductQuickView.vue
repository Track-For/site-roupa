<script setup>
import { computed, onUnmounted, ref, watch } from 'vue'
import { colorValues } from '../../data/products'

const props = defineProps({
  open: { type: Boolean, default: false },
  product: { type: Object, default: null },
})

const emit = defineEmits(['close', 'add'])
const selectedColor = ref('')
const selectedSize = ref('')
const activeImage = ref(0)
const colorChanging = ref(false)
let colorTimer

const images = computed(() => (props.product ? [props.product.image, props.product.secondaryImage] : []))

function onKeydown(event) {
  if (event.key === 'Escape') emit('close')
}

function chooseColor(color) {
  if (color === selectedColor.value) return
  colorChanging.value = true
  window.clearTimeout(colorTimer)
  colorTimer = window.setTimeout(() => {
    selectedColor.value = color
    colorChanging.value = false
  }, 260)
}

function add() {
  if (!props.product || !selectedSize.value) return
  emit('add', {
    ...props.product,
    color: selectedColor.value,
    size: selectedSize.value,
  })
}

watch(
  () => props.open,
  (open) => {
    document.body.classList.toggle('modal-open', open)
    if (open && props.product) {
      selectedColor.value = props.product.colors[0]
      selectedSize.value = ''
      activeImage.value = 0
      window.addEventListener('keydown', onKeydown)
    } else {
      window.removeEventListener('keydown', onKeydown)
    }
  },
)

onUnmounted(() => {
  window.clearTimeout(colorTimer)
  document.body.classList.remove('modal-open')
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <Teleport to="body">
    <div class="quick-view" :class="{ 'is-open': open }" :aria-hidden="!open">
      <button class="quick-backdrop" type="button" aria-label="Close product view" @click="emit('close')"></button>

      <div v-if="product" class="quick-panel" role="dialog" aria-modal="true" :aria-labelledby="`quick-${product.id}`">
        <button class="quick-close" type="button" @click="emit('close')">Close</button>

        <div class="quick-media" :class="{ 'is-changing': colorChanging }">
          <img :class="{ 'is-detail': activeImage === 1 }" :src="images[activeImage]" :alt="product.name" />
          <div
            class="color-wash"
            :style="{ backgroundColor: colorValues[selectedColor] || 'transparent' }"
          ></div>
          <div class="media-tabs">
            <button
              v-for="(_, index) in images"
              :key="index"
              type="button"
              :class="{ active: activeImage === index }"
              :aria-label="`View product image ${index + 1}`"
              @click="activeImage = index"
            >
              0{{ index + 1 }}
            </button>
          </div>
        </div>

        <div class="quick-info">
          <p class="label">{{ product.collection }}</p>
          <h2 :id="`quick-${product.id}`" class="display">{{ product.name }}</h2>
          <p class="quick-price">{{ product.price }}</p>

          <dl>
            <div><dt>Material</dt><dd>{{ product.material }}</dd></div>
            <div><dt>Cut</dt><dd>{{ product.cut }}</dd></div>
          </dl>

          <fieldset>
            <legend>Colour</legend>
            <div class="color-options">
              <button
                v-for="color in product.colors"
                :key="color"
                type="button"
                :class="{ active: selectedColor === color }"
                @click="chooseColor(color)"
              >
                <span :style="{ backgroundColor: colorValues[color] }"></span>
                {{ color }}
              </button>
            </div>
          </fieldset>

          <fieldset>
            <legend>Size</legend>
            <div class="size-options">
              <button
                v-for="size in product.sizes"
                :key="size"
                type="button"
                :class="{ active: selectedSize === size }"
                @click="selectedSize = size"
              >
                {{ size }}
              </button>
            </div>
          </fieldset>

          <button class="button-solid add-button" type="button" :disabled="!selectedSize" @click="add">
            {{ selectedSize ? 'Add to wardrobe' : 'Select a size' }}
          </button>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.quick-view {
  position: fixed;
  inset: 0;
  z-index: var(--layer-overlay);
  visibility: hidden;
  transition: visibility 0s 520ms;
}

.quick-view.is-open {
  visibility: visible;
  transition-delay: 0s;
}

.quick-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(15, 17, 14, 0.68);
  cursor: pointer;
  opacity: 0;
  transition: opacity 450ms var(--ease-out);
}

.is-open .quick-backdrop {
  opacity: 1;
}

.quick-panel {
  position: absolute;
  inset: clamp(1rem, 3vw, 2.5rem);
  display: grid;
  overflow: hidden;
  background: var(--ivory);
  grid-template-columns: minmax(0, 7fr) minmax(22rem, 3fr);
  opacity: 0;
  transform: translateY(2rem) scale(0.985);
  transition:
    opacity 500ms var(--ease-out),
    transform 520ms var(--ease-out);
}

.is-open .quick-panel {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.quick-close {
  position: absolute;
  top: 1.25rem;
  right: 1.25rem;
  z-index: 3;
  padding: 0.6rem;
  background: var(--ivory);
  cursor: pointer;
  font-size: 0.61rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.quick-media {
  position: relative;
  overflow: hidden;
  background: var(--cream);
  transition: opacity 520ms var(--ease-out);
}

.quick-media.is-changing {
  opacity: 0.35;
}

.quick-media > img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.quick-media > img.is-detail {
  object-fit: cover;
}

.color-wash {
  position: absolute;
  inset: 0;
  opacity: 0.045;
  pointer-events: none;
  mix-blend-mode: color;
  transition: background-color 900ms var(--ease-in-out);
}

.media-tabs {
  position: absolute;
  bottom: 1rem;
  left: 1rem;
  display: flex;
  gap: 0.5rem;
}

.media-tabs button {
  display: grid;
  width: 2rem;
  height: 2rem;
  place-items: center;
  border: 1px solid rgba(32, 34, 31, 0.35);
  background: rgba(241, 238, 231, 0.82);
  cursor: pointer;
  font-size: 0.55rem;
  transition: background-color 400ms var(--ease-out), color 400ms var(--ease-out);
}

.media-tabs button.active {
  background: var(--forest);
  color: var(--white);
}

.quick-info {
  padding: clamp(2rem, 4vw, 4rem);
  overflow-y: auto;
}

.quick-info h2 {
  margin-top: 1rem;
  font-size: clamp(3rem, 4.8vw, 5.2rem);
  line-height: 0.92;
}

.quick-price {
  margin: 1.3rem 0 0;
  font-size: 0.75rem;
  letter-spacing: 0.16em;
}

dl {
  display: grid;
  margin: 2.5rem 0;
  padding: 1.4rem 0;
  border-top: 1px solid var(--hairline-dark);
  border-bottom: 1px solid var(--hairline-dark);
  gap: 0.75rem;
}

dl div {
  display: grid;
  grid-template-columns: 5rem 1fr;
}

dt,
legend {
  color: var(--muted-dark);
  font-size: 0.58rem;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

dd {
  margin: 0;
  font-size: 0.72rem;
}

fieldset {
  min-width: 0;
  margin: 1.6rem 0 0;
  padding: 0;
  border: 0;
}

legend {
  margin-bottom: 0.8rem;
}

.color-options,
.size-options {
  display: flex;
  gap: 0.55rem;
  flex-wrap: wrap;
}

.color-options button,
.size-options button {
  min-height: 2.5rem;
  border: 1px solid transparent;
  background: transparent;
  cursor: pointer;
  font-size: 0.65rem;
  transition: border-color 450ms var(--ease-out), color 450ms var(--ease-out);
}

.color-options button {
  display: flex;
  padding: 0.4rem 0.7rem;
  align-items: center;
  gap: 0.5rem;
}

.color-options button span {
  width: 0.85rem;
  height: 0.85rem;
  border: 1px solid rgba(32, 34, 31, 0.2);
  border-radius: 50%;
}

.color-options button.active,
.size-options button.active {
  border-color: var(--forest);
}

.size-options button {
  min-width: 2.65rem;
  padding: 0.4rem;
}

.add-button {
  width: 100%;
  margin-top: 2.2rem;
}

.add-button:disabled {
  cursor: not-allowed;
  opacity: 0.52;
}

@media (max-width: 900px) {
  .quick-panel {
    inset: 0;
    display: block;
    overflow-y: auto;
  }

  .quick-media {
    height: 56dvh;
    min-height: 24rem;
  }

  .quick-info {
    overflow: visible;
  }
}
</style>
