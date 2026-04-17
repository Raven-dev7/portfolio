<template>
  <div class="home">
    <HeroSection />
    <ProjectsSection />
    <SkillsSection />
    <AboutSection />
    <ContactSection />
  </div>
</template>

<script setup>
import { onMounted, watch, nextTick } from 'vue'
import { useRoute } from 'vue-router'
import HeroSection from '../sections/HeroSection.vue'
import ProjectsSection from '../sections/ProjectsSection.vue'
import SkillsSection from '../sections/SkillsSection.vue'
import AboutSection from '../sections/AboutSection.vue'
import ContactSection from '../sections/ContactSection.vue'

const route = useRoute()

function scrollToSection() {
  if (route.query.section) {
    nextTick(() => {
      setTimeout(() => {
        const el = document.getElementById(route.query.section)
        el?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    })
  }
}

onMounted(scrollToSection)
watch(() => route.query.section, scrollToSection)
</script>

<style scoped>
.home {
  min-height: 100vh;
  position: relative;
  z-index: 1;
}
</style>
