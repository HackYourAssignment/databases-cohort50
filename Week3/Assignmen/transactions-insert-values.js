import { createConnection } from 'mysql2/promise';

const connection = await createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'transaction',
});

try {
  const insertAccountsQuery = `
    INSERT INTO account (balance) VALUES
    (1000.00),
    (2000.00),
    (5000.00);
  `;

 const insertAccountChangesQuery = `
    INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES
    (1, 100.00, NOW(), 'Initial deposit'),
    (2, 200.00, NOW(), 'Transfer to account 2'),
    (3, 300.00, NOW(), 'Transfer from account 1');
  `;

await connection.query(insertAccountsQuery);
await connection.query(insertAccountChangesQuery);

  console.log("Sample data inserted successfully.");
} catch (err) {
  console.error("Error occurred:", err.message);
} finally {
  await connection.end();
}
