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

    const createAuthorsTable = `
        CREATE TABLE IF NOT EXISTS authors (
            author_id INT AUTO_INCREMENT PRIMARY KEY,
            author_name VARCHAR(255) NOT NULL,
            university VARCHAR(255),
            date_of_birth DATE,
            h_index INT,
            gender ENUM('male', 'female', 'other')
        );
    `;
    await executeQuery(createAuthorsTable, "'authors' table created successfully!");

    const addMentorColumn = `
        ALTER TABLE authors
        ADD mentor INT,
        ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_id) ON DELETE SET NULL;
    `;
    await executeQuery(addMentorColumn, "'mentor' column added and foreign key constraint set!");

} catch (err) {
    console.error('Error:', err);
} finally {
    if (connection) {
        await connection.end();
        console.log('Connection closed.');
    }
}