import { createConnection } from 'mysql2/promise';

const use_database_query = `USE transactions`;
const connection = await createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'transactions',
  multipleStatements: true 
});

const transaction = `START TRANSACTION;

UPDATE account
SET balance = balance - 1000.00
WHERE account_number = 101;

UPDATE account
SET balance = balance + 1000.00
WHERE account_number = 102;

INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES
(101, -1000.00, '2025-01-09', 'Gift for #102'),
(102, 1000.00, '2025-01-09', 'Gift from #101');

COMMIT`;

try {
    await connection.query(use_database_query);
    await connection.query(transaction);
} catch (error) {
    console.error('Error connection', error);
} finally {
    await connection.end();
}