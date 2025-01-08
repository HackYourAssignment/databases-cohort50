import { createConnection } from 'mysql2/promise';

async function main() {
  try {
    const connection = await createConnection({
      host: 'localhost',
      user: 'hyfuser',
      password: 'hyfpassword',
      multipleStatements: true,
    });

    const queries = `
      CREATE DATABASE IF NOT EXISTS authors;
      USE authors;
      CREATE TABLE authors (
        author_id INT PRIMARY KEY,
        author_name VARCHAR(255) NOT NULL,
        university VARCHAR(255) NOT NULL,
        date_of_birth DATE NOT NULL,
        h_index INT NOT NULL,
        gender ENUM('male', 'female', 'other') NOT NULL
      );
      ALTER TABLE authors
      ADD COLUMN mentor INT,
      ADD CONSTRAINT mentor_integrity FOREIGN KEY (mentor) REFERENCES authors(author_id);
    `;

    await connection.query(queries);
    console.log('Successfully done!');
    await connection.end();
    console.log('Connection is closed.');
  } catch (err) {
    console.error('Error:', err);
  }
}

main();
