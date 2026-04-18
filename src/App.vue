<template>
  <div class="app">
    <div class="bg-grid"></div>
    <div class="bg-particles">
      <div v-for="i in 35" :key="i" class="particle" :style="{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 20}s`,
        animationDuration: `${15 + Math.random() * 25}s`
      }"></div>
    </div>
    <div class="bg-glow bg-glow-1"></div>
    <div class="bg-glow bg-glow-2"></div>
    <Navbar />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <GalleryModal 
      :isOpen="isGalleryOpen" 
      :media="galleryMedia" 
      :title="galleryTitle" 
      @close="closeGallery" 
    />
  </div>
</template>

<script setup>
import { ref, provide, onMounted, onUnmounted } from 'vue'
import Navbar from './components/Navbar.vue'
import GalleryModal from './components/GalleryModal.vue'

// Global Gallery State
const isGalleryOpen = ref(false)
const galleryMedia = ref([])
const galleryTitle = ref('')

function openGallery(project) {
  if (!project) return
  galleryMedia.value = (project.gallery && project.gallery.length) ? project.gallery : (project.media || [])
  galleryTitle.value = project.title
  isGalleryOpen.value = true
  document.body.style.overflow = 'hidden' // Prevent background scrolling
  window.history.pushState({ gallery: 'open' }, '')
}

function closeGallery() {
  if (isGalleryOpen.value) {
    isGalleryOpen.value = false
    document.body.style.overflow = ''
    if (window.history.state && window.history.state.gallery === 'open') {
      window.history.back()
    }
  }
}

function handlePopState() {
  if (isGalleryOpen.value) {
    isGalleryOpen.value = false
    document.body.style.overflow = ''
  }
}

onMounted(() => {
  window.addEventListener('popstate', handlePopState)
})

onUnmounted(() => {
  window.removeEventListener('popstate', handlePopState)
})

// Provide to all children
provide('openGallery', openGallery)
</script>

<style scoped>
.app {
  min-height: 100vh;
  position: relative;
  background-color: var(--bg-primary); /* Base color */
}

main {
  position: relative;
  z-index: 1;
}

/* Subtle grid background */
.bg-grid {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  background-image: 
    linear-gradient(rgba(59, 130, 246, 0.05) 1px, transparent 1px),
    linear-gradient(90deg, rgba(59, 130, 246, 0.05) 1px, transparent 1px);
  background-size: 50px 50px;
  mask-image: radial-gradient(ellipse at center, black 10%, transparent 80%);
  -webkit-mask-image: radial-gradient(ellipse at center, black 10%, transparent 80%);
  animation: bgScroll 40s linear infinite;
}

@keyframes bgScroll {
  0% { transform: translate3d(0, 0, 0); }
  100% { transform: translate3d(0, 50px, 0); }
}

/* Floating Particles */
.bg-particles {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
  overflow: hidden;
}

.particle {
  position: absolute;
  width: 5px;
  height: 5px;
  background: var(--accent-primary);
  border-radius: 50%;
  opacity: 0.4;
  box-shadow: 0 0 12px 2px var(--accent-primary);
  animation: floatUp linear infinite;
}

@keyframes floatUp {
  0% {
    transform: translate3d(0, 100vh, 0) scale(0);
    opacity: 0;
  }
  10% { opacity: 0.6; }
  90% { opacity: 0.6; }
  100% {
    transform: translate3d(0, -100px, 0) scale(1.5);
    opacity: 0;
  }
}

/* Ambient glow effects */
.bg-glow {
  position: fixed;
  border-radius: 50%;
  pointer-events: none;
  z-index: 0;
  filter: blur(100px);
  opacity: 0.18;
}

.bg-glow-1 {
  width: 600px;
  height: 600px;
  background: var(--accent-primary);
  top: -200px;
  right: -200px;
  animation: glowFloat 25s ease-in-out infinite;
}

.bg-glow-2 {
  width: 500px;
  height: 500px;
  background: var(--accent-secondary);
  bottom: -150px;
  left: -150px;
  animation: glowFloat 30s ease-in-out infinite reverse;
}

@keyframes glowFloat {
  0%, 100% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(25px, 25px);
  }
}

@media (prefers-reduced-motion: reduce) {
  .bg-glow {
    animation: none;
  }
}

/* Page Transitions */
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s cubic-bezier(0.2, 0.8, 0.2, 1),
              transform 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
}

.page-enter-from {
  opacity: 0;
  transform: translateY(10px);
}

.page-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}

/* Reduce background intensity on mobile */
@media (max-width: 768px) {
  .bg-particles .particle:nth-child(n+15) {
    display: none;
  }
  .bg-particles {
    opacity: 0.3;
  }
  .bg-grid {
    opacity: 0.5;
  }
  .bg-glow {
    opacity: 0.06;
    filter: blur(80px);
  }
  .bg-glow-1 {
    width: 400px;
    height: 400px;
  }
  .bg-glow-2 {
    width: 300px;
    height: 300px;
  }
}
</style>
