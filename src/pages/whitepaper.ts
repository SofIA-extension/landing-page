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

// Render whitepaper content
function renderWhitepaperContent() {
  document.body.innerHTML = `
    <div id="spline-background"></div>
    <div class="overlay"></div>
    
    <nav class="navbar">
      <div class="nav-logo">
        <a href="/">
          <img src="/assets/iconcolored.png" alt="SofIA Logo" />
        </a>
      </div>
      <div class="nav-links">
        <a href="#" class="nav-link active">White Paper</a>
        <button id="theme-toggle" class="theme-toggle">
          <span class="theme-icon">🌙</span>
        </button>
      </div>
    </nav>

    <div class="whitepaper-container">
      <section class="whitepaper-section active" id="section-intro">
        <div class="section-content">
          <h1 class="section-title">Sofia – Give meaning to your browsing</h1>
          <p class="section-text">Your digital life deserves better than a simple history.</p>
          <p class="section-text">Sofia is an intelligent and decentralized interface that observes, learns and helps you better understand who you are.</p>
          <p class="section-text">It analyzes your web browsing, your interests and your interactions to build a living representation of your digital identity, which you can enrich, share and have recognized.</p>
          <p class="section-text">Every site visited, every preference, every interaction becomes concrete proof of what you like, know and are capable of doing.</p>
        </div>
      </section>

      <section class="whitepaper-section" id="section-features">
        <div class="section-content">
          <h2 class="section-title">What Sofia does for you</h2>
          <ul class="feature-list">
            <li>Intelligent analysis of your browsing – effortless, no forms</li>
            <li>Automatic creation of your interests and skills profile</li>
            <li>Social certifications: your tastes, talents or relationships can be validated by others</li>
            <li>Personalized recommendations: events, content, people that match you</li>
            <li>Trusted interactions: discover profiles aligned with yours</li>
          </ul>
        </div>
      </section>

      <section class="whitepaper-section" id="section-network">
        <div class="section-content">
          <h2 class="section-title">A network based on proof, not appearance</h2>
          <p class="section-text">Sofia transforms your browsing and actions into personal certifications.</p>
          <p class="section-text">Thanks to Intuition System, your skills, preferences or relationships can be validated by yourself and by the community.</p>
          
          <div class="examples">
            <h3 class="examples-title">Examples:</h3>
            <div class="example-item">
              <p>You often listen to electronic music? Sofia can certify this taste.</p>
            </div>
            <div class="example-item">
              <p>You contribute to an open source project? Your peers can validate your development skills.</p>
            </div>
            <div class="example-item">
              <p>You claim that John is vegetarian? Others can vote to confirm or deny this information.</p>
            </div>
          </div>
        </div>
      </section>

      <section class="whitepaper-section" id="section-capabilities">
        <div class="section-content">
          <h2 class="section-title">What you can do with Sofia</h2>
          <ul class="capability-list">
            <li>Create a personal knowledge base, automatically built from your habits</li>
            <li>Share your interests or skills in a clear and credible way</li>
            <li>Receive recommendations based on your real behaviors, not on likes</li>
            <li>Interact with other certified profiles according to precise and verifiable affinities</li>
            <li>Vote on others' knowledge or skills and strengthen their profile like yours</li>
          </ul>
        </div>
      </section>

      <section class="whitepaper-section" id="section-privacy">
        <div class="section-content">
          <h2 class="section-title">You remain in control of your data</h2>
          <p class="section-text">Sofia respects your privacy:</p>
          <ul class="privacy-list">
            <li>Sensitive data protected (banking browsing, etc.)</li>
            <li>Ability to disable tracking at any time</li>
            <li>Decentralized system: your data is not held by a large platform</li>
            <li>You decide what to share, with whom and for what purpose</li>
          </ul>
        </div>
      </section>

      <section class="whitepaper-section" id="section-unique">
        <div class="section-content">
          <h2 class="section-title">Why Sofia is unique</h2>
          <p class="section-text">Unlike classic social networks or impersonal recommendation engines, Sofia doesn't guess you: it understands you.</p>
          <p class="section-text">It builds with you a rich, evolving and certified digital identity, based on what you actually do.</p>
          <p class="section-text">Each piece of information becomes an element of trust, validated by others in a human, contextual and transparent network.</p>
        </div>
      </section>

      <section class="whitepaper-section" id="section-audience">
        <div class="section-content">
          <h2 class="section-title">Who is Sofia for?</h2>
          <p class="section-text">Sofia is for those who:</p>
          <ul class="audience-list">
            <li>want to regain control of their digital image</li>
            <li>seek useful and personalized recommendations</li>
            <li>wish to showcase their skills without having to constantly justify them</li>
            <li>like to discover people and content truly aligned with them</li>
          </ul>
        </div>
      </section>

      <section class="whitepaper-section" id="section-conclusion">
        <div class="section-content">
          <h2 class="section-title">Sofia</h2>
          <p class="section-text conclusion-text">With Sofia, it's time to prove who you are.</p>
          <a href="https://github.com/SofIA-extension" class="whitepaper-download-button" target="_blank">
            <span class="button-text">Download Sofia</span>
            <span class="button-subtext">Start proving who you are</span>
          </a>
        </div>
      </section>
    </div>
  `
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

// Main initialization function for whitepaper
export function initWhitepaper() {
  // Import whitepaper CSS
  import('../whitepaper.css')
  
  renderWhitepaperContent()
  initTheme()
  initSplineBackground()
  initNavigation()
  initWhitepaperAnimations()
  initResizeHandler()
}