import React from 'react'
import ReactDOM from 'react-dom/client'
import {Providers} from './TravelCore/ContextData/Providers.tsx'
import App from './App'
import './index.css'
import './config/i18next.config.ts'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
      <Providers>
        <App />
      </Providers>
  </React.StrictMode>
)