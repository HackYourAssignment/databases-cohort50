import fetch from 'node-fetch';
import db from './connection-db.js';

const fetchRandomUsers = async (count) => {
  try {
    const response = await fetch(`https://randomuser.me/api/?results=${count}`);
    const data = await response.json();
    return data.results;
  } catch (error) {
    console.error('Error fetching users:', error);
    return [];
  }
};

const insertData = async () => {
  try {
    // Fetch 15 authors randomly
    const authors = await fetchRandomUsers(15);

    const authorInsertPromises = authors.map(user => {
      const name = `${user.name.first} ${user.name.last}`;
      const university = ['Cambridge', 'MIT', 'Stanford'][Math.floor(Math.random() * 3)];
      const dob = user.dob.date.split('T')[0];
      const hIndex = Math.floor(Math.random() * 40) + 10;
      const gender = user.gender === 'male' ? 'Male' : 'Female';

      return db.query(
        'INSERT INTO authors (author_name, university, date_of_birth, h_index, gender) VALUES (?, ?, ?, ?, ?)',
        [name, university, dob, hIndex, gender]
      );
    });

    await Promise.all(authorInsertPromises);
    console.log('Authors inserted successfully.');

    // Insert 30 research papers randomly 
    const paperInsertPromises = Array.from({ length: 30 }).map(() => {
      const title = `Research Paper ${Math.floor(Math.random() * 1000)}`;
      const conference = ['Conference A', 'Conference B', 'Conference C'][Math.floor(Math.random() * 3)];
    
      const startYear = 1990;
      const endYear = 2010;
      const randomYear = Math.floor(Math.random() * (endYear - startYear + 1)) + startYear;
      const randomMonth = Math.floor(Math.random() * 12);
      const daysInMonth = new Date(randomYear, randomMonth + 1, 0).getDate();
      const randomDay = Math.floor(Math.random() * daysInMonth) + 1;
      const publishDate = new Date(randomYear, randomMonth, randomDay).toISOString().split('T')[0];
    
      return db.query(
        'INSERT INTO research_papers (paper_title, conference, publish_date) VALUES (?, ?, ?)',
        [title, conference, publishDate]
      );
    });
    

    await Promise.all(paperInsertPromises);
    console.log('Research papers inserted successfully.');

    // Assign mentors randomly
    await db.query(`
      UPDATE authors a
      JOIN (
        SELECT author_id,
               (SELECT author_id
                FROM authors b
                WHERE b.author_id != a.author_id
                ORDER BY RAND()
                LIMIT 1) AS mentor_id
        FROM authors a
      ) AS mentor_assignment
      ON a.author_id = mentor_assignment.author_id
      SET a.mentor = mentor_assignment.mentor_id;
    `);
    console.log('Mentor relationships inserted successfully.');

    // Insert author-paper relationships
    await db.query(`
      INSERT INTO author_paper (author_id, paper_id)
      SELECT DISTINCT
        a.author_id,
        p.paper_id
      FROM authors a
      CROSS JOIN research_papers p
      WHERE NOT EXISTS (
        SELECT 1
        FROM author_paper ap
        WHERE ap.author_id = a.author_id AND ap.paper_id = p.paper_id
      )
      ORDER BY RAND()
      LIMIT 100; 
    `);
    console.log('Author-paper relationships inserted successfully.');

  } catch (error) {
    console.error('Error inserting data:', error);
  } finally {
    await db.end();
  }
};

insertData();
