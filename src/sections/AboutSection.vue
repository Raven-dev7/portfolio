<template>
  <section class="about section">
    <div class="container">
      <h2 class="section-title">About</h2>
      <div class="about-content">
        <p class="about-text">
          I am a student and a passionate game developer and programmer, actively building interactive projects and exploring creative solutions.
          I specialize in designing engaging experiences, writing clean and efficient code, and tackling complex problems across multiple platforms. I thrive on turning ideas into functional, polished applications while continuously expanding my technical knowledge.
        </p>
      </div>
    </div>
  </section>
</template>

<script setup>
</script>

<style scoped>
.about {
  background-color: var(--bg-secondary);
}

.about-content {
  max-width: 800px;
  margin: 0 auto;
  animation: fadeIn 1s ease-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.about-text {
  font-size: clamp(1rem, 1.5vw, 1.125rem);
  color: var(--text-secondary);
  line-height: 1.8;
  text-align: center;
  position: relative;
}

.about-text::after {
  content: '';
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 60px;
  height: 2px;
  background: linear-gradient(90deg, transparent, var(--accent-primary), transparent);
  animation: expandLine 1.5s ease-out 0.5s both;
}

@keyframes expandLine {
  from {
    width: 0;
    opacity: 0;
  }
  to {
    width: 60px;
    opacity: 1;
  }
}

@media (prefers-reduced-motion: reduce) {
  .about-content {
    animation: none;
  }
  
  .about-text::after {
    animation: none;
    width: 60px;
    opacity: 1;
  }
}
</style>
