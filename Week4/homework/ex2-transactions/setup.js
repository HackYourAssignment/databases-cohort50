import 'dotenv/config';
import { MongoClient } from 'mongodb';

const client = new MongoClient(process.env.MONGODB_URL);

async function insertData() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('bank_accounts');
        const accountsCollection = db.collection('accounts');

        if (accountsCollection) {
            await accountsCollection.deleteMany({});
        }

        const accounts = [
            {
                account_number: 101,
                balance: 1110.0,
                account_changes: [
                    {
                        change_number: 1,
                        amount: 200.0,
                        changed_date: '2025-01-14',
                        remark: 'Deposit'
                    },
                    {
                        change_number: 2,
                        amount: -100.0,
                        changed_date: '2025-01-13',
                        remark: 'Withdrawal'
                    }
                ]
            },
            {
                account_number: 102,
                balance: 2010.5,
                account_changes: [
                    {
                        change_number: 1,
                        amount: -500.0,
                        changed_date: '2025-01-13',
                        remark: 'Withdrawal'
                    }
                ]
            },
            {
                account_number: 103,
                balance: 1500.75,
                account_changes: [
                    {
                        change_number: 1,
                        amount: 150.0,
                        changed_date: '2025-01-14',
                        remark: 'Deposit'
                    }
                ]
            },
            {
                account_number: 104,
                balance: 550.0,
                account_changes: [
                    {
                        change_number: 1,
                        amount: -100.0,
                        changed_date: '2025-01-12',
                        remark: 'Withdrawal'
                    }
                ]
            },
            {
                account_number: 105,
                balance: 3330.0,
                account_changes: [
                    {
                        change_number: 1,
                        amount: 300.0,
                        changed_date: '2025-01-10',
                        remark: 'Deposit'
                    },
                    {
                        change_number: 2,
                        amount: -50.0,
                        changed_date: '2025-01-11',
                        remark: 'Withdrawal'
                    }
                ]
            }
        ];

        const result = await accountsCollection.insertMany(accounts);
        console.log(`${result.insertedCount} accounts inserted successfully.`);
    } catch (error) {
        console.error('Error:', error);
    } finally {
        await client.close();
        console.log('Disconnected from MongoDB');
    }
}

insertData();
