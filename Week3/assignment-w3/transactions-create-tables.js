import mysql from 'mysql2/promise';

async function setupDatabase() {
    const connection = await mysql.createConnection({
        host: 'localhost',
        user: 'hyfuser',
        password: 'hyfpassword'
    });

    const createDatabase = `CREATE DATABASE IF NOT EXISTS bank_accounts`;
    const useDatabase = `USE bank_accounts`;
    const createAccountTable = `
    CREATE TABLE IF NOT EXISTS account (
    account_number INT PRIMARY KEY, 
    balance DECIMAL(15,2) DEFAULT '0.00'
)`;
    const createAccountChangesTable = `
    CREATE TABLE IF NOT EXISTS account_changes (
    change_number SERIAL PRIMARY KEY, 
    account_number INT NOT NULL, 
    amount DECIMAL(15,2) NOT NULL, 
    changed_date DATE NOT NULL, 
    remark VARCHAR(200),
    FOREIGN KEY (account_number) REFERENCES account(account_number)
)`;
    try {
        await connection.query(createDatabase);
        await connection.query(useDatabase);
        await connection.query(createAccountTable);
        await connection.query(createAccountChangesTable);
    } catch (error) {
        console.error(error);
        connection.end();
    }

    connection.end();
}

setupDatabase();
