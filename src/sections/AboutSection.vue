<template>
  <section id="about" class="about section">
    <div class="container">
      <h2 class="section-title reveal">
        <span class="tech-shape shape-small-1"></span>
        <span class="tech-shape shape-small-2"></span>
        About
      </h2>
      <div class="about-content reveal">
        <p class="about-text">
          I am a student and a passionate game developer and programmer, actively building interactive projects and exploring creative solutions.
          I specialize in designing engaging experiences, writing clean and efficient code, and tackling complex problems across multiple platforms. I thrive on turning ideas into functional, polished applications while continuously expanding my technical knowledge.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { useScrollReveal } from '../composables/useScrollReveal'

useScrollReveal('.about .reveal')
</script>

<style scoped>
.about {
  position: relative;
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
  background: rgba(10, 10, 10, 0.65);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-lg);
  padding: var(--spacing-lg);
  box-shadow: var(--shadow-md);
}

.about-text {
  font-size: clamp(1rem, 1.4vw, 1.15rem);
  color: var(--text-primary);
  line-height: 1.8;
  text-align: center;
  position: relative;
  padding-bottom: var(--spacing-md);
}

.about-text::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 50px;
  height: 2px;
  background: var(--gradient-primary);
  border-radius: var(--radius-full);
}
</style>
