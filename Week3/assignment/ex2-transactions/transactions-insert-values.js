import { createConnection } from 'mysql2/promise';

const use_database_query = `USE transactions`;
const connection = await createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'transactions'
});

const insert_account_query = `INSERT INTO account (account_number, balance) VALUES 
(101, 1030.06),
(102, 5004.50),
(103, 1076000.00),
(104, 500.00),
(105, 100.00)`;

const insert_account_changes_query = `INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES
(101, 500.00, '2025-01-09', 'Salary for January'),
(101, -200.00, '2025-01-09', 'Electricity bill'),
(102, -1000.00, '2025-01-09', 'Grocery shopping'),
(104, 100.00, '2025-01-09', 'Birthday gift'),
(105, 50.00, '2025-01-09', 'Pocket money')`;

try {
    await connection.query(use_database_query);
    await connection.query(insert_account_query);
    await connection.query(insert_account_changes_query);
} catch (error) {   
    console.error('Error connection', error);
} finally {
    await connection.end();
}