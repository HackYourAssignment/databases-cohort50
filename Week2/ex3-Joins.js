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

  const authorsAndMentors = `
    SELECT a.author_name AS author, m.author_name AS mentor
    FROM authors a
    LEFT JOIN authors m ON a.mentor = m.author_id;
  `;
  connection.query(authorsAndMentors, (err, results) => {
    if (err) throw err;

    const authorsAndPapers = `
      SELECT authors.*, research_papers.paper_title
      FROM authors
      LEFT JOIN author_paper ON authors.author_id = author_paper.author_id
      LEFT JOIN research_papers ON author_paper.paper_id = research_papers.paper_id;
    `;
    connection.query(authorsAndPapers, (err, results) => {
      if (err) throw err;
      console.log("Authors and their research papers:");
      console.log(results);

      connection.end();
    });
  });
});