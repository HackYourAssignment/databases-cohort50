const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();
const { seedDatabase } = require('./seedDatabase.js');

async function createEpisodeExercise(client) {
  const episodeData = {
    episode: 'S09E13',
    title: 'MOUNTAIN HIDE-AWAY',
    elements: [
      'CIRRUS',
      'CLOUDS',
      'CONIFER',
      'DECIDUOUS',
      'GRASS',
      'MOUNTAIN',
      'MOUNTAINS',
      'RIVER',
      'SNOWY_MOUNTAIN',
      'TREE',
      'TREES',
    ],
  };

  const collection = client.db('databaseWeek3').collection('bob_ross_episodes');
  const result = await collection.insertOne(episodeData);

  console.log(
    `Created season 9 episode 13 and the document got the id ${result.insertedId}`,
  );
}

async function findEpisodesExercises(client) {
  const title = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .findOne({ episode: 'S02E02' }, { projection: { title: 1, _id: 0 } });

  console.log(`The title of episode 2 in season 2 is ${title.title}`);

  const episodeInfo = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .findOne({ title: 'BLACK RIVER' }, { projection: { episode: 1, _id: 0 } });

  console.log(
    `The season and episode number of the "BLACK RIVER" episode is ${episodeInfo.episode}`,
  );

  const cliffEpisodes = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .find({ elements: 'CLIFF' }, { projection: { title: 1, _id: 0 } })
    .toArray();

  console.log(
    `The episodes that Bob Ross painted a CLIFF are ${cliffEpisodes
      .map((e) => e.title)
      .join(', ')}`,
  );

  const cliffAndLighthouseEpisodes = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .find(
      { elements: { $all: ['CLIFF', 'LIGHTHOUSE'] } },
      { projection: { title: 1, _id: 0 } },
    )
    .toArray();

  console.log(
    `The episodes that Bob Ross painted a CLIFF and a LIGHTHOUSE are ${cliffAndLighthouseEpisodes
      .map((e) => e.title)
      .join(', ')}`,
  );
}

async function updateEpisodeExercises(client) {
  try {
    const updatedTitle = await client
      .db('databaseWeek3')
      .collection('bob_ross_episodes')
      .updateOne(
        { episode: 'S30E13' },
        { $set: { title: 'BLUE RIDGE FALLS' } },
      );

    console.log(
      `Ran a command to update episode 13 in season 30 and it updated ${updatedTitle.modifiedCount} episodes`,
    );

    const updatedElements = await client
      .db('databaseWeek3')
      .collection('bob_ross_episodes')

      .updateOne(
        { episode: 'S30E13' },
        { $set: { elements: ['trees', 'mountains', 'river'] } },
      );

    console.log(
      `Ran a command to update elements in episode 13 in season 30 and it updated ${updatedElements.modifiedCount} episodes`,
    );
  } catch (error) {
    console.error('Error updating episode:', error.message);
  }
}

async function deleteEpisodeExercise(client) {
  const deleted = await client
    .db('databaseWeek3')
    .collection('bob_ross_episodes')
    .deleteOne({ episode: 'S31E14' });

  console.log(
    `Ran a command to delete episode and it deleted ${deleted.deletedCount} episodes`,
  );
}

async function main() {
  if (process.env.MONGODB_URL == null) {
    throw Error(
      `You did not set up the environment variables correctly. Did you create a '.env' file and add a package to create it?`,
    );
  }
  const client = new MongoClient(process.env.MONGODB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
  });

  try {
    await client.connect();

    // Seed our database
    await seedDatabase(client);

    // CREATE
    await createEpisodeExercise(client);

    // READ
    await findEpisodesExercises(client);

    // UPDATE
    await updateEpisodeExercises(client);

    // DELETE
    await deleteEpisodeExercise(client);
  } catch (err) {
    console.error(err);
  } finally {
    client.close();
  }
}

main();
ls;
