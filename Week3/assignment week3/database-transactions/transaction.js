import db from './connection.js';

async function transferMoney() {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    const fromAccountNumber = 101;
    const toAccountNumber = 102;
    const transferAmount = 1000.00;

    // Check if the source account has enough balance
    const [fromAccount] = await connection.query(`
      SELECT balance FROM account WHERE account_number = ?;
    `, [fromAccountNumber]);

    if (fromAccount[0].balance < transferAmount) {
      throw new Error('Insufficient balance in source account.');
    }

    // Deduct from source account
    await connection.query(`
      UPDATE account
      SET balance = balance - ?
      WHERE account_number = ?;
    `, [transferAmount, fromAccountNumber]);

    // Add to destination account
    await connection.query(`
      UPDATE account
      SET balance = balance + ?
      WHERE account_number = ?;
    `, [transferAmount, toAccountNumber]);

    // Log the change in account_changes for source account
    await connection.query(`
      INSERT INTO account_changes (account_number, amount, remark)
      VALUES (?, ?, CONCAT('Transferred to account number ', ?));
    `, [fromAccountNumber, -transferAmount, toAccountNumber]);

    // Log the change in account_changes for destination account
    await connection.query(`
      INSERT INTO account_changes (account_number, amount, remark)
      VALUES (?, ?, CONCAT('Received from account number ', ?));
    `, [toAccountNumber, transferAmount, fromAccountNumber]);

    await connection.commit();
    console.log('Transfer completed successfully.');
  } catch (error) {
    await connection.rollback();
    console.error('Error during transfer:', error);
  } finally {
    connection.release();
  }
}

export { transferMoney };
