import db from './connection-db.js';

const executeQueries = async () => {
  try {
    // All research papers and the number of authors that wrote each paper
    const [papersAndAuthorCount] = await db.query(`
      SELECT p.paper_title, COUNT(ap.author_id) AS author_count
      FROM research_papers p
      LEFT JOIN author_paper ap ON p.paper_id = ap.paper_id
      GROUP BY p.paper_id, p.paper_title;
    `);
    if (papersAndAuthorCount.length === 0) {
      console.log('No research papers found.');
    } else {
      console.log('All research papers and the number of authors:', papersAndAuthorCount);
    }

    // Sum of research papers published by female authors
    const [papersByFemaleAuthors] = await db.query(`
      SELECT SUM(author_papers_count) AS total_papers
      FROM (
          SELECT COUNT(ap.paper_id) AS author_papers_count
          FROM authors a
          JOIN author_paper ap ON a.author_id = ap.author_id
          WHERE a.gender = 'Female'
          GROUP BY a.author_id
      ) AS subquery;
    `);
    if (papersByFemaleAuthors[0].total_papers === null) {
      console.log('No papers found for female authors.');
    } else {
      console.log('Sum of research papers published by female authors:', papersByFemaleAuthors[0].total_papers);
    }

    // Average h-index of all authors per university
    const [avgHIndexPerUniversity] = await db.query(`
      SELECT university, AVG(h_index) AS avg_h_index
      FROM authors
      GROUP BY university;
    `);
    if (avgHIndexPerUniversity.length === 0) {
      console.log('No authors or universities found.');
    } else {
      console.log('Average h-index of all authors per university:', avgHIndexPerUniversity);
    }

    // Sum of research papers by authors per university
    const [papersByUniversity] = await db.query(`
      SELECT a.university, COUNT(ap.paper_id) AS total_papers
      FROM authors a
      LEFT JOIN author_paper ap ON a.author_id = ap.author_id
      GROUP BY a.university;
    `);
    if (papersByUniversity.length === 0) {
      console.log('No research papers found for authors by university.');
    } else {
      console.log('Sum of research papers by authors per university:', papersByUniversity);
    }

    // Minimum and maximum h-index of all authors per university
    const [minMaxHIndexPerUniversity] = await db.query(`
      SELECT 
          university,
          MIN(h_index) AS min_h_index,
          MAX(h_index) AS max_h_index
      FROM authors
      GROUP BY university;
    `);
    if (minMaxHIndexPerUniversity.length === 0) {
      console.log('No h-index data found for authors by university.');
    } else {
      console.log('Minimum and maximum h-index of all authors per university:', minMaxHIndexPerUniversity);
    }

  } catch (error) {
    console.error('Error executing queries:', error.message);
    console.error(error);
  } finally {
    await db.end();
  }
};

executeQueries();
