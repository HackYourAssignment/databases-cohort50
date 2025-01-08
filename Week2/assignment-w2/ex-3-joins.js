const mysql = require("mysql2/promise");

const dbConfig = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
};

const executeQueries = async () => {
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    const authorMentorQuery = `
      SELECT 
        a1.author_name AS author_name,
        COALESCE(a2.author_name, 'No Mentor') AS mentor_name
      FROM 
        authors a1
      LEFT JOIN 
        authors a2
      ON 
        a1.mentor = a2.author_id;
    `;
    const [authorsWithMentors] = await connection.query(authorMentorQuery);
    console.log("Authors and their mentors:");
    console.table(authorsWithMentors);

    const authorPaperQuery = `
      SELECT 
        authors.author_id,
        authors.author_name,
        authors.university,
        authors.date_of_birth,
        authors.h_index,
        authors.gender,
        COALESCE(research_papers.paper_title, 'No Paper Published') AS paper_title
      FROM 
        authors
      LEFT JOIN 
        author_paper ON authors.author_id = author_paper.author_id
      LEFT JOIN 
        research_papers ON author_paper.paper_id = research_papers.paper_id;
    `;
    const [authorsWithPapers] = await connection.query(authorPaperQuery);
    console.log("Authors and their research papers:");
    console.table(authorsWithPapers);
  } catch (err) {
    throw new Error(`Error occurred: ${err.message}`);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

executeQueries();
