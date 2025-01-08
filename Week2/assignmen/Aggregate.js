import { createConnection } from 'mysql2/promise';

const connection = await createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
    database: 'authors'
});
try{

const use_database_query = `USE authors`;
await connection.query(use_database_query);

const select_paper_title = `
    SELECT
        rp.paper_title,
        COUNT(ar.author_id) AS num_of_authors
    FROM
        research_Papers rp
    JOIN
        authors_researchPapers ar ON rp.paper_id = ar.paper_id
    GROUP BY
        rp.paper_title
`;
const [result] = await connection.query(select_paper_title);
console.log("Paper titles and number of authors:", result);

const select_sum_research_Papers=`
   SELECT 
   SUM(CASE WHEN a.gender = 'Female' THEN 1 ELSE 0 END) AS total_female_authors_papers
   FROM 
        author a
   JOIN 
        authors_researchPapers ar ON a.author_id = ar.author_id
   JOIN 
        research_Papers rp ON ar.paper_id = rp.paper_id`;

const [sum] = await connection.query(select_sum_research_Papers);
console.log("Sum of the research papers published by all female authors ",sum);

const Average_h_index=`
   SELECT 
        a.university, 
   AVG(a.h_index) AS avg_h_index
   FROM 
        author a
   GROUP BY 
        a.university`;

const [avg] = await connection.query(Average_h_index);
console.log("Average of the h-index of all authors per university:",avg);

const sum_pepers_university=`
   SELECT 
        a.university, 
   COUNT(ar.paper_id) AS total_research_papers
   FROM 
        author a
   JOIN 
        authors_researchPapers ar ON a.author_id = ar.author_id
   GROUP BY 
        a.university`;

const [sum2] = await connection.query(sum_pepers_university);
console.log("Sum of the research papers of the authors per university:",sum2);

const min_max_h_index=`
   SELECT 
        a.university, 
   MIN(a.h_index) AS min_h_index, 
   MAX(a.h_index) AS max_h_index
   FROM 
        author a
   GROUP BY 
        a.university`
;

const [min_max] = await connection.query(min_max_h_index);
console.log("Minimum and maximum of the h-index of all authors per university:",min_max);

} catch (err) {
    console.error("Error occurred:", err.message);
} finally {
    await connection.end();
}

