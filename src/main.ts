import './style.css'
import { initHomepage } from './pages/homepage'
import { initWhitepaper } from './pages/whitepaper'

// Simple routing based on URL path
function handleRoute() {
  const path = window.location.pathname
  
  if (path === '/whitepaper') {
    initWhitepaper()
  } else {
    // Default to homepage for '/' or any other path
    initHomepage()
  }
}

// Navigate to a new route
function navigateTo(path: string) {
  window.history.pushState({}, '', path)
  handleRoute()
}

// Make navigation globally available
;(window as any).navigateTo = navigateTo

// Handle browser back/forward buttons
window.addEventListener('popstate', handleRoute)

// Initialize on page load
document.addEventListener('DOMContentLoaded', handleRoute)
