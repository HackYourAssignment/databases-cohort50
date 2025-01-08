import { connection } from './connection.js';

const queries = [
  {
    sql: `
            SELECT research_papers.paper_title, COUNT(author_paper.author_id) AS author_count
            FROM research_papers
            JOIN author_paper ON research_papers.paper_id = author_paper.paper_id
            GROUP BY research_papers.paper_title
        `,
    description: 'Papers and the number of authors',
  },
  {
    sql: `
            SELECT COUNT(author_paper.author_id) AS papers_written_by_women
            FROM author_paper
            JOIN authors ON author_paper.author_id = authors.author_id
            WHERE authors.gender = 'f'
        `,
    description: 'Papers written by women',
  },
  {
    sql: `
            SELECT authors.university, AVG(authors.h_index) AS average_h_index
            FROM authors
            GROUP BY authors.university
        `,
    description: 'Average h-index per university',
  },
  {
    sql: `
            SELECT authors.university, COUNT(author_paper.paper_id) AS research_papers_sum
            FROM authors
            JOIN author_paper ON authors.author_id = author_paper.author_id
            GROUP BY authors.university
        `,
    description: 'Research papers per university',
  },
  {
    sql: `
            SELECT authors.university, MIN(authors.h_index) AS minimum_h_index, MAX(authors.h_index) AS maximum_h_index
            FROM authors
            GROUP BY authors.university
        `,
    description: 'Min and max h-index per university',
  },
];

async function executeQueries() {
  try {
    for (const query of queries) {
      const [rows] = await connection.execute(query.sql);
      console.log(`${query.description}:`, rows);
    }
  } catch (error) {
    console.error('Error executing queries:', error);
  } finally {
    connection.end();
  }
}

executeQueries();
