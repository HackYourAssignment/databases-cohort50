const { MongoClient } = require("mongodb");
require("dotenv").config();

async function getTotalPopulationByCountry(country) {
  const uri = process.env.MONGODB_URL || "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db("population_data");
    const collection = db.collection("population");

    const result = await collection
      .aggregate([
        { $match: { Country: country } },
        {
          $group: {
            _id: "$Year",
            countPopulation: { $sum: { $add: ["$M", "$F"] } },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .toArray();

    console.log(`Total population by year for ${country}:`);
    console.table(result);
    return result;
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

getTotalPopulationByCountry("Netherlands");
