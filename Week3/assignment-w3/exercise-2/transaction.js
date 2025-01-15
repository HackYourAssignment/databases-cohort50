import { connection } from './connection.js';

async function transferMoney(senderId, receiverId, amount) {
    const useDatabase = `USE bank_accounts`;
    try {
        await connection.query(useDatabase);
        await connection.beginTransaction();
        const [senderBalance] = await connection.query(
            'SELECT balance FROM account WHERE account_number = ?',
            [senderId]
        );

        if (senderBalance[0].balance < amount) {
            throw new Error('Insufficient funds in sender account');
        }

        await connection.query(
            'UPDATE account SET balance = balance - ? WHERE account_number = ?',
            [amount, senderId]
        );
        await connection.query(
            'UPDATE account SET balance = balance + ? WHERE account_number = ?',
            [amount, receiverId]
        );
        await connection.query(
            'INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (?, ?, CURRENT_DATE(), ?)',
            [senderId, -amount, 'Withdrawal']
        );
        await connection.query(
            'INSERT INTO account_changes (account_number, amount, changed_date, remark) VALUES (?, ?, CURRENT_DATE(), ?)',
            [receiverId, amount, 'Deposit']
        );
        await connection.commit();
        console.log('Transaction successfully completed');
    } catch (error) {
        await connection.rollback();
        console.log(error);
    } finally {
        connection.end;
    }
}

transferMoney(101, 102, 1000);
