import React from 'react'
import {
  Container,
  Title,
  Text,
  Center,
} from '@mantine/core';

import LoadData from '../../components/LoadData/LoadData'

export default function Upload() {
  return <Container>
    <Title order={2} mb={15}>Upload Data</Title>
    <Center>
      <Text fs="italic" mb={10}>
        Upload csv files containting transaction data to analyze. You can upload multiple files at once.
      </Text>
    </Center>
    <LoadData />
  </Container>
}