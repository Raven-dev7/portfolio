<template>
  <section class="hero">
    <div class="container">
      <div class="hero-content">
        <h1 class="hero-name">{{ name }}</h1>
        <p class="hero-subtitle">{{ subtitle }}</p>
        <p class="hero-description">{{ description }}</p>
        <div class="hero-buttons">
          <a 
            :href="githubUrl" 
            target="_blank" 
            rel="noopener noreferrer"
            class="btn btn-primary"
          >
            <span>GitHub</span>
          </a>
          <a 
            :href="resumeUrl" 
            target="_blank" 
            rel="noopener noreferrer"
            class="btn"
          >
            <span>Resume</span>
          </a>
        </div>
      </div>
    </div>
    <div class="hero-decoration">
      <div class="decoration-circle"></div>
      <div class="decoration-circle"></div>
      <div class="decoration-circle"></div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
const name = ref('Manish Poudel')
const subtitle = ref('Student Developer | Systems & Game Development')
const description = ref('Building scalable systems and immersive game experiences through clean code and innovative solutions.')
const githubUrl = ref('https://github.com/Sam7593')
const resumeUrl = ref('https://docs.google.com/document/d/1S_qPrE3-cQBPi-fpP0tSYsHkxtZ30taZqLtefSvNhyU/edit?usp=sharing') // Update with your resume URL
</script>

<style scoped>
.hero {
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--spacing-lg) 0;
  background: linear-gradient(180deg, var(--bg-primary) 0%, var(--bg-secondary) 100%);
  position: relative;
  overflow: hidden;
}

.hero-content {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  position: relative;
  z-index: 1;
  animation: fadeInUp 0.8s ease-out;
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

.hero-content {
  will-change: transform, opacity;
}

.hero-name {
  margin-bottom: var(--spacing-sm);
  background: linear-gradient(135deg, var(--text-accent) 0%, var(--accent-primary) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  will-change: filter;
  animation: glow 3s ease-in-out infinite alternate;
}

@keyframes glow {
  from {
    filter: drop-shadow(0 0 10px rgba(59, 130, 246, 0.3));
  }
  to {
    filter: drop-shadow(0 0 20px rgba(59, 130, 246, 0.5));
  }
}

.hero-decoration {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
}

.decoration-circle {
  position: absolute;
  border-radius: 50%;
  background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
  will-change: transform, opacity;
  animation: float 20s ease-in-out infinite;
}

.decoration-circle:nth-child(1) {
  width: 300px;
  height: 300px;
  top: 10%;
  left: 10%;
  animation-delay: 0s;
}

.decoration-circle:nth-child(2) {
  width: 200px;
  height: 200px;
  top: 60%;
  right: 15%;
  animation-delay: -7s;
}

.decoration-circle:nth-child(3) {
  width: 250px;
  height: 250px;
  bottom: 20%;
  left: 50%;
  animation-delay: -14s;
}

@keyframes float {
  0%, 100% {
    transform: translate3d(0, 0, 0) scale(1);
    opacity: 0.3;
  }
  50% {
    transform: translate3d(30px, -30px, 0) scale(1.1);
    opacity: 0.5;
  }
}

/* Respect user's motion preferences */
@media (prefers-reduced-motion: reduce) {
  .hero-content,
  .hero-name,
  .hero-buttons {
    animation: none;
  }
  
  .decoration-circle {
    animation: none;
  }
}

.hero-subtitle {
  font-size: clamp(1.125rem, 2vw, 1.5rem);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-md);
  font-weight: 400;
}

.hero-description {
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  color: var(--text-secondary);
  margin-bottom: var(--spacing-lg);
  line-height: 1.8;
}

.hero-buttons {
  display: flex;
  gap: var(--spacing-sm);
  justify-content: center;
  flex-wrap: wrap;
  animation: fadeInUp 0.8s ease-out 0.2s both;
}

.hero-buttons .btn {
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.hero-buttons .btn::before {
  content: '';
  position: absolute;
  top: 50%;
  left: 50%;
  width: 0;
  height: 0;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.1);
  transform: translate(-50%, -50%);
  transition: width 0.6s, height 0.6s;
}

.hero-buttons .btn:hover::before {
  width: 300px;
  height: 300px;
}

@media (max-width: 768px) {
  .hero {
    min-height: 80vh;
  }
  
  .hero-buttons {
    flex-direction: column;
    align-items: center;
  }
  
  .hero-buttons .btn {
    width: 100%;
    max-width: 280px;
    justify-content: center;
  }
}
</style>
