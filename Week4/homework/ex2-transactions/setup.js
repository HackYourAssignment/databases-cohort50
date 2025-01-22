import { MongoClient } from 'mongodb';

const databaseUri = 'mongodb://localhost:27017';
const databaseName = 'bank';

async function seedDatabase() {
  const mongoClient = new MongoClient(databaseUri);

  try {
    await mongoClient.connect();
    const accountsCollection = mongoClient
      .db(databaseName)
      .collection('accounts');
    await accountsCollection.deleteMany({});
    await accountsCollection.insertMany([
      {
        account_number: 101,
        balance: 2500,
        account_changes: [
          {
            change_number: 1,
            amount: -300,
            changed_date: new Date(),
            remark: 'Eneco',
          },
        ],
      },
      {
        account_number: 102,
        balance: 750,
        account_changes: [
          {
            change_number: 1,
            amount: -100,
            changed_date: new Date(),
            remark: 'NS',
          },
        ],
      },
      {
        account_number: 103,
        balance: 1800,
        account_changes: [
          {
            change_number: 1,
            amount: 500,
            changed_date: new Date(),
            remark: 'Freelance payment',
          },
        ],
      },
    ]);
    console.log('Database seeded successfully!');
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await mongoClient.close();
  }
}

seedDatabase().catch(console.error);
export { seedDatabase };
