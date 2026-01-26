# Portfolio Website

A modern, responsive portfolio website built with Vue 3 and Vite.

## Features

- 🎨 Modern, dark-themed UI with smooth animations
- 📱 Fully responsive design
- ⚡ Optimized for performance with GPU-accelerated animations
- ♿ Accessibility support (respects prefers-reduced-motion)
- 🚀 Deployed on GitHub Pages

## Tech Stack

- Vue 3
- Vue Router
- Vite
- CSS3 (with CSS Variables)

## Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Deployment to GitHub Pages

### Automatic Deployment (Recommended)

1. Push your code to the `main` branch
2. Go to your repository Settings → Pages
3. Under "Source", select "GitHub Actions"
4. The workflow will automatically build and deploy on every push to `main`

### Manual Deployment

1. Build the project:
   ```bash
   npm run build
   ```

2. Push the `dist` folder to the `gh-pages` branch:
   ```bash
   git subtree push --prefix dist origin gh-pages
   ```

   Or use the `gh-pages` package:
   ```bash
   npm install -g gh-pages
   gh-pages -d dist
   ```

3. Go to repository Settings → Pages
4. Select the `gh-pages` branch as the source

## Performance Optimizations

- ✅ GPU-accelerated animations using `transform3d`
- ✅ `will-change` hints for better browser optimization
- ✅ Code splitting for Vue and Vue Router
- ✅ Minification and tree-shaking in production builds
- ✅ Console logs removed in production
- ✅ Respects `prefers-reduced-motion` for accessibility

## Project Structure

```
portfolio/
├── public/          # Static assets
├── src/
│   ├── components/  # Reusable components
│   ├── data/        # Project data
│   ├── pages/       # Page components
│   ├── sections/    # Section components
│   ├── router/       # Vue Router configuration
│   └── styles/       # Global styles
└── dist/            # Production build (generated)
```

## License

MIT
