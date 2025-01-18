
import { connection } from './exe1.js';

const getAuthorsAndMentors = async () => {
  const sql = `
    SELECT a.author_name AS author_name, m.author_name AS mentor_name
    FROM authors a
    LEFT JOIN authors m ON a.mentor = m.author_id;
  `;

  const [results] = await connection.query(sql);
  console.log("Authors and their mentors:");
  console.log(results);
};

const getAuthorsAndPapers = async () => {
  const sql = `
    SELECT a.*, p.paper_title
    FROM authors a
    LEFT JOIN author_papers ap ON a.author_id = ap.author_id
    LEFT JOIN research_papers p ON ap.paper_id = p.paper_id;
  `;

  const [results] = await connection.query(sql);
  console.log("Authors and their published papers:");
  console.log(results);
};

const runQueries = async () => {
  try {
    console.log("Fetching authors and mentors...");
    await getAuthorsAndMentors();

    console.log("Fetching authors and published papers...");
    await getAuthorsAndPapers();
  } catch (err) {
    console.error("An error occurred while running the queries:", err.message);
  } finally {
    connection.end();
    console.log("Database connection closed.");
  }
};

await runQueries();
