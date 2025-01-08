const mysql = require("mysql2/promise");

const dbConfig = {
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
};

const executeAggregateQueries = async () => {
  let connection;

  try {
    connection = await mysql.createConnection(dbConfig);

    const paperAuthorCountQuery = `
      SELECT 
        research_papers.paper_title,
        COUNT(author_paper.author_id) AS number_of_authors
      FROM 
        research_papers
      LEFT JOIN 
        author_paper ON research_papers.paper_id = author_paper.paper_id
      GROUP BY 
        research_papers.paper_id;
    `;
    const [paperAuthorCounts] = await connection.query(paperAuthorCountQuery);
    console.log("Research Papers and Number of Authors:");
    console.table(paperAuthorCounts);

    const sumFemalePapersQuery = `
      SELECT 
        SUM(CASE WHEN authors.gender = 'female' THEN 1 ELSE 0 END) AS sum_of_papers_by_female_authors
      FROM 
        author_paper
      JOIN 
        authors ON authors.author_id = author_paper.author_id;
    `;
    const [sumFemalePapers] = await connection.query(sumFemalePapersQuery);
    console.log("Sum of research papers by female authors:");
    console.table(sumFemalePapers);

    const averageHIndexQuery = `
      SELECT 
        university,
        AVG(h_index) AS average_h_index
      FROM 
        authors
      GROUP BY 
        university;
    `;
    const [averageHIndex] = await connection.query(averageHIndexQuery);
    console.log("Average h-index per university:");
    console.table(averageHIndex);

    const sumPapersByUniversityQuery = `
      SELECT 
        authors.university,
        COUNT(author_paper.paper_id) AS sum_of_papers
      FROM 
        authors
      LEFT JOIN 
        author_paper ON authors.author_id = author_paper.author_id
      GROUP BY 
        authors.university;
    `;
    const [sumPapersByUniversity] = await connection.query(
      sumPapersByUniversityQuery
    );
    console.log("Sum of research papers by university:");
    console.table(sumPapersByUniversity);

    const minMaxHIndexQuery = `
      SELECT 
        university,
        MIN(h_index) AS min_h_index,
        MAX(h_index) AS max_h_index
      FROM 
        authors
      GROUP BY 
        university;
    `;
    const [minMaxHIndex] = await connection.query(minMaxHIndexQuery);
    console.log("Minimum and Maximum h-index per university:");
    console.table(minMaxHIndex);
  } catch (err) {
    throw new Error(`Error occurred: ${err.message}`);
  } finally {
    if (connection) {
      await connection.end();
    }
  }
};

executeAggregateQueries();
