# SofIA Landing Page

A modern, interactive landing page for SofIA - the intelligent AI browser extension that revolutionizes web navigation and understanding.

## 🌟 Features

### Interactive Design
- **Immersive Video Background**: Animated Spline 3D scenes with optimized video fallbacks
- **Smooth Scroll Navigation**: Custom scroll-based block system with fade transitions
- **Glass Morphism UI**: Modern transparent glass effects with backdrop blur
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices

### Theme System
- **Dark/Light Mode**: Seamless theme switching with persistent preferences
- **Dynamic Video Backgrounds**: Different videos for each theme
- **Adaptive Colors**: Context-aware color schemes using SofIA design system
- **Theme-Aware Assets**: Images and icons adapt to current theme

### Content Sections
1. **Welcome Section**: Large SofIA logo with introductory description
2. **Features Section**: Product showcase with benefits and badges
3. **Download Section**: Call-to-action with statistics and GitHub link

### White Paper
- **Dedicated Page**: Comprehensive white paper with animated scroll sections
- **8 Content Sections**: From introduction to conclusion with examples
- **Staggered Animations**: Progressive text reveal with timing delays
- **Optimized Layout**: Large, readable sections with proper spacing

## 🛠️ Tech Stack

- **Vite**: Fast build tool and development server
- **TypeScript**: Type-safe JavaScript with modern features
- **CSS3**: Advanced styling with custom properties and animations
- **HTML5**: Semantic markup with accessibility features

## 🎨 Design System

### Colors (SofIA Palette)
- **Sofia-950**: `#372118` - Primary dark
- **Sofia-700**: `#945941` - Secondary brown
- **Sofia-500**: `#C7866C` - Accent brown
- **Sofia-200**: `#F2DED6` - Light brown
- **Sofia-50**: `#FBF7F5` - Cream white
- **Sofia-Black**: `#0E0E0E` - Pure black

### Typography
- **Fraunces**: Serif font for titles and headings
- **Gotu**: Sans-serif for navigation and UI elements
- **Montserrat**: Sans-serif for body text and descriptions

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation
```bash
# Clone the repository
git clone git@github.com:SofIA-extension/landing-page.git
cd landing-page

# Install dependencies
npm install

# Start development server
npm run dev
```

### Build for Production
```bash
# Create optimized production build
npm run build

# Preview production build
npm run preview
```

## 📁 Project Structure

```
landing-page/
├── index.html              # Main landing page
├── whitepaper.html         # White paper page
├── src/
│   ├── main.ts            # Main page JavaScript
│   ├── whitepaper.ts      # White paper JavaScript
│   ├── style.css          # Global styles
│   └── whitepaper.css     # White paper specific styles
├── public/
│   └── assets/            # Images, videos, and static assets
├── package.json           # Dependencies and scripts
└── README.md             # This file
```

## 🎯 Key Components

### Scroll System
Custom JavaScript-powered scroll navigation that replaces traditional scrolling with smooth block transitions using CSS transforms and opacity changes.

### Theme Management
Persistent theme switching using localStorage with CSS custom properties that adapt colors, videos, and assets based on user preference.

### Video Optimization
Compressed WebM videos (from 262MB to 2MB) using FFmpeg with VP9 codec for optimal web performance while maintaining visual quality.

### Animation System
Staggered CSS animations with configurable delays for progressive content reveal, enhancing user engagement and visual hierarchy.

## 🌐 Live Preview

The landing page showcases SofIA's capabilities through an engaging, modern interface that reflects the extension's innovative approach to web browsing enhancement.

## 📝 License

This project is part of the SofIA extension ecosystem. Please refer to the main SofIA repository for licensing information.
