<template>
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <!-- Abstract Tech Shapes -->
        <div class="tech-shape shape-1"></div>
        <div class="tech-shape shape-2"></div>
        <div class="tech-shape shape-3"></div>

        <div class="hero-label">Student Developer</div>
        <h1 class="hero-name">{{ name }}</h1>
        <p class="hero-subtitle">
          I am a <span class="typing-text">{{ typedText }}<span class="cursor">|</span></span>
        </p>
        <p class="hero-description">{{ description }}</p>
        
        <!-- Stats Bar -->
        <div class="hero-stats">
          <div class="stat-item">
            <span class="stat-value">{{ projectsCount  }}+</span>
            <span class="stat-label">Projects</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value">{{ techCount }}+</span>
            <span class="stat-label">Technologies</span>
          </div>
          <div class="stat-divider"></div>
          <div class="stat-item">
            <span class="stat-value" style="color: var(--accent-green)">●</span>
            <span class="stat-label">Available for Work</span>
          </div>
        </div>
      </div>
      
      <!-- Featured Projects -->
      <div v-if="featuredProjects.length" class="featured-projects">
        <h2 class="featured-title">Featured Projects</h2>
        <div class="featured-grid" :class="{ 'grid-single': featuredProjects.length === 1 }">
          <router-link 
            v-for="(project, index) in featuredProjects" 
            :key="project.id"
            :to="`/project/${project.id}`"
            class="featured-card"
            :class="{ 'card-primary': index === 0 }"
          >
            <!-- Status badge -->
            <div class="featured-card-header">
              <span v-if="project.type === 'wip'" class="badge badge-wip">WIP</span>
              <span v-else-if="project.status === 'beta'" class="badge badge-beta">Playable Beta</span>
              <span v-else-if="project.status === 'in-progress'" class="badge badge-in-progress">In Progress</span>
              <span v-else-if="project.status === 'completed'" class="badge badge-completed">Completed</span>
            </div>

            <div class="featured-title-wrap">
              <img v-if="project.icon" :src="project.icon" alt="" class="featured-icon" loading="lazy" />
              <h3>{{ project.title }}</h3>
            </div>
            
            <p>{{ project.short }}</p>
            
            <div class="featured-tech">
              <span v-for="tech in project.tech.slice(0, 4)" :key="tech">{{ tech }}</span>
            </div>

            <!-- Latest update hint -->
            <div v-if="project.updates && project.updates.length" class="featured-update">
              <span class="update-dot"></span>
              <span class="update-text">{{ getLatestUpdateText(project) }}</span>
            </div>

            <div class="featured-card-gradient"></div>
          </router-link>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="scroll-indicator" @click="scrollDown">
      <span class="scroll-text">Scroll</span>
      <div class="scroll-arrows">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { getFeaturedProjects } from '../data/projects'

const name = ref('Manish Poudel')
const description = ref('Building scalable systems and immersive game experiences through clean code and innovative solutions.')

//Project Status 
const projectsCount = ref(0)
const techCount = ref(0)
const TARGET_PROJECTS = 4
const TARGET_TECH = 7

function animateValue(refVar, target, duration = 1200) {
  let start = 0
  const startTime = performance.now()

  function update(currentTime) {
    const elapsed = currentTime - startTime
    const progress = Math.min(elapsed / duration, 1)

    // easeOutCubic
    const eased = 1 - Math.pow(1 - progress, 3)

    refVar.value = Math.floor(start + (target - start) * eased)

    if (progress < 1) {
      requestAnimationFrame(update)
    } else {
      refVar.value = target
    }
  }

  requestAnimationFrame(update)
}


// Typing Effect
const roles = ['Game Developer', 'Problem Solver', 'Tech Enthusiast','Systems Developer']
const typedText = ref('')
let roleIndex = 0
let charIndex = 0
let isDeleting = false
let typingTimeout = null

function typeEffect() {
  const currentRole = roles[roleIndex]
  
  if (isDeleting) {
    typedText.value = currentRole.substring(0, charIndex - 1)
    charIndex--
  } else {
    typedText.value = currentRole.substring(0, charIndex + 1)
    charIndex++
  }

  let typeSpeed = isDeleting ? 50 : 100

  if (!isDeleting && charIndex === currentRole.length) {
    typeSpeed = 2000 // Pause at end of word
    isDeleting = true
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false
    roleIndex = (roleIndex + 1) % roles.length
    typeSpeed = 500 // Pause before typing next word
  }

  typingTimeout = setTimeout(typeEffect, typeSpeed)
}

const featuredProjects = computed(() => {
  return getFeaturedProjects()
})

function getLatestUpdateText(project) {
  if (!project.updates || !project.updates.length) return ''
  const sorted = [...project.updates].sort((a, b) => new Date(b.date) - new Date(a.date))
  const latest = sorted[0]
  const date = new Date(latest.date)
  const monthYear = date.toLocaleDateString('en-US', { month: 'short', year: 'numeric' })
  return `${monthYear} — ${latest.title}`
}

