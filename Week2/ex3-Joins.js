require('dotenv').config();
const mysql = require('mysql2/promise');

let connection;

async function executeQuery(query, description) {
    try {
        const [results] = await connection.query(query);
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

    const authorsAndMentors = `
        SELECT a.author_name AS author, m.author_name AS mentor
        FROM authors a
        LEFT JOIN authors m ON a.mentor = m.author_id;
    `;
    await executeQuery(authorsAndMentors, "Authors and their mentors:");

    const authorsAndPapers = `
        SELECT authors.*, research_papers.paper_title
        FROM authors
        LEFT JOIN author_paper ON authors.author_id = author_paper.author_id
        LEFT JOIN research_papers ON author_paper.paper_id = research_papers.paper_id;
    `;
    await executeQuery(authorsAndPapers, "Authors and their research papers:");

} catch (err) {
    console.error('Error:', err);
} finally {
    if (connection) {
        await connection.end();
        console.log('Connection closed.');
    }
}