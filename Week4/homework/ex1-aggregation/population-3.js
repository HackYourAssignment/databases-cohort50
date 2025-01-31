const { MongoClient } = require('mongodb');
require("dotenv").config({ path: '../.env' });

const uri =process.env.MONGODB_URL;

const client = new MongoClient(uri);

async function getPopulationByContinent(year, ageGroup) {
  try {
    await client.connect();
    console.log("Connected to MongoDB Atlas");

    const db = client.db('population_data'); 
    const collection = db.collection('country_population'); 
    
    const continents = [
            'AFRICA',
            'ASIA',
            'EUROPE',
            'LATIN AMERICA AND THE CARIBBEAN',
            'NORTHERN AMERICA',
            'OCEANIA'
        ];
const result = await collection.aggregate([
{
        $match: {
          Year: year,
          Age:  ageGroup,
          Country: { $in: continents } 
        }
      },
      {
        $addFields: {
          TotalPopulation: { $add: ['$M', '$F'] } // إضافة مجموع السكان
        }
      }
    ]).toArray();

console.log(result);
    return result;

  } catch (err) {
    console.error('Error:', err);
    return [];
  } finally {
    await client.close();
  }
}

getPopulationByContinent(2020, "100+");
