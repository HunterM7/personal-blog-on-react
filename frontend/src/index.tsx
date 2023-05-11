import React from 'react'
import ReactDOM from 'react-dom/client'

// Styles
import 'scss/index.scss'

// Components
import { App } from 'components'

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
