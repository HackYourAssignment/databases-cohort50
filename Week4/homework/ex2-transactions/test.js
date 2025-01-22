import { connectToDatabase } from './dbConnection.js';
import { transferFunds } from './transfer.js';

async function testTransaction() {
  let client;

  try {
    client = await connectToDatabase();

    await transferFunds(101, 102, 1000, 'Payment for services');
    console.log('Transaction successfully completed');
  } catch (error) {
    console.error('Error during the transaction:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('Database connection closed');
    }
  }
}

testTransaction();
