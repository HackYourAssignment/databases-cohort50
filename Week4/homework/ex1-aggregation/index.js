import 'dotenv/config';
import { MongoClient } from 'mongodb';
import fs from 'fs';
import csv from 'csv-parser';

const client = new MongoClient(process.env.MONGODB_URL);

const db = client.db('databaseWeek4');
const collection = db.collection('population_pyramid_1950-2022');

async function importCSVtoMongoDB() {
    try {
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
            });
    } catch (err) {
        console.error('Error:', err);
    }
}

async function totalPopulationByCountry(country) {
    try {
        const result = await collection
            .aggregate([
                { $match: { Country: country } },
                {
                    $group: {
                        _id: '$Year',
                        countPopulation: { $sum: { $add: ['$M', '$F'] } }
                    }
                },
                { $sort: { _id: 1 } }
            ])
            .toArray();

        console.log(result);

        return result;
    } catch (err) {
        console.error('Error:', err);
    }
}

async function continentDataByYearAndAge(year, age) {
    try {
        const continents = [
            'AFRICA',
            'ASIA',
            'EUROPE',
            'LATIN AMERICA AND THE CARIBBEAN',
            'NORTHERN AMERICA',
            'OCEANIA'
        ];
        const result = await collection
            .aggregate([
                {
                    $match: {
                        Year: year,
                        Age: age,
                        Country: { $in: continents }
                    }
                },
                {
                    $addFields: {
                        TotalPopulation: { $add: ['$M', '$F'] }
                    }
                }
            ])
            .toArray();

        console.log(result);

        return result;
    } catch (error) {
        console.error(error);
    }
}

async function main() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
        await importCSVtoMongoDB();
        await totalPopulationByCountry('Netherlands');
        await continentDataByYearAndAge(2020, '100+');
    } catch (err) {
        console.error('Error:', err);
    } finally {
        await client.close();
        console.log('Disconnected!');
    }
}

main();
