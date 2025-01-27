import { connectToDB } from './setup.js';

async function transferFunds(fromAccount, toAccount, amount, remark) {
  let client;
  let session;

  try {
    client = await connectToDB();
    session = client.startSession();

    const db = client.db(); 
    const accountsCollection = db.collection('transactions'); 

    // Start the transaction
    session.startTransaction();

    console.log('Fetching account details...');
    const [fromAcc, toAcc] = await Promise.all([
      accountsCollection.findOne({ account_number: fromAccount }, { session }),
      accountsCollection.findOne({ account_number: toAccount }, { session }),
    ]);

    console.log('From Account:', fromAcc);
    console.log('To Account:', toAcc);

    if (!fromAcc || !toAcc) {
      throw new Error('One or both accounts not found');
    }
    if (fromAcc.balance < amount) {
      throw new Error('Insufficient funds in the source account');
    }

    const newFromChangeNumber = (fromAcc.account_changes?.length || 0) + 1;
    const newToChangeNumber = (toAcc.account_changes?.length || 0) + 1;

    console.log('Updating From Account...');
    await accountsCollection.updateOne(
      { account_number: fromAccount },
      {
        $inc: { balance: -amount },
        $push: {
          account_changes: {
            change_number: newFromChangeNumber,
            amount: -amount,
            changed_date: new Date(),
            remark,
          },
        },
      },
      { session } 
    );

    console.log('Updating To Account...');
    await accountsCollection.updateOne(
      { account_number: toAccount },
      {
        $inc: { balance: amount },
        $push: {
          account_changes: {
            change_number: newToChangeNumber,
            amount,
            changed_date: new Date(),
            remark,
          },
        },
      },
      { session } 
    );

    // Commit the transaction
    await session.commitTransaction();
    console.log(`Successfully transferred ${amount} from account ${fromAccount} to ${toAccount}.`);
  } catch (error) {
    console.error('Error transferring funds:', error);

    if (session && session.inTransaction()) {
      console.log('Aborting transaction...');
      await session.abortTransaction();
    }
  } finally {
    if (session) {
      session.endSession();
      console.log('Session ended.');
    }
    if (client) {
      await client.close();
      console.log('Database connection closed.');
    }
  }
}

export { transferFunds };
