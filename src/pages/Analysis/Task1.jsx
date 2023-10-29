import React, { useState, useEffect, useMemo, useRef } from 'react'
import {
  Title,
  Checkbox,
  Autocomplete,
  Box,
  Flex
} from '@mantine/core'

import {
  getCategories,
  findCategory,
  getBanks,
} from '../../db/util'

import { TransactionTable } from '../../components/TransactionTable/TransactionTable'
import { DateRange } from '../../components/DateRange/DateRange'

function Banks({ banks, setSelectedBanks }) {
  const handleChange = (event, bank) => {
    const checked = event.currentTarget.checked
    const pos = banks.indexOf(bank)

    setSelectedBanks(oldOptions => {
      if (!oldOptions) return null

      const newOptions = oldOptions.map((option, index) => {
        return (pos === index ? checked : option)
      })

      return newOptions
    })
  }

  Box
  return <Box my={10}>
    <div>Banks:</div>
    <Flex gap="sm" >
      {banks.map((bank, id) => {
        return <Checkbox defaultChecked key={id} label={bank} onChange={(event) => handleChange(event, bank)} />
      })}
    </Flex>
  </Box>
}


export function Task1() {
  const [value, setValue] = useState('')
  const [categories, setCategories] = useState([])
  const [records, setRecords] = useState([])
  const [filteredRecords, setFilteredRecords] = useState([])
  const [banks, setBanks] = useState([])
  const [selectedBanks, setSelectedbanks] = useState(null)
  const [dateRange, setDateRange] = useState({ date1: null, date2: null })

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

  // get all the banks for a banks filter
  useEffect(() => {
    getBanks()
      .then(results => {
        setBanks(results)
        const options = results.map(result => true)
        setSelectedbanks(options)
      })
      .catch(error => {
        throw new Error(`can't retrive banks: ${error}`)
      })
  }, [])

  // filter the transactions
  useEffect(() => {
    let filtered = records

    // filter by banks
    if (selectedBanks) {
      filtered = filtered.filter(record => {
        const pos = banks.indexOf(record.bank)
        return selectedBanks[pos]
      })
    }

    // filter by date
    const { date1, date2 } = dateRange
    if (date1 !== null && date2 !== null) {
      filtered = filtered.filter(record => {
        return (
          record.date.getTime() >= date1.getTime()
          && record.date.getTime() <= date2.getTime()
        )
      })
    }

    setFilteredRecords(filtered)
  }, [selectedBanks, dateRange, records])

  return <>
    <Title order={3}>Task #1</Title>
    <Autocomplete data={categories} value={value} onChange={setValue} label={"Category"} />
    <Banks banks={banks} setSelectedBanks={setSelectedbanks} />
    <DateRange setDateRange={setDateRange} />
    <TransactionTable elements={filteredRecords} />
  </>
}