import 'dotenv/config';
import { MongoClient } from 'mongodb';
import fs from 'fs';
import csv from 'csv-parser';

const client = new MongoClient(process.env.MONGODB_URL);

async function importCSVtoMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');

        const db = client.db('databaseWeek4');
        const collection = db.collection('population_pyramid_1950-2022');

        const records = [];

        fs.createReadStream('population_pyramid_1950-2022.csv')
            .pipe(csv())
            .on('data', (row) => {
                const record = {
                    Country: row.Country,
                    Year: parseInt(row.Year),
                    Age: row.Age,
                    M: parseInt(row.M),
                    F: parseInt(row.F)
                };
                records.push(record);
            })
            .on('end', async () => {
                console.log('CSV file successfully processed');
                if (records.length > 0) {
                    const result = await collection.insertMany(records);
                    console.log(`${result.insertedCount} records inserted.`);
                }
                client.close();
            });
    } catch (err) {
        console.error('Error:', err);
        client.close();
    }
}

importCSVtoMongoDB();
