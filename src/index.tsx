// Packages:
import { render } from 'solid-js/web'
import { Router } from 'solid-app-router'


// Components:
import App from './App'


// Functions:
render(() => (
  <Router>
    <App />
  </Router>
), document.getElementById('root') as HTMLElement)
