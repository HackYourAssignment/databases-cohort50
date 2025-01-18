const { MongoClient } = require("mongodb");
require("dotenv").config();

async function transfer(fromAccount, toAccount, amount, remark) {
    const uri = process.env.MONGODB_URL || "mongodb://localhost:27017";
    const client = new MongoClient(uri);

    try {
        await client.connect();
        console.log("Connected to MongoDB!");

        const db = client.db("banking");
        const accountsCollection = db.collection("accounts");

        const session = client.startSession();

        await session.withTransaction(async () => {
            const fromAccountDoc = await accountsCollection.findOne({ account_number: fromAccount });
            const toAccountDoc = await accountsCollection.findOne({ account_number: toAccount });

            if (!fromAccountDoc || !toAccountDoc) {
                throw new Error("One or both accounts not found!");
            }

            if (fromAccountDoc.balance < amount) {
                throw new Error("Insufficient funds in the source account!");
            }

            const fromChangeNumber = fromAccountDoc.account_changes.length + 1;
            await accountsCollection.updateOne(
                { account_number: fromAccount },
                {
                    $inc: { balance: -amount },
                    $push: {
                        account_changes: {
                            change_number: fromChangeNumber,
                            amount: -amount,
                            changed_date: new Date(),
                            remark
                        }
                    }
                }
            );

            const toChangeNumber = toAccountDoc.account_changes.length + 1;
            await accountsCollection.updateOne(
                { account_number: toAccount },
                {
                    $inc: { balance: amount },
                    $push: {
                        account_changes: {
                            change_number: toChangeNumber,
                            amount,
                            changed_date: new Date(),
                            remark
                        }
                    }
                }
            );

            console.log(`Transferred ${amount} from account ${fromAccount} to account ${toAccount}`);
        });

        console.log("Transaction completed!");
    } catch (err) {
        console.error("Error during transfer:", err);
    } finally {
        await client.close();
    }
}

module.exports = transfer;

if (require.main === module) {
    transfer(101, 102, 1000, "Payment for services");
}