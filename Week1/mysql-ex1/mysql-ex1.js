require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || '',
  multipleStatements: true,
});

const queries = `
  CREATE DATABASE IF NOT EXISTS meetup;
  USE meetup;

  CREATE TABLE IF NOT EXISTS Invitee (
    invitee_no INT AUTO_INCREMENT PRIMARY KEY,
    invitee_name VARCHAR(100) NOT NULL,
    invited_by VARCHAR(100) NOT NULL
  );

  CREATE TABLE IF NOT EXISTS Room (
    room_no INT AUTO_INCREMENT PRIMARY KEY,
    room_name VARCHAR(100) NOT NULL,
    floor_number INT NOT NULL
  );

  CREATE TABLE IF NOT EXISTS Meeting (
    meeting_no INT AUTO_INCREMENT PRIMARY KEY,
    meeting_title VARCHAR(100) NOT NULL,
    starting_time DATETIME NOT NULL,
    ending_time DATETIME NOT NULL,
    room_no INT,
    FOREIGN KEY (room_no) REFERENCES Room(room_no)
  );

  INSERT INTO Invitee (invitee_name, invited_by) VALUES
    ('Alice', 'Bob'),
    ('Charlie', 'Alice'),
    ('Dave', 'Charlie'),
    ('Eve', 'Dave'),
    ('Frank', 'Eve');

  INSERT INTO Room (room_name, floor_number) VALUES
    ('Conference Room A', 1),
    ('Conference Room B', 2),
    ('Conference Room C', 3),
    ('Conference Room D', 4),
    ('Conference Room E', 5);

  INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES
    ('Project Kickoff', '2024-12-12 10:00:00', '2024-12-12 11:00:00', 1),
    ('Team Sync', '2024-12-12 11:30:00', '2024-12-12 12:00:00', 2),
    ('Design Review', '2024-12-12 13:00:00', '2024-12-12 14:00:00', 3),
    ('Code Review', '2024-12-12 15:00:00', '2024-12-12 16:00:00', 4),
    ('Retrospective', '2024-12-12 16:30:00', '2024-12-12 17:30:00', 5);
`;

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err);
    return;
  }
  console.log('Connected to MySQL!');

  connection.query(queries, (err, results) => {
    if (err) {
      console.error('Error executing queries:', err);
      return;
    }
    console.log('Database, tables, and data created successfully!');
  });

  connection.end((err) => {
    if (err) {
      console.error('Error closing the connection:', err);
      return;
    }
    console.log('Connection closed.');
  });
});
