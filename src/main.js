import { createApp } from 'vue'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import '@fontsource/cormorant-garamond/latin-300.css'
import '@fontsource/cormorant-garamond/latin-400.css'
import '@fontsource/cormorant-garamond/latin-500.css'
import '@fontsource/cormorant-garamond/latin-600.css'
import '@fontsource/cormorant-garamond/latin-400-italic.css'
import '@fontsource/manrope/latin-400.css'
import '@fontsource/manrope/latin-500.css'
import '@fontsource/manrope/latin-600.css'
import './styles/variables.css'
import './styles/globals.css'
import './styles/animations.css'
import App from './App.vue'

gsap.registerPlugin(ScrollTrigger)

createApp(App).mount('#app')
