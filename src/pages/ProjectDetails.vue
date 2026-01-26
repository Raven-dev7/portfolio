<template>
  <div class="project-details">
    <div v-if="project" class="container">
      <!-- Back Button -->
      <div class="back-section">
        <router-link to="/" class="back-link">
          ← Back to Projects
        </router-link>
      </div>

      <!-- Project Header -->
      <header class="project-header">
        <h1 class="project-title">{{ project.title }}</h1>
        <p class="project-subtitle">{{ project.short }}</p>
      </header>

      <!-- Media Gallery -->
      <section v-if="project.media && project.media.length > 0" class="media-section">
        <MediaViewer :media="project.media" />
      </section>

      <!-- Project Content -->
      <div class="project-content">
        <!-- Description -->
        <section class="content-section">
          <h2 class="section-heading">Description</h2>
          <div class="description-text" v-html="formatDescription(project.description)"></div>
        </section>

        <!-- Tech Stack -->
        <section class="content-section">
          <h2 class="section-heading">Tech Stack</h2>
          <div class="tech-stack">
            <span 
              v-for="(tech, index) in project.tech" 
              :key="tech"
              class="tech-tag"
              :style="{ animationDelay: `${index * 0.05}s` }"
            >
              {{ tech }}
            </span>
          </div>
        </section>

        <!-- Technical Highlights -->
        <section class="content-section">
          <h2 class="section-heading">Technical Highlights</h2>
          <ul class="highlights-list">
            <li 
              v-for="(highlight, index) in project.highlights" 
              :key="highlight"
              class="highlight-item"
              :style="{ animationDelay: `${index * 0.1}s` }"
            >
              {{ highlight }}
            </li>
          </ul>
        </section>

        <!-- GitHub Link -->
        <section v-if="project.github" class="content-section">
          <a 
            :href="project.github" 
            target="_blank" 
            rel="noopener noreferrer"
            class="github-link"
          >
            View on GitHub →
          </a>
        </section>
      </div>
    </div>

    <!-- Project Not Found -->
    <div v-else class="container not-found">
      <h1>Project Not Found</h1>
      <p>The project you're looking for doesn't exist.</p>
      <router-link to="/" class="btn btn-primary">
        Return Home
      </router-link>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { getProjectById } from '../data/projects'
import MediaViewer from '../components/MediaViewer.vue'

const route = useRoute()

const project = computed(() => {
  const id = route.params.id
  return getProjectById(id)
})

function formatDescription(text) {
  // Convert line breaks to paragraphs
  return text.split('\n\n').map(paragraph => 
    `<p>${paragraph.trim()}</p>`
  ).join('')
}
</script>

<style scoped>
.project-details {
  min-height: 100vh;
  background-color: var(--bg-primary);
  padding: var(--spacing-lg) 0;
}

.back-section {
  margin-bottom: var(--spacing-md);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--text-secondary);
  font-size: 0.95rem;
  transition: all var(--transition-base);
  padding: var(--spacing-xs) var(--spacing-sm);
  border-radius: 4px;
  position: relative;
  overflow: hidden;
}

.back-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
  transition: left 0.5s;
}

.back-link:hover::before {
  left: 100%;
}

.back-link:hover {
  color: var(--accent-primary);
  transform: translateX(-4px);
}

.project-header {
  margin-bottom: var(--spacing-xl);
  text-align: center;
  animation: fadeInDown 0.8s ease-out;
}

@keyframes fadeInDown {
  from {
    opacity: 0;
    transform: translate3d(0, -20px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.project-header {
  will-change: transform, opacity;
}

.project-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: var(--spacing-sm);
  color: var(--text-accent);
  background: linear-gradient(135deg, var(--text-accent) 0%, var(--accent-primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  animation: glow 3s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.3));
  }
  to {
    filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.5));
  }
}

