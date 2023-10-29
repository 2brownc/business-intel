import React, { useState, useEffect } from 'react'
import { Title, Container } from '@mantine/core'

import {
  getCategories,
  findCategory,
} from '../../db/util'

import { TrendChart } from '../../components/Charts/TrendChart'

function top5credit(data) {
  data.sort((a, b) => b.credit - a.credit);
  const top3Categories = []
  for (let i = 0; i < 5; i++) {
    top3Categories.push({ name: data[i].category, value: parseInt(data[i].credit) })
  }
  return top3Categories
}

function top5debit(data) {
  data.sort((a, b) => b.debit - a.debit);
  const top3Categories = []
  for (let i = 0; i < 5; i++) {
    top3Categories.push({ name: data[i].category, value: parseInt(data[i].debit) })
  }

  return top3Categories
}

export function Task3() {
  const [categories, setCategories] = useState([])
  const [records, setRecords] = useState([])

  // get categories for the analysis
  useEffect(() => {
    getCategories()
      .then(result => {
        /*const categoriesSet = new Set()
        for (const item of result) {
          categoriesSet.add(item.trim().toLowerCase())
        }*/
        setCategories(result)
      })
      .catch(error => {
        throw new Error(`can't retrieve categories: ${error}`)
      })
  }, [])

  // get transactions for a particular category
  useEffect(() => {
    setRecords([])
    if (categories?.length > 0) {
      for (const category of categories) {
        findCategory(category.trim())
          .then(results => {
            let totalCredit = 0
            let totalDebit = 0
            for (const { credit, debit } of results) {
              totalCredit += parseFloat(credit)
              totalDebit += parseFloat(debit)
            }
            setRecords(old => [...old, {
              category, credit: totalCredit, debit: totalDebit
            }])
          })
          .catch(error => {
            throw new Error(`can't retrive records for ${value}: ${error}`)
          })
      }
    }
  }, [categories])

  return <Container>
    <Title order={3}>Task #3</Title>

    {(records?.length > 0) && <Container>
      <div>Top 5 Credit Categories</div>
      <TrendChart width={300} height={300} data={top5credit(records)} />
    </Container>}

    {(records?.length > 0) && <Container>
      <div>Top 5 Debit Categories</div>
      <TrendChart width={300} height={300} data={top5debit(records)} />
    </Container>}
  </Container>
}