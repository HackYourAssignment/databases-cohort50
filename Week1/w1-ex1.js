import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  multipleStatements: true,
});

connection.connect((err) => {
  if (err) throw err;
  setupDatabase();
});

function setupDatabase() {
  const queries = `
    DROP DATABASE IF EXISTS meetup;
    CREATE DATABASE meetup;
    USE meetup;

    CREATE TABLE IF NOT EXISTS Invitee (
      invitee_no INT PRIMARY KEY,
      invitee_name VARCHAR(255) NOT NULL,
      invited_by VARCHAR(255) NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Room (
      room_no INT PRIMARY KEY,
      room_name VARCHAR(255) UNIQUE,
      floor_number INT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS Meeting (
      meeting_no INT PRIMARY KEY,
      meeting_title VARCHAR(255) NOT NULL,
      starting_time DATETIME NOT NULL,
      ending_time DATETIME NOT NULL,
      room_no INT,
      FOREIGN KEY (room_no) REFERENCES Room(room_no)
    );
  `;

  connection.query(queries, (err) => {
    if (err) throw err;
    insertData();
  });
}

function insertData() {
  const insertQueries = `
    INSERT INTO Invitee (invitee_no, invitee_name, invited_by) VALUES
      (1, 'Jan Kaas', 'Ali Stroopwafel'),
      (2, 'Kees Klompen', 'Bob Bitterbal'),
      (3, 'Piet Pannenkoek', 'Ali Stroopwafel'),
      (4, 'Sanne Stroop', 'Piet Pannenkoek'),
      (5, 'Henk Hagelslag', 'Jessica Dropje')
    ON DUPLICATE KEY UPDATE
      invitee_name = VALUES(invitee_name),
      invited_by = VALUES(invited_by);

    INSERT INTO Room (room_no, room_name, floor_number) VALUES
      (1, 'Room Stroopwafel', 1),
      (2, 'Room Klompen', 2),
      (3, 'Room Bitterbal', 3),
      (4, 'Room Poffertjes', 4),
      (5, 'Room Hagelslag', 5)
    ON DUPLICATE KEY UPDATE
      room_name = VALUES(room_name),
      floor_number = VALUES(floor_number);

    INSERT INTO Meeting (meeting_no, meeting_title, starting_time, ending_time, room_no) VALUES
      (1, 'Stroopwafel Strategy', '2024-12-18 10:00:00', '2024-12-18 12:00:00', 1),
      (2, 'Klompen Kickoff', '2024-12-19 13:00:00', '2024-12-19 14:00:00', 2),
      (3, 'Bitterbal Brainstorm', '2024-12-20 09:00:00', '2024-12-20 11:00:00', 3),
      (4, 'Poffertjes Planning', '2024-12-21 15:00:00', '2024-12-21 16:30:00', 4),
      (5, 'Hagelslag Huddle', '2024-12-22 10:00:00', '2024-12-22 11:30:00', 5)
    ON DUPLICATE KEY UPDATE
      meeting_title = VALUES(meeting_title),
      starting_time = VALUES(starting_time),
      ending_time = VALUES(ending_time),
      room_no = VALUES(room_no);
  `;

  connection.query(insertQueries, (err) => {
    if (err) throw err;
    connection.end();
  });
}
