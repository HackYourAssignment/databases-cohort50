import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';

dotenv.config();

const uri = process.env.MONGO_URI;
const dbName = process.env.DB_NAME;

let client;

async function initialize() {
  try {
    if (!uri || !dbName) {
      throw new Error('MONGO_URI or DB_NAME is not defined in environment variables');
    }

    await connectToDB(); 
    await setupDatabase();
  } catch (error) {
    console.error('Error during initialization:', error);
  }
}

async function connectToDB() {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB');
  }
  return client; 
}

// Setup the database with collections
async function setupDatabase() {
  try {
    const client = await connectToDB();
    const db = client.db(dbName);
    const accounts = db.collection('transactions');

    // Clean up existing data
    await accounts.deleteMany({});

    // Insert sample data
    await accounts.insertMany([
      {
        account_number: 101,
        balance: 5000.00,
        account_changes: [
          {
            change_number: 1,
            amount: 5000.00,
            changed_date: new Date(),
            remark: 'Initial Deposit',
          },
        ],
      },
      {
        account_number: 102,
        balance: 3000.00,
        account_changes: [
          {
            change_number: 1,
            amount: 3000.00,
            changed_date: new Date(),
            remark: 'Initial Deposit',
          },
        ],
      },
    ]);

    console.log('Database setup completed.');
  } catch (error) {
    console.error('Error setting up database:', error);
  } finally {
    if (client) {
      await client.close();
      console.log('Database connection closed');
    }
  }
}

initialize();

export { connectToDB };
