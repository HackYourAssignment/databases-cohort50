import {createConnection}  from './transactions-create-tables.js';

async function transferAmount(fromAccount, toAccount, amount) {
  const connection = await createConnection();
  try {
    await connection.beginTransaction();
    console.log(`Starting transaction to transfer ${amount} from account ${fromAccount} to account ${toAccount}...`);
    const [fromAccountResult] = await connection.query(
      `UPDATE account SET balance = balance - ? WHERE account_number = ? AND balance >= ?`,
      [amount, fromAccount, amount]
    );

    if (fromAccountResult.affectedRows === 0) {
      throw new Error(`Insufficient balance in account ${fromAccount} or account does not exist.`);
    }

    const [toAccountResult] = await connection.query(
      `UPDATE account SET balance = balance + ? WHERE account_number = ?`,
      [amount, toAccount]
    );

    if (toAccountResult.affectedRows === 0) {
      throw new Error(`Recipient account ${toAccount} does not exist.`);
    }

    await connection.query(
      `INSERT INTO account_changes (account_number, amount, remark) VALUES (?, ?, ?)`,
      [fromAccount, -amount, `Transferred to account ${toAccount}`]
    );

    await connection.query(
      `INSERT INTO account_changes (account_number, amount, remark) VALUES (?, ?, ?)`,
      [toAccount, amount, `Received from account ${fromAccount}`]
    );

    await connection.commit();
    console.log(`Transaction completed successfully: ${amount} transferred from account ${fromAccount} to account ${toAccount}.`);

  } catch (error) {
    console.error('Transaction failed, rolling back...', error.message);
    await connection.rollback();
  } finally {
    await connection.end();
    console.log('MySQL connection closed.');
  }
}

transferAmount(2, 1, 1000).catch(console.error);
