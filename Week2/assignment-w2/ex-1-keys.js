const mysql = require("mysql2/promise");

const dbConfig = {
  host: "localhost",
  user: "your_username",
  password: "hyfpassword",
};

const createAuthorsTable = async () => {
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS authors (
        author_id INT AUTO_INCREMENT PRIMARY KEY,
        author_name VARCHAR(100),
        university VARCHAR(100),
        date_of_birth DATE,
        h_index INT,
        gender VARCHAR(10)
      );
    `;
    await connection.query(createTableQuery);

    const addColumnQuery = `
      ALTER TABLE authors
      ADD COLUMN IF NOT EXISTS mentor INT;
    `;
    await connection.query(addColumnQuery);

    const addForeignKeyQuery = `
      ALTER TABLE authors
      ADD CONSTRAINT IF NOT EXISTS fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_id);
    `;
    await connection.query(addForeignKeyQuery);
  } catch (err) {
    throw new Error(`Error occurred: ${err.message}`);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

createAuthorsTable();
