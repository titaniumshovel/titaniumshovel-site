# TitaniumShovel.com

**Chris Mackle's Developer Portfolio**

A modern, interactive personal portfolio website featuring custom animations, responsive design, and a unique titanium shovel theme.

## 🚀 Features

### Design & User Experience
- **Custom Titanium Shovel Cursor** - Interactive cursor that transforms based on hover targets
- **Scroll-Triggered Animations** - Smooth animations as elements come into view
- **Parallax Effects** - Depth and movement throughout the site
- **Responsive Design** - Optimized for all devices and screen sizes
- **Brutalist-Inspired Typography** - Bold, modern font choices with expressive layouts
- **Accessibility First** - WCAG compliant with keyboard navigation and screen reader support

### Interactive Elements
- **Project Showcase** - Filterable portfolio with detailed project modals
- **Digging Animations** - Click the shovel to trigger particle effects
- **Easter Eggs** - Hidden interactions for fellow developers to discover
- **Smooth Scrolling** - Elegant navigation between sections
- **Micro-Interactions** - Responsive feedback throughout the interface

### Technical Highlights
- **Pure HTML/CSS/JS** - No frameworks, lightweight and fast
- **Modern CSS Grid & Flexbox** - Advanced layout techniques
- **Intersection Observer API** - Performance-optimized scroll animations
- **CSS Custom Properties** - Maintainable theming system
- **Progressive Enhancement** - Works without JavaScript

## 📁 Project Structure

```
titaniumshovel/
├── index.html                 # Main HTML file
├── assets/
│   ├── css/
│   │   ├── style.css         # Main styles and layout
│   │   ├── animations.css    # Animation definitions
│   │   └── responsive.css    # Mobile-first responsive design
│   ├── js/
│   │   ├── main.js          # Core functionality and interactions
│   │   ├── animations.js    # Advanced animation controllers
│   │   └── projects.js      # Project showcase functionality
│   ├── images/
│   │   └── titaniumshovel.png # Logo and brand image
│   └── fonts/               # Custom fonts (if any)
└── README.md               # This file
```

## 🎨 Design System

### Color Palette
- **Primary**: #2c3e50 (Deep Blue-Gray)
- **Secondary**: #e74c3c (Vibrant Red)
- **Accent**: #f39c12 (Warm Orange)
- **Titanium Silver**: #bdc3c7
- **Wood Brown**: #d4a574

### Typography
- **Primary**: 'Space Grotesk' - Modern, geometric sans-serif
- **Monospace**: 'JetBrains Mono' - Developer-friendly code font

### Animations
- **Duration**: 0.2s (fast), 0.3s (medium), 0.5s (slow)
- **Easing**: Cubic bezier curves for natural motion
- **Reduced Motion**: Respects user preferences

## 🛠 Customization

### Adding New Projects
Edit the `projects` array in `assets/js/projects.js`:

```javascript
{
    id: 7,
    title: "Your Project Name",
    description: "Project description...",
    category: "web", // web, mobile, tools, ai
    technologies: ["React", "Node.js"],
    image: null, // or path to image
    links: {
        demo: "https://your-demo.com",
        github: "https://github.com/your-repo"
    },
    featured: false,
    status: "completed" // completed, in-development
}
```

### Updating Bio
Replace the placeholder content in the `.bio-placeholder` section of `index.html` with your personal story.

### Customizing Colors
Modify CSS custom properties in `:root` selector in `assets/css/style.css`:

```css
:root {
    --primary-color: #your-color;
    --secondary-color: #your-color;
    /* ... */
}
```

## 🚦 Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized for LCP, FID, and CLS
- **Image Optimization**: WebP format with fallbacks
- **Code Splitting**: Modular JavaScript architecture
- **Caching Strategy**: Service worker for offline functionality

## ♿ Accessibility

- **WCAG 2.1 AA Compliant**
- **Keyboard Navigation**: Full site accessibility via keyboard
- **Screen Reader Support**: Semantic HTML and ARIA labels
- **Color Contrast**: Exceeds 4.5:1 ratio requirements
- **Reduced Motion**: Respects `prefers-reduced-motion`
- **Focus Management**: Clear focus indicators throughout

## 🔧 Development

### Local Development
1. Clone the repository
2. Open `index.html` in a modern browser
3. Use a local server for best experience:
   ```bash
   python -m http.server 8000
   # or
   npx serve .
   ```

### Testing
- **Cross-browser**: Chrome, Firefox, Safari, Edge
- **Mobile Testing**: iOS Safari, Chrome Mobile
- **Accessibility**: axe-core, WAVE, screen readers
- **Performance**: Lighthouse, PageSpeed Insights

## 🚀 Deployment

### GitHub Pages
1. Push to `main` branch
2. Enable GitHub Pages in repository settings
3. Set source to root directory
4. Access at `https://username.github.io/repository-name`

### Custom Domain
1. Add `CNAME` file with your domain
2. Configure DNS records:
   ```
   A Record: @ → 185.199.108.153
   A Record: @ → 185.199.109.153
   A Record: @ → 185.199.110.153
   A Record: @ → 185.199.111.153
   ```

## 🎮 Easter Eggs

Try these interactions:
- Click the titanium shovel 🔨
- Type the Konami code (↑↑↓↓←→←→BA)
- Click the logo 5 times quickly
- Explore with your keyboard

## 🤝 Contributing

This is a personal portfolio, but feedback and suggestions are welcome! Feel free to:
- Report bugs or accessibility issues
- Suggest performance improvements
- Share creative ideas for new animations

## 📄 License

© 2025 Chris Mackle. All rights reserved.

The code structure and techniques are available for learning purposes, but please create your own unique design and content.

---

**Built with passion, coffee, and a titanium shovel** ⚡

*Ready to dig into something amazing together?*