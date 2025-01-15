import { createConnection } from 'mysql2/promise';

async function main() {
  const connection = await createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'account_db',
  });

  try {
    await connection.query(`
      INSERT INTO account (account_number, balance) VALUES
      (100, 1000.50),
      (101, 2500.00),
      (102, 750.25),
      (103, 1800.75),
      (104, 500.00);
    `);

    await connection.query(`
      INSERT INTO account_changes (account_number, amount, remark) VALUES
      (100, -50.00, 'Albert Heijn'),
      (100, 200.00, 'Salary'),
      (101, -300.00, 'Eneco'),
      (102, -100.00, 'NS'),
      (103, 500.00, 'Freelance payment');
    `);

    console.log('Data inserted successfully!');
  } catch (error) {
    console.error('Error inserting data:', error.message);
  } finally {
    await connection.end();
  }
}

main().catch(console.error);
