const { MongoClient } = require('mongodb');
require("dotenv").config({ path: '../.env' }); 

const uri =process.env.MONGODB_URL
const client = new MongoClient(uri);

async function setupAccounts() {
  try {
    await client.connect();
    console.log("Connected Succufully to MongoDB Atlas");

    const db = client.db('bank');
    const accountsCollection = db.collection('accounts');
  
    await accountsCollection.deleteMany({});

    const accounts = [
      {
        account_number: 101,
        balance: 5000,
        account_changes: []
      },
      {
        account_number: 102,
        balance: 3000,
        account_changes: []
      }
    ];
await accountsCollection.insertMany(accounts);
    console.log("Sample accounts have been set up");
  } catch (error) {
    console.error("Error during setup:", error);
  } finally {
    await client.close();
  }
}

module.exports = setupAccounts;
