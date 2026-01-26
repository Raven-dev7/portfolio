<template>
  <div class="project-card">
    <router-link 
      :to="`/project/${project.id}`"
      class="project-card-link"
    >
      <h3 class="project-title">{{ project.title }}</h3>
      <p class="project-description">{{ project.short || project.description }}</p>
    </router-link>
    
    <div class="project-tech">
      <span 
        v-for="tech in project.tech" 
        :key="tech"
        class="tech-tag"
      >
        {{ tech }}
      </span>
    </div>
    
    <ul class="project-highlights">
      <li v-for="(highlight, index) in displayHighlights" :key="`${highlight}-${index}`">
        {{ highlight }}
      </li>
    </ul>
    
    <div class="project-actions">
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
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true,
    validator: (value) => {
      return (
        value.id &&
        value.title &&
        (value.short || value.description) &&
        Array.isArray(value.tech) &&
        Array.isArray(value.highlights)
      )
    }
  }
})

// Show first 3-4 highlights on card
const displayHighlights = computed(() => {
  return props.project.highlights.slice(0, 4)
})
</script>

<style scoped>
.project-card {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: var(--spacing-md);
  height: 100%;
  display: flex;
  flex-direction: column;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.project-card::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--transition-base);
}

.project-card:hover::before {
  transform: scaleX(1);
}

.project-card {
  will-change: transform;
}

.project-card:hover {
  background-color: var(--card-hover);
  border-color: var(--accent-primary);
  transform: translate3d(0, -4px, 0);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
}

@media (prefers-reduced-motion: reduce) {
  .project-card {
    transition: background-color var(--transition-base), border-color var(--transition-base);
  }
  
  .project-card:hover {
    transform: none;
  }
}

.project-title {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-sm);
  color: var(--text-accent);
}

.project-description {
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
  line-height: 1.6;
  flex-grow: 1;
}

.project-tech {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-xs);
  margin-bottom: var(--spacing-md);
}

.tech-tag {
  display: inline-block;
  padding: 0.25rem 0.75rem;
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  font-size: 0.875rem;
  color: var(--accent-primary);
  font-family: var(--font-mono);
  transition: all var(--transition-fast);
}

.tech-tag:hover {
  transform: translateY(-1px);
  border-color: var(--accent-primary);
  box-shadow: 0 2px 8px rgba(59, 130, 246, 0.2);
}

.project-highlights {
  list-style: none;
  margin-bottom: var(--spacing-md);
  flex-grow: 1;
}

.project-highlights li {
  color: var(--text-primary);
  margin-bottom: var(--spacing-xs);
  padding-left: 1.5rem;
  position: relative;
  line-height: 1.6;
}

.project-highlights li::before {
  content: '▸';
  position: absolute;
  left: 0;
  color: var(--accent-primary);
  font-weight: bold;
}

.project-card-link {
  text-decoration: none;
  color: inherit;
  display: block;
  margin-bottom: var(--spacing-md);
}

.project-card-link:hover .project-title {
  color: var(--accent-primary);
}

.project-actions {
  margin-top: auto;
  display: flex;
  gap: var(--spacing-sm);
  flex-wrap: wrap;
}

.project-link {
  color: var(--accent-primary);
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 0.5rem;
  transition: gap var(--transition-fast);
  text-decoration: none;
}

.project-link:hover {
  gap: 0.75rem;
}

.github-link {
  color: var(--text-secondary);
}

.github-link:hover {
  color: var(--accent-primary);
}
</style>
