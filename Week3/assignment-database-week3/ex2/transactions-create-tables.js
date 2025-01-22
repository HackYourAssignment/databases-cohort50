import { createConnection } from 'mysql2/promise';

async function main() {
  const connection = await createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'account_db',
  });

  try {
    const queries = `
      CREATE TABLE IF NOT EXISTS account (
        account_number INT PRIMARY KEY,
        balance DECIMAL(10, 2) NOT NULL
      );

      CREATE TABLE IF NOT EXISTS account_changes (
        change_number INT AUTO_INCREMENT PRIMARY KEY,
        account_number INT NOT NULL,
        amount DECIMAL(10, 2) NOT NULL,
        changed_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        remark TEXT,
        FOREIGN KEY (account_number) REFERENCES account(account_number)
      );
    `;
    await connection.query(queries);
    console.log('Tables created successfully!');
  } catch (error) {
    console.error('Error creating tables:', error.message);
  } finally {
    await connection.end();
  }
}

main().catch(console.error);
