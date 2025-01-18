
import mysql from 'mysql2/promise';
// here i could not remove export .. 
// how could i import connection to the other files 
// but i changed the connection into separate function 
// then i export it 
export const connection = await mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: '12345',
  database: 'library',
});

const runDatabaseSetup = async () => {
  try {
    // here I solved the problem that i asked about last week 
    // by make the table truncate .. in this case i can run 
    // the file multiple times without changing the values of ids . 
    await connection.execute('SET FOREIGN_KEY_CHECKS = 0;');
    await connection.execute('TRUNCATE TABLE authors;');
    await connection.execute('SET FOREIGN_KEY_CHECKS = 1;');
    console.log('Authors table truncated.');

    const authorsTable = `
      CREATE TABLE IF NOT EXISTS authors (
        author_id INT PRIMARY KEY AUTO_INCREMENT,
        author_name VARCHAR(50) NOT NULL,
        university VARCHAR(40),
        date_of_birth DATE,
        h_index INT,
        gender VARCHAR(10),
        mentor INT,
        CONSTRAINT fk_mentor FOREIGN KEY (mentor) REFERENCES authors(author_id)
      );
    `;
    await connection.execute(authorsTable);
    console.log('Table created successfully.');

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
      ['Ethan Martinez', 'Duke', '1982-07-04', 34, 'Male', 3],
    ];

    const insertQuery = `
      INSERT INTO authors (author_name, university, date_of_birth, h_index, gender, mentor)
      VALUES ?;
    `;

    await connection.query(insertQuery, [authorsData]);

    console.log('Data inserted successfully into the authors table.');
  } catch (err) {
    console.error('Error during database setup:', err.message);
  } 
};

await runDatabaseSetup();
