<template>
  <section id="skills" class="skills section">
    <div class="container">
      <div class="skills-header reveal">
        <h2 class="section-title">
          <span class="tech-shape shape-small-1"></span>
          <span class="tech-shape shape-small-2"></span>
          Technical Skills
        </h2>
        <p class="section-subtitle">Technologies and tools I work with to build digital experiences.</p>
      </div>
      
      <div class="skills-bento-grid">
        <div 
          v-for="(category, index) in skillCategories" 
          :key="category.name"
          class="skill-card reveal"
          :class="`reveal-delay-${index + 1}`"
        >
          <div class="skill-card-inner">
            <div class="category-header">
              <div class="category-icon" :style="{ color: category.color, borderColor: category.color + '40', background: category.color + '15' }">
                {{ category.icon }}
              </div>
              <h3 class="category-title">{{ category.name }}</h3>
            </div>
            
            <div class="skill-tags">
              <span 
                v-for="skill in category.items" 
                :key="skill"
                class="skill-tag"
              >
                <img v-if="getTechIcon(skill)" :src="getTechIcon(skill)" alt="" class="tech-icon" />
                {{ skill }}
              </span>
            </div>
          </div>
          <div class="card-glow" :style="{ background: `radial-gradient(circle at top right, ${category.color}15, transparent 60%)` }"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'

useScrollReveal('.skills .reveal')

const skillCategories = ref([
  {
    name: 'Languages & Core',
    icon: '{/}',
    color: '#3b82f6', // blue
    items: [
      'GDScript',
      'Python',
      'C',
      'Go-Lang',
      'JavaScript / TypeScript',
      'C#',
      'Bash / PowerShell'
    ]
  },
  {
    name: 'Domains',
    icon: '❖',
    color: '#8b5cf6', // purple
    items: [
      'Game Development',
      'Systems Programming',
      'Backend Architecture',
      'Troubleshooting',
      'Linux Ricing'
    ]
  },
  {
    name: 'Tools & Platforms',
    icon: '⚙',
    color: '#10b981', // green
    items: [
      'Godot Engine',
      'Unity',
      'Git & GitHub',
      'Linux (CLI)',
      'Photoshop',
      'GIMP'
    ]
  }
])

const techIconMap = {
  'godot': 'godotengine',
  'godot engine': 'godotengine',
  'vue.js': 'vuedotjs',
  'vue': 'vuedotjs',
  'javascript / typescript': 'javascript',
  'javascript': 'javascript',
  'typescript': 'typescript',
  'python': 'python',
  'c++': 'cplusplus',
  'c#': 'csharp',
  'c': 'c',
  'go-lang': 'go',
  'bash / powershell': 'gnubash',
  'html/css': 'html5',
  'html': 'html5',
  'css': 'css3',
  'firebase': 'firebase',
  'node.js': 'nodedotjs',
  'nodejs': 'nodedotjs',
  'express': 'express',
  'mongodb': 'mongodb',
  'tailwindcss': 'tailwindcss',
  'git & github': 'github',
  'git': 'git',
  'unity': 'unity',
  'react': 'react',
  'java': 'openjdk',
  'linux (cli)': 'linux',
  'linux': 'linux',
  'photoshop': 'adobephotoshop',
  'gimp': 'gimp'
}

function getTechIcon(tech) {
  const normalized = tech.toLowerCase().trim()
  const iconName = techIconMap[normalized]
  if (iconName) {
    return `https://cdn.simpleicons.org/${iconName}/ffffff` // Use white for dark theme contrast
  }
  return null
}
</script>

<style scoped>
.skills {
  position: relative;
  z-index: 2;
}

.skills-header {
  text-align: center;
  margin-bottom: var(--spacing-xl);
}

.section-title {
  margin-bottom: var(--spacing-sm);
}

.section-subtitle {
  color: var(--text-secondary);
  font-size: 1.05rem;
  max-width: 500px;
  margin: 0 auto;
}

.skills-bento-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
  max-width: 1000px;
  margin: 0 auto;
}

.skill-card {
  position: relative;
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: all var(--transition-base);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
}

.skill-card:hover {
  border-color: var(--border-color-hover);
  transform: translateY(-4px);
  box-shadow: var(--shadow-md);
  background: rgba(255, 255, 255, 0.05);
}

.skill-card-inner {
  padding: var(--spacing-lg);
  position: relative;
  z-index: 2;
}

.category-header {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  margin-bottom: var(--spacing-md);
}

.category-icon {
  width: 38px;
  height: 38px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  border: 1px solid;
  font-family: var(--font-mono);
  font-weight: 700;
  font-size: 1.1rem;
}

.category-title {
  font-size: 1.25rem;
  color: var(--text-accent);
  margin: 0;
  letter-spacing: -0.01em;
}

.skill-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.skill-tag {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 0.4rem 0.9rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-full);
  color: var(--text-primary);
  font-size: 0.85rem;
  font-weight: 500;
  transition: all var(--transition-base);
  font-family: var(--font-mono);
}

.tech-icon {
  width: 14px;
  height: 14px;
  object-fit: contain;
  opacity: 0.8;
  transition: opacity var(--transition-base);
}

.skill-tag:hover .tech-icon {
  opacity: 1;
}

.skill-card:hover .skill-tag {
  background: rgba(255, 255, 255, 0.06);
}

.skill-tag:hover {
  border-color: var(--text-primary);
  color: var(--text-accent);
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.card-glow {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1;
  opacity: 0.5;
  transition: opacity var(--transition-base);
}

.skill-card:hover .card-glow {
  opacity: 1;
}

@media (prefers-reduced-motion: reduce) {
  .skill-card {
    transition: background-color var(--transition-base), border-color var(--transition-base);
  }
  
  .skill-card:hover {
    transform: none;
  }
  
  .skill-tag:hover {
    transform: none;
  }
}

@media (max-width: 768px) {
  .skills-bento-grid {
    grid-template-columns: 1fr;
  }
  
  .skill-card.card-featured {
    grid-column: auto;
  }
}
</style>
