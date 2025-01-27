import { createConnection } from 'mysql2/promise';

const connection = await createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword'
});

const create_database_query = `CREATE DATABASE transactions`;
const use_database_query = `USE transactions`;

const drop_table_account_query = `DROP TABLE IF EXISTS account`;
const create_table_account_query = `CREATE TABLE account (
    account_number INT PRIMARY KEY,
    balance DECIMAL(20, 2)
)`;

const drop_table_account_changes_query = `DROP TABLE IF EXISTS account_changes`;
const create_table_account_changes_query = `CREATE TABLE account_changes (
    change_number INT(255) AUTO_INCREMENT PRIMARY KEY,
    account_number INT NOT NULL,
    amount DECIMAL(20, 2) NOT NULL,
    changed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    remark TEXT DEFAULT NULL,
    FOREIGN KEY (account_number) REFERENCES account(account_number) ON DELETE CASCADE
)`;    

try {
    await connection.query(create_database_query);
    await connection.query(use_database_query);
    await connection.query(drop_table_account_query);
    await connection.query(drop_table_account_changes_query);
    await connection.query(create_table_account_query);
    await connection.query(create_table_account_changes_query);
} catch (error) {
    console.error('Error connection', error);
} finally {
    await connection.end();
}