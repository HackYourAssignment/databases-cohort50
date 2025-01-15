import db from './connection.js';

async function insertValues() {
  const connection = await db.getConnection();

  try {
    await connection.beginTransaction();

    // Insert data into account table
    await connection.query(`
      INSERT INTO account (account_number, balance)
      VALUES 
        (101, 5000.00),
        (102, 3000.00)
      ON DUPLICATE KEY UPDATE balance = VALUES(balance);
    `);

    // Insert into account_changes table
    await connection.query(`
      INSERT INTO account_changes (account_number, amount, remark)
      VALUES 
        (101, 5000.00, 'Initial Deposit'),
        (102, 3000.00, 'Initial Deposit');
    `);

    await connection.commit();
    console.log('Sample data inserted successfully.');
  } catch (error) {
    await connection.rollback();
    console.error('Error inserting values:', error);
  } finally {
    connection.release();
  }
}

export { insertValues };
