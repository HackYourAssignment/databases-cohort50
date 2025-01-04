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

  const authorsPerPaper = `
    SELECT research_papers.paper_title, COUNT(author_paper.author_id) AS num_authors
    FROM research_papers
    LEFT JOIN author_paper ON research_papers.paper_id = author_paper.paper_id
    GROUP BY research_papers.paper_title;
  `;
  connection.query(authorsPerPaper, (err, results) => {
    if (err) throw err;

    const papersByFemaleAuthors = `
      SELECT SUM(COUNT(author_paper.paper_id)) AS total_papers
      FROM authors
      INNER JOIN author_paper ON authors.author_id = author_paper.author_id
      WHERE authors.gender = 'female';
    `;
    connection.query(papersByFemaleAuthors, (err, results) => {
      if (err) throw err;

      const avgHIndex = `
        SELECT university, AVG(h_index) AS avg_h_index
        FROM authors
        GROUP BY university;
      `;
      connection.query(avgHIndex, (err, results) => {
        if (err) throw err;
        console.log("Average h-index per university:");
        console.log(results);

        connection.end();
      });
    });
  });
});