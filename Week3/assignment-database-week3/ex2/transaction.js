const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'account_db',
});

const execQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  connection.connect();

  try {
    await execQuery('START TRANSACTION');

    await execQuery(`
      UPDATE account 
      SET balance = balance - 1000 
      WHERE account_number = 101;
    `);

    await execQuery(`
      UPDATE account 
      SET balance = balance + 1000 
      WHERE account_number = 102;
    `);

    await execQuery(`
      INSERT INTO account_changes (account_number, amount, remark) 
      VALUES 
      (101, -1000, 'Transfer to account 102'),
      (102, 1000, 'Transfer from account 101');
    `);

    await execQuery('COMMIT');
    console.log('Transaction completed successfully!');
  } catch (error) {
    console.error('Transaction failed, rolling back:', error.message);
    await execQuery('ROLLBACK');
  } finally {
    connection.end();
  }
}

seedDatabase();
