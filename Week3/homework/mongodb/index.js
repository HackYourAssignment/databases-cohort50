const { MongoClient, ServerApiVersion } = require("mongodb");
require("dotenv").config();
const { seedDatabase } = require("./seedDatabase.js");

async function createEpisodeExercise(client) {
  const db = client.db("databaseWeek3");
  const collection = db.collection("bob_ross_episodes");

  const newEpisode = {
    episode: "S09E13",
    title: "MOUNTAIN HIDE-AWAY",
    elements: [
      "CIRRUS",
      "CLOUDS",
      "CONIFER",
      "DECIDIOUS",
      "GRASS",
      "MOUNTAIN",
      "MOUNTAINS",
      "RIVER",
      "SNOWY_MOUNTAIN",
      "TREE",
      "TREES",
    ],
  };

  const result = await collection.insertOne(newEpisode);
  console.log(
    `Created season 9 episode 13 and the document got the id ${result.insertedId}`
  );
}

async function findEpisodesExercises(client) {
  const db = client.db("databaseWeek3");
  const collection = db.collection("bob_ross_episodes");

  const episode2Season2 = await collection.findOne({ episode: "S02E02" });
  console.log(`The title of episode 2 in season 2 is ${episode2Season2.title}`);

  const blackRiverEpisode = await collection.findOne({ title: "BLACK RIVER" });
  console.log(
    `The season and episode number of the "BLACK RIVER" episode is ${blackRiverEpisode.episode}`
  );

  const cliffEpisodes = await collection
    .find({ elements: "CLIFF" })
    .project({ title: 1, _id: 0 })
    .toArray();
  console.log(
    `The episodes that Bob Ross painted a CLIFF are ${cliffEpisodes
      .map((ep) => ep.title)
      .join(", ")}`
  );

  const cliffAndLighthouseEpisodes = await collection
    .find({ elements: { $all: ["CLIFF", "LIGHTHOUSE"] } })
    .project({ title: 1, _id: 0 })
    .toArray();
  console.log(
    `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${cliffAndLighthouseEpisodes
      .map((ep) => ep.title)
      .join(", ")}`
  );
}

async function updateEpisodeExercises(client) {
  const db = client.db("databaseWeek3");
  const collection = db.collection("bob_ross_episodes");

  const updateResult1 = await collection.updateOne(
    { episode: "S30E13" },
    { $set: { title: "BLUE RIDGE FALLS" } }
  );
  console.log(
    `Ran a command to update episode 13 in season 30 and it updated ${updateResult1.modifiedCount} episodes`
  );

  const updateResult2 = await collection.updateMany(
    { elements: "BUSHES" },
    { $set: { "elements.$": "BUSH" } }
  );
  console.log(
    `Ran a command to update all the BUSHES to BUSH and it updated ${updateResult2.modifiedCount} episodes`
  );
}

async function deleteEpisodeExercise(client) {
  const db = client.db("databaseWeek3");
  const collection = db.collection("bob_ross_episodes");

  const deleteResult = await collection.deleteOne({ episode: "S31E14" });
  console.log(
    `Ran a command to delete episode and it deleted ${deleteResult.deletedCount} episodes`
  );
}

async function main() {
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
