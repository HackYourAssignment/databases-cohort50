import { connection } from './connection.js';

const useDatabase = `USE academics`;

const queryAuthorMentor = `
    SELECT a.author_name AS author_name, m.author_name AS mentor
    FROM authors AS a
    INNER JOIN authors AS m ON a.mentor = m.author_id
`;

const queryAuthorPaperTitle = `
    SELECT a.author_name AS author_name, GROUP_CONCAT(research_papers.paper_title SEPARATOR ', ') AS paper_titles
    FROM authors AS a
    LEFT JOIN author_paper ON a.author_id = author_paper.author_id
    LEFT JOIN research_papers ON author_paper.paper_id = research_papers.paper_id
    GROUP BY a.author_name
`;

async function createQueries() {
    try {
        await connection.query(useDatabase);
        await connection.query(queryAuthorMentor);
        console.log(queryAuthorMentor);
        connection.execute(queryAuthorMentor).then(([rows, fields]) => {
            console.log(rows);
        });
        connection.execute(queryAuthorPaperTitle).then(([rows, fields]) => {
            console.log(rows);
        });
    } catch (error) {
        console.error(error);
        connection.end();
    }

    connection.end();
}

createQueries();
