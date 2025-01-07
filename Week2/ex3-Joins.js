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

    const authorsAndMentors = `
      SELECT a.author_name AS author, m.author_name AS mentor
      FROM authors a
      LEFT JOIN authors m ON a.mentor = m.author_id;
    `;

    const [mentorsResults] = await connection.query(authorsAndMentors);
    console.log("Authors and their mentors:");
    console.table(mentorsResults);

    const authorsAndPapers = `
      SELECT authors.*, research_papers.paper_title
      FROM authors
      LEFT JOIN author_paper ON authors.author_id = author_paper.author_id
      LEFT JOIN research_papers ON author_paper.paper_id = research_papers.paper_id;
    `;

    const [papersResults] = await connection.query(authorsAndPapers);
    console.log("Authors and their research papers:");
    console.table(papersResults);

    await connection.end();
    console.log('Connection closed.');
  } catch (err) {
    console.error('Error:', err);
  }
})();
