import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { SkeletonTheme } from 'react-loading-skeleton'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <SkeletonTheme baseColor="#313131" highlightColor="#525252">
      <BrowserRouter>
        <AuthProvider>
          <App />
        </AuthProvider>
      </BrowserRouter>
    </SkeletonTheme>
  </React.StrictMode>,
)
