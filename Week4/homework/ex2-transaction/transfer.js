const { MongoClient } = require('mongodb');
require("dotenv").config({ path: '../.env' });

const uri =process.env.MONGODB_URL
const client = new MongoClient(uri);

async function transfer(fromAccount, toAccount, amount, remark) {
  try {
    await client.connect();
    const db = client.db('bank');
    const accountsCollection = db.collection('accounts');

   const session = client.startSession();
    session.startTransaction();

    try {
    const fromAccountA = await accountsCollection.findOne({ account_number: fromAccount }, { session });
    const toAccountB = await accountsCollection.findOne({ account_number: toAccount }, { session });
    
    if (!fromAccountA || !toAccountB) {
    throw new Error("The specified accounts could not be found.");
}

      if (fromAccountA.balance < amount) {
      throw new Error("The source account does not have enough balance to complete this transaction.");

      }

     const updatedFromBalance = fromAccountA.balance - amount;
     const updatedToBalance = toAccountB.balance + amount;
     const fromChangeNumber = fromAccountA.account_changes.length + 1;
     const toChangeNumber = toAccountB.account_changes.length + 1;

     const session = client.startSession();

  await session.withTransaction(async () => {
    await accountsCollection.updateOne(
      { account_number: fromAccount },
      {
        $set: { balance: updatedFromBalance },
        $push: {
          account_changes: {
            change_number: fromChangeNumber,
            amount: -amount,
            changed_date: new Date(),
            remark
          }
        }
      },
      { session }  
    );

   await accountsCollection.updateOne(
      { account_number: toAccount },
      {
        $set: { balance: updatedToBalance },
        $push: {
          account_changes: {
            change_number: toChangeNumber,
            amount: amount,
            changed_date: new Date(),
            remark
          }
        }
      },
      { session } 
    );
  });

await session.commitTransaction();
      console.log(`Successfully transferred $${amount} from account ${fromAccount} to account ${toAccount}.`);
    } catch (error) {
      console.error("Transaction failed. Rolling back changes", error);
      await session.abortTransaction();
    } finally {
      session.endSession();
    }
  } catch (error) {
    console.error("Error during transfer:", error);
  } finally {
    await client.close();
  }
}

module.exports = transfer;
