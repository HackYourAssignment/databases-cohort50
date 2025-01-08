
import { connection } from './exe1.js';


const authorPapersData = [
    [1, 1],  
    [1, 2],  
    [1, 3], 
    [4, 4],  
    [5, 4],  
    [6, 4], 
    [7, 4],  
    [8, 6], 
    [9, 7],  
    [10, 9],  
    [11, 9],  
    [12, 9],  
    [12,10 ],  
    [12, 14],  
    [15, 15],  
    [1, 16],  
    [2, 17],  
    [3, 18],  
    [4, 19],  
    [5, 20],  
    [6, 21], 
    [7, 22],  
    [8, 23],  
    [7, 24],  
    [6, 25],  
    [5, 26],  
    [4, 27],  
    [3, 28],  
    [2, 29],  
    [1, 30]
  ];
  


const insertAuthorPapersQuery = `
  INSERT INTO author_papers (author_id, paper_id) VALUES ?;
`;


const insertAuthorPapers = async () => {
  try {
 await connection.execute(insertAuthorPapersQuery, [authorPapersData]);
    console.log('Successfully inserted data into author_papers table.');
  } catch (err) {
    console.error('Error inserting data into author_papers table:', err.message);
  }
};


insertAuthorPapers().finally(() => {
  connection.end(); 
});



