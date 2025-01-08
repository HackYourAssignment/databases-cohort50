

import { connection } from './exe1.js';


const getAuthorsAndMentors = async () => {
    const sql = `
      SELECT a.author_name AS author_name, m.author_name AS mentor_name
      FROM authors a
      LEFT JOIN authors m ON a.mentor = m.author_id;
    `;
    
    try {
      const results = await query(sql);
      console.log("Authors and their mentors:");
      console.log(results);
    } catch (err) {
      console.error("Error fetching authors and mentors:", err.message);
    }
  };
  

  const getAuthorsAndPapers = async () => {
    const sql = `
      SELECT a.*, p.paper_title
      FROM authors a
      LEFT JOIN author_papers ap ON a.author_id = ap.author_id
      LEFT JOIN research_papers p ON ap.paper_id = p.paper_id;
    `;
    
    try {
      const results = await query(sql);
      console.log("Authors and their published papers:");
      console.log(results);
    } catch (err) {
      console.error("Error fetching authors and papers:", err.message);
    }
  };
  

  const runQueries = async () => {
    await getAuthorsAndMentors();
    await getAuthorsAndPapers();
    connection.end(); 
  };
  

  runQueries();