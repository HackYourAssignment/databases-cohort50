import { createConnection } from 'mysql2/promise';

const connection = await createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword',
});

try {  


const use_database_query = `USE authors`;
    await connection.query(use_database_query);

const insert_authors_query = ` INSERT INTO author (author_name, university, date_of_birth, h_index, gender) VALUES
 ('John  Doe', 'Harvard', '1980-05-10', 35, 'Male'),
 ('Jane Smith', 'MIT', '1975-11-20', 40, 'Female'),
 ('Alice Brown', 'Stanford', '1990-08-15', 25, 'Female'),
 ('Bob Johnson', 'Cambridge', '1985-03-22', 45, 'Male'),
 ('Charlie Lee', 'Oxford', '1970-12-12', 50, 'Male') `;

    await connection.query(insert_authors_query);

const insert_research_papers_query = ` INSERT INTO research_Papers (paper_id, paper_title, conference, publish_date) VALUES
 (1, 'Quantum Computing Advances', 'QCon', '2022-06-15'),
 (2, 'AI in Healthcare', 'MedAI', '2023-03-10'),
 (3, 'Blockchain for Supply Chain', 'BCSC', '2023-05-01') `;

    await connection.query(insert_research_papers_query);
  
const insert_author_researchpapers_query = `
INSERT INTO authors_researchPapers (author_id, paper_id)
VALUES
    (1, 1),
    (2, 1),
    (2, 2),
    (3, 3),
    (4, 1)`;

    await connection.query(insert_author_researchpapers_query);

const select_author_query = `
    SELECT a1.author_name AS author, a2.author_name AS mentor
    FROM author a1
    LEFT JOIN author a2
    ON a1.mentor = a2.author_id;
    `
const [authorsAndMentors] = await connection.query(select_author_query);
    console.log('Authors and Mentors:', authorsAndMentors);

const select_author_researchpapers_query = `
    SELECT author.author_name, research_Papers.paper_title
    FROM author
    LEFT JOIN authors_researchPapers ON author.author_id = authors_researchPapers.author_id
    LEFT JOIN research_Papers ON authors_researchPapers.paper_id = research_Papers.paper_id;
    `;
const [authorsAndPapers] = await connection.query(select_author_researchpapers_query);
    console.log('Authors and their Papers:', authorsAndPapers)

} catch (err) {
    console.error('Error occurred:', err.message);
} finally {
    await connection.end();
}

