import { connectToDatabase, closeDatabaseConnection } from './connection.js';
const getPopulationByCountry = async (age, year) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection('student'); 

    const pipeline = [
      {
        $match: {
          Age: age, 
          Year: year, 
        },
      },
      {
        $addFields: {
          M: { $toDouble: '$M' }, 
          F: { $toDouble: '$F' }, 
        },
      },
      {
        $addFields: {
          TotalPopulation: { $add: ['$M', '$F'] }, 
        },
      },
      {
        $match: {
          Country: {
            $in: [
              'AFRICA',
              'LATIN AMERICA AND THE CARIBBEAN',
              'ASIA',
              'EUROPE',
              'NORTH AMERICA',
              'SOUTH AMERICA',
              'OCEANIA',
            ],
          },
        },
      },
      {
        $group: {
          _id: '$Country',
          TotalPopulation: { $sum: '$TotalPopulation' },
          M: { $sum: '$M' },
          F: { $sum: '$F' },
          Year: { $first: '$Year' },
          Age: { $first: '$Age' },
        },
      },
      {
        $project: {
          _id: 0,
          Country: '$_id',
          TotalPopulation: 1,
          M: 1,
          F: 1,
          Year: 1,
          Age: 1,
        },
      },
      {
        $sort: { Country: 1 },
      },
    ];

    const result = await collection.aggregate(pipeline).toArray();
    return result;
  } catch (error) {
    console.error('Error fetching data:', error);
    throw error;
  } finally {
    await closeDatabaseConnection(); 
    console.log('Connection closed');
  }
};

async function  main() {
const year = '2020';
  const age = '100+';

    const populationData = await getPopulationByCountry(age, year);
    console.log(populationData);

}
await main()
  

