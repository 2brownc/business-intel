import React from 'react'
import {
  AppShell,
  Container,
  Title,
  Text,
} from '@mantine/core'
import { Outlet } from 'react-router-dom';

import { Header } from './components/Header/Header'

function Intro() {
  return <Container mb={100}>
    <Title order={1}>Business Intel</Title>
    <Text fs="italic">
      Helps you gain a deeper understanding of the financial situation and make data-driven decisions to work towards financial goals with confidence.
    </Text>
  </Container>
}

export default function App({ children }) {
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
          <Intro />
          <Outlet />
        </Container>
      </AppShell.Main>

    </AppShell>
  )
}

