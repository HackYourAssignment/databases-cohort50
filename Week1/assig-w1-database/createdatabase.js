
import mysql from 'mysql2';


const connection = mysql.createConnection({
  host: 'localhost',       
  user: 'hyfuser',            
  password: '12345' 
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the MySQL server: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL server with id ' + connection.threadId);
});


connection.query('CREATE DATABASE IF NOT EXISTS meetup', (error, results, fields) => {
  if (error) {
    console.error('Error creating database: ' + error.stack);
    return;
  }
  console.log('Database "meetup" created or already exists.');
});
connection.query('use meetup', (error , results , fields) => {
  if(error){
    console.error('error selecting database :' + error.stack);
    return;

  }
  console.log('using database  "meetup"')
})
// ==================================================================
const inviteeTable = `CREATE TABLE IF NOT EXISTS invitee (
  invitee_no INT AUTO_INCREMENT PRIMARY KEY,
  invitee_name VARCHAR(255) NOT NULL,
  invitee_by VARCHAR(255) NOT NULL
);`;

connection.query(inviteeTable, (error, results, fields) => {
  if (error) {
    console.error('Error creating table: ' + error.stack);
    return;
  }
  console.log('Table "invitee" created or already exists.');
});
//=====================================================================
const roomTable = `create table if not exists room (
   room_no INT AUTO_INCREMENT PRIMARY KEY,
  room_name varchar(255) not null ,
  floor_number int not null
  );`;
  
  connection.query(roomTable , (error , results , fields) => {
    if(error){
      console.error('error creating table: ' + error.stack)
      return;
    
    }
    console.log('table "room" created or already exists.')
  });

  // ==================================================================== 
  const meetingTable = `create table if not exists meeting (
    meeting_no int AUTO_INCREMENT primary key , 
    meeting_title varchar(255) not null ,
    starting_time datetime not null , 
    ending_time datetime not null, 
    room_no int ,
    foreign key (room_no) references room(room_no)
    );`;
    
    connection.query(meetingTable , (error , results , fields) => {
      if(error){
        console.error('error creating table: ' + error.stack)
        return;
      
      }
      console.log('table "room" created or already exists.')
    })
  
    // =========================================================== 

   
    const inviteeData = `
    INSERT INTO invitee (invitee_name, invitee_by)
    VALUES 
    ('Alice Johnson', 'Bob Smith'),
    ('John Doe', 'Jane Doe'),
    ('Emma White', 'James Brown'),
    ('David Green', 'Sarah Lee'),
    ('Olivia Black', 'Robert White');
    `;
    
    connection.query(inviteeData, (error, results, fields) => {
      if (error) {
        console.error('Error inserting data into invitee table: ' + error.stack);
        return;
      }
      console.log('Data inserted into invitee table');
    });
//=================================================================


const roomData = `
INSERT INTO room (  room_name, floor_number)
VALUES 
( 'Conference Room A', 1),
(  'Meeting Room B', 2),
(  'Training Room C', 3),
(  'Board Room D', 4),
( 'Executive Room E', 5);
`;

connection.query(roomData, (error, results, fields) => {
  if (error) {
    console.error('Error inserting data into room table: ' + error.stack);
    return;
  }
  console.log('Data inserted into room table');
});
  // ======================================================================

const meetingData = `
INSERT INTO meeting ( meeting_title, starting_time, ending_time)
VALUES 
( 'Quarterly Business Review', '2024-12-20 09:00:00', '2024-12-20 11:00:00'),
( 'Team Sync-Up', '2024-12-20 11:30:00', '2024-12-20 12:30:00'),
( 'Product Launch Planning', '2024-12-21 14:00:00', '2024-12-21 16:00:00'),
( 'Board Meeting', '2024-12-22 10:00:00', '2024-12-22 12:00:00'),
( 'Executive Strategy Session', '2024-12-22 13:00:00', '2024-12-22 15:00:00');
`;

connection.query(meetingData, (error, results, fields) => {
  if (error) {
    console.error('Error inserting data into meeting table: ' + error.stack);
    return;
  }
  console.log('Data inserted into meeting table');
});



connection.end();


