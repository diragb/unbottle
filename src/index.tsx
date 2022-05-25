// Packages:
import { render } from 'solid-js/web'
import { createGlobalStyles } from 'solid-styled-components'
import { Router } from 'solid-app-router'


// Components:
import App from './App'


// Styles:
const GlobalStyle = createGlobalStyles`
  body {
    margin: 0;
    font-family:'Nunito Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  code {
    font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
      monospace;
  }

  input {
    font-family:'Nunito Sans', 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
      'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
      sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  a {
    font-weight: 600;
    text-decoration: none;
    color: #B4654A;
  }
`


// Functions:
render(() => (
  <>
    <GlobalStyle />
    <Router>
      <App />
    </Router>
  </>
), document.getElementById('root') as HTMLElement)
