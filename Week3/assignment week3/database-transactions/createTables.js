import db from './connection.js';

async function createTables() {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Create account table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS account (
        account_number INT PRIMARY KEY,
        balance DECIMAL(10, 2) NOT NULL
      );
    `);

    // Create account_changes table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS account_changes (
        change_number INT AUTO_INCREMENT PRIMARY KEY,
        account_number INT,
        amount DECIMAL(10, 2),
        changed_date DATETIME DEFAULT CURRENT_TIMESTAMP,
        remark VARCHAR(255),
        FOREIGN KEY (account_number) REFERENCES account(account_number)
      );
    `);

    await connection.commit();
    console.log('Tables created successfully.');
  } catch (error) {
    await connection.rollback();
    console.error('Error creating tables:', error);
  } finally {
    connection.release();
  }
}

export { createTables };
