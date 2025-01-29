import dotenv from "dotenv";
import { MongoClient } from "mongodb";
dotenv.config();

const uri = process.env.uri;
const client = new MongoClient(uri);
const transferMoney = async (fromAccount, toAccount, amount, remark) => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("bankaccount");
    const collection = database.collection("account");

    const session = client.startSession();
    session.startTransaction();

    try {
      const [sender, recipient] = await Promise.all([
        collection.findOne({ account_number: fromAccount }, { session }),
        collection.findOne({ account_number: toAccount }, { session }),
      ]);

      if (!sender || !recipient) {
        throw new Error("Invalid account number(s)");
      }

      if (sender.balance < amount) {
        throw new Error("Insufficient balance in the sender's account");
      }

      const senderNextChangeNumber =
        (Number(sender.next_change_number) || 0) + 1;
      const recipientNextChangeNumber =
        (Number(recipient.next_change_number) || 0) + 1;

      const senderNewBalance = Number(sender.balance) - amount;
      const recipientNewBalance = Number(recipient.balance) + amount;

      await Promise.all([
        collection.findOneAndUpdate(
          { account_number: fromAccount },
          {
            $set: {
              balance: senderNewBalance,
              next_change_number: senderNextChangeNumber,
            },
            $push: {
              account_changes: {
                change_number: senderNextChangeNumber,
                amount: -amount,
                changed_date: new Date(),
                remark,
              },
            },
          },
          { session, returnDocument: "after" }
        ),
        collection.findOneAndUpdate(
          { account_number: toAccount },
          {
            $set: {
              balance: recipientNewBalance,
              next_change_number: recipientNextChangeNumber,
            },
            $push: {
              account_changes: {
                change_number: recipientNextChangeNumber,
                amount,
                changed_date: new Date(),
                remark,
              },
            },
          },
          { session }
        ),
      ]);

      await session.commitTransaction();
      console.log(
        `Transferred $${amount} from account ${fromAccount} to ${toAccount}`
      );
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
