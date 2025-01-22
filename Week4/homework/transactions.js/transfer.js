import { connectToDB } from './setup.js';

async function transferFunds(fromAccount, toAccount, amount, remark) {
  let client;
  
  try {
    client = await connectToDB(); 
    const db = client.db(); 
    const accountsCollection = db.collection('transactions');

    const fromAcc = await accountsCollection.findOne({ account_number: fromAccount });
    const toAcc = await accountsCollection.findOne({ account_number: toAccount });

    console.log('From Account:', fromAcc);  
    console.log('To Account:', toAcc);     

    if (!fromAcc || !toAcc) {
      throw new Error('One or both accounts not found');
    }
    if (fromAcc.balance < amount) {
      throw new Error('Insufficient funds');
    }

    const newFromChangeNumber = fromAcc.account_changes.length + 1;
    const newToChangeNumber = toAcc.account_changes.length + 1;

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
            remark
          }
        }
      }
    );

    console.log('Updating To Account...');
    await accountsCollection.updateOne(
      { account_number: toAccount },
      {
        $inc: { balance: amount },
        $push: {
          account_changes: {
            change_number: newToChangeNumber,
            amount: amount,
            changed_date: new Date(),
            remark
          }
        }
      }
    );

    console.log(`Successfully transferred ${amount} from account ${fromAccount} to ${toAccount}.`);
  } catch (error) {
    console.error('Error transferring funds:', error);
  } finally {
    if (client) {
      await client.close(); 
      console.log('Database connection closed');
    }
  }
}

export { transferFunds };


