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

    const authorsPerPaper = `
      SELECT research_papers.paper_title, COUNT(author_paper.author_id) AS num_authors
      FROM research_papers
      LEFT JOIN author_paper ON research_papers.paper_id = author_paper.paper_id
      GROUP BY research_papers.paper_title;
    `;

    const [authorsPerPaperResults] = await connection.query(authorsPerPaper);
    console.log("Number of authors per paper:");
    console.table(authorsPerPaperResults);

    const papersByFemaleAuthors = `
      SELECT COUNT(author_paper.paper_id) AS total_papers
      FROM authors
      INNER JOIN author_paper ON authors.author_id = author_paper.author_id
      WHERE authors.gender = 'female';
    `;

    const [papersByFemaleAuthorsResults] = await connection.query(papersByFemaleAuthors);
    console.log("Total papers by female authors:");
    console.table(papersByFemaleAuthorsResults);

    const avgHIndex = `
      SELECT university, AVG(h_index) AS avg_h_index
      FROM authors
      GROUP BY university;
    `;

    const [avgHIndexResults] = await connection.query(avgHIndex);
    console.log("Average h-index per university:");
    console.table(avgHIndexResults);

    await connection.end();
    console.log('Connection closed.');
  } catch (err) {
    console.error('Error:', err);
  }
})();
