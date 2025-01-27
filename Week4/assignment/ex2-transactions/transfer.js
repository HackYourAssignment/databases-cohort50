import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

export async function transfer() {
    const session = client.startSession();
    try {
        await client.connect();
        const db = client.db("assignmentWeek4-Transaction");
        const collection = db.collection("accounts");

        const sourceAccount = { accountNumber: 130 };
        const destinationAccount = { accountNumber: 131 };
        const transferAmount = 1000; 


        session.startTransaction();

        const sourceAccountDoc = await collection.findOne({ account_number: sourceAccount.accountNumber },
            { session });
        const destinationAccountDoc = await collection.findOne({ account_number: destinationAccount.accountNumber },
            { session });

        const maxChangeNumberSource = sourceAccountDoc.account_changes.length > 0 
            ? Math.max(...sourceAccountDoc.account_changes.map(change => change.change_number))
            : 0;

        const maxChangeNumberDestination = destinationAccountDoc.account_changes.length > 0 
            ? Math.max(...destinationAccountDoc.account_changes.map(change => change.change_number))
            : 0;

        if (!sourceAccountDoc || sourceAccountDoc.balance < transferAmount) {
            throw new Error("There is not enough money to execute the operation.");
        }    
        
        await collection.updateOne(
            {account_number: sourceAccount.accountNumber},
            { $inc: {balance: -transferAmount},
            $push: { account_changes: {
                change_number: maxChangeNumberSource + 1,
                amount: -transferAmount,
                changed_date: new Date(),
                remark: "transfer to account " + destinationAccount.accountNumber
            }
            }},
            {session}
        );

        await collection.updateOne(
            {account_number: destinationAccount.accountNumber},
            {$inc: {balance: transferAmount},
            $push: { account_changes: {
                change_number: maxChangeNumberDestination + 1,
                amount: transferAmount,
                changed_date: new Date(),
                remark: "transfer from account " + sourceAccount.accountNumber
            }
            }},
            {session}
        );
        
        await session.commitTransaction();

        console.log("Transfer successful!");
    } catch (error) {
        console.error("Error data transfer:", error);
        await session.abortTransaction();
    } finally {
        session.endSession();
        await client.close();
    }
};

