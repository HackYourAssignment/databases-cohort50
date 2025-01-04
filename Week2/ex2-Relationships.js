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

  const createResearchPapersTable = `
    CREATE TABLE IF NOT EXISTS research_papers (
      paper_id INT AUTO_INCREMENT PRIMARY KEY,
      paper_title VARCHAR(255) NOT NULL,
      conference VARCHAR(255),
      publish_date DATE
    );
  `;
  connection.query(createResearchPapersTable, (err) => {
    if (err) throw err;

    const createAuthorPaperTable = `
      CREATE TABLE IF NOT EXISTS author_paper (
        author_id INT NOT NULL,
        paper_id INT NOT NULL,
        PRIMARY KEY (author_id, paper_id),
        FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE,
        FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id) ON DELETE CASCADE
      );
    `;
    connection.query(createAuthorPaperTable, (err) => {
      if (err) throw err;
      console.log("'author_paper' linking table created!");

      connection.end();
    });
  });
});