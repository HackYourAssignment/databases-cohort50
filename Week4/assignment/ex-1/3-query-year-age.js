import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

async function queryYearAge(year, age) {
    try {
        await client.connect();
        const db = client.db("assignmentWeek4-Aggregation");
        const collection = db.collection("aggregation");
    
        const yearAgePopulation = await collection.aggregate([
            {$match: {Country: { $in: ["AFRICA", "ASIA", 'EUROPE', "LATIN AMERICA AND THE CARIBBEAN", "NORTHERN AMERICA", "OCEANIA"]},
             Year: year, Age:  age}},
            {$addFields: {
                TotalPopulation: { $add: ["$M", "$F"] },
            }},  
            {
                $project: {
                    Country: 1,
                    Year: 1,
                    Age: 1,
                    M: 1,
                    F: 1,
                    TotalPopulation: 1,
                },}  
    ]).toArray()
    console.log(yearAgePopulation);

    } catch (error) {
        console.error("Error querying data:", error)
    } finally { 
        await client.close();
    }
}

queryYearAge(1950, "0-4");