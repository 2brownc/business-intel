import React, { useState, useEffect } from 'react'
import {
  Title,
  Container,
  Center,
  Text
} from '@mantine/core'

import {
  getCategories,
  findCategory,
} from '../../db/util'

import { TrendChart } from '../../components/Charts/TrendChart'

export function Task3() {
  const [allCategories, setAllCategories] = useState([])
  const [allRecords, setAllRecords] = useState([])
  const [topCredit, setTopCredit] = useState([])
  const [topDebit, setTopDebit] = useState([])

  // get categories for the analysis
  useEffect(() => {
    getCategories()
      .then(result => {
        /*const categoriesSet = new Set()
        for (const item of result) {
          categoriesSet.add(item.trim().toLowerCase())
        }*/
        setAllCategories(result)
      })
      .catch(error => {
        throw new Error(`can't retrieve categories: ${error}`)
      })
  }, [])

  // get transactions for a particular category
  useEffect(() => {
    setAllRecords([])
    if (allCategories?.length > 0) {
      for (const category of allCategories) {
        findCategory(category.trim())
          .then(results => {
            let totalCredit = 0
            let totalDebit = 0
            for (const { credit, debit } of results) {
              totalCredit += parseFloat(credit)
              totalDebit += parseFloat(debit)
            }
            setAllRecords(old => [...old, {
              category, credit: totalCredit, debit: totalDebit
            }])
          })
          .catch(error => {
            throw new Error(`can't retrive records for ${value}: ${error}`)
          })
      }
    }
  }, [allCategories])

  const top5credit = (data) => {
    data.sort((a, b) => b.credit - a.credit);
    const top3Categories = []
    for (let i = 0; (i < data.length) && (i < 5); i++) {
      top3Categories.push({ name: data[i].category, value: parseInt(data[i].credit) })
    }
    return top3Categories
  }

  const top5debit = (data) => {
    data.sort((a, b) => b.debit - a.debit);
    const top3Categories = []
    for (let i = 0; (i < data.length) && (i < 5); i++) {
      top3Categories.push({ name: data[i].category, value: parseInt(data[i].debit) })
    }

    return top3Categories
  }

  useEffect(() => {
    if (allRecords?.length > 0) {
      setTopCredit(top5credit(allRecords))
      setTopDebit(top5debit(allRecords))
    }
  }, [allRecords])

  return <Container>
    <Title order={3}>Task #3</Title>

    {(setTopCredit?.length > 0) && <Container>
      <Center>
        <Text>Top 5 Credit Categories</Text>
        <TrendChart width={600} height={400} data={top5credit(allRecords)} />
      </Center>
    </Container>}

    {(setTopDebit?.length > 0) && <Container>
      <Center>
        <Text>Top 5 Debit Categories</Text>
        <TrendChart width={600} height={400} data={top5debit(allRecords)} />
      </Center>
    </Container>}
  </Container>
}