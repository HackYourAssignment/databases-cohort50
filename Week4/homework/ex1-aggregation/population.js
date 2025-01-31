const fs = require('fs');
const csvParser = require('csv-parser');
const { MongoClient } = require('mongodb');
require("dotenv").config({ path: '../.env' });

const uri =process.env.MONGODB_URL;
const client = new MongoClient(uri);

async function importCSV() {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    const db = client.db('population_data');
    const collection = db.collection('country_population');

    const filePath = 'population_pyramid_1950-2022.csv';

    const data = [];
      fs.createReadStream(filePath)
      .pipe(csvParser())
      .on('data', (row) => {
        const document = {
          Country: row['Country'],
          Year: parseInt(row['Year']),
          Age: row['Age'],
          M: parseInt(row['M']),
          F: parseInt(row['F']),
        };
        data.push(document);
      })
     .on('end', async () => {
        await collection.insertMany(data);
        console.log("Data imported successfully");
        await client.close();
      });
     } catch (error) {
    console.error("Error importing data:", error);
    await client.close();
  }
}

importCSV();
