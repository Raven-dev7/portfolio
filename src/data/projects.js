/**
 * Centralized project data
 * 
 * PROJECT TYPES:
 *   'full'  → Full project card with detail page, media gallery, etc.
 *   'mini'  → Compact card, minimal info, shown in "Small Projects" section
 *   'wip'   → Work-in-progress — shows WIP badge + dev timeline
 * 
 * FEATURING:
 *   Set featured: true + featuredPriority: N to show on homepage.
 *   Lower priority number = shown first. Max 4 featured projects shown.
 * 
 * STATUS:
 *   'completed'    → Finished project
 *   'in-progress'  → Actively being worked on
 *   'planned'      → Not started yet
 * 
 * HOW TO ADD A NEW PROJECT:
 *   1. Copy any existing project object below
 *   2. Change the id (must be unique)
 *   3. Set type: 'full', 'mini', or 'wip'
 *   4. Fill in the fields you need (all optional fields can be omitted)
 *   5. To feature it on homepage: add featured: true, featuredPriority: N
 *   6. For WIP projects: add updates[] array with dev log entries
 * 
 * MEDIA VS GALLERY:
 *   'media'   → Shown on the dedicated project details page
 *   'gallery' → Shown in the Gallery modal. If omitted, the modal falls back to using 'media'.
 */

export const projects = [
  {
    id: 1,
    title: 'RemoteLink',
    icon: '/portfolio/media/remotelink/remoteLinkIcon.png',
    short: 'A secure remote support and device management platform for authorized assistance, monitoring, and collaboration across systems.',
    description: `Built with Go-Lang for high-performance backend services and Godot Engine due to its advanced UI system allowing cross-platform client builds, RemoteLink implements Protobuf for efficient binary serialization. The system leverages FFmpeg for video encoding/decoding, enabling smooth remote desktop streaming with minimal latency. Key architectural decisions include implementing encrypted data channels for all communication using tls, secure file transfer, and real-time monitoring capabilities that allow authorized users to view system metrics and control remote devices safely.`,
    tech: ['Go-Lang', 'Godot Engine', 'Protobuf', 'FFmpeg', 'GDScript', 'TLS/TCP'],

    // Classification
    type: 'full',
    status: 'in-progress',
    featured: true,
    featuredPriority: 1,
    hasGallery: true,

    highlights: [
      'End-to-end encrypted communication channels using TLS',
      'Low-latency screen streaming with FFmpeg adaptive compression',
      'Secure file transfer with custom remote file manager',
      'Remote shell execution (CMD, PowerShell) with controlled access',
      'Live system telemetry: CPU, RAM, battery monitoring',
      'Modular architecture—features implemented as independent modules',
      'Multi-client concurrent session handling with Go-based concurrency',
      'Cross-platform deployment via Godot Engine UI system'
    ],
    features: [
      {
        title: 'File Operations',
        items: ['Encrypted file transfer', 'Custom remote file manager', 'Directory navigation & file ops'],
        media: { type: 'image', src: '/portfolio/media/remotelink/file-manager.png' }
      },
      {
        title: 'Clients Management',
        items: ['Centralized client management', 'Concurrent session handling', 'Efficient Go-based concurrency'],
        media: { type: 'image', src: '/portfolio/media/remotelink/clients.png' }
      },
      {
        title: 'Monitoring',
        items: ['Live CPU, RAM, battery telemetry', 'Autoruns', 'Log collection & viewing'],
        media: { type: 'image', src: '/portfolio/media/remotelink/metrics.png' }
      }
    ],
    architecture: {
      points: [
        'Client-Server model with central authentication',
        'Encrypted persistent client connections',
        'Modular subsystems on client/server',
      ]
    },
    media: [
      { type: 'video', src: '/portfolio/media/remotelink/clip.mp4' },
      { type: 'video', src: '/portfolio/media/remotelink/warning.mp4' }
    ],
    gallery: [
      { type: 'video', src: '/portfolio/media/remotelink/clip.mp4' },
      { type: 'video', src: '/portfolio/media/remotelink/warning.mp4' }
    ],
    // github: 'https://github.com/Raven-dev7/remotelink',
    accessType: 'request',

    // Dev updates / changelog
    updates: [
      {
        date: '2025-03-15',
        title: 'Encrypted file transfer system',
        description: 'Implemented AES-256 encryption for all file transfers with progress tracking and resume capability.',
        tags: ['security', 'feature']
      },
      {
        date: '2025-02-28',
        title: 'FFmpeg adaptive streaming',
        description: 'Added adaptive quality adjustment based on network conditions. Streams now auto-adjust resolution and framerate.',
        tags: ['performance', 'feature']
      },
      {
        date: '2025-01-10',
        title: 'Multi-client session handling',
        description: 'Rebuilt connection manager using Go goroutines for true concurrent multi-client support.',
        tags: ['architecture']
      }
    ]
  },
  {
    id: 2,
    title: 'Collision',
    icon: '/portfolio/media/collision/collisionIcon.png',
    short: 'A Physics-based 2D Split Screen Multiplayer Game built with Godot Engine.',
    description: `Collision is a physics-based 2D split-screen multiplayer game developed using Godot Engine and GDScript. The game leverages Rapier physics engine for performant collision detection and response, creating engaging gameplay mechanics.

The project demonstrates game development techniques including split-screen input handling, mutlplayer netcode, physics simulation, player input handling, and game state management. The architecture is designed for extensibility, allowing easy addition of new game modes and features.
`,
    tech: ['Godot', 'GDScript', 'Rapier Physics'],

    // Classification
    type: 'full',
    status: 'beta',
    featured: true,
    featuredPriority: 2,
    hasGallery: true,

    highlights: [
      'Powered by Godot Engine and Rapier Physics for realistic collisions',
      'Created responsive player controls with independent input handling',
      'Designed modular game architecture for easy feature extension',
      'Optimized performance for consistent 60 FPS gameplay'
    ],
    media: [
      { type: 'video', src: '/portfolio/media/collision/clip2.mp4' },
      { type: 'video', src: '/portfolio/media/collision/about1280.mp4' },
      { type: 'video', src: '/portfolio/media/collision/clip.mp4' }
    ],
    gallery: [
      { type: 'video', src: '/portfolio/media/collision/clip2.mp4' },
      { type: 'video', src: '/portfolio/media/collision/about1280.mp4' },
      { type: 'video', src: '/portfolio/media/collision/clip.mp4' }
    ],
    // github: 'https://github.com/Raven-dev7/collision',
    downloads: [
      { platform: 'Windows', url: 'https://drive.usercontent.google.com/download?id=1EuGCz9uhlHVAkSmWBfvk6EPdk1wxe-qI&export=download&confirm=t&uuid=e90aaeea-692b-4a29-998d-2315606386ee' },
      { platform: 'Android', url: 'https://drive.usercontent.google.com/download?id=1ZqsN1iX2bCx-RQm6HeGHb9D2y6ESxZqs&export=download&confirm=t&uuid=8e91c09c-2001-4eca-8aaa-aa6707c86cdd' }
    ],
  },
  // Mini Projects
  {
    id: 3,
    title: 'Dictionary',
    icon: '/portfolio/media/dictioanry/dictionaryIcon.png',
    short: 'Simple, fast and offline dictionary app with 40,000+ words, (Made some years ago)',
    tech: ['SQLite', 'Godot'],

    // Classification
    type: 'mini',
    status: 'completed',
    featured: false,
    hasGallery: true,
    gallery: [
      { type: 'image', src: '/portfolio/media/dictioanry/ss1.png' },
      { type: 'image', src: '/portfolio/media/dictioanry/ss2.png' },
    ],
    highlights: [
      '40,000+ words with pronunciation and synonyms',
      'Search history and bookmarks'
    ],
    downloads: [
      { platform: 'Android', url: '' }
    ],
  },
   {
    id: 4,
    title: 'ONOCLICK',
    icon: '/portfolio/media/onoclick/onoclickIcon.png',
    short: 'Cool autoclicker with unique utilites.',
    tech: ['C#'],

    // Classification
    type: 'mini',
    status: 'completed',
    featured: false,
    hasGallery: true,
    gallery: [
      { type: 'image', src: '/portfolio/media/onoclick/ss1.png' },
      { type: 'image', src: '/portfolio/media/onoclick/ss2.png' },
      { type: 'video', src: '/portfolio/media/onoclick/clip1.mp4' },
    ],
    highlights: [
      '40,000+ words with pronunciation and synonyms',
      'Search history and bookmarks'
    ],
    downloads: [
      { platform: 'Windows', url: '' }
    ],
  }
]

