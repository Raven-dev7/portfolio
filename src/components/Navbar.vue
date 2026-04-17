<template>
  <header class="nav" :class="{ scrolled: isScrolled }">
    <div class="container nav-inner">
      <router-link to="/" class="logo">MP</router-link>

      <!-- Desktop nav links -->
      <nav class="links">
        <button @click="go('projects')">Projects</button>
        <button @click="go('skills')">Skills</button>
        <button @click="go('about')">About</button>
        <button @click="go('contact')">Contact</button>
      </nav>

      <div class="actions">
        <a :href="githubUrl" target="_blank" rel="noopener noreferrer" class="nav-link">GitHub</a>
        <a :href="resumeUrl" target="_blank" rel="noopener noreferrer" class="nav-link resume-link">Resume</a>
        
        <!-- Mobile hamburger button -->
        <button 
          class="hamburger" 
          :class="{ active: mobileMenuOpen }"
          @click="toggleMobileMenu"
          aria-label="Toggle navigation menu"
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>
    </div>

    <!-- Mobile overlay menu -->
    <Transition name="slide">
      <div v-if="mobileMenuOpen" class="mobile-overlay" @click.self="closeMobileMenu">
        <nav class="mobile-menu">
          <button @click="goMobile('projects')">Projects</button>
          <button @click="goMobile('skills')">Skills</button>
          <button @click="goMobile('about')">About</button>
          <button @click="goMobile('contact')">Contact</button>
          <div class="mobile-divider"></div>
          <a :href="githubUrl" target="_blank" rel="noopener noreferrer" @click="closeMobileMenu">GitHub</a>
          <a :href="resumeUrl" target="_blank" rel="noopener noreferrer" @click="closeMobileMenu">Resume</a>
        </nav>
      </div>
    </Transition>
  </header>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const githubUrl = 'https://github.com/Raven-dev7'
const resumeUrl = 'https://docs.google.com/document/d/13WUQ3jcYsSmPufD2Sc0LFyxiYSCOhgC26a1MhmYqLCo/edit?usp=sharing'

const mobileMenuOpen = ref(false)
const isScrolled = ref(false)

function go(id) {
  if (route.path === '/') {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    })
  } else {
    router.push({ path: '/', query: { section: id } })
  }
}

function goMobile(id) {
  closeMobileMenu()
  go(id)
}

function toggleMobileMenu() {
  mobileMenuOpen.value = !mobileMenuOpen.value
  document.body.style.overflow = mobileMenuOpen.value ? 'hidden' : ''
}

function closeMobileMenu() {
  mobileMenuOpen.value = false
  document.body.style.overflow = ''
}

function handleScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.body.style.overflow = ''
})
</script>

<style scoped>
.nav {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 1000;
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  background: rgba(10, 10, 10, 0.6);
  border-bottom: 1px solid transparent;
  transition: all var(--transition-base);
}

.nav.scrolled {
  background: rgba(10, 10, 10, 0.85);
  border-bottom-color: var(--border-color);
  box-shadow: var(--shadow-sm);
}

.nav-inner {
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.logo {
  font-weight: 700;
  font-size: 1.1rem;
  letter-spacing: 1px;
  color: var(--text-accent);
  text-decoration: none;
  transition: color var(--transition-base);
}

.logo:hover {
  color: var(--accent-primary);
}

.links {
  display: flex;
  gap: 2rem;
}

.links button {
  background: none;
  border: none;
  color: var(--text-secondary);
  font: inherit;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: color var(--transition-base);
  position: relative;
  padding: 0.25rem 0;
}

.links button::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 1.5px;
  background: var(--accent-primary);
  border-radius: var(--radius-full);
  transition: width var(--transition-base);
}

.links button:hover {
  color: var(--text-accent);
}

.links button:hover::after {
  width: 100%;
}

.actions {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.nav-link {
  color: var(--text-secondary);
  font-size: 0.85rem;
  font-weight: 500;
  padding: 0.4rem 0.75rem;
  border-radius: var(--radius-sm);
  transition: all var(--transition-base);
}

.nav-link:hover {
  color: var(--text-accent);
  background: rgba(255, 255, 255, 0.05);
}

.resume-link {
  color: var(--accent-primary);
  border: 1px solid rgba(59, 130, 246, 0.4);
}

.resume-link:hover {
  background: var(--accent-primary);
  color: var(--text-accent);
  border-color: var(--accent-primary);
}

/* ========================================
   Hamburger Menu Button
   ======================================== */
.hamburger {
  display: none;
  flex-direction: column;
  justify-content: center;
  gap: 5px;
  width: 32px;
  height: 32px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  z-index: 1001;
}

.hamburger span {
  display: block;
  width: 100%;
  height: 2px;
  background: var(--text-primary);
  border-radius: var(--radius-full);
  transition: all var(--transition-base);
  transform-origin: center;
}

.hamburger.active span:nth-child(1) {
  transform: rotate(45deg) translate(5px, 5px);
}

.hamburger.active span:nth-child(2) {
  opacity: 0;
  transform: scaleX(0);
}

.hamburger.active span:nth-child(3) {
  transform: rotate(-45deg) translate(5px, -5px);
}

/* ========================================
   Mobile Overlay
   ======================================== */
.mobile-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
  z-index: 999;
  display: flex;
  justify-content: flex-end;
}

.mobile-menu {
  width: 280px;
  max-width: 80vw;
  height: 100%;
  background: var(--bg-secondary);
  border-left: 1px solid var(--border-color);
  padding: 5rem var(--spacing-md) var(--spacing-md);
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
  overflow-y: auto;
}

.mobile-menu button,
.mobile-menu a {
  background: none;
  border: none;
  color: var(--text-primary);
  font-family: var(--font-family);
  font-size: 1.05rem;
  font-weight: 500;
  padding: 0.875rem var(--spacing-sm);
  text-align: left;
  cursor: pointer;
  border-radius: var(--radius-sm);
  transition: all var(--transition-base);
  text-decoration: none;
  display: block;
}

.mobile-menu button:hover,
.mobile-menu a:hover {
  color: var(--accent-primary);
  background: rgba(59, 130, 246, 0.08);
}

.mobile-divider {
  height: 1px;
  background: var(--border-color);
  margin: var(--spacing-xs) 0;
}

/* Slide transition */
.slide-enter-active,
.slide-leave-active {
  transition: opacity var(--transition-base);
}

.slide-enter-active .mobile-menu,
.slide-leave-active .mobile-menu {
  transition: transform var(--transition-slow);
}

.slide-enter-from {
  opacity: 0;
}

.slide-enter-from .mobile-menu {
  transform: translateX(100%);
}

.slide-leave-to {
  opacity: 0;
}

.slide-leave-to .mobile-menu {
  transform: translateX(100%);
}

/* ========================================
   Responsive
   ======================================== */
@media (max-width: 768px) {
  .links {
    display: none;
  }
  
  .nav-link {
    display: none;
  }
  
  .hamburger {
    display: flex;
  }
}

@media (max-width: 360px) {
  .nav-inner {
    height: 56px;
  }
}
</style>
