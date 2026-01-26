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
import HeroSection from '../sections/HeroSection.vue'
import ProjectsSection from '../sections/ProjectsSection.vue'
import SkillsSection from '../sections/SkillsSection.vue'
import AboutSection from '../sections/AboutSection.vue'
import ContactSection from '../sections/ContactSection.vue'
</script>

<style scoped>
.home {
  min-height: 100vh;
}
</style>
