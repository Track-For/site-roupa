<script setup>
import { journalArticles } from '../../data/journal'
</script>

<template>
  <section id="journal" class="section journal">
    <div class="shell journal-head">
      <h2 class="display">THE JOURNAL</h2>
      <a class="text-link" href="#journal">Read all notes</a>
    </div>

    <div class="shell journal-grid">
      <article v-for="(article, index) in journalArticles" :key="article.title" :class="`article-${index + 1}`">
        <a href="#journal" data-cursor="DISCOVER">
          <div class="article-image">
            <img :src="article.image" :alt="article.title" loading="lazy" />
          </div>
          <p>{{ article.category }}</p>
          <h3>{{ article.title }}</h3>
        </a>
      </article>
    </div>
  </section>
</template>

<style scoped>
.journal {
  background: var(--ivory);
}

.journal-head {
  display: flex;
  align-items: flex-end;
  justify-content: space-between;
}

.journal-head h2 {
  font-size: clamp(4.5rem, 9vw, 9rem);
}

.journal-grid {
  display: grid;
  margin-top: clamp(4rem, 8vw, 8rem);
  align-items: start;
  gap: clamp(2rem, 4vw, 4rem);
  grid-template-columns: repeat(12, 1fr);
}

.journal-grid article:nth-child(1) {
  grid-column: span 7;
}

.journal-grid article:nth-child(2) {
  margin-top: 8rem;
  grid-column: 9 / span 4;
}

.journal-grid article:nth-child(3) {
  margin-top: 4rem;
  grid-column: 2 / span 4;
}

.journal-grid article:nth-child(4) {
  grid-column: 7 / span 6;
}

.article-image {
  overflow: hidden;
}

.article-image img {
  width: 100%;
  aspect-ratio: 4 / 3;
  object-fit: cover;
  transition: transform 1.2s var(--ease-out);
}

.journal-grid article:nth-child(2) .article-image img,
.journal-grid article:nth-child(3) .article-image img {
  aspect-ratio: 4 / 5;
}

.journal-grid a:hover .article-image img,
.journal-grid a:focus-visible .article-image img {
  transform: scale(1.035);
}

.journal-grid p {
  margin: 1.1rem 0 0;
  color: var(--muted-dark);
  font-size: 0.57rem;
  letter-spacing: 0.14em;
  text-transform: uppercase;
}

.journal-grid h3 {
  margin: 0.45rem 0 0;
  font-family: var(--font-display);
  font-size: clamp(1.7rem, 3vw, 2.8rem);
  font-weight: 400;
  line-height: 1.05;
}

@media (max-width: 750px) {
  .journal-head {
    align-items: flex-start;
    gap: 2rem;
    flex-direction: column;
  }

  .journal-head h2 {
    font-size: clamp(4rem, 17vw, 6rem);
  }

  .journal-grid {
    grid-template-columns: 1fr;
  }

  .journal-grid article:nth-child(1),
  .journal-grid article:nth-child(2),
  .journal-grid article:nth-child(3),
  .journal-grid article:nth-child(4) {
    margin-top: 0;
    grid-column: auto;
  }

  .article-image img,
  .journal-grid article:nth-child(2) .article-image img,
  .journal-grid article:nth-child(3) .article-image img {
    aspect-ratio: 4 / 5;
  }
}
</style>
