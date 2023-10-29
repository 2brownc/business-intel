import React, { useState, useEffect } from 'react'
import Papa from 'papaparse'
import { Container } from '@mantine/core'
import { Grid } from '@mantine/core'
import { Button } from '@mantine/core'
import { FileInput } from '@mantine/core'
import { Center } from '@mantine/core';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from "react-router-dom";

import { insertData } from '../../db/util'

function LoadData() {
  const [files, setFiles] = useState([])
  const [fileContents, setFileContents] = useState([])
  const [uploadLabel, setUploadLabel] = useState("Upload Files: ")

  const navigate = useNavigate();

  useEffect(() => {
    setFileContents([])
    let fileName = []

    for (let file of files) {
      readFile(file)
      fileName.push(file.name)
    }

    let label = fileName.join(", ")
    setUploadLabel("Upload Files: " + label)
  }, [files])

  const readFile = (file) => {
    const bank = file.name.split('.')[0]

    const fileReader = new FileReader()
    fileReader.readAsText(file, "UTF-8")
    fileReader.onload = e => {
      setFileContents(oldContents => [...oldContents, { bank, data: e.target.result }])
    }
  }

  const handleChange = (event) => {
    setFiles(oldFiles => [...oldFiles, ...event])
  }

  const insertDB = (bank, data) => {
    const preparedData = []

    for (let record of data) {
      // credit and debit: set to 0 if no data
      const credit = record.credit > 0 ? record.credit : 0
      const debit = record.debit > 0 ? record.debit : 0

      // convert date to Date object
      const [day, month, year] = record.date.split("/");
      const date = new Date(year, month - 1, day);

      //sanitize descriptions
      const description = record.description.trim().toLowerCase()

      preparedData.push({
        ...record,
        description,
        credit,
        debit,
        date,
        bank,
        tid: uuidv4(),
      })
    }

    insertData(preparedData)
  }

  const handleUpload = () => {
    for (const fileContent of fileContents) {
      const { bank, data } = fileContent

      const prepareData = (results) => {
        insertDB(bank, results)
      }

      Papa.parse(data, {
        header: true,
        transformHeader: h => h.toLowerCase(),
        complete: (results) => prepareData(results.data)
      })
    }

    // after inserting data into db goto Analysis page
    navigate('/analysis')
  }

  return (
    <Container>
      <Center>
        <Grid w={500} justify="center" align="flex-end">
          <Grid.Col span={8}>
            <FileInput
              label={uploadLabel}
              placeholder="Click me to upload files"
              multiple
              onChange={handleChange}
            />
          </Grid.Col>

          <Grid.Col span={4}>
            <Button
              variant="filled"
              onClick={handleUpload}
              disabled={fileContents.length <= 0}
            >Analyze</Button>
          </Grid.Col>
        </Grid>
      </Center>
    </Container>
  )

}

export default LoadData;
