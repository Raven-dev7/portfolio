<template>
  <section class="projects section">
    <div class="container">
      <h2 class="section-title">Projects</h2>
      <div class="projects-grid">
        <ProjectCard 
          v-for="(project, index) in projects" 
          :key="project.id"
          :project="project"
          :style="{ animationDelay: `${index * 0.1}s` }"
          class="project-card-animated"
        />
      </div>
    </div>
  </section>
</template>

<script setup>
import { getAllProjects } from '../data/projects'
import ProjectCard from '../components/ProjectCard.vue'

const projects = getAllProjects()
</script>

<style scoped>
.projects {
  background-color: var(--bg-secondary);
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(320px, 1fr));
  gap: var(--spacing-md);
}

.project-card-animated {
  opacity: 0;
  animation: fadeInScale 0.6s ease-out forwards;
}

@keyframes fadeInScale {
  from {
    opacity: 0;
    transform: translate3d(0, 20px, 0) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0) scale(1);
  }
}

.project-card-animated {
  will-change: transform, opacity;
}

@media (prefers-reduced-motion: reduce) {
  .project-card-animated {
    animation: none;
    opacity: 1;
  }
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
}
</style>
