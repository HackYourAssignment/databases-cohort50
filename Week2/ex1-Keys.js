require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_NAME || 'authors'
});

connection.connect((err) => {
  if (err) throw err;

  const createAuthorsTable = `
    CREATE TABLE IF NOT EXISTS authors (
      author_id INT AUTO_INCREMENT PRIMARY KEY,
      author_name VARCHAR(255) NOT NULL,
      university VARCHAR(255),
      date_of_birth DATE,
      h_index INT,
      gender ENUM('male', 'female', 'other')
    );
  `;
  connection.query(createAuthorsTable, (err) => {
    if (err) throw err;

    const addMentorColumn = `
      ALTER TABLE authors
      ADD mentor INT,
      ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_id) ON DELETE SET NULL;
    `;
    connection.query(addMentorColumn, (err) => {
      if (err) throw err;
      console.log("'mentor' column added and foreign key constraint set!");
      connection.end();
    });
  });
});