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


/*
import Loki from 'lokijs'

const db = new Loki()

const schema = {
  tid: { type: 'string' },
  date: { type: 'date' },
  description: { type: 'string' },
  debit: { type: 'number' },
  credit: { type: 'number' },
  balance: { type: 'number' },
}

db.addCollection('transactions', schema);

const collection = db.getCollection('transactions')

function printData() {
  const records = collection.find();
  records.forEach((record) => {
    console.log(`TID: ${record.tid}`);
    console.log(`Bank: ${record.bank}`);
    console.log(`Date: ${record.date}`);
    console.log(`Description: ${record.description}`);
    console.log(`Debit: ${record.debit}`);
    console.log(`Credit: ${record.credit}`);
    console.log(`Balance: ${record.balance}`);
  });
}

function insertData(data) {
  collection.insert({
    tid: data.tid,
    bank: data.bank,
    date: data.date,
    description: data.description,
    debit: data.debit,
    credit: data.credit,
    balance: data.balance,
  });

}

function insertDataAll(data) {
  collection.insert(data)
}

function findCategory(category) {
  const query = {
    description: { $regex: `/${category}/i` },
  };

  return collection.find(query);
}

function findCategoryInTimeRange(category, dateStart, dateEnd) {
  const query = {
    description: { $regex: `/${category}/i` },
    date: {
      $gte: new Date(dateStart),
      $lte: new Date(dateEnd)
    }
  };

  return collection.find(query);
}

function findCategoryAndBankInTimeRange(category, bank, dateStart, dateEnd) {
  const query = {
    description: { $regex: `/${category}/i` },
    bank: { $regex: `/${bank}/i` },
    date: {
      $gte: new Date(dateStart),
      $lte: new Date(dateEnd)
    }
  };

  return collection.find(query);
}

function getCategories() {
  return db.getCollection('transactions').query({})
}

function getCategoryCredit(category) {
  const totalCredit = db.collection('table').aggregate([
    {
      $match: {
        description: { $regex: `/${category}/i` }
      }
    },
    {
      $group: {
        _id: null,
        totalDebit: { $sum: '$credit' }
      }
    }
  ])

  return totalCredit[0].totalCredit
}

function getCategoryDebit(category) {
  const totalDebit = db.collection('table').aggregate([
    {
      $match: {
        description: { $regex: `/${category}/i` }
      }
    },
    {
      $group: {
        _id: null,
        totalDebit: { $sum: '$debit' }
      }
    }
  ])

  return totalDebit[0].totalDebit
}

function getCategoriesWithDebitDesc(category) {
  return collection('table').aggregate([
    {
      $group: {
        _id: '$description',
        totalCredit: { $sum: '$debit' }
      }
    },
    {
      $sort: {
        totalDebit: -1
      }
    },
    {
      $project: {
        description: '$_id',
        totalDebit: 1
      }
    }
  ])
}

function getCategoriesWithCreditDesc(category) {
  return collection('table').aggregate([
    {
      $group: {
        _id: '$description',
        totalCredit: { $sum: '$credit' }
      }
    },
    {
      $sort: {
        totalCredit: -1
      }
    },
    {
      $project: {
        description: '$_id',
        totalCredit: 1
      }
    }
  ])
}

export {
  insertData,
  insertDataAll,
  printData,
  getCategories,
}
*/