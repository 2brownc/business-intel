import { resolveClassNames } from '@mantine/core';
import { createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';

import {
  getRxStorageMemory
} from 'rxdb/plugins/storage-memory';

/*
const binteldb = await createRxDatabase({
  name: 'binteldb',
  storage: getRxStorageDexie(),
})
*/

const binteldb = await createRxDatabase({
  name: 'binteldb',
  storage: getRxStorageMemory()
})

const transactionsSchema = {
  title: "transactions schema",
  version: 0,
  primaryKey: 'tid',
  type: "object",
  properties: {
    tid: {
      type: "string",
      maxLength: 36
    },
    bank: {
      type: "string"
    },
    date: {
      type: "date-time"
    },
    description: {
      type: "string"
    },
    debit: {
      type: "number"
    },
    credit: {
      type: "number"
    },
    balance: {
      type: "number"
    }
  },
  required: ["tid", "bank", "date", "description", "debit", "credit", "balance"]
}

await binteldb.addCollections({
  transactions: {
    schema: transactionsSchema
  }
})

export async function insertData(data) {
  await binteldb.transactions.bulkInsert(data)
}

export async function getCategories() {
  const allDocs = await binteldb.transactions.find().exec()
  const categories = new Set()

  for (const doc of allDocs) {
    categories.add(doc.description)
  }

  return Array.from(categories)
}

export async function findCategory(category) {
  const query = await binteldb.transactions.find({
    selector: {
      description: {
        $regex: new RegExp(category, "i")
      }
    }
  })

  const results = await query.exec()

  const records = []

  for (const result of results) {
    records.push(result._data)
  }

  // sort by dates
  records.sort((a, b) => {
    return (a.date < b.date ? -1 : a.date > b.date ? 1 : 0)
  })


  return records
}

export async function getBanks() {
  const allDocs = await binteldb.transactions.find().exec()
  const banks = new Set()

  for (const doc of allDocs) {
    banks.add(doc.bank)
  }

  return Array.from(banks)
}