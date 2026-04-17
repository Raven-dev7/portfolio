import { onMounted, onUnmounted } from 'vue'

/**
 * Lightweight scroll-reveal composable using IntersectionObserver.
 * 
 * Usage in a component:
 *   import { useScrollReveal } from '../composables/useScrollReveal'
 *   useScrollReveal('.reveal')
 * 
 * In template:
 *   <div class="reveal">Content fades in on scroll</div>
 * 
 * CSS (already included in main.css):
 *   .reveal { opacity: 0; transform: translateY(20px); transition: ... }
 *   .reveal.revealed { opacity: 1; transform: translateY(0); }
 */
export function useScrollReveal(selector = '.reveal', options = {}) {
  let observer = null

  const defaultOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
    ...options
  }

  onMounted(() => {
    // Respect prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      // Show everything immediately
      document.querySelectorAll(selector).forEach(el => {
        el.classList.add('revealed')
      })
      return
    }

    observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('revealed')
          observer.unobserve(entry.target)
        }
      })
    }, defaultOptions)

    document.querySelectorAll(selector).forEach(el => {
      observer.observe(el)
    })
  })

  onUnmounted(() => {
    if (observer) {
      observer.disconnect()
    }
  })
}
