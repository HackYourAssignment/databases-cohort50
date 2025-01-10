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
        INSERT INTO account (account_number, balance)
        VALUES (?, ?), (?, ?)
    `, [101, 5000.00, 102, 3000.00]);
    console.log('Inserted sample data into account table');

} catch (err) {
    console.error('Error:', err);
} finally {
    await connection.end();
    console.log('Connection closed.');
}