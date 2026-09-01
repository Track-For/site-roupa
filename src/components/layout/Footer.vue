<script setup>
import { ref } from 'vue'

const email = ref('')
const subscribed = ref(false)

function subscribe() {
  if (!email.value.trim()) return
  subscribed.value = true
  email.value = ''
}
</script>

<template>
  <footer class="footer">
    <div class="shell footer-grid">
      <div class="footer-brand">
        <div class="footer-monogram">A<span>&amp;</span>V</div>
        <p>ALDERWYCK &amp; VALE</p>
        <small>14 Cour des Avelines, Geneva. Fictional address. London by appointment.</small>
      </div>

      <nav class="footer-nav" aria-label="Footer navigation">
        <a href="#collection">Collection</a>
        <a href="#heritage">House</a>
        <a href="#journal">Journal</a>
        <a href="#private-fitting">Private Fitting</a>
        <a href="#footer">Shipping</a>
        <a href="mailto:correspondence@alderwyck-vale.example">Contact</a>
      </nav>

      <form class="correspondence" @submit.prevent="subscribe">
        <label for="footer-email">Private correspondence</label>
        <div class="email-row">
          <input
            id="footer-email"
            v-model="email"
            type="email"
            placeholder="Your email address"
            :disabled="subscribed"
            required
          />
          <button type="submit" :disabled="subscribed">{{ subscribed ? 'Received' : 'Submit' }}</button>
        </div>
        <p>{{ subscribed ? 'A private note will follow.' : 'Occasional notes from the house.' }}</p>
      </form>
    </div>

    <div id="footer" class="shell footer-bottom">
      <span>EST. 1908</span>
      <span>© 2026 Alderwyck &amp; Vale. Fictional concept.</span>
    </div>
  </footer>
</template>

<style scoped>
.footer {
  padding: 7rem 0 2rem;
  background: var(--forest);
  color: var(--white);
}

.footer-grid {
  display: grid;
  padding-bottom: 6rem;
  gap: 4rem;
  grid-template-columns: 1.25fr 0.8fr 1fr;
}

.footer-monogram {
  font-family: var(--font-display);
  font-size: 4.4rem;
  font-weight: 300;
  letter-spacing: -0.13em;
  line-height: 0.8;
}

.footer-monogram span {
  margin-inline: -0.05em 0.07em;
  font-size: 0.46em;
  font-style: italic;
}

.footer-brand > p {
  margin: 1.7rem 0 0.6rem;
  font-family: var(--font-display);
  font-size: 1.1rem;
  letter-spacing: 0.16em;
}

.footer-brand small,
.correspondence p {
  color: var(--muted-light);
  font-size: 0.7rem;
}

.footer-nav {
  display: grid;
  align-content: start;
  gap: 0.75rem;
}

.footer-nav a {
  width: fit-content;
  color: rgba(250, 248, 242, 0.82);
  font-size: 0.75rem;
  transition: color 400ms var(--ease-out);
}

.footer-nav a:hover {
  color: var(--white);
}

.correspondence label {
  display: block;
  margin-bottom: 1.25rem;
  font-family: var(--font-display);
  font-size: 1.8rem;
}

.email-row {
  display: grid;
  border-bottom: 1px solid var(--hairline-light);
  grid-template-columns: 1fr auto;
}

.email-row input,
.email-row button {
  min-height: 3.25rem;
  border: 0;
  background: transparent;
  color: var(--white);
}

.email-row input::placeholder {
  color: rgba(250, 248, 242, 0.58);
}

.email-row button {
  cursor: pointer;
  font-size: 0.62rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.email-row button:disabled {
  cursor: default;
}

.correspondence p {
  margin: 0.8rem 0 0;
}

.footer-bottom {
  display: flex;
  padding-top: 1.5rem;
  border-top: 1px solid var(--hairline-light);
  color: rgba(250, 248, 242, 0.52);
  font-size: 0.58rem;
  letter-spacing: 0.12em;
  justify-content: space-between;
  text-transform: uppercase;
}

@media (max-width: 900px) {
  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }

  .correspondence {
    grid-column: 1 / -1;
  }
}

@media (max-width: 600px) {
  .footer-grid {
    grid-template-columns: 1fr;
  }

  .correspondence {
    grid-column: auto;
  }

  .footer-bottom {
    gap: 1rem;
    flex-direction: column;
  }
}
</style>
