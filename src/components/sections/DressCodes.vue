<script setup>
import { ref } from 'vue'
import { dressCodes } from '../../data/collections'

const active = ref(0)
</script>

<template>
  <section class="section dress-codes">
    <div class="shell dress-layout">
      <div class="dress-copy">
        <p class="label">DRESS CODES</p>
        <h2 class="display">DRESSED FOR<br />THE OCCASION.</h2>
        <p class="body-copy">Choose the room. The wardrobe follows.</p>

        <div class="dress-tabs" role="tablist" aria-label="Dress codes">
          <button
            v-for="(code, index) in dressCodes"
            :key="code.name"
            type="button"
            role="tab"
            :aria-selected="active === index"
            :class="{ active: active === index }"
            @click="active = index"
          >
            {{ code.name }}
          </button>
        </div>

        <p class="dress-note">{{ dressCodes[active].note }}</p>
      </div>

      <div class="dress-visual" data-cursor="DISCOVER">
        <img
          v-for="(code, index) in dressCodes"
          :key="code.name"
          :src="code.image"
          :alt="`${code.name} dress code`"
          :class="{ active: active === index }"
          loading="lazy"
        />
      </div>
    </div>
  </section>
</template>

<style scoped>
.dress-codes {
  background: var(--cream);
}

.dress-layout {
  display: grid;
  min-height: 52rem;
  align-items: center;
  gap: clamp(3rem, 8vw, 9rem);
  grid-template-columns: 0.85fr 1.15fr;
}

.dress-copy h2 {
  margin-top: 1.2rem;
  font-size: clamp(4.2rem, 7.5vw, 7.5rem);
}

.dress-copy .body-copy {
  margin-top: 1.6rem;
}

.dress-tabs {
  display: flex;
  margin-top: 3rem;
  gap: 0.45rem 1.3rem;
  flex-wrap: wrap;
}

.dress-tabs button {
  position: relative;
  padding: 0.4rem 0;
  background: transparent;
  color: var(--muted-dark);
  cursor: pointer;
  font-size: 0.64rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  transition: color 500ms var(--ease-out);
}

.dress-tabs button::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 1px;
  background: var(--forest);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 500ms var(--ease-out);
}

.dress-tabs button.active {
  color: var(--ink);
}

.dress-tabs button.active::after {
  transform: scaleX(1);
}

.dress-note {
  min-height: 2rem;
  margin: 1.4rem 0 0;
  font-family: var(--font-display);
  font-size: 1.45rem;
  font-style: italic;
}

.dress-visual {
  position: relative;
  height: min(78dvh, 55rem);
  overflow: hidden;
  background: var(--charcoal);
}

.dress-visual img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transform: scale(1.06);
  transition:
    opacity 900ms var(--ease-out),
    transform 1.2s var(--ease-out);
}

.dress-visual img.active {
  opacity: 1;
  transform: scale(1);
}

@media (max-width: 850px) {
  .dress-layout {
    min-height: auto;
    grid-template-columns: 1fr;
  }

  .dress-copy h2 {
    font-size: clamp(4rem, 17vw, 6rem);
  }

  .dress-visual {
    height: 62dvh;
    min-height: 31rem;
    grid-row: 1;
  }
}
</style>
