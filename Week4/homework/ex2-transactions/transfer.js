import { MongoClient } from 'mongodb';

const databaseUri = 'mongodb://localhost:27017';
const databaseName = 'bank';
const accountsCollectionName = 'accounts';

async function transfer(
  senderAccountNumber,
  receiverAccountNumber,
  transferAmount,
  transferRemark,
) {
  const mongoClient = new MongoClient(databaseUri);

  try {
    await mongoClient.connect();
    const database = mongoClient.db(databaseName);
    const accountsCollection = database.collection(accountsCollectionName);
    const transactionSession = mongoClient.startSession();

    transactionSession.startTransaction();

    const [senderAccount, receiverAccount] = await Promise.all([
      accountsCollection.findOne({ account_number: senderAccountNumber }),
      accountsCollection.findOne({ account_number: receiverAccountNumber }),
    ]);

    if (!senderAccount || !receiverAccount)
      throw new Error('Account not found');
    if (senderAccount.balance < transferAmount)
      throw new Error('Insufficient balance');

    await Promise.all([
      accountsCollection.updateOne(
        { account_number: senderAccountNumber },
        {
          $inc: { balance: -transferAmount },
          $push: {
            account_changes: {
              change_number: senderAccount.account_changes.length + 1,
              amount: -transferAmount,
              changed_date: new Date(),
              remark: transferRemark,
            },
          },
        },
        { session: transactionSession },
      ),
      accountsCollection.updateOne(
        { account_number: receiverAccountNumber },
        {
          $inc: { balance: transferAmount },
          $push: {
            account_changes: {
              change_number: receiverAccount.account_changes.length + 1,
              amount: transferAmount,
              changed_date: new Date(),
              remark: transferRemark,
            },
          },
        },
        { session: transactionSession },
      ),
    ]);

    await transactionSession.commitTransaction();
    console.log('Transaction completed successfully!');
  } catch (error) {
    console.error('Transaction failed:', error.message);
  } finally {
    await mongoClient.close();
  }
}

export { transfer };
