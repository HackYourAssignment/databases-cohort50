
import { connectToDatabase, closeDatabaseConnection } from "./connection.js";

const getPopulationByCountry = async (age, year, Country) => {
  try {
    const db = await connectToDatabase();
    const collection = db.collection("student");

    const northAmerica = await collection.findOne({
      Country: "NORTHERN AMERICA",
    });
    const southAmerica = await collection.findOne({
      Country: "SOUTHERN AMERICA",
    });
    console.log("Northern America:", northAmerica);
    console.log("Southern America:", southAmerica);

    const pipeline = [
      {
        $match: {
          Age: age,
          Year: year,
          Country: { $in: Country }, 
        },
      },
      {
        $addFields: {
          M: { $toDouble: "$M" }, 
          F: { $toDouble: "$F" }, 
        },
      },
      {
        $addFields: {
          TotalPopulation: { $add: ["$M", "$F"] }, 
        },
      },
      {
        $group: {
          _id: "$Country", 
          TotalPopulation: { $sum: "$TotalPopulation" }, 
          M: { $sum: "$M" },
          F: { $sum: "$F" },
          Year: { $first: "$Year" }, 
          Age: { $first: "$Age" }, 
        },
      },
      {
        $sort: { _id: 1 }, 
      },
    ];

  
    const result = await collection.aggregate(pipeline).toArray();
    return result;

  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  } finally {
    await closeDatabaseConnection();
    console.log("Connection closed");
  }
};

async function main() {
  const year = "2020";
  const age = "100+";
  const Country = [
    "AFRICA",
    "LATIN AMERICA AND THE CARIBBEAN",
    "ASIA",
    "EUROPE",
    "NORTHERN AMERICA",
    "OCEANIA",
  ];

  const populationData = await getPopulationByCountry(age, year, Country);
  console.log(populationData);
}

await main();
