import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { DarkModeContextProvider } from './context/darkModeContext.jsx'

createRoot(document.getElementById('root')).render(
  <BrowserRouter><StrictMode>
    <DarkModeContextProvider>
    <App />
    </DarkModeContextProvider>
  </StrictMode>,</BrowserRouter>
  
)
