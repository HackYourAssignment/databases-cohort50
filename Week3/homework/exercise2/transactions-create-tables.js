
import mysql from 'mysql2/promise';


export async function createConnection() {
  const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: '12345',
    database: 'transactions',
  });
  console.log('Connected to MySQL database.');
  return connection;
}

export async function createTables() {
  const connection = await createConnection();

  try {
    console.log('Creating tables...');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS account (
        account_number INT AUTO_INCREMENT PRIMARY KEY, 
        balance DECIMAL(12, 2) NOT NULL CHECK (balance >= 0) 
      );
    `);
    console.log('`account` table created successfully.');

    await connection.query(`
      CREATE TABLE IF NOT EXISTS account_changes (
        change_number INT AUTO_INCREMENT PRIMARY KEY, 
        account_number INT NOT NULL, 
        amount DECIMAL(12, 2) NOT NULL, 
        changed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP NOT NULL, 
        remark TEXT, 
        FOREIGN KEY (account_number) REFERENCES account(account_number) ON DELETE CASCADE
      );
    `);
    console.log('`account_changes` table created successfully.');

  } catch (error) {
    console.error('Error creating tables:', error);
  } finally {
    await connection.end();
    console.log('MySQL connection closed.');
  }
}

createTables().catch(console.error);

