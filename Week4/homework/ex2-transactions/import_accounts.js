const { MongoClient } = require("mongodb");
const fs = require("fs");
require("dotenv").config();

async function importAccounts() {
  const uri = process.env.MONGODB_URL || "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db("banking");
    const accountsCollection = db.collection("accounts");

    await accountsCollection.deleteMany({});
    console.log("Accounts collection cleared!");

    const data = JSON.parse(fs.readFileSync("./accounts.json", "utf-8"));

    const result = await accountsCollection.insertMany(data);
    console.log(
      `${result.insertedCount} accounts inserted into the collection.`
    );
  } catch (err) {
    console.error("Error importing accounts:", err);
  } finally {
    await client.close();
  }
}

importAccounts();