function scrollDown() {
  const next = document.getElementById('projects')
  next?.scrollIntoView({ behavior: 'smooth' })
}

onMounted(() => {
  typeEffect()
  animateValue(projectsCount, TARGET_PROJECTS)
  animateValue(techCount, TARGET_TECH)
})

onUnmounted(() => {
  if (typingTimeout) clearTimeout(typingTimeout)
})
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 120px 0 100px 0; /* Increased top padding to clear navbar */
  background: transparent;
  position: relative;
  overflow: hidden;
}

.hero > .container {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-xl);
  width: 100%;
  position: relative;
  z-index: 2;
}

/* ========================================
   Hero Content
   ======================================== */
.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  animation: fadeInUp 0.8s ease-out;
  will-change: transform, opacity;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translate3d(0, 24px, 0);
  }
  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
}

.hero-label {
  display: inline-block;
  font-size: 0.8rem;
  font-weight: 600;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--accent-primary);
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  padding: 0.3rem 1rem;
  border-radius: var(--radius-full);
  margin-bottom: var(--spacing-md);
}

.hero-name {
  margin-bottom: 0.5rem;
  background: var(--gradient-text);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  font-size: clamp(2.8rem, 6vw, 4.5rem);
  font-weight: 700;
  letter-spacing: -0.03em;
  line-height: 1.1;
}

/* Abstract Tech Shapes */
.tech-shape {
  position: absolute;
  z-index: -1;
  opacity: 0;
  pointer-events: none;
}

.shape-1 {
  top: 10%;
  left: 5%;
  width: 120px;
  height: 120px;
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 30% 70% 70% 30% / 30% 30% 70% 70%;
  animation: floatShape1 15s ease-in-out infinite, fadeInShape .8s ease-out 0.5s forwards;
  background: radial-gradient(circle at center, rgba(59, 130, 246, 0.05) 0%, transparent 70%);
}

.shape-2 {
  top: 60%;
  right: 5%;
  width: 180px;
  height: 180px;
  border: 1px solid rgba(139, 92, 246, 0.15);
  border-radius: 60% 40% 30% 70% / 60% 30% 70% 40%;
  animation: floatShape2 18s ease-in-out infinite reverse, fadeInShape .8s ease-out 0.8s forwards;
  background: radial-gradient(circle at center, rgba(139, 92, 246, 0.03) 0%, transparent 70%);
}

.shape-3 {
  bottom: -5%;
  left: 20%;
  width: 80px;
  height: 80px;
  border: 1px dashed rgba(16, 185, 129, 0.2);
  border-radius: 50%;
  animation: floatShape3 20s linear infinite, fadeInShape .8s ease-out 1.1s forwards;
}

