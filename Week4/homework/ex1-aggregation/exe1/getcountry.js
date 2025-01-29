import { connectToDatabase } from './connection.js';
const getPopulationByCountry = async (country) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('student');

    const pipeline = [
      { $match: { Country: country } },
      {
        $addFields: {
          M: { $toDouble: '$M' }, 
          F: { $toDouble: '$F' }, 
        },
      },
      {
        $group: {
          _id: '$Year', 
          countPopulation: { $sum: { $add: ['$M', '$F'] } },
        },
      },
      { $sort: { _id: 1 } }, 
    ];

    const result = await collection.aggregate(pipeline).toArray();
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  }
};

  const country = 'Netherlands';
  const populationData = await getPopulationByCountry(country);
  console.log(populationData);


