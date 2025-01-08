import { connection } from './connection.js';

async function setupDatabase() {
    const createDatabase = `CREATE DATABASE IF NOT EXISTS academics`;
    const useDatabase = `USE academics`;
    const createAuthorsTable = `
        CREATE TABLE IF NOT EXISTS authors (
        author_id INT PRIMARY KEY, 
        author_name VARCHAR(100) NOT NULL, 
        university VARCHAR(100), 
        date_of_birth DATE, 
        h_index INT DEFAULT 0, 
        gender ENUM('m', 'f')
    )`;
    const addColumnToAuthorsTable = `
        ALTER TABLE authors
        ADD COLUMN mentor INT,
        ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_id)
    `;

    try {
        await connection.connect();
        console.log('Connected!');
        await connection.query(createDatabase);
        await connection.query(useDatabase);
        await connection.query(createAuthorsTable);
        await connection.query(addColumnToAuthorsTable);
    } catch (error) {
        console.error(error);
        connection.end();
    }

    connection.end();
}

setupDatabase();
