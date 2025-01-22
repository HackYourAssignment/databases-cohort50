const { MongoClient } = require('mongodb');
require('dotenv').config();

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

let client;

async function connectToDB() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');
  }
  return client.db(dbName);
}

async function closeDB() {
  if (client) {
    await client.close();
    console.log('Database connection closed');
  }
}

module.exports = { connectToDB, closeDB };
