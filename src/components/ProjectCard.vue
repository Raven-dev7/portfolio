<template>
  <div 
    class="project-card" 
    :class="[
      variant ? `card-${variant}` : '',
      { 'card-wip': project.type === 'wip' || project.status === 'in-progress' }
    ]"
  >
    <!-- Status / Type badges -->
    <div class="card-badges" v-if="showBadges">
      <span v-if="project.type === 'wip'" class="badge badge-wip">WIP</span>
      <span v-else-if="project.status === 'beta'" class="badge badge-beta">Playable Beta</span>
      <span v-else-if="project.status === 'in-progress'" class="badge badge-in-progress">In Progress</span>
      <span v-else-if="project.status === 'completed'" class="badge badge-completed">Completed</span>
    </div>

    <router-link 
      :to="`/project/${project.id}`"
      class="project-card-link"
    >
      <div class="project-header-top">
        <div v-if="project.icon" class="project-icon-container">
          <img :src="project.icon" alt="" class="project-icon" loading="lazy" />
        </div>
        <h3 class="project-title">{{ project.title }}</h3>
      </div>
      <p class="project-description">{{ project.short || project.description }}</p>
    </router-link>
    
    <div class="project-tech">
      <span 
        v-for="tech in displayTech" 
        :key="tech"
        class="tech-tag"
      >
        {{ tech }}
      </span>
    </div>
    
    <ul v-if="displayHighlights.length" class="project-highlights">
      <li v-for="(highlight, index) in displayHighlights" :key="`${highlight}-${index}`">
        {{ highlight }}
      </li>
    </ul>
    
    <!-- Latest update preview (for WIP projects) -->
    <div v-if="latestUpdate" class="card-update-preview">
      <span class="update-date">{{ formatDate(latestUpdate.date) }}</span>
      <span class="update-title">{{ latestUpdate.title }}</span>
    </div>
    
    <div class="project-actions">
      <button 
        v-if="project.hasGallery" 
        class="btn-gallery" 
        @click.prevent.stop="openGallery(project)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
        Gallery
      </button>
      <router-link 
        :to="`/project/${project.id}`"
        class="project-link"
      >
        View Details →
      </router-link>
      <a 
        v-if="project.github"
        :href="project.github" 
        target="_blank" 
        rel="noopener noreferrer"
        class="project-link github-link"
        @click.stop
      >
        GitHub →
      </a>
      <a 
        v-if="project.accessType === 'request'"
        href="#contact"
        class="project-link request-link"
        @click.stop="scrollToContact"
      >
        Request Access
      </a>
      <template v-if="project.accessType !== 'request' && project.downloads">
        <a 
          v-for="download in project.downloads"
          :key="download.platform"
          :href="download.url"
          :download="getFileName(download.url)"
          class="project-link download-link"
          @click.stop
        >
          {{ download.platform }} ↓
        </a>
      </template>
    </div>

    <!-- Decorative gradient line -->
    <div class="card-gradient-line"></div>
  </div>
</template>

<script setup>
import { computed, inject } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const openGallery = inject('openGallery')

const props = defineProps({
  project: {
    type: Object,
    required: true,
    validator: (value) => {
      return (
        value.id &&
        value.title &&
        (value.short || value.description) &&
        Array.isArray(value.tech)
      )
    }
  },
  variant: {
    type: String,
    default: null,
    validator: (v) => v === null || ['highlight', 'compact'].includes(v)
  }
})

const route = useRoute()
const router = useRouter()

const project = computed(() => props.project)

const showBadges = computed(() => {
  return props.project.type === 'wip' || props.project.status === 'in-progress' || props.project.status === 'completed' || props.project.status === 'beta'
})

// Show first 3-4 highlights on card
const displayHighlights = computed(() => {
  if (!props.project.highlights) return []
  const limit = props.variant === 'highlight' ? 4 : 3
  return props.project.highlights.slice(0, limit)
})

// Limit tech tags shown
const displayTech = computed(() => {
  if (!props.project.tech) return []
  return props.project.tech.slice(0, 6)
})

// Latest dev update (for WIP badge)
const latestUpdate = computed(() => {
  if (!props.project.updates || !props.project.updates.length) return null
  return [...props.project.updates].sort((a, b) => new Date(b.date) - new Date(a.date))[0]
})

function formatDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
}

function getFileName(url) {
  return url.split('/').pop()
}

function scrollToContact(e) {
  e.preventDefault()
  if (route.path === '/') {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
  } else {
    router.push({ path: '/', query: { section: 'contact' } })
  }
}
</script>

<style scoped>
.project-card {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: 1.25rem;
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all 0.4s cubic-bezier(0.25, 0.46, 0.45, 0.94);
  position: relative;
  overflow: hidden;
  will-change: transform, box-shadow;
}

/* Gradient top line (visible on hover) */
.card-gradient-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--gradient-primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--transition-base);
}

.project-card:hover .card-gradient-line {
  transform: scaleX(1);
}

.project-card:hover {
  background-color: var(--card-hover);
  border-color: var(--accent-primary);
  transform: translateY(-6px);
  box-shadow: 0 12px 40px -12px rgba(0, 0, 0, 0.3), 0 0 20px rgba(59, 130, 246, 0.1);
}

