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
  updateWelcomeImage(savedTheme === 'dark')
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
  
  // Update welcome image
  updateWelcomeImage(newTheme === 'dark')
}

function updateThemeIcon(isDark: boolean) {
  const themeIcon = document.querySelector('.theme-icon')
  if (themeIcon) {
    themeIcon.textContent = isDark ? '☀️' : '🌙'
  }
}

function updateWelcomeImage(isDark: boolean) {
  const welcomeImage = document.querySelector('.welcome-image') as HTMLImageElement
  if (welcomeImage) {
    welcomeImage.src = isDark ? '/assets/Welcome.svg' : '/assets/Welcome_back.svg'
  }
}

// Add navigation functionality
function initNavigation() {
  const themeToggle = document.getElementById('theme-toggle')
  const whitepaperLink = document.querySelector('.nav-link')
  
  // Theme toggle functionality
  themeToggle?.addEventListener('click', toggleTheme)
  
  // White paper navigation
  whitepaperLink?.addEventListener('click', (e) => {
    e.preventDefault()
    ;(window as any).navigateTo('/whitepaper')
  })
}

// Add scroll-based block system
function initAnimations() {
  const blocks = document.querySelectorAll('.scroll-block')
  let currentBlock = 0
  let isScrolling = false

  function showBlock(index: number) {
    blocks.forEach((block, i) => {
      block.classList.remove('active', 'next', 'prev')
      
      if (i === index) {
        block.classList.add('active')
      } else if (i > index) {
        // Blocs suivants viennent du bas
        block.classList.add('next')
      } else {
        // Blocs précédents vont vers le haut
        block.classList.add('prev')
      }
    })
    currentBlock = index
  }

  // Handle wheel scroll
  window.addEventListener('wheel', (e) => {
    e.preventDefault()
    
    if (isScrolling) return
    isScrolling = true
    
    if (e.deltaY > 0) {
      // Scroll down
      if (currentBlock < blocks.length - 1) {
        showBlock(currentBlock + 1)
      }
    } else {
      // Scroll up  
      if (currentBlock > 0) {
        showBlock(currentBlock - 1)
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
      if (currentBlock < blocks.length - 1) {
        isScrolling = true
        showBlock(currentBlock + 1)
        setTimeout(() => { isScrolling = false }, 1000)
      }
    } else if (e.key === 'ArrowUp' || e.key === 'PageUp') {
      e.preventDefault()
      if (currentBlock > 0) {
        isScrolling = true
        showBlock(currentBlock - 1)
        setTimeout(() => { isScrolling = false }, 1000)
      }
    }
  })

  // Initialize with first block
  showBlock(0)
}

// Add resize handler
function initResizeHandler() {
  window.addEventListener('resize', () => {
    // Handle responsive adjustments if needed
    const navbar = document.querySelector('.navbar') as HTMLElement
    if (navbar && window.innerWidth < 768) {
      // Mobile adjustments
      navbar.style.padding = '1rem'
    }
  })
}

// Main initialization function for homepage
export function initHomepage() {
  initTheme()
  initSplineBackground()
  initNavigation()
  initAnimations()
  initResizeHandler()
}