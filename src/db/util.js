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

const collection = db.addCollection('transactions', schema);

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

  return db.collection.find(query);
}

function findCategoryInTimeRange(category, dateStart, dateEnd) {
  const query = {
    description: { $regex: `/${category}/i` },
    date: {
      $gte: new Date(dateStart),
      $lte: new Date(dateEnd)
    }
  };

  return db.collection.find(query);
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

  return db.collection.find(query);
}

function getCategories() {
  return db.collection.distinct('description');
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
  return db.collection('table').aggregate([
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
  return db.collection('table').aggregate([
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
  printData
}