import { createConnection } from 'mysql2/promise';

  const connection = await createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
  });

  try {

    const use_database_query = `USE authors`;
    await connection.query(use_database_query);

    const create_research_papers_query = `
    CREATE TABLE IF NOT EXISTS research_Papers(
    paper_id INT PRIMARY KEY,
    paper_title VARCHAR(200),
    conference VARCHAR(100),
    publish_date DATE
    )`;

   const create_author_researchpapers_query = `
    CREATE TABLE IF NOT EXISTS authors_researchPapers(
    author_id INT,
    paper_id INT,
    PRIMARY KEY (author_id, paper_id),
    FOREIGN KEY (author_id) REFERENCES author(author_id),
    FOREIGN KEY (paper_id) REFERENCES research_Papers(paper_id)

    )`;

    await connection.query(create_research_papers_query);
    await connection.query(create_author_researchpapers_query);    
    console.log("Database and table created successfully, mentor column added.");
    } catch (err) {
       console.error("Error occurred:", err.message);

    } finally {
       await connection.end();
    }

