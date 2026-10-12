import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import { BankProvider } from './state/BankContext'
import { ThemeProvider } from './state/ThemeContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider>
      <BankProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </BankProvider>
    </ThemeProvider>
  </React.StrictMode>
)
