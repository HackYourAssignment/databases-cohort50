import { seedData } from "./seedData.js";
import { connectToDatabase, closeDatabase } from "./connect.js";
import { ObjectId } from "mongodb";

const getAllEpisodes = async () => {
  const collection = await connectToDatabase();
  return await collection.find({}).toArray();
};

const addEpisode = async (episode) => {
  const collection = await connectToDatabase();
  const result = await collection.insertOne(episode);
  return { ...episode, _id: result.insertedId };
};

const updateEpisode = async (id, updates) => {
  const collection = await connectToDatabase();
  const result = await collection.updateOne(
    { _id: new ObjectId(id) },
    { $set: updates }
  );
  return result.modifiedCount;
};

const deleteEpisode = async (id) => {
  const collection = await connectToDatabase();
  const result = await collection.deleteOne({ _id: new ObjectId(id) });
  return result.deletedCount;
};

const main = async () => {
  try {
    await seedData();

    // Retrieve all episodes
    const episodes = await getAllEpisodes();
    console.log("Episodes:", episodes);

    // Add a new episode
    const newEpisode = { title: "Season 2, Episode 1", elements: ["river", "mountain"] };
    const inserted = await addEpisode(newEpisode);
    console.log("Inserted:", inserted);

    // Update an episode
    const updatedCount = await updateEpisode(inserted._id.toString(), { title: "Updated Episode" });
    console.log("Updated count:", updatedCount);

    // Delete an episode
    const deletedCount = await deleteEpisode(inserted._id.toString());
    console.log("Deleted count:", deletedCount);
  } catch (error) {
    console.error("Error:", error);
  } finally {
    await closeDatabase();
  }
};

main();
