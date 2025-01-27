const csv = require('csvtojson');
const { connectToDB, closeDB } = require('./dbConnection');

const collectionName = 'populationData';

// Function to import CSV data into MongoDB
async function importCSVToMongoDB() {
  const db = await connectToDB();
  const collection = db.collection(collectionName);

  try {
    const jsonArray = await csv().fromFile('population_pyramid_1950-2022.csv');

    const formattedData = jsonArray.map((row) => ({
      Country: row.Country,
      Year: parseInt(row.Year),
      Age: row.Age,
      M: parseInt(row.M),
      F: parseInt(row.F),
    }));

    await collection.insertMany(formattedData);
    console.log('Data successfully imported into MongoDB!');
  } catch (error) {
    console.error('Error importing data:', error);
  }
}

// Function to get total population per year for a given country
async function getPopulationByCountry(country) {
  const db = await connectToDB();
  const collection = db.collection(collectionName);

  try {
    const result = await collection.aggregate([
      { $match: { Country: country } },
      {
        $group: {
          _id: '$Year',
          countPopulation: { $sum: { $add: ['$M', '$F'] } },
        },
      },
      { $sort: { _id: 1 } },
    ]).toArray();

    console.log(result);
    return result;
  } catch (error) {
    console.error('Error fetching population data:', error);
  }
}

// Function to get population by continent, year and age with total population field
async function getContinentPopulation(year, age) {
  const db = await connectToDB();
  const collection = db.collection(collectionName);

  try {
    const result = await collection.aggregate([
      { 
        $match: { 
          Year: year, 
          Age: age, 
          $or: [
            { Country: 'AFRICA' },
            { Country: 'ASIA' },
            { Country: 'EUROPE' },
            { Country: 'LATIN AMERICA AND THE CARIBBEAN' },
            { Country: 'NORTHERN AMERICA' },
            { Country: 'OCEANIA' }
          ]
        }
      },
      {
        $addFields: {
          TotalPopulation: { $add: ["$M", "$F"] }
        }
      }
    ]).toArray();

    console.log(result);
    return result;
  } catch (error) {
    console.error('Error fetching data by year and age:', error);
  }
}

// Main execution function
(async () => {
  try {
    await importCSVToMongoDB();
    await getPopulationByCountry('Netherlands');
    await getContinentPopulation( 2020, '100+');
  } catch (error) {
    console.error('Unexpected error:', error);
  } finally {
    await closeDB();
  }
})();
