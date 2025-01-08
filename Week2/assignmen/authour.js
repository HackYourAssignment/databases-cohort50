import { createConnection } from 'mysql2/promise';

  const connection = await createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
  });

  try {

    const create_database_query = `CREATE DATABASE IF NOT EXISTS authors`;
    await connection.query(create_database_query);

    const use_database_query = `USE authors`;
    await connection.query(use_database_query);

    const create_author_query = `
    CREATE TABLE IF NOT EXISTS author (
      author_id INT AUTO_INCREMENT PRIMARY KEY,
      author_name VARCHAR(100),
      university VARCHAR(100),
      date_of_birth DATE,
      h_index INT,
      gender VARCHAR(10)
    )`;

    const add_mentor_column_query = `
      ALTER TABLE author
      ADD COLUMN mentor INT,
      ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES author(author_id)
    `;

    await connection.query(create_author_query);
    await connection.query(add_mentor_column_query);

    console.log("Database and table created successfully, mentor column added.");
  } catch (err) {
    console.error("Error occurred:", err.message);
  } finally {
    await connection.end();
  }