/* Highlight variant — always shows gradient line, stronger glow */
.project-card.card-highlight .card-gradient-line {
  transform: scaleX(1);
}

.project-card.card-highlight {
  border-color: rgba(59, 130, 246, 0.15);
}

.project-card.card-highlight:hover {
  box-shadow: var(--shadow-lg), var(--shadow-glow-strong);
}

/* WIP variant — warm accent */
.project-card.card-wip .card-gradient-line {
  background: linear-gradient(90deg, var(--accent-warm), var(--accent-primary));
}

/* ========================================
   Card Content
   ======================================== */
.card-badges {
  display: flex;
  gap: 6px;
  margin-bottom: var(--spacing-sm);
}

.project-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  margin-bottom: var(--spacing-sm);
}

.project-header-top {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: 0.5rem;
}

.project-icon-container {
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  position: relative;
  z-index: 1;
}

.project-icon {
  width: 100%;
  height: 100%;
  object-fit: contain;
  border-radius: 12px;
  background: var(--bg-primary);
  padding: 6px;
  border: 1px solid var(--border-color);
  box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  transition: all 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275);
}

.project-card:hover .project-icon {
  transform: scale(1.15) rotate(-5deg);
  border-color: var(--accent-primary);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.25);
}

.project-title {
  font-size: 1.4rem;
  margin-bottom: 0;
  color: var(--text-accent);
  transition: color var(--transition-base);
  letter-spacing: -0.01em;
}

.project-card-link:hover .project-title {
  color: var(--accent-primary);
}

.project-description {
  color: var(--text-secondary);
  margin-bottom: 0;
  line-height: 1.6;
  font-size: 0.95rem;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: var(--spacing-sm);
}

.tech-tag {
  display: inline-block;
  padding: 0.2rem 0.65rem;
  background-color: rgba(59, 130, 246, 0.08);
  border: 1px solid rgba(59, 130, 246, 0.15);
  border-radius: var(--radius-full);
  font-size: 0.8rem;
  color: var(--accent-primary);
  font-family: var(--font-mono);
  font-weight: 500;
  transition: all var(--transition-fast);
}

.tech-tag:hover {
  background-color: rgba(59, 130, 246, 0.15);
  border-color: rgba(59, 130, 246, 0.3);
  transform: translateY(-1px);
}

.project-highlights {
  list-style: none;
  margin-bottom: var(--spacing-sm);
  flex-grow: 1;
}

.project-highlights li {
  color: var(--text-secondary);
  margin-bottom: 0.4rem;
  padding-left: 1.25rem;
  position: relative;
  line-height: 1.6;
  font-size: 0.9rem;
}

.project-highlights li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--accent-primary);
  font-weight: bold;
  font-size: 0.85rem;
}

/* Latest update preview */
.card-update-preview {
  display: flex;
  align-items: baseline;
  gap: var(--spacing-xs);
  padding: 0.5rem 0.75rem;
  background: rgba(245, 158, 11, 0.06);
  border: 1px solid rgba(245, 158, 11, 0.12);
  border-radius: var(--radius-sm);
  margin-bottom: var(--spacing-sm);
  font-size: 0.82rem;
}

.update-date {
  color: var(--accent-warm);
  font-family: var(--font-mono);
  font-weight: 500;
  font-size: 0.75rem;
  white-space: nowrap;
}

.update-title {
  color: var(--text-secondary);
}

/* ========================================
   Actions
   ======================================== */
.project-actions {
  margin-top: auto;
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
  padding-top: var(--spacing-sm);
  border-top: 1px solid var(--border-color);
}

.project-link {
  color: var(--accent-primary);
  font-weight: 500;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.35rem;
  transition: all var(--transition-fast);
  text-decoration: none;
}

.project-link:hover {
  gap: 0.6rem;
}

.github-link {
  color: var(--text-secondary);
}

.github-link:hover {
  color: var(--accent-primary);
}

.download-link {
  color: var(--accent-secondary);
  background: rgba(139, 92, 246, 0.08);
  padding: 0.2rem 0.65rem;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(139, 92, 246, 0.2);
  transition: all var(--transition-base);
}

.download-link:hover {
  color: var(--text-accent);
  background: var(--accent-secondary);
  border-color: var(--accent-secondary);
}

.request-link {
  color: var(--accent-warm);
  background: rgba(245, 158, 11, 0.08);
  padding: 0.2rem 0.65rem;
  border-radius: var(--radius-sm);
  border: 1px solid rgba(245, 158, 11, 0.2);
  transition: all var(--transition-base);
}

.request-link:hover {
  color: var(--bg-primary);
  background: var(--accent-warm);
  border-color: var(--accent-warm);
}

.btn-gallery {
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 0.35rem 0.75rem;
  background: rgba(59, 130, 246, 0.1);
  color: var(--accent-primary);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: var(--radius-sm);
  font-size: 0.85rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-base);
  margin-right: auto; /* Pushes other links to the right if space allows */
}

.btn-gallery:hover {
  background: rgba(59, 130, 246, 0.2);
  color: #fff;
}

/* ========================================
   Reduced Motion
   ======================================== */
@media (prefers-reduced-motion: reduce) {
  .project-card {
    transition: background-color var(--transition-base), border-color var(--transition-base);
  }
  
  .project-card:hover {
    transform: none;
  }
}
</style>
