<script setup>
import RevealText from '../motion/RevealText.vue'
</script>

<template>
  <section class="section house-intro">
    <div class="shell intro-grid">
      <RevealText as="p" class="intro-year">1908</RevealText>
      <RevealText as="div" :delay="0.08" class="intro-copy">
        <h2 class="display">GOOD CLOTHES NEED<br />NO INTRODUCTION.</h2>
        <p>
          Founded by Edward Alderwyck and Matthieu Vale, the house began as a private tailoring room serving families between Geneva and the English countryside.
        </p>
        <p>
          It remains guided by the same proposition: cut less, choose well, and allow time to complete the garment.
        </p>
      </RevealText>
      <div class="intro-mark" aria-hidden="true">A<span>&amp;</span>V</div>
    </div>
  </section>
</template>

<style scoped>
.house-intro {
  min-height: 82dvh;
  background: var(--ivory);
}

.intro-grid {
  display: grid;
  min-height: 50dvh;
  align-items: start;
  gap: 3rem;
  grid-template-columns: 0.35fr 1fr 0.5fr;
}

.intro-year {
  margin: 0.4rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(2.8rem, 5vw, 5rem);
  line-height: 1;
}

.intro-copy h2 {
  max-width: 10ch;
  font-size: clamp(4.2rem, 8vw, 8.5rem);
}

.intro-copy p {
  max-width: 46ch;
  margin: 2.5rem 0 0 auto;
  color: var(--muted-dark);
  font-size: clamp(0.9rem, 1.15vw, 1.04rem);
  line-height: 1.9;
}

.intro-copy p + p {
  margin-top: 1.1rem;
}

.intro-mark {
  justify-self: end;
  color: rgba(23, 32, 25, 0.16);
  font-family: var(--font-display);
  font-size: clamp(5rem, 10vw, 10rem);
  font-weight: 300;
  letter-spacing: -0.14em;
  line-height: 0.75;
}

.intro-mark span {
  margin-inline: -0.05em 0.08em;
  font-size: 0.45em;
  font-style: italic;
}

@media (max-width: 850px) {
  .house-intro {
    min-height: auto;
  }

  .intro-grid {
    min-height: auto;
    grid-template-columns: 1fr;
  }

  .intro-copy h2 {
    font-size: clamp(4rem, 17vw, 6rem);
  }

  .intro-copy p {
    margin-left: 0;
  }

  .intro-mark {
    justify-self: start;
  }
}
</style>
