import db from './connection.js';

const queries = [
  {
    query: "SELECT Name FROM country WHERE Population > 8000000;",
    description: "Countries with population greater than 8 million."
  },
  {
    query: "SELECT Name FROM country WHERE Name LIKE '%land%';",
    description: "Countries that have 'land' in their names."
  },
  {
    query: "SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000;",
    description: "Cities with population between 500,000 and 1 million."
  },
  {
    query: "SELECT Name FROM country WHERE Continent = 'Europe';",
    description: "Countries in Europe."
  },
  {
    query: "SELECT Name FROM country ORDER BY SurfaceArea DESC;",
    description: "Countries in descending order of their surface areas."
  },
  {
    query: "SELECT Name FROM city WHERE CountryCode = 'NLD';",
    description: "Cities in the Netherlands."
  },
  {
    query: "SELECT Population FROM city WHERE Name = 'Rotterdam';",
    description: "Population of Rotterdam."
  },
  {
    query: "SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10;",
    description: "Top 10 countries by Surface Area."
  },
  {
    query: "SELECT Name FROM city ORDER BY Population DESC LIMIT 10;",
    description: "Top 10 most populated cities."
  },
  {
    query: "SELECT SUM(Population) AS WorldPopulation FROM country;",
    description: "Population number of the world."
  }
];

const executeQuery = async (query) => {
  try {
    const [results] = await db.query(query);
    return results;
  } catch (err) {
    throw new Error(`Error executing query: ${err.message}`);
  }
};

const executeAllQueries = async () => {
  try {
    for (const { query, description } of queries) {
      const results = await executeQuery(query);
      console.log(`\n${description}`);
      console.log(results);
    }
  } catch (error) {
    console.error(error.message);
  } finally {
    await db.end();
  }
};

executeAllQueries();

