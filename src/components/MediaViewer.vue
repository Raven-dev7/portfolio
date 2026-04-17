<template>
  <div class="media-viewer">
    <div v-if="validMedia.length === 0" class="no-media">
      <p>No media available for this project.</p>
    </div>
    <div v-else class="media-grid" :class="gridClass">
      <div 
        v-for="(item, index) in validMedia" 
        :key="`${item.src}-${index}`"
        class="media-item"
        :class="`media-${item.type}`"
        ref="mediaItems"
      >
        <!-- Image -->
        <img 
          v-if="item.type === 'image'"
          :src="item.src" 
          :alt="`Project image ${index + 1}`"
          loading="lazy"
          class="media-content"
          @error="handleImageError"
        />
        
        <!-- GIF -->
        <img 
          v-else-if="item.type === 'gif'"
          :src="item.src" 
          :alt="`Project demo ${index + 1}`"
          loading="lazy"
          class="media-content"
          @error="handleImageError"
        />
        
        <!-- Video -->
        <div v-else-if="item.type === 'video'" class="video-container">
          <video 
            :src="item.src"
            controls
            muted
            loop
            playsinline
            preload="metadata"
            class="media-content"
            @error="handleVideoError"
          >
            Your browser does not support the video tag.
          </video>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'

const props = defineProps({
  media: {
    type: Array,
    required: true,
    default: () => []
  }
})

// Filter out invalid media items
const validMedia = computed(() => {
  if (!Array.isArray(props.media)) return []
  
  return props.media.filter(item => {
    return (
      item &&
      item.type &&
      (item.type === 'image' || item.type === 'gif' || item.type === 'video') &&
      item.src &&
      typeof item.src === 'string' &&
      item.src.trim() !== ''
    )
  })
})

const gridClass = computed(() => {
  const count = validMedia.value.length
  if (count === 1) return 'grid-single'
  if (count === 2) return 'grid-double'
  return 'grid-multi'
})

function handleImageError(event) {
  console.warn('Failed to load image:', event.target.src)
  event.target.closest('.media-item').style.display = 'none'
}

function handleVideoError(event) {
  console.warn('Failed to load video:', event.target.src)
}
</script>

<style scoped>
.media-viewer {
  width: 100%;
}

.media-grid {
  display: grid;
  gap: var(--spacing-md);
  width: 100%;
}

.grid-single {
  grid-template-columns: 1fr;
  max-width: 900px;
  margin: 0 auto;
}

.grid-double {
  grid-template-columns: repeat(2, 1fr);
}

.grid-multi {
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}

.media-item {
  position: relative;
  width: 100%;
  background-color: var(--bg-secondary);
  border: 1px solid var(--border-color);
  border-radius: var(--radius-md);
  overflow: hidden;
  transition: all var(--transition-base);
}

.media-item:hover {
  border-color: var(--border-color-hover);
  box-shadow: var(--shadow-md);
}

/* Video containers */
.media-item.media-video {
  aspect-ratio: 16 / 9;
}

.video-container {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
}

/* Common styles for all media */
.media-content {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  background-color: var(--bg-tertiary);
}

/* Images and GIFs */
.media-item.media-image .media-content,
.media-item.media-gif .media-content {
  max-height: 600px;
  object-fit: contain;
}

/* Videos */
.media-item.media-video .media-content {
  object-fit: contain;
  background-color: var(--bg-primary);
}

/* ========================================
   Responsive
   ======================================== */
@media (max-width: 768px) {
  .media-grid {
    gap: var(--spacing-sm);
  }

  .grid-double,
  .grid-multi {
    grid-template-columns: 1fr;
  }

  .media-item.media-image .media-content,
  .media-item.media-gif .media-content {
    max-height: 400px;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .grid-multi {
    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  }
}

.no-media {
  text-align: center;
  padding: var(--spacing-lg);
  color: var(--text-secondary);
  font-style: italic;
}
</style>
