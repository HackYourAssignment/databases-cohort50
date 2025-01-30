import { connectToDB } from './setup.js';
import { transferFunds } from './transfer.js';

async function testTransfer() {
  let client;
  
  try {
    client = await connectToDB(); 

    await transferFunds(101, 102, 1000, 'Payment for services');
    console.log('Transaction processed successfully');
    
  } catch (error) {
    console.error('Error during test transaction:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('Database connection closed');
    }
  }
}

testTransfer();
