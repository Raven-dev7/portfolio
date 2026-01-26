<template>
  <section class="skills section">
    <div class="container">
      <h2 class="section-title">Skills</h2>
      <div class="skills-grid">
        <div class="skill-category">
          <h3 class="category-title">Languages</h3>
          <div class="skill-items">
            <span 
              v-for="skill in skills.languages" 
              :key="skill"
              class="skill-item"
            >
              {{ skill }}
            </span>
          </div>
        </div>
        
        <div class="skill-category">
          <h3 class="category-title">Domains</h3>
          <div class="skill-items">
            <span 
              v-for="skill in skills.domains" 
              :key="skill"
              class="skill-item"
            >
              {{ skill }}
            </span>
          </div>
        </div>
        
        <div class="skill-category">
          <h3 class="category-title">Tools</h3>
          <div class="skill-items">
            <span 
              v-for="skill in skills.tools" 
              :key="skill"
              class="skill-item"
            >
              {{ skill }}
            </span>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const skills = ref({
  languages: [
    'GDscript',
    // 'TypeScript',
    'Python',
    // 'C++',
    'Go-Lang',
    'Bash'
    // 'Rust'
  ],
  domains: [
    // 'Web Development',
    'Game/App Development',
    'Systems Programming',
    // 'Backend Architecture',
    // 'Database Design',
    // 'API Development'
  ],
  tools: [
    'Git',
    // 'Docker',
    'Linux',
    'Godot Engine',
    'Photoshop',
    // 'Illustrator',
    // 'Premiere Pro',
    // 'After Effects',
    // 'Lightroom',
    // 'Lightroom Classic',
    // 'Lightroom CC',
    // 'Lightroom CC',
    // 'Vue.js',
    // 'Node.js',
    // 'PostgreSQL',
    // 'MongoDB',
    // 'Redis'
  ]
})
</script>

<style scoped>
.skills {
  background-color: var(--bg-primary);
}

.skills-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: var(--spacing-lg);
}

.skill-category {
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  padding: var(--spacing-md);
  transition: all var(--transition-base);
}

.skill-category:hover {
  border-color: var(--accent-primary);
  background-color: var(--card-hover);
}

.category-title {
  font-size: 1.5rem;
  margin-bottom: var(--spacing-md);
  color: var(--text-accent);
  text-align: center;
}

.skill-items {
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing-sm);
  justify-content: center;
}

.skill-item {
  display: inline-block;
  padding: 0.5rem 1rem;
  background-color: var(--bg-tertiary);
  border: 1px solid var(--border-color);
  border-radius: 4px;
  color: var(--text-primary);
  font-size: 0.9rem;
  transition: transform var(--transition-base), border-color var(--transition-base), color var(--transition-base), box-shadow var(--transition-base);
  position: relative;
  overflow: hidden;
  will-change: transform;
}

.skill-item::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.2), transparent);
  transition: left 0.5s;
}

.skill-item:hover::before {
  left: 100%;
}

.skill-item:hover {
  border-color: var(--accent-primary);
  color: var(--accent-primary);
  transform: translate3d(0, -2px, 0) scale(1.05);
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.2);
}

@media (prefers-reduced-motion: reduce) {
  .skill-item {
    transition: none;
  }
  
  .skill-item:hover {
    transform: none;
  }
}

@media (max-width: 768px) {
  .skills-grid {
    grid-template-columns: 1fr;
  }
}
</style>
