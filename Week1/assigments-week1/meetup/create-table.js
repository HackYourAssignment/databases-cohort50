import db from './connection.js';

async function createTables() {
  try {
    console.log("Connected to MySQL");

    const CREATE_INVITEE_TABLE = `
      CREATE TABLE IF NOT EXISTS invitee (
     invitee_no INT AUTO_INCREMENT PRIMARY KEY, 
     invitee_name VARCHAR(100) NOT NULL,         
     invited_by VARCHAR(100) NOT NULL            
   );
    `;
    await db.query(CREATE_INVITEE_TABLE);  
    console.log('Table "Invitee" created successfully.');

    const CREATE_ROOM_TABLE = `
      CREATE TABLE IF NOT EXISTS room (
        room_no INT PRIMARY KEY,
        room_name VARCHAR(100) NOT NULL,
        floor_number INT NOT NULL
      );
    `;
    await db.query(CREATE_ROOM_TABLE);  
    console.log('Table "Room" created successfully.');

    const CREATE_MEETING_TABLE = `
      CREATE TABLE IF NOT EXISTS meeting (
        meeting_no INT AUTO_INCREMENT PRIMARY KEY,
        meeting_title VARCHAR(200) NOT NULL,
        starting_time DATETIME NOT NULL,
        ending_time DATETIME NOT NULL,
        room_no INT,
        FOREIGN KEY (room_no) REFERENCES room(room_no) 
      );
    `;
    await db.query(CREATE_MEETING_TABLE);  
    console.log('Table "Meeting" created successfully.');
  } catch (err) {
    console.error("Error:", err);
  } finally {
    try {
      await db.end();
      console.log("Connection closed.");
    } catch (closeErr) {
      console.error("Error closing the database connection:", closeErr);
    }
  }
};

createTables();
