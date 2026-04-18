<template>
  <div class="project-details">
    <div v-if="project" class="container">
      <!-- Back Button -->
      <div class="back-section">
        <a href="#" @click.prevent="goBack" class="back-link">
          ← Back
        </a>
      </div>

      <!-- Project Header -->
      <header class="project-header">
        <div class="header-badges">
          <span v-if="project.type === 'wip'" class="badge badge-wip">Work in Progress</span>
          <span v-else-if="project.status === 'beta'" class="badge badge-beta">Playable Beta</span>
          <span v-else-if="project.status === 'in-progress'" class="badge badge-in-progress">In Progress</span>
          <span v-else-if="project.status === 'completed'" class="badge badge-completed">Completed</span>
        </div>
        <div class="title-container">
          <img v-if="project.icon" :src="project.icon" alt="" class="details-icon" />
          <h1 class="project-title">{{ project.title }}</h1>
        </div>
        <p class="project-subtitle">{{ project.short }}</p>
      </header>

      <!-- Media Gallery -->
      <section v-if="project.media && project.media.length > 0" class="media-section">
        <MediaViewer :media="project.media" />
      </section>

      <!-- Project Content -->
      <div class="project-content" :class="{ 'has-sidebar': projectUpdates.length > 0 }">
        <div class="main-column">
          <!-- Description -->
          <section v-if="project.description" class="content-section">
            <h2 class="section-heading">Description</h2>
            <div class="description-text" v-html="formatDescription(project.description)"></div>
          </section>

          <!-- Tech Stack -->
          <section v-if="project.tech && project.tech.length" class="content-section">
            <h2 class="section-heading">Tech Stack</h2>
            <div class="tech-stack">
              <span 
                v-for="(tech, index) in project.tech" 
                :key="tech"
                class="tech-tag"
                :style="{ animationDelay: `${index * 0.05}s` }"
              >
                <img v-if="getTechIcon(tech)" :src="getTechIcon(tech)" alt="" class="tech-icon" />
                {{ tech }}
              </span>
            </div>
          </section>

          <!-- Technical Highlights -->
          <section v-if="project.highlights && project.highlights.length" class="content-section">
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

          <!-- Architecture (if available) -->
          <section v-if="project.architecture" class="content-section">
            <h2 class="section-heading">Architecture</h2>
            <ul class="architecture-list">
              <li 
                v-for="(point, index) in project.architecture.points" 
                :key="point"
                class="architecture-item"
                :style="{ animationDelay: `${index * 0.1}s` }"
              >
                {{ point }}
              </li>
            </ul>
          </section>

          <!-- Features with Media (if available) -->
          <section v-if="project.features && project.features.length" class="content-section features-section">
            <h2 class="section-heading">Core Systems</h2>
            <div class="features-grid">
              <div 
                v-for="(feature, index) in project.features" 
                :key="feature.title"
                class="feature-card"
                :style="{ animationDelay: `${index * 0.15}s` }"
              >
                <div class="feature-media" v-if="feature.media">
                  <img 
                    v-if="feature.media.type === 'image'" 
                    :src="feature.media.src" 
                    :alt="feature.title"
                    loading="lazy"
                  />
                  <div class="media-placeholder" v-else>
                    <span>{{ feature.title }}</span>
                  </div>
                </div>
                <div class="feature-content">
                  <h3>{{ feature.title }}</h3>
                  <ul>
                    <li v-for="item in feature.items" :key="item">{{ item }}</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          <!-- Links Section -->
          <section v-if="project.github || project.downloads || project.accessType" class="content-section links-section">
            <div class="project-links">
              <a 
                v-if="project.github"
                :href="project.github" 
                target="_blank" 
                rel="noopener noreferrer"
                class="action-link github-link"
              >
                View on GitHub →
              </a>
              <a 
                v-if="project.accessType === 'request'"
                href="#contact"
                class="action-link request-link"
                @click.prevent="scrollToContact"
              >
                Request Access
              </a>
              <template v-if="project.accessType !== 'request' && project.downloads">
                <a 
                  v-for="download in project.downloads"
                  :key="download.platform"
                  :href="download.url"
                  :download="getFileName(download.url)"
                  class="action-link download-link"
                >
                  Download for {{ download.platform }} ↓
                </a>
              </template>
            </div>
          </section>
        </div>

        <aside class="sidebar-column" v-if="projectUpdates.length">
          <!-- Dev Updates / Timeline -->
          <section class="content-section updates-section">
            <h2 class="section-heading">Development Log</h2>
            <div class="timeline">
              <div 
                v-for="(update, index) in projectUpdates" 
                :key="`${update.date}-${index}`"
                class="timeline-item"
                :style="{ animationDelay: `${index * 0.12}s` }"
              >
                <div class="timeline-marker">
                  <div class="timeline-dot"></div>
                  <div v-if="index < projectUpdates.length - 1" class="timeline-line"></div>
                </div>
                <div class="timeline-content">
                  <div class="timeline-header">
                    <span class="timeline-date">{{ formatDate(update.date) }}</span>
                    <div v-if="update.tags && update.tags.length" class="timeline-tags">
                      <span v-for="tag in update.tags" :key="tag" class="timeline-tag">{{ tag }}</span>
                    </div>
                  </div>
                  <h3 class="timeline-title">{{ update.title }}</h3>
                  <p v-if="update.description" class="timeline-description">{{ update.description }}</p>
                </div>
              </div>
            </div>
          </section>
        </aside>
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
import { useRoute, useRouter } from 'vue-router'
import { getProjectById, getProjectUpdates } from '../data/projects'
import MediaViewer from '../components/MediaViewer.vue'

