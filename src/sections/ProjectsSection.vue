<template>
  <section id="projects" class="projects section">
    <div class="container">
      <div class="projects-header reveal">
        <h2 class="section-title">
          <span class="tech-shape shape-small-1"></span>
          <span class="tech-shape shape-small-2"></span>
          Projects
        </h2>
      </div>
      
      <!-- Main Projects (full + wip) -->
      <div class="projects-grid">
        <ProjectCard 
          v-for="(project, index) in visibleMainProjects" 
          :key="project.id"
          :project="project"
          :style="{ animationDelay: `${index * 0.1}s` }"
          class="project-card-animated reveal"
        />
      </div>

      <!-- Mini Projects Section -->
      <div v-if="visibleMiniProjects.length > 0" class="mini-projects-section reveal">
        <h3 class="mini-projects-title">Small Projects</h3>
        <div class="mini-projects-grid">
          <MiniProjectCard
            v-for="(project, index) in visibleMiniProjects"
            :key="project.id"
            :project="project"
            :style="{ animationDelay: `${index * 0.1}s` }"
            class="project-card-animated"
          />
        </div>
      </div>
      
      <!-- View All Button -->
      <div class="show-more-container reveal">
        <router-link to="/projects" class="show-more-btn">
          View All Projects
          <span class="show-more-icon">→</span>
        </router-link>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'
import { getAllProjects, getMiniProjects } from '../data/projects'
import { useScrollReveal } from '../composables/useScrollReveal'
import ProjectCard from '../components/ProjectCard.vue'
import MiniProjectCard from '../components/MiniProjectCard.vue'

useScrollReveal('.projects .reveal')

// ==========================================
// CONFIGURATION VARIABLES
// Customize how many projects preview on the homepage
// ==========================================
const previewMainCount = 4
const previewSmallCount = 4

const allProjects = getAllProjects()
const mainProjects = allProjects.filter(p => p.type !== 'mini' && !p.mini)
const miniProjectsList = getMiniProjects()

const visibleMainProjects = computed(() => mainProjects.slice(0, previewMainCount))
const visibleMiniProjects = computed(() => miniProjectsList.slice(0, previewSmallCount))
</script>

<style scoped>
.projects {
  position: relative;
}

.projects-header {
  margin-bottom: var(--spacing-lg);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  gap: var(--spacing-md);
}

.project-card-animated {
  opacity: 0;
  animation: fadeInScale 0.6s ease-out forwards;
  will-change: transform, opacity;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: translate3d(0, 20px, 0) scale(0.97);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}

@media (prefers-reduced-motion: reduce) {
  .project-card-animated {
    animation: none;
    opacity: 1;
  }
}

/* Show More Button */
.show-more-container {
  display: flex;
  justify-content: center;
  margin-top: var(--spacing-lg);
}

.show-more-btn {
  display: inline-flex;
  align-items: center;
  gap: var(--spacing-xs);
  padding: 0.65rem 1.75rem;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  color: var(--text-primary);
  font-family: var(--font-family);
  font-size: 0.95rem;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition-base);
  text-decoration: none;
}

.show-more-btn:hover {
  border-color: var(--accent-primary);
  background: rgba(59, 130, 246, 0.06);
  color: var(--accent-primary);
  transform: translateY(-2px);
  box-shadow: var(--shadow-sm);
}

.show-more-icon {
  transition: transform var(--transition-base);
  font-size: 1rem;
}

.show-more-btn:hover .show-more-icon {
  transform: translateX(4px);
}

/* Mini Projects Section */
.mini-projects-section {
  margin-top: var(--spacing-xl);
  padding-top: var(--spacing-lg);
  border-top: 1px solid var(--border-color);
}

.mini-projects-title {
  text-align: center;
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-weight: 500;
  letter-spacing: 0.05em;
  text-transform: uppercase;
  margin-bottom: var(--spacing-md);
}

.mini-projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-md);
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  
  .mini-projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
