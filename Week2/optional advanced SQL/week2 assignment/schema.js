import db from './connection-db.js';

const createDatabaseAndTables = async () => {
  try {
    await db.query('CREATE DATABASE IF NOT EXISTS Authors');
    console.log('Database created or already exists.');

    // Use the database
    await db.query('USE Authors');

    await db.query(`
      CREATE TABLE IF NOT EXISTS authors (
        author_id INT AUTO_INCREMENT PRIMARY KEY,
        author_name VARCHAR(255) NOT NULL,
        university VARCHAR(255) NOT NULL,
        date_of_birth DATE NOT NULL,
        h_index INT,
        gender VARCHAR(50)
      );
    `);
    console.log('Authors table created successfully.');

    // Add mentor column and foreign key constraint
    await db.query(`
      ALTER TABLE authors
      ADD COLUMN mentor INT,
      ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_id) ON DELETE SET NULL;
    `);
    console.log('Mentor column and foreign key constraint added successfully.');

    await db.query(`
      CREATE TABLE IF NOT EXISTS research_papers (
        paper_id INT AUTO_INCREMENT PRIMARY KEY,
        paper_title VARCHAR(255) NOT NULL,
        conference VARCHAR(255),
        publish_date DATE NOT NULL
      );
    `);
    console.log('Research papers table created successfully.');

    // Create author_paper table for many-to-many relationship
    await db.query(`
      CREATE TABLE IF NOT EXISTS author_paper (
        author_id INT,
        paper_id INT,
        PRIMARY KEY (author_id, paper_id),
        FOREIGN KEY (author_id) REFERENCES authors(author_id) ON DELETE RESTRICT,
        FOREIGN KEY (paper_id) REFERENCES research_papers(paper_id) ON DELETE RESTRICT
      );
    `);
    console.log('Author-Paper relationship table created successfully.');
    
  } catch (error) {
    console.error('Error creating database and tables:', error);
  } finally {
    await db.end();
  }
};

createDatabaseAndTables();

