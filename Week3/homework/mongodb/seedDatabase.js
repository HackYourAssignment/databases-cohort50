const data = require("./data.json");


  @param {MongoClient} client

const seedDatabase = async (client) => {
  const db = client.db("databaseWeek3");
  const collectionName = "bob_ross_episodes";

  
  const hasCollection = await db
    .listCollections({ name: collectionName })
    .hasNext();

  if (hasCollection) {
    console.log(`Dropping existing collection: ${collectionName}`);
    await db.collection(collectionName).drop(); 
  }

  console.log(`Creating new collection: ${collectionName}`);
  const bobRossCollection = await db.createCollection(collectionName);

  
  const documents = data.map((dataItem) => {
    const { EPISODE, TITLE } = dataItem;

    const depictionElementKeys = Object.keys(dataItem).filter(
      (key) => !["EPISODE", "TITLE"].includes(key)
    );
    const depictionElements = depictionElementKeys.filter(
      (key) => dataItem[key] === 1
    );

    return {
      episode: EPISODE,
      
      title: TITLE.replaceAll('"', ""),
      elements: depictionElements,
    };
  });

  console.log(
    `Inserting ${documents.length} documents into ${collectionName}...`
  );

  
  await bobRossCollection.insertMany(documents);

  console.log(`Seeding completed: ${documents.length} episodes added.`);
};

module.exports = {
  seedDatabase,
};
