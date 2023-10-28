import React from 'react'
import ReactDOM from 'react-dom/client'
import { MantineProvider } from '@mantine/core'
import {
  BrowserRouter as Router,
  Routes,
  Route
} from 'react-router-dom';

import '@mantine/core/styles.css';

import App from './App'
import Upload from './pages/Upload/Upload'
import Analysis from './pages/Analysis/Analysis'
import About from './pages/About/About'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <MantineProvider >
      <Router>
        <Routes>
          <Route
            path="/"
            element={<App />}
          >
            <Route
              path="/upload"
              element={<Upload />}
            />
            <Route
              path="/analysis"
              element={<Analysis />}
            />
            <Route
              path="/about"
              element={<About />}
            />
          </Route>
        </Routes>
      </Router>
    </MantineProvider>
  </React.StrictMode>,
)
