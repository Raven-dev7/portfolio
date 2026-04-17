<template>
  <div class="mini-card">
    <div class="mini-card-header">
      <div class="mini-title-wrap">
        <img v-if="project.icon" :src="project.icon" alt="" class="mini-icon" loading="lazy" />
        <h3 class="mini-title">{{ project.title }}</h3>
      </div>
      <div class="mini-meta">
        <span v-if="project.status === 'completed'" class="badge badge-completed">Done</span>
        <div class="mini-tech">
          <span v-for="tech in project.tech.slice(0, 2)" :key="tech">{{ tech }}</span>
        </div>
      </div>
    </div>
    
    <p class="mini-description">{{ project.short }}</p>
    
    <div class="mini-actions">
      <button 
        v-if="project.hasGallery" 
        class="mini-link btn-gallery" 
        @click.prevent="openGallery(project)"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 2px;"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><circle cx="8.5" cy="8.5" r="1.5"></circle><polyline points="21 15 16 10 5 21"></polyline></svg>
        Gallery
      </button>
      <router-link 
        v-if="project.media && project.media.length && !project.hasGallery"
        :to="`/project/${project.id}`"
        class="mini-link"
      >
        View →
      </router-link>
      <a 
        v-if="project.github"
        :href="project.github" 
        target="_blank" 
        rel="noopener noreferrer"
        class="mini-link"
      >
        GitHub
      </a>
      <a 
        v-for="download in (project.downloads || [])"
        :key="download.platform"
        :href="download.url"
        :download="getFileName(download.url)"
        class="mini-link download"
      >
        {{ download.platform }} ↓
      </a>
    </div>

    <div class="mini-gradient-line"></div>
  </div>
</template>

<script setup>
import { inject } from 'vue'

defineProps({
  project: {
    type: Object,
    required: true
  }
})

const openGallery = inject('openGallery')

function getFileName(url) {
  return url.split('/').pop()
}
</script>

<style scoped>
.mini-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  transition: all var(--transition-base);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  position: relative;
  overflow: hidden;
}

.mini-gradient-line {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1.5px;
  background: var(--gradient-primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--transition-base);
}

.mini-card:hover .mini-gradient-line {
  transform: scaleX(1);
}

.mini-card:hover {
  border-color: var(--border-color-hover);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm), 0 0 20px rgba(59, 130, 246, 0.08);
}

.mini-card-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: var(--spacing-sm);
}

.mini-title-wrap {
  display: flex;
  align-items: center;
  gap: 8px;
}

.mini-icon {
  width: 24px;
  height: 24px;
  object-fit: contain;
  border-radius: 4px;
  background: var(--bg-primary);
  padding: 3px;
  border: 1px solid var(--border-color);
}

.mini-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  flex-shrink: 0;
}

.mini-title {
  font-size: 1.05rem;
  color: var(--text-accent);
  margin: 0;
  letter-spacing: -0.01em;
}

.mini-tech {
  display: flex;
  gap: 4px;
  flex-shrink: 0;
}

.mini-tech span {
  font-size: 0.7rem;
  color: var(--accent-primary);
  background: rgba(59, 130, 246, 0.08);
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-family: var(--font-mono);
  font-weight: 500;
}

.mini-description {
  color: var(--text-secondary);
  font-size: 0.88rem;
  line-height: 1.5;
  margin: 0;
  flex-grow: 1;
}

.mini-actions {
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
  margin-top: auto;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border-color);
}

.mini-link {
  font-size: 0.82rem;
  color: var(--accent-primary);
  text-decoration: none;
  padding: 3px 10px;
  border: 1px solid var(--border-color);
  border-radius: var(--radius-sm);
  transition: all var(--transition-base);
  font-weight: 500;
}

.mini-link:hover {
  border-color: var(--accent-primary);
  background: rgba(59, 130, 246, 0.08);
}

.btn-gallery {
  display: flex;
  align-items: center;
  background: transparent;
  cursor: pointer;
  font-family: inherit;
}

.btn-gallery:hover {
  background: rgba(59, 130, 246, 0.15);
  color: var(--accent-primary);
}

.mini-link.download {
  color: var(--accent-secondary);
}

.mini-link.download:hover {
  border-color: var(--accent-secondary);
  background: rgba(139, 92, 246, 0.08);
}

@media (prefers-reduced-motion: reduce) {
  .mini-card:hover {
    transform: none;
  }
}
</style>
