
import mysql from 'mysql2/promise';

(async () => {
  try {
  
    const connection = await mysql.createConnection({
      host: 'localhost',
      user: 'hyfuser',
      password: '12345',
      database: 'world'
    });

    console.log('Connected to MySQL server.');

   
    const queries = [
      {
        query: `
          SELECT name
          FROM country
          WHERE population > 8000000;
        `,
        description: 'Countries with population greater than 8 million:',
        display: (result) => result.name
      },
      {
        query: `
          SELECT name
          FROM country
          WHERE name LIKE '%land%';
        `,
        description: 'Countries with "land" in their names:',
        display: (result) => result.name
      },
      {
        query: `
          SELECT name
          FROM city
          WHERE population BETWEEN 500000 AND 1000000;
        `,
        description: 'Cities with population between 500,000 and 1 million:',
        display: (result) => result.name
      },
      {
        query: `
          SELECT name
          FROM country
          WHERE continent = 'Europe';
        `,
        description: 'Countries in Europe:',
        display: (result) => result.name
      },
      {
        query: `
          SELECT name, SurfaceArea
          FROM country
          ORDER BY SurfaceArea DESC;
        `,
        description: 'Countries by Surface Area (Descending):',
        display: (result) => `${result.name} - ${result.SurfaceArea} sq km`
      },
      {
        query: `
          SELECT name
          FROM city
          WHERE CountryCode = 'NLD';
        `,
        description: 'Cities in the Netherlands:',
        display: (result) => result.name
      },
      {
        query: `
          SELECT population
          FROM city
          WHERE name = 'Rotterdam';
        `,
        description: 'Population of Rotterdam:',
        display: (result) => `The population of Rotterdam is: ${result.population}`
      },
      {
        query: `
          SELECT name, SurfaceArea
          FROM country
          ORDER BY SurfaceArea DESC
          LIMIT 10;
        `,
        description: 'Top 10 countries by surface area:',
        display: (result, index) => `${index + 1}. ${result.name} - ${result.SurfaceArea} km²`
      },
      {
        query: `
          SELECT name, Population
          FROM city
          ORDER BY Population DESC
          LIMIT 10;
        `,
        description: 'Top 10 most populated cities:',
        display: (result, index) => `${index + 1}. ${result.name} - ${result.Population}`
      },
      {
        query: `
          SELECT SUM(Population) AS WorldPopulation
          FROM country;
        `,
        description: 'Total population of the world:',
        display: (result) => `World Population: ${result.WorldPopulation}`
      }
    ];


    for (const { query, description, display } of queries) {
      const [results] = await connection.query(query);

      console.log('============================================');
      console.log(description);
      console.log('============================================');

      if (Array.isArray(results)) {
        results.forEach((result, index) => {
          console.log(display(result, index));
        });
      } else {
        console.log(display(results));
      }

    }

    await connection.end();
    console.log('Connection closed.');
  } catch (error) {
    console.error('Error:', error.message);
  }
})();
