import { useState } from 'react'
import './App.css'

// core styles are required for all packages
import '@mantine/core/styles.css';

import DataLoad from './components/LoadData'

function App() {
  return <>
    <DataLoad />
  </>
}

export default App
