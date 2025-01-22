import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';
import { connectToDatabase } from './dbConnection.js';

export function loadCsvData(filePath) {
  return new Promise((resolve, reject) => {
    const results = [];
    fs.createReadStream(filePath)
      .pipe(csv())
      .on('data', (data) => {
        if (data.Year && data.M && data.F) {
          results.push({
            Year: parseInt(data.Year, 10),
            M: parseInt(data.M, 10),
            F: parseInt(data.F, 10),
          });
        }
      })
      .on('end', () => resolve(results))
      .on('error', (err) => reject(err));
  });
}

async function main() {
  const dbName = process.env.DB_NAME || 'databaseWeek4';
  const collectionName = process.env.COLLECTION_NAME || 'population';

  const client = await connectToDatabase();

  try {
    console.log('Connected to MongoDB.');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const filePath = path.join(
      path.dirname(new URL(import.meta.url).pathname),
      'population_pyramid_1950-2022.csv',
    );
    console.log('Loading CSV data...');
    const data = await loadCsvData(filePath);

    if (data.length === 0) {
      console.error('No valid data found in the CSV file.');
      return;
    }
    const result = await collection.insertMany(data);
  } catch (err) {
    console.error('An error occurred during the process:', err.message);
  } finally {
    await client.close();
  }
}

main().catch(console.error);
