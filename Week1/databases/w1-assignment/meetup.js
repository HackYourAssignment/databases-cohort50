const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "hyfuser",
  password: "hyfpassword",
  multipleStatements: true,
});

const databaseName = "meetup";

const setupDatabase = `
    DROP DATABASE IF EXISTS ${databaseName};
    CREATE DATABASE ${databaseName};
    USE ${databaseName};

    CREATE TABLE Invitee (
        invitee_no INT AUTO_INCREMENT PRIMARY KEY,
        invitee_name VARCHAR(255) NOT NULL,
        invited_by VARCHAR(255) NOT NULL
    );

    CREATE TABLE Room (
        room_no INT AUTO_INCREMENT PRIMARY KEY,
        room_name VARCHAR(255) NOT NULL,
        floor_number INT NOT NULL
    );

    CREATE TABLE Meeting (
        meeting_no INT AUTO_INCREMENT PRIMARY KEY,
        meeting_title VARCHAR(255) NOT NULL,
        starting_time DATETIME NOT NULL,
        ending_time DATETIME NOT NULL,
        room_no INT NOT NULL,
        FOREIGN KEY (room_no) REFERENCES Room(room_no)
    );

    INSERT INTO Invitee (invitee_name, invited_by) VALUES
        ('Alice', 'Bob'),
        ('Charlie', 'Alice'),
        ('David', 'Charlie'),
        ('Eve', 'David'),
        ('Frank', 'Eve');

    INSERT INTO Room (room_name, floor_number) VALUES
        ('Conference Room A', 1),
        ('Conference Room B', 2),
        ('Conference Room C', 3),
        ('Main Hall', 0),
        ('Board Room', 1);

    INSERT INTO Meeting (meeting_title, starting_time, ending_time, room_no) VALUES
        ('Project Kickoff', '2024-12-20 09:00:00', '2024-12-20 10:30:00', 1),
        ('Team Standup', '2024-12-20 11:00:00', '2024-12-20 11:30:00', 2),
        ('Client Meeting', '2024-12-20 14:00:00', '2024-12-20 15:30:00', 3),
        ('Weekly Sync', '2024-12-21 10:00:00', '2024-12-21 11:00:00', 4),
        ('Board Review', '2024-12-21 13:00:00', '2024-12-21 14:30:00', 5);
`;

connection.query(setupDatabase, (err, results) => {
  if (err) {
    console.error("Error setting up the database:", err);
  } else {
    console.log("Database setup complete!");
  }
  connection.end();
});
