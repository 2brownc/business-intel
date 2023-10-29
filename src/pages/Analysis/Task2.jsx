import React, { useState, useEffect } from 'react'
import { Title } from '@mantine/core'
import { MultiSelect } from '@mantine/core'

import {
  getCategories,
  findCategory,
  getBanks,
} from '../../db/util'

export function Task2() {
  const [selectedCategories, setSelectedCategories] = useState(null)
  const [categories, setCategories] = useState([])

  // get categories for the autocomplete
  useEffect(() => {
    getCategories()
      .then(result => {
        setCategories(result)
      })
      .catch(error => {
        throw new Error(`can't retrieve categories: ${error}`)
      })
  }, [])

  return <>
    <Title order={3}>Task #2</Title>
    <MultiSelect
      data={categories}
      value={selectedCategories}
      onChange={setSelectedCategories}
      searchable
    />
  </>
}
