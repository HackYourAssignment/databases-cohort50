import mysql from 'mysql2/promise';

const connection = await mysql.createConnection({
    host: 'localhost',
    user: 'hyfuser',
    password: 'hyfpassword'
});

const create_meetup_database = `CREATE DATABASE IF NOT EXISTS meetup`;
const use_database = `USE meetup`;
const create_invitee_table = `CREATE TABLE IF NOT EXISTS Invitee (
    invitee_no INT AUTO_INCREMENT PRIMARY KEY, 
    invitee_name VARCHAR(100) NOT NULL,
    invited_by VARCHAR(100) NOT NULL
)`;

const create_room_table = `CREATE TABLE IF NOT EXISTS Room (
    room_no INT PRIMARY KEY, 
    room_name VARCHAR(100) UNIQUE,
    floor_number INT NOT NULL
)`;

const create_meeting_table = `CREATE TABLE IF NOT EXISTS Meeting (
    meeting_no INT AUTO_INCREMENT PRIMARY KEY, 
    meeting_title VARCHAR(200) NOT NULL, 
    starting_time DATETIME NOT NULL, 
    ending_time DATETIME NOT NULL,
    room_no INT,
    FOREIGN KEY (room_no) REFERENCES Room(room_no)
)`;

const insert_invitees = `INSERT INTO Invitee (invitee_name, invited_by) VALUES 
    ('Mary', 'James'),
    ('Remco', 'Mary'),
    ('David', 'John'),
    ('John', 'Mary'),
    ('Frank', 'Remco')`;

const insert_rooms = `INSERT INTO Room (room_no, room_name, floor_number) VALUES 
    (101, 'Conference Room A', '1'),
    (102, 'Conference Room B', '2'),
    (201, 'Meeting Room 1', '2'),
    (202, 'Meeting Room 2', '2'),
    (301, 'Board Room', '3')`;

const insert_meetings = `INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES 
    ('Project Planning', '2024-12-20 09:00:00', '2024-12-20 10:00:00', 101),
    ('Marketing Strategy', '2024-12-21 11:00:00', '2024-12-21 12:30:00', 102),
    ('Budget Review', '2024-12-22 14:00:00', '2024-12-22 15:30:00', 201),
    ('Team Building Workshop', '2024-12-23 10:00:00', '2024-12-23 12:00:00', 202),
    ('Annual General Meeting', '2024-12-24 13:00:00', '2024-12-24 15:00:00', 301)`;

try {
    await connection.connect();
    console.log('Connected!');
    await connection.query(create_meetup_database);
    await connection.query(use_database);
    await connection.query(create_invitee_table);
    await connection.query(create_room_table);
    await connection.query(create_meeting_table);

    await connection.query(insert_invitees);
    await connection.query(insert_rooms);
    await connection.query(insert_meetings);
} catch (error) {
    console.error('Error:', error.message);
}

connection.end();
