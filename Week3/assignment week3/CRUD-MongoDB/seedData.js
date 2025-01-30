import { connectToDatabase, closeDatabase } from "./connect.js";
import fs from 'fs/promises';

const data = JSON.parse(await fs.readFile("./data.json", "utf-8"));

export const seedData = async () => {
  try {
    const collection = await connectToDatabase();

    if (!collection) {
      throw new Error("No collection found.");
    }

    await collection.deleteMany({});
    console.log("Collection cleared.");
   
    const result = await collection.insertMany(data);
    console.log(`${result.insertedCount} episodes inserted.`);
  } catch (error) {
    console.error("Error during seeding:", error);
  }

  closeDatabase();
};