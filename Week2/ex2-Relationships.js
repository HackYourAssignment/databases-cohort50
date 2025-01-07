require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'authors'
    });

    console.log('Connected to MySQL!');

    const createResearchPapersTable = `
      CREATE TABLE IF NOT EXISTS research_papers (
        paper_id INT AUTO_INCREMENT PRIMARY KEY,
        paper_title VARCHAR(255) NOT NULL,
        conference VARCHAR(255),
        publish_date DATE
      );
    `;

    await connection.query(createResearchPapersTable);
    console.log("'research_papers' table created successfully!");

    const createAuthorPaperTable = `
      CREATE TABLE IF NOT EXISTS author_paper (
        author_id INT NOT NULL,
        paper_id INT NOT NULL,
        PRIMARY KEY (author_id, paper_id),
        FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE,
        FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id) ON DELETE CASCADE
      );
    `;

    await connection.query(createAuthorPaperTable);
    console.log("'author_paper' linking table created successfully!");

    await connection.end();
    console.log('Connection closed.');
  } catch (err) {
    console.error('Error:', err);
  }
})();
