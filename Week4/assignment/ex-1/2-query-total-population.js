import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";

dotenv.config();
const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

async function queryTotalPopulation(country) {
    try {
        await client.connect();
        const db = client.db("assignmentWeek4-Aggregation");
        const collection = db.collection("aggregation");
    
        const totalPopulation = await collection.aggregate([
            {$match: {Country: country}},
            {$group: {
                _id: "$Year",
                countPopulation: {$sum: { $add: ["$M", "$F"]}}
            }
            },
            {$project: {
                _id: 0,
                Year: "$_id",
                countPopulation: 1}
            }
        ]).sort({Year: 1})
    .toArray()

        console.log(totalPopulation);
} catch (error) {
    console.error("Error querying data:", error)
} finally {
    await client.close();
}
}

queryTotalPopulation("Netherlands");