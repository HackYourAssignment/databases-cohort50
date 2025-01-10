require('dotenv').config();
import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'transactions',
});

console.log('Connected to the database.');

try {
    await connection.execute(`
        CREATE TABLE IF NOT EXISTS account (
            account_number INT PRIMARY KEY,
            balance DECIMAL(10, 2) NOT NULL
        )
    `);
    console.log('Created table: account');

    await connection.execute(`
        CREATE TABLE IF NOT EXISTS account_changes (
            change_number INT PRIMARY KEY AUTO_INCREMENT,
            account_number INT NOT NULL,
            amount DECIMAL(10, 2) NOT NULL,
            changed_date DATETIME DEFAULT CURRENT_TIMESTAMP,
            remark VARCHAR(255),
            FOREIGN KEY (account_number) REFERENCES account(account_number)
        )
    `);
    console.log('Created table: account_changes');

} catch (err) {
    console.error('Error:', err);
} finally {
    await connection.end();
    console.log('Connection closed.');
}