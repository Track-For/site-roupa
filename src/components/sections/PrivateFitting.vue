<script setup>
import { nextTick, onUnmounted, ref, watch } from 'vue'
import RevealImage from '../motion/RevealImage.vue'
import libraryImage from '../../assets/imagery/estate-library.jpg'

const open = ref(false)
const submitted = ref(false)
const firstField = ref(null)
const form = ref({ name: '', city: '', preference: 'Tailoring', time: 'Morning' })

function close() {
  open.value = false
}

function submit() {
  submitted.value = true
}

function onKeydown(event) {
  if (event.key === 'Escape') close()
}

watch(open, async (isOpen) => {
  document.body.classList.toggle('modal-open', isOpen)
  if (isOpen) {
    window.addEventListener('keydown', onKeydown)
    await nextTick()
    firstField.value?.focus()
  } else {
    window.removeEventListener('keydown', onKeydown)
    submitted.value = false
  }
})

onUnmounted(() => {
  document.body.classList.remove('modal-open')
  window.removeEventListener('keydown', onKeydown)
})
</script>

<template>
  <section id="private-fitting" class="section fitting">
    <div class="shell fitting-layout">
      <RevealImage
        class="fitting-image"
        :src="libraryImage"
        alt="Private tailoring consultation in the Alderwyck and Vale library"
      />

      <div class="fitting-copy">
        <p class="label">BY APPOINTMENT</p>
        <h2 class="display">PRIVATE<br />FITTING</h2>
        <p class="body-copy">Selected pieces. Personal consultation. By appointment.</p>
        <button class="button-solid" type="button" data-cursor="FIT" @click="open = true">
          Request an appointment
        </button>
      </div>
    </div>

    <Teleport to="body">
      <div class="fitting-modal" :class="{ 'is-open': open }" :aria-hidden="!open">
        <button class="modal-backdrop" type="button" aria-label="Close appointment form" @click="close"></button>
        <div class="modal-panel" role="dialog" aria-modal="true" aria-labelledby="fitting-title">
          <button class="modal-close" type="button" @click="close">Close</button>

          <div v-if="!submitted">
            <p class="label">PRIVATE FITTING</p>
            <h3 id="fitting-title" class="display">A quiet hour,<br />set aside.</h3>
            <form @submit.prevent="submit">
              <label>
                <span>Name</span>
                <input ref="firstField" v-model="form.name" type="text" autocomplete="name" required />
              </label>
              <label>
                <span>City</span>
                <input v-model="form.city" type="text" autocomplete="address-level2" required />
              </label>
              <label>
                <span>Preference</span>
                <select v-model="form.preference">
                  <option>Tailoring</option>
                  <option>Women’s collection</option>
                  <option>Seasonal wardrobe</option>
                  <option>Evening</option>
                </select>
              </label>
              <label>
                <span>Preferred time</span>
                <select v-model="form.time">
                  <option>Morning</option>
                  <option>Afternoon</option>
                  <option>Early evening</option>
                </select>
              </label>
              <button class="button-solid" type="submit">Send request</button>
            </form>
          </div>

          <div v-else class="fitting-success" role="status">
            <p class="label">REQUEST RECEIVED</p>
            <h3 class="display">We will write<br />to you privately.</h3>
            <p>A member of the house will reply with available times.</p>
            <button class="text-link" type="button" @click="close">Return to the house</button>
          </div>
        </div>
      </div>
    </Teleport>
  </section>
</template>

<style scoped>
.fitting {
  background: var(--cream);
}

.fitting-layout {
  display: grid;
  align-items: center;
  gap: clamp(3rem, 8vw, 9rem);
  grid-template-columns: 1.12fr 0.88fr;
}

.fitting-image {
  height: min(74dvh, 52rem);
}

.fitting-copy h2 {
  margin-top: 1.2rem;
  font-size: clamp(4.6rem, 8vw, 8.2rem);
}

.fitting-copy .body-copy {
  margin-top: 1.8rem;
}

.fitting-copy .button-solid {
  margin-top: 2.4rem;
}

.fitting-modal {
  position: fixed;
  inset: 0;
  z-index: var(--layer-overlay);
  visibility: hidden;
  transition: visibility 0s 500ms;
}

.fitting-modal.is-open {
  visibility: visible;
  transition-delay: 0s;
}

.modal-backdrop {
  position: absolute;
  inset: 0;
  background: rgba(18, 19, 17, 0.62);
  cursor: pointer;
  opacity: 0;
  transition: opacity 450ms var(--ease-out);
}

.is-open .modal-backdrop {
  opacity: 1;
}

.modal-panel {
  position: absolute;
  top: 0;
  right: 0;
  display: grid;
  width: min(42rem, 100%);
  height: 100%;
  padding: clamp(2rem, 5vw, 5rem);
  align-content: center;
  overflow-y: auto;
  background: var(--ivory);
  transform: translateX(100%);
  transition: transform 500ms var(--ease-out);
}

.is-open .modal-panel {
  transform: translateX(0);
}

.modal-close {
  position: absolute;
  top: 1.5rem;
  right: 1.5rem;
  padding: 0.5rem;
  background: transparent;
  cursor: pointer;
  font-size: 0.63rem;
  letter-spacing: 0.15em;
  text-transform: uppercase;
}

.modal-panel h3 {
  margin-top: 1rem;
  font-size: clamp(3rem, 6.5vw, 5.7rem);
}

.modal-panel form {
  display: grid;
  margin-top: 2.5rem;
  gap: 1.15rem;
  grid-template-columns: 1fr 1fr;
}

.modal-panel label {
  display: grid;
  gap: 0.35rem;
}

.modal-panel label span {
  font-size: 0.59rem;
  font-weight: 600;
  letter-spacing: 0.12em;
  text-transform: uppercase;
}

.modal-panel input,
.modal-panel select {
  min-height: 3.35rem;
  padding: 0.7rem 0;
  border: 0;
  border-bottom: 1px solid rgba(32, 34, 31, 0.4);
  border-radius: 0;
  background: transparent;
}

.modal-panel input:focus,
.modal-panel select:focus {
  border-color: var(--forest);
  outline: 0;
}

.modal-panel form button {
  margin-top: 1rem;
  grid-column: 1 / -1;
}

.fitting-success > p:not(.label) {
  max-width: 34ch;
  margin: 1.5rem 0 0;
  color: var(--muted-dark);
}

.fitting-success .text-link {
  margin-top: 2rem;
}

@media (max-width: 800px) {
  .fitting-layout {
    grid-template-columns: 1fr;
  }

  .fitting-image {
    height: 58dvh;
    min-height: 30rem;
  }

  .fitting-copy h2 {
    font-size: clamp(4rem, 17vw, 6rem);
  }

  .modal-panel form {
    grid-template-columns: 1fr;
  }

  .modal-panel form button {
    grid-column: auto;
  }
}
</style>