const route = useRoute()
const router = useRouter()

const project = computed(() => {
  const id = route.params.id
  return getProjectById(id)
})

const projectUpdates = computed(() => {
  if (!project.value) return []
  return getProjectUpdates(project.value.id)
})

function formatDescription(text) {
  if (!text) return ''
  return text.split('\n\n').map(paragraph => 
    `<p>${paragraph.trim()}</p>`
  ).join('')
}

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })
}

function getFileName(url) {
  return url.split('/').pop()
}

function scrollToContact() {
  router.push({ path: '/', query: { section: 'contact' } })
}

function goBack() {
  if (window.history.state && window.history.state.back) {
    router.back()
  } else {
    router.push('/')
  }
}

const techIconMap = {
  'godot': 'godotengine',
  'vue.js': 'vuedotjs',
  'vue': 'vuedotjs',
  'javascript': 'javascript',
  'python': 'python',
  'c++': 'cplusplus',
  'c#': 'csharp',
  'html/css': 'html5',
  'html': 'html5',
  'css': 'css3',
  'firebase': 'firebase',
  'node.js': 'nodedotjs',
  'nodejs': 'nodedotjs',
  'express': 'express',
  'mongodb': 'mongodb',
  'tailwindcss': 'tailwindcss',
  'git': 'git',
  'unity': 'unity',
  'react': 'react',
  'java': 'openjdk'
}

function getTechIcon(tech) {
  const normalized = tech.toLowerCase().trim()
  const iconName = techIconMap[normalized]
  if (iconName) {
    return `https://cdn.simpleicons.org/${iconName}/3B82F6`
  }
  return null
}
</script>

<style scoped>
.project-details {
  min-height: 100vh;
  padding: var(--spacing-lg) 0;
  position: relative;
}

/* ========================================
   Back Navigation
   ======================================== */
.back-section {
  margin-bottom: var(--spacing-md);
}

.back-link {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  color: var(--text-secondary);
  font-size: 0.9rem;
  font-weight: 500;
  transition: all var(--transition-base);
  padding: 0.4rem 0.75rem;
  border-radius: var(--radius-sm);
}

.back-link:hover {
  color: var(--accent-primary);
  transform: translateX(-4px);
  background: rgba(59, 130, 246, 0.06);
}

/* ========================================
   Header
   ======================================== */
.project-header {
  margin-bottom: var(--spacing-xl);
  text-align: center;
  animation: fadeInDown 0.8s ease-out;
  will-change: transform, opacity;
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

.header-badges {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-bottom: var(--spacing-sm);
}

.title-container {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-sm);
}

.details-icon {
  width: 64px;
  height: 64px;
  object-fit: contain;
  background: var(--bg-tertiary);
  border-radius: 14px;
  padding: 8px;
  border: 1px solid var(--border-color);
  box-shadow: 0 8px 24px rgba(0,0,0,0.25);
  transition: transform var(--transition-base);
}

.details-icon:hover {
  transform: scale(1.05) rotate(2deg);
}

.project-title {
  font-size: clamp(2.5rem, 5vw, 4rem);
  margin-bottom: 0;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.03em;
}

.project-subtitle {
  font-size: clamp(1rem, 1.8vw, 1.25rem);
  color: var(--text-secondary);
  max-width: 800px;
  margin: 0 auto;
  line-height: 1.7;
  animation: fadeIn 1s ease-out 0.2s both;
}

@keyframes fadeIn {
  from { opacity: 0; }
  to { opacity: 1; }
}

/* ========================================
   Media
   ======================================== */
