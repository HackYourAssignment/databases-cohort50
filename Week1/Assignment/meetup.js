import { createConnection } from 'mysql2/promise';

const connection = await createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

const drop_database_query = `DROP DATABASE IF EXISTS meetup`;
const create_database_query = `CREATE DATABASE meetup`;
const use_database_query = `USE meetup`;

const create_Invitee_query = `CREATE TABLE IF NOT EXISTS Invitee(
  invitee_no INT AUTO_INCREMENT PRIMARY KEY,
  invitee_name VARCHAR(255) NOT NULL,
  invited_by VARCHAR(255) NOT NULL
)`;

const create_Room_query = `CREATE TABLE IF NOT EXISTS Room(
  room_no INT AUTO_INCREMENT PRIMARY KEY,
  room_name VARCHAR(255) NOT NULL,
  floor_number INT NOT NULL
)`;

const create_Meeting_query = `CREATE TABLE IF NOT EXISTS Meeting(
     meeting_no INT AUTO_INCREMENT PRIMARY KEY,
     meeting_title VARCHAR(255) NOT NULL,
     starting_time DATETIME NOT NULL,
     ending_time DATETIME NOT NULL,
     room_no INT,
     FOREIGN KEY (room_no) REFERENCES Room(room_no)
  )`;

const insert_Invitee_query= `
INSERT INTO Invitee (invitee_name, invited_by) VALUES
('Ali', 'Bob'),
('Ahmed', 'Ali'),
('David', 'Ahmed'),
('Salvatore','David'),
('Frank', 'Emma')`;

const insert_Room_query = `
INSERT INTO Room (room_name, floor_number) VALUES
('Conference Room A', 1),
('Conference Room B', 2),
('Main Hall', 1),
('Meeting Room 1', 3),
('Meeting Room 2', 3)`;

const insert_Meeting_query = `
INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES
('Project Kickoff', '2024-12-17 09:00:00', '2024-12-17 10:30:00', 1),
('Team Standup', '2024-12-17 11:00:00', '2024-12-17 11:30:00', 2),
('Budget Planning', '2024-12-17 13:00:00', '2024-12-17 14:30:00', 3),
('Strategy Meeting', '2024-12-17 15:00:00', '2024-12-17 16:30:00', 4),
('Client Presentation', '2024-12-18 10:00:00', '2024-12-18 11:30:00', 5)`;

await connection.query(drop_database_query);
await connection.query(create_database_query);
await connection.query(use_database_query);

await connection.query(create_Invitee_query);
await connection.query(create_Room_query);
await connection.query(create_Meeting_query);

await connection.query(insert_Invitee_query);
await connection.query(insert_Room_query);
await connection.query(insert_Meeting_query);

connection.end();
