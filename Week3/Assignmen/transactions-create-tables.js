import { createConnection } from 'mysql2/promise';

const connection = await createConnection({
   host: 'localhost',
   user: 'hyfuser',
   password: 'hyfpassword',
 });

try{

const create_database_query = `CREATE DATABASE IF NOT EXISTS transaction `;
const use_database_query = `USE transaction`;

const create_account_query= `
    CREATE TABLE IF NOT EXISTS account(
    account_number INT AUTO_INCREMENT PRIMARY KEY,
    balance DECIMAL(15, 2) NOT NULL
    )
  `;

const create_account_changes_query=`
    CREATE TABLE IF NOT EXISTS account_changes (     
    change_number INT AUTO_INCREMENT PRIMARY KEY,
    account_number INT,
    amount DECIMAL(15, 2),
    changed_date DATETIME NOT NULL,
    remark VARCHAR(255),
    FOREIGN KEY (account_number) REFERENCES account(account_number)
   
 )
  `;


await connection.query(create_database_query);
await connection.query(use_database_query);
await connection.query(create_account_query);
await connection.query(create_account_changes_query);

console.log("Database and table created successfully, mentor column added.");
  } catch (err) {
    console.error("Error occurred:", err.message);
  } finally {
    await connection.end();
  }

