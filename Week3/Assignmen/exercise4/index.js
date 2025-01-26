
const { MongoClient, ServerApiVersion } = require("mongodb");
const { seedDatabase } = require('../../homework/mongodb/seedDatabase');

require("dotenv").config();

async function createEpisodeExercise(client) {
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
const result = await client
    .db("databaseWeek3")
    .collection("bob_ross_episodes")
    .insertOne(newEpisode);

  console.log(
    `Created season 9 episode 13 and the document got the id ${result.insertedId}`
  );
}

async function findEpisodesExercises(client) {
  const collection = client.db("databaseWeek3").collection("bob_ross_episodes");

  const episode2Title = await collection.findOne({ episode: "S02E02" });
  console.log(`The title of episode 2 in season 2 is ${episode2Title.title}`);

  const blackRiverEpisode = await collection.findOne({ title: "BLACK RIVER" });
  console.log(`The season and episode number of the "BLACK RIVER" episode is ${blackRiverEpisode.episode}`);

  const cliffEpisodes = await collection.find({ elements: "CLIFF" }).toArray();
  const cliffTitles = cliffEpisodes.map((e) => e.title).join(", ");
  console.log(`The episodes that Bob Ross painted a CLIFF are ${cliffTitles}`);



  const cliffLighthouseEpisodes = await collection
    .find({ elements: { $all: ["CLIFF", "LIGHTHOUSE"] } })
    .toArray();
  const cliffLighthouseTitles = cliffLighthouseEpisodes.map((e) => e.title).join(", ");
  console.log(
    `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${cliffLighthouseTitles}`
  );
}
async function updateEpisodeExercises(client) {
  const collection = client.db("databaseWeek3").collection("bob_ross_episodes");

  const updateTitleResult = await collection.updateOne(
    {  episode: "S30E13" },
    { $set: { title: "BLUE RIDGE FALLS" } }
  );
  console.log(
    `Ran a command to update episode 13 in season 30 and it updated ${updateTitleResult.modifiedCount} episodes`
  );

const updatedBushes = await collection.updateMany(
  
   { elements: "BUSHES" }, 
   { $set: { "elements.$": "BUSH" } } 
);
  console.log(`Ran a command to update all the BUSHES to BUSH and it updated ${updatedBushes.modifiedCount} episodes`);
 }

async function deleteEpisodeExercise(client) {
  const collection = client.db("databaseWeek3").collection("bob_ross_episodes");

  const deleteResult = await collection.deleteOne({
    episode: "S31E14"
  });
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
