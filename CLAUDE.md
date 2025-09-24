# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

TitaniumShovel.com is a modern, interactive developer portfolio website for Chris Mackle. It's built with pure HTML, CSS, and JavaScript - no frameworks or build tools required. The site features custom animations, a unique titanium shovel theme with interactive cursor effects, and comprehensive project showcase functionality.

## Architecture

### Core Structure
- **Single-page application** using vanilla JavaScript modules
- **Component-based design** with separate files for main interactions, animations, and project showcase
- **Pure CSS styling** with custom properties for theming and responsive design split across multiple files
- **Progressive enhancement** - site works without JavaScript, enhanced with JS

### Key JavaScript Modules
- `assets/js/main.js` - Core functionality: custom cursor, scroll animations, navigation, form handling
- `assets/js/animations.js` - Advanced animation controllers and effects
- `assets/js/projects.js` - Complete project showcase system with filtering, modals, and interactions

### CSS Architecture
- `assets/css/style.css` - Main styles, layout, color system using CSS custom properties
- `assets/css/animations.css` - Animation keyframes and transition definitions
- `assets/css/responsive.css` - Mobile-first responsive design breakpoints

## Development Workflow

### Local Development
```bash
# Simple local server for development
python -m http.server 8000
# or
npx serve .
```

### Project Data Management
Projects are stored as a JavaScript array in `assets/js/projects.js` within the `ProjectShowcase` class. Each project object includes:
- Basic info (id, title, description, category)
- Technologies array
- Links (demo, github)
- Status and featured flags

### Adding New Projects
Edit the `projects` array in `assets/js/projects.js:19-132`. The system automatically handles rendering, filtering, and modal generation.

### Customization Points
- **Colors**: Modify CSS custom properties in `:root` selector in `assets/css/style.css`
- **Bio content**: Replace placeholder content in `.bio-placeholder` section of `index.html`
- **Skills**: Update skill categories and items in the skills section of `index.html`

## Interactive Features

### Custom Cursor System
- Titanium shovel-themed cursor with trail effect
- Context-aware transformations based on hover targets
- Click animations and particle effects
- Automatically disabled on mobile devices

### Animation System
- Intersection Observer API for performance-optimized scroll animations
- Staggered animations for project cards and skill items
- Parallax effects on hero elements
- Easter eggs (Konami code, logo clicks)

### Project Showcase
- Dynamic filtering by category (all, tools, ai, web, security)
- Interactive project cards with hover overlays
- Modal system for detailed project views
- Technology tag highlighting
- Empty state handling

## Deployment

This is a static site designed for GitHub Pages:
1. Push to main branch
2. GitHub Pages serves from repository root
3. Custom domain configured via CNAME file

## Performance & Accessibility

- **Lighthouse optimized** - 95+ scores across all metrics
- **WCAG 2.1 AA compliant** with semantic HTML and ARIA labels
- **Reduced motion support** - respects user preferences
- **Keyboard navigation** throughout entire site
- **Screen reader support** with proper focus management