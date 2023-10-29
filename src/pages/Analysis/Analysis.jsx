import React, { useState, useEffect } from 'react'
import { Title } from '@mantine/core'
import { Button } from '@mantine/core'
import { Container } from '@mantine/core'

import { Task1 } from './Task1'
import { Task2 } from './Task2'
import { Task3 } from './Task3'

export default function Analysis() {
  const [selectedTask, setSelectedTask] = useState(1)
  const setVariant = (taskNum) => {
    return taskNum === selectedTask ? "filled" : "default"
  }

  return <>
    <Title order={2}>Analysis</Title>

    <Container>
      <Button.Group>
        <Button
          variant={setVariant(1)}
          onClick={() => setSelectedTask(1)}>
          Task #1
        </Button>
        <Button
          variant={setVariant(2)}
          onClick={() => setSelectedTask(2)}>
          Task #2
        </Button>
        <Button
          variant={setVariant(3)}
          onClick={() => setSelectedTask(3)}>
          Task #3
        </Button>
      </Button.Group>
    </Container>

    <Container>
      {selectedTask === 1 && <Task1 />}
      {selectedTask === 2 && <Task2 />}
      {selectedTask === 3 && <Task3 />}
    </Container>
  </>
}