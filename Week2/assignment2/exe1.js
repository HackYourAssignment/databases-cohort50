

import mysql from 'mysql2/promise'; 


export const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: '12345',
  database: 'library'
});


const createAuthorsTable = async () => {
  const authorsTable = `
    CREATE TABLE IF NOT EXISTS authors (
      author_id int PRIMARY KEY AUTO_INCREMENT,
      author_name varchar(50) NOT NULL,
      university VARCHAR(40),
      dat_of_birth DATE,
      h_index INT,
      gender VARCHAR(10)
    );
  `;

  try {
    await connection.execute(authorsTable);
    console.log('Table created successfully');
  } catch (err) {
    console.error('Error creating the table:', err.message);
  }
};


const checkColumnExists = async () => {
  const checkColumnQuery = `
    SELECT COUNT(*) AS count
    FROM INFORMATION_SCHEMA.COLUMNS
    WHERE TABLE_NAME = 'authors'
    AND COLUMN_NAME = 'mentor';
  `;

  try {
    const [results] = await connection.execute(checkColumnQuery);
    if (results[0].count === 0) {
      await addMentorColumn();
    } else {
      console.log('Mentor column already exists.');
    }
  } catch (err) {
    console.error('Error checking column existence:', err.message);
  }
};


const addMentorColumn = async () => {
  const addMentorColumnQuery = `
    ALTER TABLE authors
    ADD COLUMN mentor INT,
    ADD CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_id);
  `;

  try {
    await connection.execute(addMentorColumnQuery);
    console.log('Mentor column added successfully');
  } catch (err) {
    console.error('Error adding mentor column:', err.message);
  }
};


const insertAuthorsData = async () => {
    const authorsData = [
      ['John Doe', 'Harvard', '1980-01-15', 25, 'Male', 2],
      ['Jane Smith', 'MIT', '1975-05-20', 30, 'Female', 3],
      ['Michael Johnson', 'Stanford', '1990-03-10', 20, 'Male', 1],
      ['Emily Davis', 'Yale', '1988-11-05', 28, 'Female', 2],
      ['Chris Brown', 'Oxford', '1985-07-18', 35, 'Male', 3],
      ['Laura Wilson', 'Cambridge', '1979-09-25', 40, 'Female', 1],
      ['David Miller', 'Columbia', '1992-06-12', 22, 'Male', 2],
      ['Sophia Taylor', 'Princeton', '1986-12-01', 27, 'Female', 3],
      ['James Anderson', 'Berkeley', '1991-04-22', 32, 'Male', 1],
      ['Olivia Thomas', 'UCLA', '1983-08-19', 29, 'Female', 3],
      ['William Martinez', 'NYU', '1987-03-30', 24, 'Male', 2],
      ['Emma Garcia', 'USC', '1984-10-14', 26, 'Female', 1],
      ['Liam Harris', 'Chicago', '1989-02-27', 23, 'Male', 2],
      ['Isabella Moore', 'Cornell', '1993-01-09', 21, 'Female', 3],
      ['Ethan Martinez', 'Duke', '1982-07-04', 34, 'Male', 3]
    ];
  
    const insertQuery = `
      INSERT INTO authors (author_name, university, dat_of_birth, h_index, gender, mentor)
      VALUES ?;
    `;
  
    try {
    
      const [results] = await connection.execute(insertQuery, [authorsData]);
      console.log('Inserted rows into authors table:', results);
    } catch (err) {
      console.error('Error inserting data into authors table:', err.message);
    }
  };
  

  const runDatabaseSetup = async () => {
    await createAuthorsTable();  
    await checkColumnExists();   
    await insertAuthorsData();   
  };
  
  runDatabaseSetup();
  