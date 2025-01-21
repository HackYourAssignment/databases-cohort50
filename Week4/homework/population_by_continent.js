const { MongoClient } = require("mongodb");
require("dotenv").config();

async function getPopulationByContinent(year, ageGroup) {
  const uri = process.env.MONGODB_URL || "mongodb://localhost:27017";
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log("Connected to MongoDB!");

    const db = client.db("population_data");
    const collection = db.collection("population");

    const result = await collection
      .aggregate([
        { $match: { Year: year, Age: ageGroup } },
        {
          $addFields: {
            TotalPopulation: { $add: ["$M", "$F"] },
          },
        },
        { $group: { _id: "$Country", data: { $push: "$$ROOT" } } },
        { $sort: { _id: 1 } },
      ])
      .toArray();

    console.log(
      `Population details for year ${year} and age group ${ageGroup}:`
    );
    console.table(result);
    return result;
  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
  }
}

getPopulationByContinent(2021, "110+");
