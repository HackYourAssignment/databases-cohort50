const { MongoClient } = require('mongodb');
require("dotenv").config({ path: '../.env' });

const uri =process.env.MONGODB_URL;

const client = new MongoClient(uri);

async function getTotalPopulation(countryName) {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    const db = client.db('population_data');
    const collection = db.collection('country_population');

    const pipeline = [
      { $match: { Country: countryName } },
      {
        $group: {
          _id: "$Year",
          countPopulation: { $sum: { $add: ["$M", "$F"] } }
        }
      },
      { $sort: { _id: 1 } }
    ];

const result = await collection.aggregate(pipeline).toArray();
    return result;
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await client.close();
  }
}
(async () => {
    const result = await getTotalPopulation("Netherlands");
    console.log(result); 
})();
