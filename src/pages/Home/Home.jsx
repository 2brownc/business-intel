import React from 'react'
import {
  Container,
  Title,
  Text,
} from '@mantine/core';

import LoadData from '../../components/LoadData/LoadData'

export default function Home() {
  return <>
    <Title order={1}>Business Intel</Title>
    <Text fs="italic">
      Helps you gain a deeper understanding of the financial situation and make data-driven decisions to work towards financial goals with confidence.
    </Text>
    <Container>
      <LoadData />
    </Container>

  </>
}