# Media Files

Place your project media files in the respective project folders:

- `remotelink/` - Media for RemoteLink project
- `collision/` - Media for Collision project  
- `game-engine/` - Media for Game Engine project

## Supported Formats

- **Images**: `.png`, `.jpg`, `.jpeg`, `.webp`
- **GIFs**: `.gif`
- **Videos**: `.mp4`, `.webm`

## Adding Media to Projects

Edit `src/data/projects.js` and add media entries to the `media` array:

```javascript
media: [
  { type: 'image', src: '/media/remotelink/screenshot1.png' },
  { type: 'gif', src: '/media/remotelink/demo.gif' },
  { type: 'video', src: '/media/remotelink/demo.mp4' }
]
```

## File Naming

Use descriptive, lowercase names with hyphens:
- ✅ `screenshot-main.png`
- ✅ `demo-gameplay.gif`
- ✅ `feature-showcase.mp4`
- ❌ `Screenshot 1.png`
- ❌ `demo.gif`