.media-section {
  margin-bottom: var(--spacing-xl);
  animation: fadeInUp 0.8s ease-out 0.3s both;
  will-change: transform, opacity;
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

/* ========================================
   Content Sections
   ======================================== */
.project-content {
  max-width: 1000px;
  margin: 0 auto;
}

.project-content.has-sidebar {
  max-width: 1200px;
  display: grid;
  grid-template-columns: 1fr;
  gap: var(--spacing-xl);
}

@media (min-width: 992px) {
  .project-content.has-sidebar {
    grid-template-columns: 1fr 380px;
  }
}

.sidebar-column {
  position: sticky;
  top: 100px;
  align-self: start;
}

.content-section {
  margin-bottom: var(--spacing-xl);
  animation: fadeIn 0.6s ease-out both;
}

.content-section:nth-child(1) { animation-delay: 0.1s; }
.content-section:nth-child(2) { animation-delay: 0.2s; }
.content-section:nth-child(3) { animation-delay: 0.3s; }
.content-section:nth-child(4) { animation-delay: 0.4s; }
.content-section:nth-child(5) { animation-delay: 0.5s; }

.section-heading {
  font-size: clamp(1.4rem, 2.5vw, 1.75rem);
  margin-bottom: var(--spacing-md);
  color: var(--text-accent);
  padding-bottom: var(--spacing-xs);
  position: relative;
  letter-spacing: -0.01em;
}

.section-heading::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 40px;
  height: 2px;
  background: var(--gradient-primary);
  border-radius: var(--radius-full);
  transition: width var(--transition-base);
}

.content-section:hover .section-heading::after {
  width: 80px;
}

/* Description */
.description-text {
  color: var(--text-primary);
  line-height: 1.8;
  font-size: 1.05rem;
}

.description-text :deep(p) {
  margin-bottom: var(--spacing-md);
}

.description-text :deep(p:last-child) {
  margin-bottom: 0;
}

/* Tech Stack */
.tech-stack {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0.45rem 1rem;
  background: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.15);
  border-radius: var(--radius-full);
  font-size: 0.9rem;
  color: var(--accent-primary);
  font-family: var(--font-mono);
  font-weight: 500;
  transition: all var(--transition-base);
  opacity: 0;
  animation: fadeInScale 0.4s ease-out both;
  will-change: transform, opacity;
}

.tech-icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: scale(0.85);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.tech-tag:hover {
  background: rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.35);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.15);
}

/* Highlights */
.highlights-list {
  list-style: none;
  padding: 0;
}

.highlight-item {
  color: var(--text-primary);
  margin-bottom: var(--spacing-sm);
  padding-left: 1.75rem;
  position: relative;
  line-height: 1.7;
  font-size: 1rem;
  opacity: 0;
  animation: slideInLeft 0.5s ease-out both;
  transition: all var(--transition-base);
  will-change: transform, opacity;
}

@keyframes slideInLeft {
  from {
    opacity: 0;
    transform: translate3d(-16px, 0, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.highlight-item::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--accent-primary);
  font-weight: bold;
  font-size: 1.1rem;
  transition: all var(--transition-base);
}

.highlight-item:hover {
  color: var(--text-accent);
  transform: translateX(4px);
}

.highlight-item:hover::before {
  transform: scale(1.2);
  text-shadow: 0 0 8px rgba(59, 130, 246, 0.5);
}

.highlight-item:last-child {
  margin-bottom: 0;
}

/* Architecture */
.architecture-list {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  gap: var(--spacing-sm);
}

.architecture-item {
  color: var(--text-primary);
  padding: var(--spacing-sm) var(--spacing-md);
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  position: relative;
  padding-left: 2.25rem;
  opacity: 0;
  animation: fadeInScale 0.4s ease-out both;
  transition: all var(--transition-base);
}

.architecture-item::before {
  content: '◆';
  position: absolute;
  left: var(--spacing-sm);
  color: var(--accent-secondary);
  font-size: 0.7rem;
}

.architecture-item:hover {
  border-color: var(--border-color-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

/* Features Grid */
.features-section {
  margin-top: var(--spacing-lg);
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-md);
}

.feature-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  overflow: hidden;
  opacity: 0;
  animation: fadeInUp 0.5s ease-out both;
  transition: all var(--transition-base);
}

.feature-card:hover {
  border-color: var(--border-color-hover);
  transform: translateY(-4px);
  box-shadow: var(--shadow-md), 0 0 20px rgba(59, 130, 246, 0.08);
}

.feature-media {
  width: 100%;
  aspect-ratio: 16/9;
  background: var(--bg-tertiary);
  overflow: hidden;
}

.feature-media img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform var(--transition-base);
}

.feature-card:hover .feature-media img {
  transform: scale(1.04);
}

