
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import './styles/global.css'
import './styles/typography.css'

const legacyHashRoute = window.location.hash.match(/^#(\/[^#]*)$/)
if (legacyHashRoute) {
  const legacyUrl = new URL(legacyHashRoute[1], window.location.origin)
  window.history.replaceState(
    window.history.state,
    '',
    `${legacyUrl.pathname}${legacyUrl.search}${legacyUrl.hash}`,
  )
}

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </StrictMode>,
)
