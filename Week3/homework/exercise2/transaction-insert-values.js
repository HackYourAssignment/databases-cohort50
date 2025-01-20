import {createConnection}  from './transactions-create-tables.js';
 export async function insertSampleData() {
  const connection = await createConnection(); 
  try {
    console.log('Inserting sample data...');
    const accounts = [
      { balance: 1000.00 },
      { balance: 2000.50 },
      { balance: 500.75 },
    ];

    for (const account of accounts) {
      await connection.query(
        `INSERT INTO account (balance) VALUES (?)`,
        [account.balance]
      );
    }

    console.log('Sample data inserted into `account` table.');

   const accountChanges = [
      { account_number: 1, amount: 100.00, remark: 'Deposit' },
      { account_number: 1, amount: -50.00, remark: 'Withdrawal' },
      { account_number: 2, amount: 200.00, remark: 'Deposit' },
      { account_number: 3, amount: -25.00, remark: 'Withdrawal' },
    ];

    for (const change of accountChanges) {
      await connection.query(
        `INSERT INTO account_changes (account_number, amount, remark) VALUES (?, ?, ?)`,
        [change.account_number, change.amount, change.remark]
      );
    }

    console.log('Sample data inserted into `account_changes` table.');

  } catch (error) {
    console.error('Error inserting sample data:', error);
  } finally {
    await connection.end(); 
    console.log('MySQL connection closed.');
  }
}

insertSampleData().catch(console.error);
