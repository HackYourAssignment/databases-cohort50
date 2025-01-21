const { MongoClient } = require("mongodb");
const fs = require("fs");
const csv = require("csv-parser");
require("dotenv").config();

async function loadCSVToMongoDB() {
  const uri = process.env.MONGODB_URL || "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db("population_data");
    const collection = db.collection("population");

    const data = [];
    const csvFilePath = "./population_pyramid_1950-2022.csv";

    fs.createReadStream(csvFilePath)
      .pipe(csv())
      .on("data", (row) => {
        data.push({
          Country: row.Country,
          Year: parseInt(row.Year),
          Age: row.Age,
          M: parseInt(row.M),
          F: parseInt(row.F),
        });
      })
      .on("end", async () => {
        console.log("CSV file successfully processed.");
        const result = await collection.insertMany(data);
        console.log(
          `Inserted ${result.insertedCount} documents into the database.`
        );
        await client.close();
        console.log("Connection closed.");
      });
  } catch (err) {
    console.error("Error:", err);
    await client.close();
  }
}

loadCSVToMongoDB();
