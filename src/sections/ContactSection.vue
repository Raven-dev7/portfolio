<template>
  <section id="contact" class="contact section">
    <div class="container">
      <h2 class="section-title reveal">
        <span class="tech-shape shape-small-1"></span>
        <span class="tech-shape shape-small-2"></span>
        Get In Touch
      </h2>
      <div class="contact-content reveal">
        <p class="contact-intro">
          Interested in collaborating or have questions about my projects? 
          Feel free to reach out — I'm always open to discussing new opportunities 
          and interesting ideas.
        </p>
        
        <div class="contact-grid">
          <a 
            :href="`mailto:${email}`"
            class="contact-card"
          >
            <div class="contact-icon">@</div>
            <div class="contact-info">
              <span class="contact-label">Email</span>
              <span class="contact-value">{{ email }}</span>
            </div>
            <div class="contact-card-gradient"></div>
          </a>
          
          <a 
            :href="githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-card"
          >
            <div class="contact-icon">&lt;/&gt;</div>
            <div class="contact-info">
              <span class="contact-label">GitHub</span>
              <span class="contact-value">{{ githubUsername }}</span>
            </div>
            <div class="contact-card-gradient"></div>
          </a>
          
          <a 
            :href="discordUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-card"
          >
            <div class="contact-icon">#</div>
            <div class="contact-info">
              <span class="contact-label">Discord</span>
              <span class="contact-value">{{ discordUsername }}</span>
            </div>
            <div class="contact-card-gradient"></div>
          </a>
        </div>
        
        <div class="contact-footer">
          <p>Based in Nepal • Open to remote opportunities</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import { useScrollReveal } from '../composables/useScrollReveal'

useScrollReveal('.contact .reveal')

const email = ref('manishpoudeldot@gmail.com')
const githubUrl = ref('https://github.com/Raven-dev7')
const githubUsername = ref('Raven-dev7')
const discordUrl = ref('https://discord.com/users/')
const discordUsername = ref('raven_dev7')
</script>

<style scoped>
.contact {
  border-top: 1px solid var(--border-color);
  padding-bottom: var(--spacing-xl);
  position: relative;
}

.contact-content {
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
}

.contact-intro {
  color: var(--text-primary);
  font-size: 1.05rem;
  line-height: 1.7;
  margin-bottom: var(--spacing-lg);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
  background: rgba(10, 10, 10, 0.65);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  border: 1px solid var(--border-color);
  padding: var(--spacing-md);
  border-radius: var(--radius-md);
}

.contact-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.contact-card {
  display: flex;
  align-items: center;
  gap: var(--spacing-md);
  padding: var(--spacing-md);
  background: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  text-decoration: none;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.contact-card-gradient {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 1.5px;
  background: var(--gradient-primary);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--transition-slow);
}

.contact-card:hover .contact-card-gradient {
  transform: scaleX(1);
}

.contact-card:hover {
  border-color: var(--border-color-hover);
  transform: translateY(-3px);
  box-shadow: var(--shadow-md), 0 0 20px rgba(59, 130, 246, 0.08);
}

.contact-icon {
  width: 44px;
  height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--gradient-primary);
  border-radius: var(--radius-md);
  font-size: 1.1rem;
  font-weight: bold;
  color: var(--text-accent);
  font-family: var(--font-mono);
  flex-shrink: 0;
}

.contact-info {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 2px;
}

.contact-label {
  color: var(--text-secondary);
  font-size: 0.78rem;
  font-weight: 500;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.contact-value {
  color: var(--text-primary);
  font-size: 0.95rem;
  font-weight: 500;
  transition: color var(--transition-base);
}

.contact-card:hover .contact-value {
  color: var(--accent-primary);
}

.contact-footer {
  padding-top: var(--spacing-md);
  border-top: 1px solid var(--border-color);
}

.contact-footer p {
  color: var(--text-secondary);
  font-size: 0.85rem;
  opacity: 0.7;
}

@media (prefers-reduced-motion: reduce) {
  .contact-card {
    transition: border-color var(--transition-base), background-color var(--transition-base);
  }
  
  .contact-card:hover {
    transform: none;
  }
}

@media (max-width: 768px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
