<template>
  <section class="principles" aria-label="House principles">
    <div class="shell principles-grid">
      <div><span>1908</span><p>Established</p></div>
      <div><span>Small runs</span><p>Cut deliberately</p></div>
      <div><span>Natural fibres</span><p>Chosen to age well</p></div>
      <div><span>Private fitting</span><p>By appointment</p></div>
    </div>
  </section>
</template>

<style scoped>
.principles {
  background: var(--forest);
  color: var(--white);
}

.principles-grid {
  display: grid;
  padding-top: 2.7rem;
  padding-bottom: 2.7rem;
  border-top: 1px solid var(--hairline-light);
  gap: 1rem;
  grid-template-columns: repeat(4, 1fr);
}

.principles-grid div {
  min-width: 0;
}

.principles-grid span {
  display: block;
  font-family: var(--font-display);
  font-size: clamp(1.3rem, 2.2vw, 2rem);
  line-height: 1;
}

.principles-grid p {
  margin: 0.65rem 0 0;
  color: var(--muted-light);
  font-size: 0.6rem;
  letter-spacing: 0.13em;
  text-transform: uppercase;
}

@media (max-width: 700px) {
  .principles-grid {
    grid-template-columns: 1fr 1fr;
    row-gap: 2rem;
  }
}
</style>
