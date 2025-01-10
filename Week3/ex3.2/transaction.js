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
    await connection.beginTransaction();

    await connection.execute(`
        UPDATE account SET balance = balance - ? WHERE account_number = ?
    `, [1000, 101]);
    console.log('Deducted 1000 from account 101');

    await connection.execute(`
        UPDATE account SET balance = balance + ? WHERE account_number = ?
    `, [1000, 102]);
    console.log('Added 1000 to account 102');

    await connection.execute(`
        INSERT INTO account_changes (account_number, amount, remark)
        VALUES (?, ?, ?), (?, ?, ?)
    `, [
        101, -1000, 'Transfer to 102',
        102, 1000, 'Transfer from 101',
    ]);
    console.log('Logged changes in account_changes table');

    await connection.commit();
    console.log('Transaction successful.');

} catch (err) {
    console.error('Transaction failed:', err);
    await connection.rollback();
    console.log('Transaction rolled back.');

} finally {
    await connection.end();
    console.log('Connection closed.');
}