.media-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, var(--bg-tertiary) 0%, var(--bg-secondary) 100%);
  color: var(--text-secondary);
  font-size: 0.9rem;
}

.feature-content {
  padding: var(--spacing-md);
}

.feature-content h3 {
  font-size: 1.05rem;
  color: var(--text-accent);
  margin-bottom: var(--spacing-sm);
  letter-spacing: -0.01em;
}

.feature-content ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.feature-content li {
  color: var(--text-secondary);
  font-size: 0.88rem;
  padding-left: 1rem;
  position: relative;
  margin-bottom: 0.3rem;
  line-height: 1.5;
}

.feature-content li::before {
  content: '•';
  position: absolute;
  left: 0;
  color: var(--accent-primary);
}

.feature-content li:last-child {
  margin-bottom: 0;
}

/* ========================================
   Dev Updates Timeline
   ======================================== */
.updates-section {
  /* margin removed to avoid double-spacing with grid gap */
}

.timeline {
  position: relative;
  padding-left: 0;
}

.timeline-item {
  display: flex;
  gap: var(--spacing-md);
  position: relative;
  opacity: 0;
  animation: fadeInUp 0.5s ease-out both;
}

.timeline-marker {
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-shrink: 0;
  width: 20px;
}

.timeline-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--accent-primary);
  border: 2px solid var(--bg-primary);
  box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.2);
  flex-shrink: 0;
  margin-top: 6px;
  z-index: 1;
}

.timeline-item:first-child .timeline-dot {
  background: var(--accent-warm);
  box-shadow: 0 0 0 3px rgba(245, 158, 11, 0.2);
}

.timeline-line {
  width: 1.5px;
  flex-grow: 1;
  background: linear-gradient(180deg, var(--border-color-hover), var(--border-color));
  margin-top: 4px;
}

.timeline-content {
  flex-grow: 1;
  padding-bottom: var(--spacing-md);
}

.timeline-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: 0.4rem;
  flex-wrap: wrap;
}

.timeline-date {
  font-size: 0.78rem;
  color: var(--accent-primary);
  font-family: var(--font-mono);
  font-weight: 500;
}

.timeline-tags {
  display: flex;
  gap: 4px;
}

.timeline-tag {
  font-size: 0.65rem;
  color: var(--text-secondary);
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  padding: 1px 8px;
  border-radius: var(--radius-full);
  font-family: var(--font-mono);
  text-transform: lowercase;
}

.timeline-title {
  font-size: 1.05rem;
  color: var(--text-accent);
  margin-bottom: 0.3rem;
  font-weight: 600;
  letter-spacing: -0.01em;
}

.timeline-description {
  font-size: 0.92rem;
  color: var(--text-secondary);
  line-height: 1.6;
}

/* ========================================
   Action Links
   ======================================== */
.project-links {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
}

.action-link {
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  font-size: 1rem;
  font-weight: 500;
  padding: 0.65rem 1.25rem;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  transition: all var(--transition-base);
  text-decoration: none;
}

.github-link {
  color: var(--accent-primary);
}

.github-link:hover {
  border-color: var(--accent-primary);
  background: rgba(59, 130, 246, 0.08);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm), 0 0 16px rgba(59, 130, 246, 0.12);
}

.download-link {
  color: var(--accent-secondary);
}

.download-link:hover {
  border-color: var(--accent-secondary);
  background: var(--accent-secondary);
  color: var(--text-accent);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm), 0 0 16px rgba(139, 92, 246, 0.2);
}

.request-link {
  color: var(--accent-warm);
  border-color: rgba(245, 158, 11, 0.3);
  background: rgba(245, 158, 11, 0.06);
}

.request-link:hover {
  border-color: var(--accent-warm);
  background: var(--accent-warm);
  color: var(--bg-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm), 0 0 16px rgba(245, 158, 11, 0.2);
}

/* ========================================
   Not Found
   ======================================== */
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

/* ========================================
   Reduced Motion
   ======================================== */
@media (prefers-reduced-motion: reduce) {
  .project-header,
  .media-section,
  .content-section,
  .tech-tag,
  .highlight-item,
  .architecture-item,
  .feature-card,
  .timeline-item {
    animation: none;
    opacity: 1;
  }
}

/* ========================================
   Responsive
   ======================================== */
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
    font-size: 0.95rem;
  }
  
  .features-grid {
    grid-template-columns: 1fr;
  }
  
  .timeline-item {
    gap: var(--spacing-sm);
  }
}

@media (max-width: 360px) {
  .project-details {
    padding: var(--spacing-sm) 0;
  }
  
  .project-title {
    font-size: 2rem;
  }
}
</style>
