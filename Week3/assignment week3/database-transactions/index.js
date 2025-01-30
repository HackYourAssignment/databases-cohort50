import db from './connection.js';
import { createTables } from './createTables.js';
import { insertValues } from './insertSampleData.js';
import { transferMoney } from './transaction.js';

async function main() {
  try {
    console.log('Creating tables...');
    await createTables();

    console.log('Inserting sample data...');
    await insertValues();

    console.log('Performing transaction...');
    await transferMoney();
  } catch (error) {
    console.error('Error in main:', error);
  } finally {
    await db.end();
    console.log('Database connection closed.');
  }
}

main();
