import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import fs from "fs";
import csvParser from "csv-parser";

dotenv.config();
const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

const importCSV = async () => {
    try {
      await client.connect();
      const db = client.db("assignmentWeek4-Aggregation");
      const collection = db.collection("aggregation");
  
      const results = [];
      fs.createReadStream("population_pyramid_1950-2022.csv")
        .pipe(csvParser())
        .on("data", (data) => {
          results.push({
            Country: data.Country,
            Year: parseInt(data.Year, 10),
            Age: data.Age,
            M: parseInt(data.M, 10),
            F: parseInt(data.F, 10),
          });
        })
        .on("end", async () => {
          try {
            await collection.insertMany(results);
            console.log("Data successfully loaded!");
          } catch (error) {
            console.error("Error inserting data:", error);
          } finally {
            await client.close();
          }  
        });
    } catch (error) {
      console.error("Import error:", error);
      await client.close();
    }
  };
  
  importCSV();