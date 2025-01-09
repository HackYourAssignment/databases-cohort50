import mysql from 'mysql2/promise';

(async () => {
  try {
 
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'hyfuser',
      password: '12345',
    });

    console.log('Connected to MySQL server.');

  
    await connection.query('DROP DATABASE IF EXISTS meetup');
    await connection.query('CREATE DATABASE meetup');
    await connection.query('USE meetup');
    console.log('Database "meetup" created.');

   
    const inviteeTable = `
      CREATE TABLE IF NOT EXISTS invitee (
        invitee_no INT AUTO_INCREMENT PRIMARY KEY,
        invitee_name VARCHAR(255) NOT NULL,
        invited_by INT,  
        FOREIGN KEY (invited_by) REFERENCES invitee(invitee_no) 
      );
    `;
    await connection.query(inviteeTable);
    console.log('Table "invitee" created or already exists.');

    
    const roomTable = `
      CREATE TABLE IF NOT EXISTS room (
        room_no INT AUTO_INCREMENT PRIMARY KEY,
        room_name VARCHAR(255) NOT NULL,
        floor_number INT NOT NULL
      );
    `;
    await connection.query(roomTable);
    console.log('Table "room" created or already exists.');

   
    const meetingTable = `
      CREATE TABLE IF NOT EXISTS meeting (
        meeting_no INT AUTO_INCREMENT PRIMARY KEY,
        meeting_title VARCHAR(255) NOT NULL,
        starting_time DATETIME NOT NULL,
        ending_time DATETIME NOT NULL,
        room_no INT,
        FOREIGN KEY (room_no) REFERENCES room(room_no)
      );
    `;
    await connection.query(meetingTable);
    console.log('Table "meeting" created or already exists.');

   
    const inviteeData = `
      INSERT INTO invitee (invitee_name, invited_by)
      VALUES 
      ('Alice Johnson', NULL),  
      ('John Doe', 1),          
      ('Emma White', 1),       
      ('David Green', 2),      
      ('Olivia Black', 3);      
    `;
    await connection.query(inviteeData);
    console.log('Data inserted into "invitee" table.');

   
    const roomData = `
      INSERT INTO room (room_name, floor_number)
      VALUES 
      ('Conference Room A', 1),
      ('Meeting Room B', 2),
      ('Training Room C', 3),
      ('Board Room D', 4),
      ('Executive Room E', 5);
    `;
    await connection.query(roomData);
    console.log('Data inserted into "room" table.');

   
    const meetingData = `
      INSERT INTO meeting (meeting_title, starting_time, ending_time, room_no)
      VALUES 
      ('Quarterly Business Review', '2024-12-20 09:00:00', '2024-12-20 11:00:00', 1),
      ('Team Sync-Up', '2024-12-20 11:30:00', '2024-12-20 12:30:00', 2),
      ('Product Launch Planning', '2024-12-21 14:00:00', '2024-12-21 16:00:00', 3),
      ('Board Meeting', '2024-12-22 10:00:00', '2024-12-22 12:00:00', 4),
      ('Executive Strategy Session', '2024-12-22 13:00:00', '2024-12-22 15:00:00', 5);
    `;
    await connection.query(meetingData);
    console.log('Data inserted into "meeting" table.');

    
    await connection.end();
    console.log('Connection closed.');
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
