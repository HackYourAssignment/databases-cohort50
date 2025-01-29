import dotenv from 'dotenv';
import { MongoClient } from 'mongodb';
dotenv.config();

const uri = process.env.uri;
if (!uri) {
  throw new Error('MongoDB connection URI is not defined in the .env file');
}
let client; 
let db; 
export const connectToDatabase = async () => {
  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    console.log('Connected to MongoDB Atlas');
    db = client.db('databaseweek4'); 
  }
  return db; 
};

export const closeDatabaseConnection = async () => {
  if (client) {
    await client.close();
    console.log('Connection to MongoDB Atlas closed');
    client = null; 
    db = null;
  }
};

