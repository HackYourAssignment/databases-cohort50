import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
dotenv.config();

const uri = process.env.uri;
const client = new MongoClient(uri);
const transferMoney = async (fromAccount, toAccount, amount, remark) => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("bankaccount");
    const collection = database.collection("account");

    const sender = await collection.findOne({ account_number: fromAccount });
    const recipient = await collection.findOne({ account_number: toAccount });

    if (!sender || !recipient) {
      throw new Error("Invalid account number(s)");
    }

    if (sender.balance < amount) {
      throw new Error("Insufficient balance in the sender's account");
    }

    const newSenderChange = {
      change_number: sender.account_changes.length + 1,
      amount: -amount,
      changed_date: new Date(),
      remark,
    };

    const newRecipientChange = {
      change_number: recipient.account_changes.length + 1,
      amount,
      changed_date: new Date(),
      remark,
    };

    const session = client.startSession();
    session.startTransaction();
    try {
      await collection.updateOne(
        { account_number: fromAccount },
        {
          $inc: { balance: -amount },
          $push: { account_changes: newSenderChange },
        },
        { session }
      );

      await collection.updateOne(
        { account_number: toAccount },
        {
          $inc: { balance: amount },
          $push: { account_changes: newRecipientChange },
        },
        { session }
      );

      await session.commitTransaction();
      console.log(`Transferred $${amount} from account ${fromAccount} to ${toAccount}`);
    } catch (error) {
      await session.abortTransaction();
      throw error;
    } finally {
      session.endSession();
    }

  } catch (error) {
    console.error("Error transferring money:", error);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
};

await transferMoney(101, 102, 100, "Test transfer");
