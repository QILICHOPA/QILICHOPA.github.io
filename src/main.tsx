import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const navigation = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming | undefined
if (navigation?.type === 'reload') {
  // A refresh starts at the opening screen; fresh links may still target a section.
  window.history.scrollRestoration = 'manual'
  window.history.replaceState(window.history.state, '', window.location.pathname + window.location.search)
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
