<template>
  <section class="contact section">
    <div class="container">
      <h2 class="section-title">Contact</h2>
      <div class="contact-content">
        <div class="contact-links">
          <a 
            :href="`mailto:${email}`"
            class="contact-link"
          >
            <span class="contact-label">Email:</span>
            <span class="contact-value">{{ email }}</span>
          </a>
          <a 
            :href="githubUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="contact-link"
          >
            <span class="contact-label">GitHub:</span>
            <span class="contact-value">{{ githubUsername }}</span>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'

const email = ref('manishpoudeldot@gmail.com')
const githubUrl = ref('https://github.com/Sam7593')
const githubUsername = ref('Sam7593')
</script>

<style scoped>
.contact {
  background-color: var(--bg-primary);
  border-top: 1px solid var(--border-color);
}

.contact-content {
  max-width: 600px;
  margin: 0 auto;
}

.contact-links {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  align-items: center;
}

.contact-link {
  display: flex;
  align-items: center;
  gap: var(--spacing-sm);
  padding: var(--spacing-md);
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  width: 100%;
  max-width: 400px;
  transition: all var(--transition-base);
  position: relative;
  overflow: hidden;
}

.contact-link::before {
  content: '';
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent);
  transition: left 0.5s;
}

.contact-link:hover::before {
  left: 100%;
}

.contact-link {
  will-change: transform;
}

.contact-link:hover {
  border-color: var(--accent-primary);
  background-color: var(--card-hover);
  transform: translate3d(0, -2px, 0);
  box-shadow: 0 4px 16px rgba(59, 130, 246, 0.2);
}

@media (prefers-reduced-motion: reduce) {
  .contact-link {
    transition: border-color var(--transition-base), background-color var(--transition-base);
  }
  
  .contact-link:hover {
    transform: none;
  }
  
  .contact-link:hover .contact-value {
    animation: none;
  }
}

.contact-link:hover .contact-value {
  animation: pulse 1s ease-in-out infinite;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.contact-label {
  color: var(--text-secondary);
  font-weight: 500;
}

.contact-value {
  color: var(--accent-primary);
  font-weight: 500;
}

@media (max-width: 768px) {
  .contact-link {
    flex-direction: column;
    text-align: center;
    gap: var(--spacing-xs);
  }
}
</style>