.project-subtitle {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  color: var(--text-secondary);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.6;
  animation: fadeIn 1s ease-out 0.2s both;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.media-section {
  margin-bottom: var(--spacing-xl);
  animation: fadeInUp 0.8s ease-out 0.3s both;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 20px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.media-section {
  will-change: transform, opacity;
}

.project-content {
  max-width: 900px;
  margin: 0 auto;
}

.content-section {
  margin-bottom: var(--spacing-xl);
  animation: fadeIn 0.6s ease-out both;
}

.content-section:nth-child(1) {
  animation-delay: 0.1s;
}

.content-section:nth-child(2) {
  animation-delay: 0.2s;
}

.content-section:nth-child(3) {
  animation-delay: 0.3s;
}

.content-section:nth-child(4) {
  animation-delay: 0.4s;
}

.section-heading {
  font-size: clamp(1.5rem, 3vw, 2rem);
  margin-bottom: var(--spacing-md);
  color: var(--text-accent);
  border-bottom: 2px solid var(--border-color);
  padding-bottom: var(--spacing-xs);
  position: relative;
  transition: all var(--transition-base);
}

.section-heading::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: linear-gradient(90deg, var(--accent-primary), transparent);
  transition: width var(--transition-base);
}

.content-section:hover .section-heading::after {
  width: 100px;
}

.content-section:hover .section-heading {
  color: var(--accent-primary);
  border-bottom-color: var(--accent-primary);
}

.description-text {
  color: var(--text-primary);
  line-height: 1.8;
  font-size: 1.1rem;
}

.description-text p {
  margin-bottom: var(--spacing-md);
  opacity: 0;
  animation: fadeInUp 0.6s ease-out both;
}

.description-text p:nth-child(1) {
  animation-delay: 0.1s;
}

.description-text p:nth-child(2) {
  animation-delay: 0.2s;
}

.description-text p:nth-child(3) {
  animation-delay: 0.3s;
}

.description-text p:last-child {
  margin-bottom: 0;
}

.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.tech-tag {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  font-size: 0.95rem;
  color: var(--accent-primary);
  font-family: var(--font-mono);
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
  opacity: 0;
  animation: fadeInScale 0.4s ease-out both;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale3d(0.8, 0.8, 1);
  }
  to {
    opacity: 1;
    transform: scale3d(1, 1, 1);
  }
}

.tech-tag {
  will-change: transform, opacity;
}

.tech-tag::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2), transparent);
  transition: left 0.5s;
}

.tech-tag:hover::before {
  left: 100%;
}

.tech-tag:hover {
  border-color: var(--accent-primary);
  background-color: var(--card-hover);
  transform: translate3d(0, -2px, 0) scale(1.05);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

.highlights-list {
  list-style: none;
  padding: 0;
}

.highlight-item {
  color: var(--text-primary);
  margin-bottom: var(--spacing-md);
  padding-left: 2rem;
  position: relative;
  line-height: 1.8;
  font-size: 1.05rem;
  opacity: 0;
  animation: slideInLeft 0.5s ease-out both;
  transition: all var(--transition-base);
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translate3d(-20px, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.highlight-item {
  will-change: transform, opacity;
}

.highlight-item::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--accent-primary);
  font-weight: bold;
  font-size: 1.2rem;
  transition: all var(--transition-base);
}

.highlight-item:hover {
  color: var(--text-accent);
  transform: translate3d(4px, 0, 0);
}

.highlight-item:hover::before {
  transform: scale(1.2);
  color: var(--accent-primary);
  text-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
}

.highlight-item:last-child {
  margin-bottom: 0;
}

.github-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1.1rem;
  font-weight: 500;
  color: var(--accent-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 6px;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.github-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
  transition: left 0.5s;
}

.github-link:hover::before {
  left: 100%;
}

.github-link:hover {
  border-color: var(--accent-primary);
  background-color: var(--card-hover);
  gap: 0.75rem;
  transform: translate3d(0, -2px, 0);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.2);
}

@media (prefers-reduced-motion: reduce) {
  .project-header,
  .media-section,
  .content-section,
  .tech-tag,
  .highlight-item {
    animation: none;
    opacity: 1;
  }
  
  .description-text p {
    animation: none;
    opacity: 1;
  }
}

.not-found {
  text-align: center;
  padding: var(--spacing-xl) 0;
  min-height: 60vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-md);
}

.not-found h1 {
  color: var(--text-accent);
  margin-bottom: var(--spacing-sm);
}

.not-found p {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: var(--spacing-md);
}

@media (max-width: 768px) {
  .project-details {
    padding: var(--spacing-md) 0;
  }

  .project-header {
    margin-bottom: var(--spacing-lg);
  }

  .content-section {
    margin-bottom: var(--spacing-lg);
  }

  .description-text {
    font-size: 1rem;
  }

  .highlight-item {
    font-size: 1rem;
  }
}
</style>
