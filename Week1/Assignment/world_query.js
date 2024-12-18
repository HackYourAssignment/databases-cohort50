import { createConnection } from 'mysql2/promise';

const connection = await createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'world', 
});


try {
    const select_population_query = `SELECT name FROM country WHERE population > 8000000`;
    const [query1] = await connection.query(select_population_query);
    console.log('Countries with population greater than 8 million:');
    console.log(query1);

    const select_land_query = `SELECT name FROM country WHERE name LIKE "%land%"`;
    const [query2] = await connection.query(select_land_query);
    console.log('Countries with "land" in their names:');
    console.log(query2);

    const select_city_query = `SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000`;
    const [query3] = await connection.query(select_city_query);
    console.log('Cities with population between 500,000 and 1 million:');
    console.log(query3);

    const select_Europe_query = `SELECT name FROM country WHERE continent = "Europe"`;
    const [query4] = await connection.query(select_Europe_query);
    console.log('Countries in Europe:');
    console.log(query4);

    const select_areas_query = `SELECT name FROM country ORDER BY surfaceArea DESC`;
    const [query5] = await connection.query(select_areas_query);
    console.log('Countries ordered by surface area (descending):');
    console.log(query5);

    const select_NLD_query = `SELECT name FROM city WHERE countryCode = "NLD"`;
    const [query6] = await connection.query(select_NLD_query);
    console.log('Cities in the Netherlands:');
    console.log(query6);

    const select_Rotterdam_query = `SELECT population FROM city WHERE name = "Rotterdam"`;
    const [query7] = await connection.query(select_Rotterdam_query);
    console.log('Population of Rotterdam:');
    console.log(query7);

    const select_LIMIT10_query = `SELECT name FROM country ORDER BY surfaceArea DESC LIMIT 10`;
    const [query8] = await connection.query(select_LIMIT10_query);
    console.log('Top 10 countries by surface area:');
    console.log(query8);

    const select_mostPopulation_query = `SELECT name FROM city ORDER BY population DESC LIMIT 10`;
    const [query9] = await connection.query(select_mostPopulation_query);
    console.log('Top 10 most populated cities:');
    console.log(query9);

    const select_sumPopulation_query = `SELECT SUM(population) AS world_population FROM country`;
    const [query10] = await connection.query(select_sumPopulation_query);
    console.log('World population:');
    console.log(query10);

  } catch (error) {
    console.error('Error executing queries:', error.message);
  } finally {
    await connection.end();
  }