@keyframes fadeInShape {
  to {
    opacity: 1;
  }
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

.hero-subtitle {
  font-size: clamp(1.1rem, 2vw, 1.4rem);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
  font-weight: 400;
  letter-spacing: -0.01em;
  min-height: 2rem;
}

.typing-text {
  color: var(--text-accent);
  font-family: var(--font-mono);
}

.cursor {
  display: inline-block;
  color: var(--accent-primary);
  animation: blink 1s step-end infinite;
}

@keyframes blink {
  0%, 100% { opacity: 1; }
  50% { opacity: 0; }
}

.hero-description {
  font-size: clamp(0.95rem, 1.3vw, 1.05rem);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
  line-height: 1.7;
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  opacity: 0.8;
}

/* Stats Bar */
.hero-stats {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1.5rem;
  background: rgba(255, 255, 255, 0.03);
  border: 1px solid var(--border-color);
  padding: 0.75rem 1.5rem;
  border-radius: var(--radius-full);
  width: fit-content;
  margin: 0 auto;
}

.stat-item {
  display: flex;
  align-items: center;
  gap: 0.5rem;
}

.stat-value {
  color: var(--text-accent);
  font-weight: 700;
  font-size: 1rem;
}

.stat-label {
  color: var(--text-secondary);
  font-size: 0.8rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-divider {
  width: 1px;
  height: 16px;
  background: var(--border-color);
}

@media (max-width: 600px) {
  .hero-stats {
    flex-direction: column;
    gap: 0.5rem;
    padding: 1rem;
    border-radius: var(--radius-md);
    width: 100%;
  }
  .stat-divider {
    width: 100%;
    height: 1px;
  }
}

/* ========================================
   Featured Projects
   ======================================== */
.featured-projects {
  position: relative;
  z-index: 1;
  animation: fadeInUp 0.8s ease-out 0.3s both;
}

.featured-title {
  text-align: center;
  font-size: clamp(1.1rem, 1.5vw, 1.25rem);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
  font-weight: 400;
  letter-spacing: 0.02em;
  text-transform: uppercase;
  font-size: 0.85rem;
}

.featured-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
  gap: var(--spacing-md);
  max-width: 960px;
  margin: 0 auto;
}

.featured-grid.grid-single {
  max-width: 560px;
}

.featured-card {
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  padding: var(--spacing-md);
  text-decoration: none;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.featured-card-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: var(--gradient-primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--transition-slow);
}

.featured-card:hover .featured-card-gradient {
  transform: scaleX(1);
}

.featured-card:hover {
  border-color: var(--border-color-hover);
  transform: translateY(-4px);
  box-shadow: var(--shadow-md), var(--shadow-glow);
}

/* First card gets a persistent gradient line */
.featured-card.card-primary .featured-card-gradient {
  transform: scaleX(1);
}

.featured-card.card-primary {
  border-color: rgba(59, 130, 246, 0.12);
}

.featured-card-header {
  display: flex;
  gap: 6px;
}

.featured-title-wrap {
  display: flex;
  align-items: center;
  gap: 10px;
}

.featured-icon {
  width: 32px;
  height: 32px;
  object-fit: contain;
  border-radius: 6px;
  background: var(--bg-primary);
  padding: 4px;
  border: 1px solid var(--border-color);
}

.featured-card h3 {
  font-size: 1.2rem;
  color: var(--text-accent);
  letter-spacing: -0.01em;
  transition: color var(--transition-base);
  margin: 0;
}

.featured-card:hover h3 {
  color: var(--accent-primary);
}

.featured-card p {
  font-size: 0.9rem;
  color: var(--text-secondary);
  line-height: 1.6;
  margin: 0;
}

.featured-tech {
  display: flex;
  flex-wrap: wrap;
  gap: 5px;
  margin-top: 0.25rem;
}

.featured-tech span {
  font-size: 0.72rem;
  color: var(--accent-primary);
  background: rgba(59, 130, 246, 0.08);
  padding: 2px 8px;
  border-radius: var(--radius-full);
  font-family: var(--font-mono);
  font-weight: 500;
}

/* Latest update hint */
.featured-update {
  display: flex;
  align-items: center;
  gap: 6px;
  margin-top: auto;
  padding-top: 0.5rem;
  border-top: 1px solid var(--border-color);
}

.update-dot {
  width: 5px;
  height: 5px;
  border-radius: 50%;
  background: var(--accent-warm);
  flex-shrink: 0;
}

.update-text {
  font-size: 0.75rem;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  opacity: 0.8;
}

/* ========================================
   Scroll Indicator
   ======================================== */
.scroll-indicator {
  position: absolute;
  bottom: 28px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 6px;
  cursor: pointer;
  z-index: 5;
  padding: 0.6rem 1.25rem;
  background: rgba(59, 130, 246, 0.06);
  border: 1px solid rgba(59, 130, 246, 0.15);
  border-radius: var(--radius-full);
  transition: all var(--transition-base);
}

.scroll-indicator:hover {
  background: rgba(59, 130, 246, 0.12);
  border-color: rgba(59, 130, 246, 0.3);
}

.scroll-text {
  font-size: 0.78rem;
  color: var(--accent-primary);
  font-weight: 500;
  letter-spacing: 0.03em;
}

.scroll-arrows {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.scroll-arrows span {
  width: 7px;
  height: 7px;
  border-bottom: 1.5px solid var(--accent-primary);
  border-right: 1.5px solid var(--accent-primary);
  transform: rotate(45deg);
  animation: scrollChevron 2s infinite;
  opacity: 0;
}

.scroll-arrows span:nth-child(1) { animation-delay: 0s; }
.scroll-arrows span:nth-child(2) { animation-delay: 0.2s; }
.scroll-arrows span:nth-child(3) { animation-delay: 0.4s; }

@keyframes scrollChevron {
  0%  { transform: rotate(45deg) translate(0, 0); opacity: 0; }
  40% { opacity: 1; }
  80% { transform: rotate(45deg) translate(8px, 8px); opacity: 0; }
  100% { opacity: 0; }
}

/* ========================================
   Reduced Motion
   ======================================== */
@media (prefers-reduced-motion: reduce) {
  .hero-content {
    animation: none;
  }
  
  .featured-projects {
    animation: none;
  }
  
  .scroll-arrows span {
    animation: none;
    opacity: 1;
  }
}

/* ========================================
   Responsive
   ======================================== */
@media (max-width: 768px) {
  .hero {
    min-height: 85vh;
    padding-top: 100px;
    padding-bottom: 80px;
  }
  
  .featured-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);
  }
}

@media (max-width: 360px) {
  .hero {
    min-height: 80vh;
  }
  
  .hero-label {
    font-size: 0.7rem;
  }
}
</style>
