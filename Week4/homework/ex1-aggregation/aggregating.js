import { connectToDatabase } from './dbConnection.js';

async function getPopulationByCountry(country) {
  const client = await connectToDatabase();
  const db = client.db('population_data');
  const collection = db.collection('population');

  try {
    const result = await collection
      .aggregate([
        { $match: { Country: country } },
        {
          $group: {
            _id: '$Year',
            countPopulation: { $sum: { $add: ['$M', '$F'] } },
          },
        },
        { $sort: { _id: 1 } },
      ])
      .toArray();

    return result;
  } catch (error) {
    console.error('Error fetching population data:', error);
  } finally {
    await client.close();
  }
}

async function getContinentPopulationByYearAge(year, age) {
  const client = await connectToDatabase();
  const db = client.db('population_data');
  const collection = db.collection('population');

  try {
    const result = await collection
      .aggregate([
        { $match: { Year: year, Age: age } },
        {
          $project: {
            Country: 1,
            Year: 1,
            Age: 1,
            M: 1,
            F: 1,
            TotalPopulation: { $add: ['$M', '$F'] },
          },
        },
      ])
      .toArray();

    return result;
  } catch (error) {
    console.error('Error fetching continent data:', error);
  } finally {
    await client.close();
  }
}
