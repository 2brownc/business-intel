import React, { useState, useEffect } from 'react'
import { Title, Autocomplete, Table } from '@mantine/core'
import {
  format,
} from 'date-fns'

import {
  getCategories,
  findCategory,
} from '../../db/util'

import { CategoryChart } from '../../components/Charts/CategoryChart'

function Summary({ data }) {
  if (!data) return <></>

  let totalCredit = 0
  let totalDebit = 0

  for (const { credit, debit } of data) {
    console.log("cd: ", credit, debit)
    totalCredit += parseFloat(credit)
    totalDebit += parseFloat(debit)
  }

  return <Table>
    <Table.Thead>
      <Table.Tr>
        <Table.Th>Total Credit</Table.Th>
        <Table.Th>Total Debit</Table.Th>
      </Table.Tr>
    </Table.Thead>
    <Table.Tbody>
      <Table.Td>{totalCredit.toFixed(2)}</Table.Td>
      <Table.Td>{totalDebit.toFixed(2)}</Table.Td>
    </Table.Tbody>
  </Table>
}

export function Task2() {
  const [value, setValue] = useState('')
  const [categories, setCategories] = useState([])
  const [records, setRecords] = useState([])
  const [chartData, setChartData] = useState(null)

  // get categories for the autocomplete
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
    if (value !== '') {
      findCategory(value.trim())
        .then(results => {
          setRecords(results)
        })
        .catch(error => {
          throw new Error(`can't retrive records for ${value}: ${error}`)
        })
    } else {
      setRecords([])
    }
  }, [value])

  // prepare chart data: category chart
  useEffect(() => {
    const data = []
    for (let record of records) {
      const date = format(record.date, 'dd/MM/yyy')
      const credit = record.credit
      const debit = record.debit

      data.push({ date, credit, debit })
    }
    setChartData(data)
  }, [records])

  return <>
    <Title order={3}>Task #2</Title>
    <Autocomplete data={categories} value={value} onChange={setValue} label={"Category"} />

    {(chartData?.length > 0) && <CategoryChart width={700} height={300} data={chartData} />}

    {(chartData?.length > 0) && <Summary data={chartData} />}
  </>
}
