require('dotenv').config();
const mysql = require('mysql2/promise');

let connection;

async function executeQuery(query, description) {
    try {
        const [results] = await connection.query(query);
        console.log(description);
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

    const createResearchPapersTable = `
        CREATE TABLE IF NOT EXISTS research_papers (
            paper_id INT AUTO_INCREMENT PRIMARY KEY,
            paper_title VARCHAR(255) NOT NULL,
            conference VARCHAR(255),
            publish_date DATE
        );
    `;
    await executeQuery(createResearchPapersTable, "'research_papers' table created successfully!");

    const createAuthorPaperTable = `
        CREATE TABLE IF NOT EXISTS author_paper (
            author_id INT NOT NULL,
            paper_id INT NOT NULL,
            PRIMARY KEY (author_id, paper_id),
            FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE CASCADE,
            FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id) ON DELETE CASCADE
        );
    `;
    await executeQuery(createAuthorPaperTable, "'author_paper' linking table created successfully!");

} catch (err) {
    console.error('Error:', err);
} finally {
    if (connection) {
        await connection.end();
        console.log('Connection closed.');
    }
}