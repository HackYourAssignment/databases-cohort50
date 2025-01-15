import { connection } from './connection.js';

async function insertData() {
    const useDatabase = `USE bank_accounts`;

    const insertAccounts = `
        INSERT INTO account (account_number, balance) VALUES
        (101, 1110.00),
        (102, 2010.50),
        (103, 1500.75),
        (104, 550.00),
        (105, 3330.00)
    `;

    const insertAccountChanges = `
        INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES
        (101, 200.00, '2025-01-14', 'Deposit'),
        (102, -500.00, '2025-01-13', 'Withdrawal'),
        (103, 150.00, '2025-01-14', 'Deposit'),
        (104, -100.00, '2025-01-12', 'Withdrawal'),
        (105, 300.00, '2025-01-10', 'Deposit'),
        (101, -100.00, '2025-01-13', 'Withdrawal'),
        (105, -50.00, '2025-01-11', 'Withdrawal')
    `;

    try {
        await connection.query(useDatabase);
        await connection.query(insertAccounts);
        await connection.query(insertAccountChanges);
    } catch (error) {
        console.error(error);
    } finally {
        connection.end();
    }
}

insertData();
