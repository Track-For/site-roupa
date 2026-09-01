<script setup>
import { onMounted, onUnmounted, ref } from 'vue'
import { gsap } from 'gsap'

const cursor = ref(null)
const label = ref('')
const visible = ref(false)
const pressed = ref(false)
let xTo
let yTo
let finePointer

function onPointerMove(event) {
  xTo?.(event.clientX)
  yTo?.(event.clientY)
  visible.value = true

  const interactive = event.target.closest('[data-cursor]')
  label.value = interactive?.dataset.cursor || ''
}

function onPointerLeave() {
  visible.value = false
}

function onPointerDown() {
  pressed.value = true
}

function onPointerUp() {
  pressed.value = false
}

onMounted(() => {
  finePointer = window.matchMedia('(hover: hover) and (pointer: fine) and (min-width: 1025px)')
  if (!finePointer.matches || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

  xTo = gsap.quickTo(cursor.value, 'x', { duration: 0.45, ease: 'power3.out' })
  yTo = gsap.quickTo(cursor.value, 'y', { duration: 0.45, ease: 'power3.out' })
  window.addEventListener('pointermove', onPointerMove, { passive: true })
  document.documentElement.addEventListener('mouseleave', onPointerLeave)
  window.addEventListener('pointerdown', onPointerDown)
  window.addEventListener('pointerup', onPointerUp)
})

onUnmounted(() => {
  window.removeEventListener('pointermove', onPointerMove)
  document.documentElement.removeEventListener('mouseleave', onPointerLeave)
  window.removeEventListener('pointerdown', onPointerDown)
  window.removeEventListener('pointerup', onPointerUp)
})
</script>

<template>
  <div
    ref="cursor"
    class="custom-cursor"
    :class="{ 'is-visible': visible, 'has-label': label, 'is-pressed': pressed }"
    aria-hidden="true"
  >
    <span>{{ label }}</span>
  </div>
</template>

<style scoped>
.custom-cursor {
  position: fixed;
  top: 0;
  left: 0;
  z-index: var(--layer-cursor);
  display: grid;
  width: 9px;
  height: 9px;
  place-items: center;
  border: 1px solid rgba(250, 248, 242, 0.72);
  border-radius: 50%;
  background: rgba(23, 32, 25, 0.45);
  color: var(--white);
  opacity: 0;
  pointer-events: none;
  transform: translate(-50%, -50%);
  transition:
    width 500ms var(--ease-out),
    height 500ms var(--ease-out),
    opacity 300ms var(--ease-out),
    background-color 500ms var(--ease-out);
}

.custom-cursor.is-visible {
  opacity: 1;
}

.custom-cursor.has-label {
  width: 54px;
  height: 54px;
  background: rgba(23, 32, 25, 0.88);
}

.custom-cursor.is-pressed {
  width: 45px;
  height: 45px;
}

span {
  font-size: 0.52rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  opacity: 0;
  text-transform: uppercase;
  transition: opacity 250ms var(--ease-out);
}

.has-label span {
  opacity: 1;
}

@media (max-width: 1024px), (hover: none), (pointer: coarse) {
  .custom-cursor {
    display: none;
  }
}
</style>
