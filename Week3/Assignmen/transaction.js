import { createConnection } from 'mysql2/promise';

const connection = await createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'transaction',
});

try {
await connection.beginTransaction();

  const checkBalanceQuery = `
    SELECT balance FROM account WHERE account_number = 1;
  `;
  const [result] = await connection.query(checkBalanceQuery);
  const balance = result[0].balance;

  if (balance >= 1000) {
    const reduceBalanceQuery = `
      UPDATE account
      SET balance = balance - 1000
      WHERE account_number = 1;
    `;

    const addAmountQuery = `
      UPDATE account
      SET balance = balance + 1000
      WHERE account_number = 2;
    `;

const logChangeQuery = `
      INSERT INTO account_changes (account_number, amount, changed_date, remark)
      VALUES
      (1, -1000, NOW(), 'Transfer to account 2'),
      (2, 1000, NOW(), 'Transfer from account 1');
    `;

    await connection.query(reduceBalanceQuery);
    await connection.query(addAmountQuery);
    await connection.query(logChangeQuery);

    await connection.commit();
    console.log("Transaction completed successfully.");
  } else {
    console.log("Insufficient balance in account 1.");
    await connection.rollback();
  }

}catch (err) {
  await connection.rollback();
  console.error("Transaction failed, rolled back:", err.message);
} finally {
  await connection.end();
}
