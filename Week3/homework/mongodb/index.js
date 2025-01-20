const { MongoClient, ServerApiVersion } = require("mongodb");
require('dotenv').config();

const { seedDatabase } = require("./seedDatabase.js");

async function createEpisodeExercise(client) {


  const newEpisode = {
    EPISODE: "S09E13",
    title: "MOUNTAIN HIDE-AWAY",
    elements: [
      "CIRRUS", "CLOUDS", "CONIFER", "DECIDIOUS", "GRASS",
      "MOUNTAIN", "MOUNTAINS", "RIVER", "SNOWY_MOUNTAIN", "TREE", "TREES"
    ]
  };

  const result = await client.db("databaseweek3").collection("bob_ross_episodes").insertOne(newEpisode);


  console.log(
    `Created season 9 episode 13 and the document got the id ${result.insertedId}`
  );

  }
async function findEpisodesExercises(client) {
  const episode2Title = await client
  .db("databaseweek3")
  .collection("bob_ross_episodes")
  .findOne({  episode: "S02E02" });
  if (!episode2Title) {
    console.log("No documents found in the collection.");
  } else {
    console.log(`The title of episode 2 in season 2 is ${episode2Title.title}`);
  }
  

 
const blackRiverEpisode = await client
  .db("databaseweek3")
  .collection("bob_ross_episodes")
  .findOne({ title: "BLACK RIVER" }); 

if (!blackRiverEpisode) {
  console.log("The 'BLACK RIVER' episode was not found in the collection.");
} else {
  console.log(
    `The season and episode number of the "BLACK RIVER" episode is ${blackRiverEpisode.episode}`
  );
}

  const cliffEpisodes = await client
  .db("databaseweek3")
  .collection("bob_ross_episodes")
  .find({ elements: "CLIFF" })
  .toArray();

console.log(
  `The episodes that Bob Ross painted a CLIFF are ${cliffEpisodes
    .map((ep) => ep.title)
    .join(", ")}`
);


  const cliffAndLighthouseEpisodes = await client
  .db("databaseweek3")
  .collection("bob_ross_episodes")
  .find({ elements: { $all: ["CLIFF", "LIGHTHOUSE"] } })
  .toArray();
  if (cliffAndLighthouseEpisodes.length === 0) {
    console.log("No episodes found where Bob Ross painted both a CLIFF and a LIGHTHOUSE.");
  } else {
    console.log(
      `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are: ${cliffAndLighthouseEpisodes
        .map((ep) => ep.title)
        .join(", ")}`
    );
  }
}


async function updateEpisodeExercises(client) {

  const result1 = await client
  .db("databaseweek3")
  .collection("bob_ross_episodes")
  .updateOne(
    { episode: "S30E13" },
    { $set: { title: "BLUE RIDGE FALLS" } }
  );

console.log(
  `Ran a command to update episode 13 in season 30 and it updated ${result1.modifiedCount} episodes`
);

  const result2 = await client
  .db("databaseweek3")
  .collection("bob_ross_episodes")
  .updateMany(
    { elements: "BUSHES" },
    { $set: { "elements.$": "BUSH" } }
  );

console.log(
  `Ran a command to update all the BUSHES to BUSH and it updated ${result2.modifiedCount} episodes`
);

}

async function deleteEpisodeExercise(client) {
  const result = await client
  .db("databaseweek3")
  .collection("bob_ross_episodes")
  .deleteOne({ episode: "S31E14" });

console.log(
  `Ran a command to delete episode and it deleted ${result.deletedCount} episodes`
);

}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
   
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();
console.log('connected to the database ')

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
