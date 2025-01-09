require('dotenv').config();
const mysql = require('mysql2/promise');

let connection;

async function executeQuery(query, description, params = []) {
    try {
        const [results] = await connection.query(query, params);
        console.log(description);
        console.table(results);
    } catch (err) {
        console.error(`Error executing ${description}:`, err);
    }
}

try {
    connection = await mysql.createConnection({
        host: process.env.DB_HOST || 'localhost',
        user: process.env.DB_USER || 'root',
        password: process.env.DB_PASSWORD || '',
        database: process.env.DB_NAME || 'authors',
    });

    console.log('Connected to MySQL!');

    // Query 1
    const authorsPerPaper = `
        SELECT research_papers.paper_title, COUNT(author_paper.author_id) AS num_authors
        FROM research_papers
        LEFT JOIN author_paper ON research_papers.paper_id = author_paper.paper_id
        GROUP BY research_papers.paper_title;
    `;
    await executeQuery(authorsPerPaper, "Number of authors per paper:");

    // Query 2
    const papersByFemaleAuthors = `
        SELECT COUNT(DISTINCT author_paper.paper_id) AS total_papers
        FROM authors
        INNER JOIN author_paper ON authors.author_id = author_paper.author_id
        WHERE authors.gender = 'female';
    `;
    await executeQuery(papersByFemaleAuthors, "Total papers by female authors:");

    // Query 3
    const avgHIndex = `
        SELECT university, AVG(h_index) AS avg_h_index
        FROM authors
        GROUP BY university;
    `;
    await executeQuery(avgHIndex, "Average h-index per university:");

    // Query 4
    const totalPapersPerUniversity = `
        SELECT authors.university, COUNT(author_paper.paper_id) AS total_papers
        FROM authors
        LEFT JOIN author_paper ON authors.author_id = author_paper.author_id
        GROUP BY authors.university;
    `;
    await executeQuery(totalPapersPerUniversity, "Total papers per university:");

    // Query 5
    const minMaxHIndex = `
        SELECT university, MIN(h_index) AS min_h_index, MAX(h_index) AS max_h_index
        FROM authors
        GROUP BY university;
    `;
    await executeQuery(minMaxHIndex, "Min and max h-index per university:");

} catch (err) {
    console.error('Error:', err);
    
} finally {
    if (connection) {
        await connection.end();
        console.log('Connection closed.');
    }
}