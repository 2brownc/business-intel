import React, { useState, useEffect } from 'react'
import { DateInput } from '@mantine/dates'
import { Grid, Box } from '@mantine/core'

export function DateRange({ setDateRange }) {
  const [date1, setDate1] = useState(null)
  const [date2, setDate2] = useState(null)

  useEffect(() => {
    setDateRange({
      date1: date1,
      date2: date2
    })
  }, [date1, date2])

  return <Box my={20}>
    <Grid>
      <Grid.Col span={6}>
        <DateInput
          value={date1}
          onChange={setDate1}
          label="Date From"
          placeholder="click to select date"
          clearable
        />
      </Grid.Col>
      <Grid.Col span={6}>
        <DateInput
          value={date2}
          onChange={setDate2}
          label="Date To"
          placeholder="click to select date"
          clearable
        />
      </Grid.Col>
    </Grid>
  </Box>
}