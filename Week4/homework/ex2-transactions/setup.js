const { MongoClient } = require("mongodb");
require("dotenv").config();

async function setupAccounts() {
    const uri = process.env.MONGODB_URL || "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const db = client.db("banking");
        const accountsCollection = db.collection("accounts");

        await accountsCollection.deleteMany({});
        console.log("Accounts collection cleaned up!");

        const sampleData = [
            {
                account_number: 101,
                balance: 6666,
                account_changes: []
            },
            {
                account_number: 102,
                balance: 5750,
                account_changes: []
            },
            {
                account_number: 103,
                balance: 8080,
                account_changes: []
            }
        ];

        await accountsCollection.insertMany(sampleData);
        console.log("Sample data inserted!");
    } catch (err) {
        console.error("Error setting up accounts:", err);
    } finally {
        await client.close();
    }
}

module.exports = setupAccounts;

if (require.main === module) {
    setupAccounts();
}