// ============================================================
// HELPER FUNCTIONS — Used by components to query project data
// ============================================================

/**
 * Get a project by ID
 * @param {number|string} id - Project ID
 * @returns {Object|undefined} Project object or undefined if not found
 */
export function getProjectById(id) {
  return projects.find(project => project.id === Number(id))
}

/**
 * Get featured projects for the homepage highlight section.
 * Filters by featured === true, sorts by featuredPriority (ascending), limits to 4.
 * @returns {Array} Array of featured projects
 */
export function getFeaturedProjects() {
  return projects
    .filter(p => p.featured === true)
    .sort((a, b) => (a.featuredPriority || 99) - (b.featuredPriority || 99))
    .slice(0, 4)
}

/**
 * Get all full-size projects (type 'full' or projects without type for backward compat)
 * @returns {Array} Array of full projects
 */
export function getFullProjects() {
  return projects.filter(p => p.type === 'full' || (!p.type && !p.mini))
}

/**
 * Get all projects (full + wip, excludes mini) — backward compatible
 * @returns {Array} Array of non-mini projects
 */
export function getAllProjects() {
  return projects.filter(p => p.type !== 'mini' && !p.mini)
}

/**
 * Get mini/small projects
 * @returns {Array} Array of mini projects
 */
export function getMiniProjects() {
  return projects.filter(p => p.type === 'mini' || p.mini === true)
}

/**
 * Get work-in-progress projects
 * @returns {Array} Array of WIP projects
 */
export function getWipProjects() {
  return projects.filter(p => p.type === 'wip')
}

/**
 * Get dev updates for a specific project, sorted newest first
 * @param {number|string} id - Project ID
 * @returns {Array} Array of update objects, sorted by date descending
 */
export function getProjectUpdates(id) {
  const project = getProjectById(id)
  if (!project || !project.updates) return []
  return [...project.updates].sort((a, b) => new Date(b.date) - new Date(a.date))
}
