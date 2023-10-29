import React from 'react'
import {
  AppShell,
  Container,
  Title,
  Text,
  Button,
  Center,
  Flex,
} from '@mantine/core'
import { Outlet, useMatch, useNavigate } from 'react-router-dom';

import { Header } from './components/Header/Header'

function Intro() {
  const navigate = useNavigate()
  return <Container>
    <Flex gap="xl" direction="column">
      <Center>
        <Title order={1}>Business Intel</Title>
      </Center>
      <Text fs="italic">
        BusinessIntel is an analytics platform that provides in-depth insights and analysis for businesses and individuals. It helps users make informed financial decisions and optimize their financial strategies.
      </Text>
      <Center>
        <Button variant="filled" onClick={() => navigate('/upload')}>Start!</Button>
      </Center>
    </Flex>
  </Container>
}

export default function App({ children }) {
  const isHome = useMatch('/')

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
          {isHome && <Intro />}
          <Outlet />
        </Container>
      </AppShell.Main>

    </AppShell>
  )
}

