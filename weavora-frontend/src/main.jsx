import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { AuthProvider } from './context/AuthContext.jsx'
import { BagProvider } from './context/BagContext.jsx' // 1. Import the BagProvider

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <AuthProvider>
      <BagProvider>   {/* 2. Wrap your App inside the BagProvider */}
        <App />
      </BagProvider>
    </AuthProvider>
  </React.StrictMode>,
)