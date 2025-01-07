require('dotenv').config();
const mysql = require('mysql2/promise');

(async () => {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'new_world',
    });

    console.log('Connected to MySQL!');

    const queries = [
      {
        question: "What are the names of countries with population greater than 8 million?",
        sql: "SELECT name FROM country WHERE population > 8000000;",
      },
      {
        question: "What are the names of countries that have 'land' in their names?",
        sql: "SELECT name FROM country WHERE name LIKE '%land%';",
      },
      {
        question: "What are the names of the cities with population between 500,000 and 1 million?",
        sql: "SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000;",
      },
      {
        question: "What's the name of all the countries on the continent ‘Europe’?",
        sql: "SELECT name FROM country WHERE continent = 'Europe';",
      },
      {
        question: "List all the countries in descending order of their surface areas.",
        sql: "SELECT name FROM country ORDER BY surfaceArea DESC;",
      },
      {
        question: "What are the names of all the cities in the Netherlands?",
        sql: "SELECT name FROM city WHERE countryCode = 'NLD';",
      },
      {
        question: "What is the population of Rotterdam?",
        sql: "SELECT population FROM city WHERE name = 'Rotterdam';",
      },
      {
        question: "What's the top 10 countries by Surface Area?",
        sql: "SELECT name, surfaceArea FROM country ORDER BY surfaceArea DESC LIMIT 10;",
      },
      {
        question: "What's the top 10 most populated cities?",
        sql: "SELECT name, population FROM city ORDER BY population DESC LIMIT 10;",
      },
      {
        question: "What is the population number of the world?",
        sql: "SELECT SUM(population) AS world_population FROM country;",
      },
    ];

    for (const query of queries) {
      const [results] = await connection.query(query.sql);
      console.log(`\n${query.question}`);
      console.table(results);
    }

    await connection.end();
    console.log('Connection closed.');
  } catch (err) {
    console.error('Error:', err);
  }
})();
