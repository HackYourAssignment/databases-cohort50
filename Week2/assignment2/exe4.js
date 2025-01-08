

import { connection } from './exe1.js';


const authorsPerPaper = `
  SELECT 
    research_Papers.paper_title, 
    COUNT(author_papers.author_id) AS NumberOfAuthors
  FROM 
    research_Papers
  LEFT JOIN 
    author_papers ON research_Papers.paper_id = author_papers.paper_id
  GROUP BY 
    research_Papers.paper_title;
`;

const femaleAuthorsPapers = `
  SELECT 
    COUNT(author_papers.paper_id) AS TotalPapers
  FROM 
    authors
  JOIN 
    author_papers ON authors.author_id = author_papers.author_id
  WHERE 
    authors.gender = 'Female';
`;

const averageHIndex = `
  SELECT 
    university, 
    AVG(h_index) AS AverageHIndex
  FROM 
    authors
  GROUP BY 
    university;
`;

const papersPerUniversity = `
  SELECT 
    authors.university, 
    COUNT(author_papers.paper_id) AS TotalPapers
  FROM 
    authors
  LEFT JOIN 
    author_papers ON authors.author_id = author_papers.author_id
  GROUP BY 
    authors.university;
`;


const executeQueries = async () => {
  try {
    
    const [authorsPerPaperResults] = await connection.execute(authorsPerPaper);
    console.log('Authors per paper:', authorsPerPaperResults);

   
    const [femaleAuthorsPapersResults] = await connection.execute(femaleAuthorsPapers);
    console.log('Female authors papers:', femaleAuthorsPapersResults);

   
    const [averageHIndexResults] = await connection.execute(averageHIndex);
    console.log('Average h-index per university:', averageHIndexResults);

    
    const [papersPerUniversityResults] = await connection.execute(papersPerUniversity);
    console.log('Papers per university:', papersPerUniversityResults);
  } catch (err) {
    console.error('Error executing queries:', err.message);
  } finally {
    connection.end(); 
  }
};


executeQueries();
