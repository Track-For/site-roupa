<script setup>
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

defineProps({
  bagCount: { type: Number, default: 0 },
})

const emit = defineEmits(['open-bag'])
const root = ref(null)
const scrolled = ref(false)
const menuOpen = ref(false)
let ctx

const leftLinks = [
  { label: 'Men', href: '#collection' },
  { label: 'Women', href: '#collection' },
  { label: 'Collections', href: '#estate' },
]

const rightLinks = [
  { label: 'Journal', href: '#journal' },
  { label: 'Search', href: '#collection' },
  { label: 'Account', href: '#private-fitting' },
]

function closeMenu() {
  menuOpen.value = false
}

function onKeydown(event) {
  if (event.key === 'Escape') closeMenu()
}

watch(menuOpen, (open) => {
  document.body.classList.toggle('modal-open', open)
})

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
  ctx = gsap.context(() => {
    ScrollTrigger.create({
      start: 24,
      end: 'max',
      onEnter: () => {
        scrolled.value = true
      },
      onLeaveBack: () => {
        scrolled.value = false
      },
    })
  }, root.value)
})

onUnmounted(() => {
  window.removeEventListener('keydown', onKeydown)
  document.body.classList.remove('modal-open')
  ctx?.revert()
})
</script>

<template>
  <header ref="root" class="navbar" :class="{ 'is-scrolled': scrolled, 'menu-is-open': menuOpen }">
    <nav class="nav-shell" aria-label="Primary navigation">
      <div class="nav-side nav-left">
        <a v-for="item in leftLinks" :key="item.label" :href="item.href">{{ item.label }}</a>
      </div>

      <a class="wordmark" href="#hero" aria-label="Alderwyck and Vale home">
        ALDERWYCK <span>&amp;</span> VALE
      </a>

      <div class="nav-side nav-right">
        <a v-for="item in rightLinks" :key="item.label" :href="item.href">{{ item.label }}</a>
        <button type="button" aria-label="Open bag" @click="emit('open-bag')">
          Bag <span v-if="bagCount">({{ bagCount }})</span>
        </button>
      </div>

      <button
        class="menu-toggle"
        type="button"
        :aria-expanded="menuOpen"
        aria-controls="mobile-menu"
        @click="menuOpen = !menuOpen"
      >
        {{ menuOpen ? 'Close' : 'Menu' }}
      </button>
    </nav>

    <div id="mobile-menu" class="mobile-menu" :class="{ 'is-open': menuOpen }" :aria-hidden="!menuOpen">
      <div class="mobile-links">
        <a
          v-for="(item, index) in [...leftLinks, ...rightLinks]"
          :key="item.label"
          :href="item.href"
          :style="{ '--link-index': index }"
          @click="closeMenu"
        >
          {{ item.label }}
        </a>
        <button type="button" :style="{ '--link-index': 6 }" @click="closeMenu(); emit('open-bag')">
          Bag <span v-if="bagCount">({{ bagCount }})</span>
        </button>
      </div>
      <p>EST. 1908<br />Geneva &amp; London</p>
    </div>
  </header>
</template>

<style scoped>
.navbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: var(--layer-nav);
  height: var(--nav-height);
  color: var(--white);
  transition:
    color 600ms var(--ease-out),
    background-color 600ms var(--ease-out),
    border-color 600ms var(--ease-out);
}

.navbar::after {
  content: '';
  position: absolute;
  right: var(--page-gutter);
  bottom: 0;
  left: var(--page-gutter);
  height: 1px;
  background: rgba(250, 248, 242, 0.24);
  transition: background-color 600ms var(--ease-out);
}

.navbar.is-scrolled,
.navbar.menu-is-open {
  background: rgba(241, 238, 231, 0.94);
  color: var(--ink);
  backdrop-filter: blur(16px);
}

.navbar.is-scrolled::after,
.navbar.menu-is-open::after {
  background: var(--hairline-dark);
}

.nav-shell {
  position: relative;
  z-index: 2;
  display: grid;
  width: min(100%, 1600px);
  height: 100%;
  margin-inline: auto;
  padding-inline: var(--page-gutter);
  align-items: center;
  grid-template-columns: 1fr auto 1fr;
}

.nav-side {
  display: flex;
  align-items: center;
  gap: clamp(1rem, 2vw, 2.15rem);
}

.nav-right {
  justify-content: flex-end;
}

.nav-side a,
.nav-side button,
.menu-toggle {
  position: relative;
  padding: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-size: 0.61rem;
  font-weight: 500;
  letter-spacing: 0.12em;
  text-transform: uppercase;
  white-space: nowrap;
}

.nav-side a::after,
.nav-side button::after {
  content: '';
  position: absolute;
  right: 0;
  bottom: -0.45rem;
  left: 0;
  height: 1px;
  background: currentColor;
  transform: scaleX(0);
  transition: transform 500ms var(--ease-out);
}

.nav-side a:hover::after,
.nav-side button:hover::after {
  transform: scaleX(1);
}

.wordmark {
  font-family: var(--font-display);
  font-size: clamp(1rem, 1.55vw, 1.45rem);
  font-weight: 500;
  letter-spacing: 0.13em;
  line-height: 1;
  white-space: nowrap;
}

.wordmark span {
  font-style: italic;
  font-weight: 300;
}

.menu-toggle {
  display: none;
  justify-self: end;
}

.mobile-menu {
  position: fixed;
  inset: 0;
  z-index: 1;
  display: flex;
  padding: calc(var(--nav-height) + 3.5rem) var(--page-gutter) 2rem;
  justify-content: space-between;
  flex-direction: column;
  background: var(--ivory);
  color: var(--ink);
  opacity: 0;
  pointer-events: none;
  transform: translateY(-1.5rem);
  transition:
    opacity 500ms var(--ease-out),
    transform 500ms var(--ease-out);
}

.mobile-menu.is-open {
  opacity: 1;
  pointer-events: auto;
  transform: translateY(0);
}

.mobile-links {
  display: grid;
}

.mobile-links a,
.mobile-links button {
  padding: 0;
  background: transparent;
  color: inherit;
  cursor: pointer;
  font-family: var(--font-display);
  font-size: clamp(2.7rem, 12vw, 4.5rem);
  font-weight: 400;
  letter-spacing: -0.035em;
  line-height: 1.05;
  opacity: 0;
  text-align: left;
  transform: translateY(2rem);
  transition:
    opacity 700ms var(--ease-out),
    transform 700ms var(--ease-out);
  transition-delay: calc(var(--link-index) * 55ms + 120ms);
}

.mobile-menu.is-open .mobile-links a,
.mobile-menu.is-open .mobile-links button {
  opacity: 1;
  transform: translateY(0);
}

.mobile-menu p {
  margin: 0;
  font-size: 0.62rem;
  letter-spacing: 0.18em;
  line-height: 1.7;
}

@media (max-width: 1120px) {
  .nav-side {
    gap: 1rem;
  }

  .nav-side a:nth-child(2),
  .nav-right a:nth-child(2),
  .nav-right a:nth-child(3) {
    display: none;
  }
}

@media (max-width: 767px) {
  .nav-shell {
    grid-template-columns: 1fr auto 1fr;
  }

  .nav-side {
    display: none;
  }

  .wordmark {
    grid-column: 2;
    font-size: 0.96rem;
  }

  .menu-toggle {
    display: block;
    grid-column: 3;
  }
}
</style>
