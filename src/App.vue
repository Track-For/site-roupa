<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Navbar from './components/layout/Navbar.vue'
import BagDrawer from './components/layout/BagDrawer.vue'
import Footer from './components/layout/Footer.vue'
import CustomCursor from './components/motion/CustomCursor.vue'
import OpeningVignette from './components/sections/OpeningVignette.vue'
import HeroSection from './components/sections/HeroSection.vue'
import HouseIntroduction from './components/sections/HouseIntroduction.vue'
import EstateJourney from './components/sections/EstateJourney.vue'
import HousePrinciples from './components/sections/HousePrinciples.vue'
import MarbleProduct from './components/sections/MarbleProduct.vue'
import MaterialLibrary from './components/sections/MaterialLibrary.vue'
import CollectionIndex from './components/sections/CollectionIndex.vue'
import LookbookSection from './components/sections/LookbookSection.vue'
import PrivateFitting from './components/sections/PrivateFitting.vue'
import HeritageSection from './components/sections/HeritageSection.vue'
import ProductGrid from './components/sections/ProductGrid.vue'
import JournalSection from './components/sections/JournalSection.vue'
import DressCodes from './components/sections/DressCodes.vue'
import WardrobeBuilder from './components/sections/WardrobeBuilder.vue'
import FinalCTA from './components/sections/FinalCTA.vue'

const bagOpen = ref(false)
const bagItems = ref([])
const announcement = ref('')
const bagCount = computed(() => bagItems.value.length)

function addToBag(product) {
  bagItems.value.push(product)
  announcement.value = `${product.name} added to your wardrobe.`
  bagOpen.value = true
}

function refreshScroll() {
  ScrollTrigger.refresh()
}

onMounted(() => {
  window.addEventListener('load', refreshScroll, { once: true })
  document.fonts?.ready?.then(refreshScroll)
})

onUnmounted(() => {
  window.removeEventListener('load', refreshScroll)
})
</script>

<template>
  <OpeningVignette />
  <Navbar :bag-count="bagCount" @open-bag="bagOpen = true" />
  <CustomCursor />

  <main>
    <HeroSection />
    <HouseIntroduction />
    <EstateJourney />
    <HousePrinciples />
    <MarbleProduct />
    <MaterialLibrary />
    <CollectionIndex />
    <LookbookSection />
    <PrivateFitting />
    <HeritageSection />
    <ProductGrid @add="addToBag" />
    <JournalSection />
    <DressCodes />
    <WardrobeBuilder />
    <FinalCTA />
  </main>

  <Footer />
  <BagDrawer :open="bagOpen" :items="bagItems" @close="bagOpen = false" />
  <p class="sr-only" aria-live="polite">{{ announcement }}</p>
</template>

<style>
.sr-only {
  position: absolute;
  width: 1px;
  height: 1px;
  padding: 0;
  overflow: hidden;
  clip: rect(0, 0, 0, 0);
  border: 0;
  margin: -1px;
  white-space: nowrap;
}
</style>
