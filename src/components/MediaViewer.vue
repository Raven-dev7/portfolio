  <template>
    <div class="media-viewer">
      <div v-if="validMedia.length === 0" class="no-media">
        <p>No media available for this project.</p>
      </div>
      <div v-else class="media-grid">
        <div 
          v-for="(item, index) in validMedia" 
          :key="`${item.src}-${index}`"
          class="media-item"
          :class="`media-${item.type}`"
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
          <video 
            v-else-if="item.type === 'video'"
            :src="item.src"
            autoplay
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

  function handleImageError(event) {
    console.warn('Failed to load image:', event.target.src)
    // Optionally hide the broken image
    event.target.style.display = 'none'
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
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: var(--spacing-md);
  width: 100%;
}

.media-item {
  position: relative;
  width: 100%;
  background-color: var(--card-bg);
  border: 1px solid var(--border-color);
  border-radius: 8px;
  overflow: hidden;
  transition: all var(--transition-base);
  padding: 0;       /* remove any internal padding */
  margin: 0;        /* remove margin inside container */
}

/* Video containers - fixed aspect ratio for alignment, but show full video */
.media-item.media-video {
  aspect-ratio: 16 / 9;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: var(--bg-primary); /* match page background to hide padding */
}

.media-item:hover {
  border-color: var(--accent-primary);
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(59, 130, 246, 0.15);
}

/* Common styles for all media */
.media-content {
  display: block;        /* remove inline baseline spacing */
  width: 100%;
  height: 100%;
  object-fit: cover;     /* fill container without extra space */
  background-color: var(--bg-tertiary);
}

/* Images and GIFs */
.media-item.media-image .media-content,
.media-item.media-gif .media-content {
  max-height: 600px;
  object-fit: contain;  /* preserve aspect ratio */
}

/* Videos */
.media-item.media-video .media-content {
  object-fit: contain;    /* show full video without cropping */
  display: block;
  width: 100%;
  height: 100%;
  max-width: 100%;
  max-height: 100%;
  vertical-align: top;  /* remove inline spacing */
  background-color: var(--bg-primary); /* match page background to hide any padding */
}

/* Single item takes full width */
.media-grid:has(.media-item:only-child) {
  grid-template-columns: 1fr;
}

.media-grid:has(.media-item:only-child) .media-item {
  max-width: 1000px;
  margin: 0 auto;
}

/* Two items */
.media-grid:has(.media-item:nth-child(2):last-child) {
  grid-template-columns: repeat(2, 1fr);
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .media-grid {
    grid-template-columns: 1fr;
    gap: var(--spacing-sm);
  }

  .media-item.media-image .media-content,
  .media-item.media-gif .media-content {
    max-height: 400px;
  }

  .media-item.media-video {
    aspect-ratio: 16 / 9; /* maintain aspect ratio on mobile too */
  }

  .media-grid:has(.media-item:nth-child(2):last-child) {
    grid-template-columns: 1fr;
  }
}

@media (min-width: 769px) and (max-width: 1024px) {
  .media-grid {
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
