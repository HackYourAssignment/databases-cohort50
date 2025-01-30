import dotenv from "dotenv";
dotenv.config();

import { MongoClient } from "mongodb";

const uri = `mongodb+srv://${process.env.USER_DB}:${process.env.PASS_DB}@${process.env.SERVER_DB}/?retryWrites=true&w=majority&appName=cluster`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

export const connectToDatabase = async () => {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const database = client.db("yourDatabaseName");
    const collection = database.collection("episodes");
    return collection;
  } catch (error) {
    console.error("Failed to connect to MongoDB:", error);
  }
};

export const closeDatabase = async () => {
  try {
    await client.close();
    console.log("Disconnected from MongoDB");
  } catch (error) {
    console.error("Failed to disconnect from MongoDB:", error);
  }
};