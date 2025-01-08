import { connection } from './connection.js';

const papersAndAmountOfAuthors = `
    SELECT research_papers.paper_title, COUNT(author_paper.author_id) AS author_count
    FROM research_papers
    JOIN author_paper ON research_papers.paper_id = author_paper.paper_id
    GROUP BY research_papers.paper_title
`;

const papersWrittenByWoman = `
    SELECT COUNT(author_paper.author_id) as papers_written_by_women
    FROM author_paper
    JOIN authors ON author_paper.paper_id = authors.author_id
    WHERE authors.gender = 'f'
`;

const useDatabase = `USE academics`;

const avgHindexPerUniversity = `
    SELECT authors.university, AVG(authors.h_index) AS average_h_index
    FROM authors
    GROUP BY authors.university
`;

const sumResearchPaperPerUniversity = `
    SELECT authors.university, COUNT(author_paper.paper_id) AS research_papers_sum
    FROM authors
    JOIN author_paper ON authors.author_id = author_paper.author_id
    GROUP BY authors.university
`;

const minMaxHindexPerUniversity = `
    SELECT authors.university, MIN(authors.h_index) AS minimum_of_h_index, MAX(authors.h_index) AS maximum_of_h_index
    FROM authors
    GROUP BY authors.university
`;

async function executeQueries() {
    try {
        await connection.query(useDatabase);
        await connection.query(papersAndAmountOfAuthors);
        await connection.query(papersWrittenByWoman);
        await connection.query(avgHindexPerUniversity);
        await connection.query(sumResearchPaperPerUniversity);
        await connection.query(minMaxHindexPerUniversity);

        await connection
            .execute(papersAndAmountOfAuthors)
            .then(([rows, fields]) => {
                console.log(rows);
            });
        await connection
            .execute(papersWrittenByWoman)
            .then(([rows, fields]) => {
                console.log(rows);
            });
        await connection
            .execute(avgHindexPerUniversity)
            .then(([rows, fields]) => {
                console.log(rows);
            });
        await connection
            .execute(sumResearchPaperPerUniversity)
            .then(([rows, fields]) => {
                console.log(rows);
            });
        await connection
            .execute(minMaxHindexPerUniversity)
            .then(([rows, fields]) => {
                console.log(rows);
            });
    } catch (error) {
        console.error(error);
        connection.end();
    }

    connection.end();
}

executeQueries();
