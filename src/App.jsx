import React from 'react'
import { useDisclosure } from '@mantine/hooks';
import { AppShell, Container } from '@mantine/core';

// import './App.css'
import '@mantine/core/styles.css';

import { Header } from './components/Header/Header'

function App() {
  return (
    <AppShell
      header={{ height: 60 }}
      padding="md"
    >
      <AppShell.Header>
        <Header />
      </AppShell.Header>

      <AppShell.Main>
        <Container>
          <div>HI!</div>
        </Container>
      </AppShell.Main>
    </AppShell>
  )
}

export default App
