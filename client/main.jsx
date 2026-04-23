import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { initServerTrack } from './utils/servertrack.js'

initServerTrack()

ReactDOM.createRoot(document.getElementById('root')).render(
  <App />
)
