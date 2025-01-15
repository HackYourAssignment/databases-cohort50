const mysql = require("mysql2/promise");

async function insertSampleData() {
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "hyfuser",
    password: "hyfpassword",
  });

  try {
    await connection.execute(`
      INSERT INTO account (account_number, balance)
      VALUES (101, 5000.00), (102, 2000.00)
      ON DUPLICATE KEY UPDATE balance = balance
    `);

    console.log("Sample data inserted successfully");
  } catch (error) {
    console.error("Error inserting sample data:", error);
  } finally {
    await connection.end();
  }
}

insertSampleData();
