import './style.css'
import './whitepaper.css'

// Initialize Spline video background
function initSplineBackground() {
  const splineContainer = document.querySelector('#spline-background') as HTMLElement
  
  if (splineContainer) {
    // Create video element
    const video = document.createElement('video')
    video.id = 'background-video'
    updateVideoSource(video)
    video.autoplay = true
    video.muted = true
    video.loop = true
    video.playsInline = true
    video.style.width = '100%'
    video.style.height = '100%'
    video.style.objectFit = 'cover'
    video.style.position = 'absolute'
    video.style.top = '0'
    video.style.left = '0'
    
    // Add error handling
    video.onerror = () => {
      console.log('Video failed to load, using fallback background')
      createFallbackBackground()
    }
    
    // Add video to container
    splineContainer.appendChild(video)
    
    // Ensure video plays
    video.play().catch(() => {
      console.log('Video autoplay failed, using fallback background')
      createFallbackBackground()
    })
  }
}

// Update video source based on theme
function updateVideoSource(video: HTMLVideoElement) {
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark'
  video.src = isDark ? '/assets/SplineBackround_dark.webm' : '/assets/SplineBackground_white.webm'
}

// Fallback animated background when Spline scene is not available
function createFallbackBackground() {
  const splineContainer = document.querySelector('#spline-background') as HTMLElement
  if (splineContainer) {
    splineContainer.style.background = `
      linear-gradient(135deg, #372118 0%, #945941 50%, #C7866C 100%)
    `
    splineContainer.style.backgroundSize = '400% 400%'
    splineContainer.style.animation = 'gradientShift 15s ease infinite'
    
    // Add CSS animation for gradient movement
    const style = document.createElement('style')
    style.textContent = `
      @keyframes gradientShift {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }
    `
    document.head.appendChild(style)
  }
}

// Theme management
function initTheme() {
  const savedTheme = localStorage.getItem('sofia-theme') || 'light'
  document.documentElement.setAttribute('data-theme', savedTheme)
  updateThemeIcon(savedTheme === 'dark')
}

function toggleTheme() {
  const currentTheme = document.documentElement.getAttribute('data-theme')
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark'
  
  document.documentElement.setAttribute('data-theme', newTheme)
  localStorage.setItem('sofia-theme', newTheme)
  updateThemeIcon(newTheme === 'dark')
  
  // Update video background
  const video = document.getElementById('background-video') as HTMLVideoElement
  if (video) {
    updateVideoSource(video)
  }
}

function updateThemeIcon(isDark: boolean) {
  const themeIcon = document.querySelector('.theme-icon')
  if (themeIcon) {
    themeIcon.textContent = isDark ? '☀️' : '🌙'
  }
}

// White paper scroll animations
function initWhitepaperAnimations() {
  const sections = document.querySelectorAll('.whitepaper-section')
  let currentSection = 0
  let isScrolling = false

  function showSection(index: number) {
    sections.forEach((section, i) => {
      section.classList.remove('active', 'next', 'prev')
      
      if (i === index) {
        section.classList.add('active')
      } else if (i > index) {
        section.classList.add('next')
      } else {
        section.classList.add('prev')
      }
    })
    currentSection = index
  }

  // Handle wheel scroll
  window.addEventListener('wheel', (e) => {
    e.preventDefault()
    
    if (isScrolling) return
    isScrolling = true
    
    if (e.deltaY > 0) {
      // Scroll down
      if (currentSection < sections.length - 1) {
        showSection(currentSection + 1)
      }
    } else {
      // Scroll up  
      if (currentSection > 0) {
        showSection(currentSection - 1)
      }
    }
    
    setTimeout(() => {
      isScrolling = false
    }, 1000)
  }, { passive: false })

  // Handle arrow keys
  window.addEventListener('keydown', (e) => {
    if (isScrolling) return
    
    if (e.key === 'ArrowDown' || e.key === 'PageDown') {
      e.preventDefault()
      if (currentSection < sections.length - 1) {
        isScrolling = true
        showSection(currentSection + 1)
        setTimeout(() => { isScrolling = false }, 1000)
      }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault()
      if (currentSection > 0) {
        isScrolling = true
        showSection(currentSection - 1)
        setTimeout(() => { isScrolling = false }, 1000)
      }
    }
  })

  // Initialize with first section
  showSection(0)
}

// Add navigation functionality
function initNavigation() {
  const themeToggle = document.getElementById('theme-toggle')
  
  // Theme toggle functionality
  themeToggle?.addEventListener('click', toggleTheme)
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  initTheme()
  initSplineBackground()
  initNavigation()
  initWhitepaperAnimations()
})

// Add resize handler
window.addEventListener('resize', () => {
  // Handle responsive adjustments if needed
  const navbar = document.querySelector('.navbar') as HTMLElement
  if (navbar && window.innerWidth < 768) {
    // Mobile adjustments
    navbar.style.padding = '1rem'
  }
})