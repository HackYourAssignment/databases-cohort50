import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
dotenv.config();

const uri = process.env.uri;
const client = new MongoClient(uri);

export const setupAccounts = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("bankaccount");
    const collection = database.collection("account");

    await collection.deleteMany({});
    console.log("Accounts collection cleared");

    const accounts = [
      {
        account_number: 101,
        balance: 5000,
        account_changes: [
          { change_number: 1, amount: 5000, changed_date: new Date(), remark: "Initial deposit" },
        ],
      },
      {
        account_number: 102,
        balance: 3000,
        account_changes: [
          { change_number: 1, amount: 3000, changed_date: new Date(), remark: "Initial deposit" },
        ],
      },
    ];

    await collection.insertMany(accounts);
    console.log("Sample accounts added");

  } catch (error) {
    console.error("Error setting up accounts:", error);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
};


await setupAccounts();
