/**
 * Centralized project data
 * Each project contains all information needed for both card view and detail page
 */

export const projects = [
  {
    id: 1,
    title: 'RemoteLink',
    short: 'A secure remote support and device management platform for authorized assistance, monitoring, and collaboration across systems.',
    description: `RemoteLink is a comprehensive remote support and device management platform designed for secure, authorized assistance across distributed systems. The platform enables real-time monitoring, remote desktop control, secure file transfers, and terminal access while maintaining end-to-end encryption.

Built with Go-Lang for high-performance backend services and Godot Engine for cross-platform client applications, RemoteLink implements a custom protocol using Protobuf for efficient binary serialization. The system leverages FFmpeg for video encoding/decoding, enabling smooth remote desktop streaming with minimal latency.

Key architectural decisions include implementing encrypted data channels for all communication, a custom secure file transfer protocol, and real-time monitoring capabilities that allow authorized users to view system metrics and control remote devices safely.`,
    tech: ['Go-Lang', 'Godot Engine', 'Protobuf', 'FFmpeg', 'Gdscript','TLS/TCP'],
    highlights: [
      'Implemented real-time data synchronization across distributed systems',
      'Built encrypted data channels for remote desktop, file transfer, and system monitoring',
      'Developed custom secure file transfer and management system with integrity verification',
      'Integrated shell and terminal access for remote command execution',
      'Implemented real-time monitoring and control of remote devices',
      'Created video streaming and recording pipeline using FFmpeg encoding/decoding',
      'Designed custom binary protocol using Protobuf for efficient data serialization'
    ],
    media: [
      // Add your media files to /public/media/remotelink/
      // Example structure:
      { type: 'image', src: '/media/remotelink/s2.png' },
      { type: 'video', src: '/media/remotelink/warning.mp4' },
      // { type: 'video', src: '/media/remotelink/demo.mp4' }
      // 
      // To test, uncomment and add actual file paths:
      // { type: 'image', src: '/media/remotelink/screenshot1.png' }
    ],
    github: 'https://github.com/Sam7593/remotelink'
  },
  {
    id: 2,
    title: 'Collision',
    short: 'A Physics-based 2D Split Screen Game built with Godot Engine.',
    description: `Collision is a physics-based 2D split-screen multiplayer game developed using Godot Engine and GDScript. The game leverages Box2D physics engine for realistic collision detection and response, creating engaging gameplay mechanics.

The project demonstrates advanced game development techniques including split-screen rendering, physics simulation, player input handling, and game state management. The architecture is designed for extensibility, allowing easy addition of new game modes and features.

Built entirely with Godot's native GDScript, Collision showcases efficient game loop implementation, proper resource management, and smooth 60 FPS gameplay across different screen resolutions.`,
    tech: ['Godot', 'GDScript', 'Box2D'],
    highlights: [
      'Powered by Godot Engine and Box2D Physics for realistic collisions',
      'Implemented split-screen multiplayer rendering system',
      'Created responsive player controls with independent input handling',
      'Designed modular game architecture for easy feature extension',
      'Optimized performance for consistent 60 FPS gameplay'
    ],
    media: [
      // Add your media files to /public/media/collision/
      // { type: 'image', src: '/media/collision/s1.png' },
      // { type: 'gif', src: '/media/collision/unused/clip2.gif' },
      { type: 'video', src: '/media/collision/clip2.mp4' },
      { type: 'video', src: '/media/collision/about1280.mp4' },
      // { type: 'image', src: '/media/collision/s1.png' },
      { type: 'video', src: '/media/collision/clip.mp4' }
    ],
    github: 'https://github.com/Sam7593/collision'
  },
//   {
//     id: 3,
//     title: 'Game Engine Project',
//     short: 'A game development project demonstrating systems programming.',
//     description: `A custom game engine built from scratch using C++, OpenGL, GLFW, and GLM. This project demonstrates low-level systems programming, graphics rendering, and game engine architecture.

// The engine features a custom rendering pipeline built on OpenGL, efficient memory management, and a component-based entity system. Physics simulation is implemented using custom algorithms optimized for 2D gameplay.

// Key technical achievements include implementing a deferred rendering pipeline, custom shader system, efficient resource loading and caching, and a robust input handling system. The project showcases deep understanding of computer graphics, memory management, and performance optimization.`,
//     tech: ['C++', 'OpenGL', 'GLFW', 'GLM'],
//     highlights: [
//       'Built custom game engine from scratch with modular architecture',
//       'Implemented physics simulation with custom collision detection',
//       'Created efficient rendering pipeline using OpenGL',
//       'Developed custom shader system for visual effects',
//       'Optimized memory management and resource loading',
//       'Designed component-based entity system'
//     ],
//     media: [
//       // Add your media files to /public/media/game-engine/
//       // { type: 'image', src: '/media/game-engine/rendering.png' },
//       // { type: 'video', src: '/media/game-engine/demo.mp4' }
//     ],
//     github: 'https://github.com/Sam7593/game-engine'
//   }
]

/**
 * Get a project by ID
 * @param {number} id - Project ID
 * @returns {Object|undefined} Project object or undefined if not found
 */
export function getProjectById(id) {
  return projects.find(project => project.id === Number(id))
}

/**
 * Get all projects
 * @returns {Array} Array of all projects
 */
export function getAllProjects() {
  return projects
}
