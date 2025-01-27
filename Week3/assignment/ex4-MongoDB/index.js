import { MongoClient, ServerApiVersion } from "mongodb";
import dotenv from "dotenv";
import { seedDatabase } from "./seedDatabase.js";

const dbName = "databaseWeek3";
const collectionName = "bob_ross_episodes";

async function createEpisodeExercise(client) {
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  try {
  
  /**
   * We forgot to add the last episode of season 9. It has this information:
   *
   * episode: S09E13
   * title: MOUNTAIN HIDE-AWAY
   * elements: ["CIRRUS", "CLOUDS", "CONIFER", "DECIDIOUS", "GRASS", "MOUNTAIN", "MOUNTAINS", "RIVER", "SNOWY_MOUNTAIN", "TREE", "TREES"]
   */

  // Write code that will add this to the collection!

  const document = {
    episode: "S09E13",
      title: "MOUNTAIN HIDE-AWAY",
      elements: ["CIRRUS", "CLOUDS", "CONIFER", "DECIDIOUS", "GRASS", "MOUNTAIN", "MOUNTAINS", "RIVER", "SNOWY_MOUNTAIN", "TREE", "TREES"],
  };
  const addEpisodeOfSeason9 = await collection.insertOne(document);

  console.log(
    `Created season 9 episode 13 and the document got the id ${addEpisodeOfSeason9.insertedId}`
  );
} catch (err) {
  console.error("Error adding episode", err);
}
};

async function findEpisodesExercises (client) {
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  
  /**
   * Complete the following exercises.
   * The comments indicate what to do and what the result should be!
   */

  // Find the title of episode 2 in season 2 [Should be: WINTER SUN]
  try {
  const findEpisode = await collection.findOne({episode: "S02E02"});
  
  console.log(
    `The title of episode 2 in season 2 is ${findEpisode.title}`
  );

  // Find the season and episode number of the episode called "BLACK RIVER" [Should be: S02E06]

  const findEpisodeBlackRiver = await collection.findOne({title: "BLACK RIVER"});

  console.log(
    `The season and episode number of the "BLACK RIVER" episode is ${findEpisodeBlackRiver.episode}`
  );

  // Find all of the episode titles where Bob Ross painted a CLIFF [Should be: NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL]

  const findEpisodeCliff = await collection.find({elements: "CLIFF"}).toArray();
  const cliffTitles = findEpisodeCliff.map(episode => episode.title).join(", ");

  console.log(
    `The episodes that Bob Ross painted a CLIFF are ${cliffTitles}`
  );

  // Find all of the episode titles where Bob Ross painted a CLIFF and a LIGHTHOUSE [Should be: NIGHT LIGHT]
  
  const findEpisodeCliffLighthouse = await collection.find({elements: { $all: ["CLIFF", "LIGHTHOUSE"]}}).toArray();
  const episodeCliffLighthouse = findEpisodeCliffLighthouse.map(episode => episode.title).join(", ");
  
  console.log(
    `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${episodeCliffLighthouse}`
  );

} catch (err) {
  console.error("Error finding episode", err);
};
};

async function updateEpisodeExercises(client) {
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  /**
   * There are some problems in the initial data that was filled in.
   * Let's use update functions to update this information.
   *
   * Note: do NOT change the data.json file
   */

  // Episode 13 in season 30 should be called BLUE RIDGE FALLS, yet it is called BLUE RIDGE FALLERS now. Fix that
  
  const updateEpisode13 = await collection.updateOne({episode: "S30E13"}, {$set: {title: "BLUE RIDGE FALLS"}});
  
  console.log(
    `Ran a command to update episode 13 in season 30 and it updated ${updateEpisode13.title} episodes`
  );

  // Unfortunately we made a mistake in the arrays and the element type called 'BUSHES' should actually be 'BUSH' as sometimes only one bush was painted.
  // Update all of the documents in the collection that have `BUSHES` in the elements array to now have `BUSH`
  // It should update 120 episodes!

  const updateBush = await collection.updateMany({elements: "BUSHES"}, { $set: { "elements.$": "BUSH" } });
  
  console.log(
    `Ran a command to update all the BUSHES to BUSH and it updated ${updateBush.title} episodes`
  );
};

async function deleteEpisodeExercise(client) {
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  /**
   * It seems an errand episode has gotten into our data.
   * This is episode 14 in season 31. Please remove it and verify that it has been removed!
   */
  
  const deleteEpisode = await collection.deleteOne({episode: "S31E14"});

  console.log(
    `Ran a command to delete episode and it deleted ${deleteEpisode.title} episodes`
  );
};

async function main() {
  dotenv.config(); 
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    await seedDatabase(client);

    await createEpisodeExercise(client);

    await findEpisodesExercises(client);

    await updateEpisodeExercises(client);

    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

main();

/**
 * In the end the console should read something like this: 

Created season 9 episode 13 and the document got the id 625e9addd11e82a59aa9ff93
The title of episode 2 in season 2 is WINTER SUN
The season and episode number of the "BLACK RIVER" episode is S02E06
The episodes that Bob Ross painted a CLIFF are NIGHT LIGHT, EVENING SEASCAPE, SURF'S UP, CLIFFSIDE, BY THE SEA, DEEP WILDERNESS HOME, CRIMSON TIDE, GRACEFUL WATERFALL
The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are NIGHT LIGHT
Ran a command to update episode 13 in season 30 and it updated 1 episodes
Ran a command to update all the BUSHES to BUSH and it updated 120 episodes
Ran a command to delete episode and it deleted 1 episodes
 
*/
