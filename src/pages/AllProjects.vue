<template>
  <div class="all-projects-page">
    <div class="container">
      <div class="back-section">
        <router-link to="/" class="back-link">
          ← Back to Home
        </router-link>
      </div>

      <header class="page-header">
        <div class="tech-shape shape-1"></div>
        <div class="tech-shape shape-2"></div>
        <div class="tech-shape shape-3"></div>
        <h1 class="page-title">All Projects</h1>
        <p class="page-subtitle">A comprehensive list of my work, experiments, and tools.</p>
        
        <div class="search-box">
          <svg class="search-icon" xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          <input 
            type="text" 
            v-model="searchQuery" 
            placeholder="Search projects by title, tech, or description..." 
            class="search-input"
          />
        </div>
      </header>

      <!-- Main Projects -->
      <section v-if="filteredMainProjects.length > 0" class="projects-category">
        <h2 class="category-title">Main Projects</h2>
        <div class="projects-grid">
          <ProjectCard 
            v-for="(project, index) in filteredMainProjects" 
            :key="project.id"
            :project="project"
            :style="{ animationDelay: `${index * 0.05}s` }"
            class="project-card-animated"
          />
        </div>
      </section>

      <!-- Mini Projects -->
      <section v-if="filteredMiniProjects.length > 0" class="projects-category mini-category">
        <h2 class="category-title">Small Projects & Experiments</h2>
        <div class="mini-projects-grid">
          <MiniProjectCard
            v-for="(project, index) in filteredMiniProjects"
            :key="project.id"
            :project="project"
            :style="{ animationDelay: `${index * 0.05}s` }"
            class="project-card-animated"
          />
        </div>
      </section>

      <!-- No Results -->
      <div v-if="filteredMainProjects.length === 0 && filteredMiniProjects.length === 0" class="no-results">
        <p>No projects match your search query.</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { getAllProjects, getMiniProjects } from '../data/projects'
import ProjectCard from '../components/ProjectCard.vue'
import MiniProjectCard from '../components/MiniProjectCard.vue'

const searchQuery = ref('')
const allProjects = getAllProjects()
const mainProjects = allProjects.filter(p => p.type !== 'mini' && !p.mini)
const miniProjectsList = getMiniProjects()

const filteredMainProjects = computed(() => {
  if (!searchQuery.value) return mainProjects
  const query = searchQuery.value.toLowerCase()
  return mainProjects.filter(p => 
    p.title.toLowerCase().includes(query) || 
    (p.short && p.short.toLowerCase().includes(query)) ||
    (p.tech && p.tech.some(t => t.toLowerCase().includes(query)))
  )
})

const filteredMiniProjects = computed(() => {
  if (!searchQuery.value) return miniProjectsList
  const query = searchQuery.value.toLowerCase()
  return miniProjectsList.filter(p => 
    p.title.toLowerCase().includes(query) || 
    (p.short && p.short.toLowerCase().includes(query)) ||
    (p.tech && p.tech.some(t => t.toLowerCase().includes(query)))
  )
})
</script>

<style scoped>
.all-projects-page {
  min-height: 100vh;
  padding: var(--spacing-lg) 0 var(--spacing-xl);
  position: relative;
}

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

.page-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
  animation: fadeInDown 0.8s ease-out;
}

@keyframes fadeInDown {
  from { opacity: 0; transform: translate3d(0, -20px, 0); }
  to { opacity: 1; transform: translate3d(0, 0, 0); }
}

.page-title {
  font-size: clamp(2.5rem, 5vw, 3.5rem);
  margin-bottom: var(--spacing-xs);
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  letter-spacing: -0.02em;
}

.page-subtitle {
  color: var(--text-secondary);
  font-size: 1.1rem;
  margin-bottom: var(--spacing-lg);
}

.search-box {
  position: relative;
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
}

.search-icon {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  color: var(--text-secondary);
  pointer-events: none;
}

.search-input {
  width: 100%;
  padding: 0.8rem 1rem 0.8rem 2.8rem;
  background: rgba(10, 10, 10, 0.65);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  color: var(--text-primary);
  font-family: var(--font-family);
  font-size: 1rem;
  transition: all var(--transition-base);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  box-shadow: var(--shadow-md);
}

.search-input:focus {
  outline: none;
  border-color: var(--accent-primary);
  background: rgba(10, 10, 10, 0.85);
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}

.projects-category {
  margin-bottom: var(--spacing-xl);
}

.category-title {
  font-size: 1.5rem;
  color: var(--text-accent);
  margin-bottom: var(--spacing-md);
  padding-bottom: var(--spacing-xs);
  border-bottom: 1px solid var(--border-color);
  display: inline-block;
}

.projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(420px, 1fr));
  gap: var(--spacing-md);
}

.mini-projects-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: var(--spacing-md);
}

.project-card-animated {
  opacity: 0;
  animation: fadeInScale 0.6s ease-out forwards;
  will-change: transform, opacity;
}

@keyframes fadeInScale {
  from { opacity: 0; transform: translate3d(0, 20px, 0) scale(0.97); }
  to { opacity: 1; transform: translate3d(0, 0, 0) scale(1); }
}

.no-results {
  text-align: center;
  padding: var(--spacing-xl);
  color: var(--text-secondary);
  font-size: 1.1rem;
  background: rgba(255, 255, 255, 0.02);
  border-radius: var(--radius-lg);
  border: 1px solid var(--border-color);
}

@media (max-width: 768px) {
  .projects-grid {
    grid-template-columns: 1fr;
  }
  .mini-projects-grid {
    grid-template-columns: 1fr;
  }
}

@keyframes fadeInShape {
  to {
    opacity: 1;
  }
}

/* Abstract Tech Shapes */
.tech-shape {
  position: absolute;
  z-index: -1;
  opacity: 0;
  pointer-events: none;
}

.shape-1 {
  top: 7%;
  left: 50%;
  width: 120px;
  height: 120px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  animation: floatShape1 15s ease-in-out infinite, fadeInShape .8s ease-out 0.5s forwards;
  background: radial-gradient(circle at center, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
}

.shape-2 {
  top: 16%;
  right: 50%;
  width: 180px;
  height: 180px;
  border: 1px solid rgba(139, 92, 246, 0.15);
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  animation: floatShape2 18s ease-in-out infinite reverse, fadeInShape .8s ease-out 0.8s forwards;
  background: radial-gradient(circle at center, rgba(139, 92, 246, 0.03) 0%, transparent 70%);
}

.shape-3 {
  top: 10%;
  left: 30%;
  width: 80px;
  height: 80px;
  border: 1px dashed rgba(16, 185, 129, 0.2);
  border-radius: 50%;
  animation: floatShape3 20s linear infinite, fadeInShape .8s ease-out 1.1s forwards;
}
@keyframes floatShape1 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(30px, -40px) rotate(10deg); }
  66% { transform: translate(-20px, 20px) rotate(-5deg); }
}

@keyframes floatShape2 {
  0%, 100% { transform: translate(0, 0) rotate(0deg); }
  33% { transform: translate(-40px, -30px) rotate(-15deg); }
  66% { transform: translate(20px, -40px) rotate(10deg); }
}

@keyframes floatShape3 {
  0% { transform: translate(0, 0) rotate(0deg); }
  100% { transform: translate(20px, -20px) rotate(360deg); }
}
</style>
