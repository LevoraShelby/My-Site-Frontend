import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import PageDeck from './PageDeck.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
	  <PageDeck/>
  </StrictMode>,
)