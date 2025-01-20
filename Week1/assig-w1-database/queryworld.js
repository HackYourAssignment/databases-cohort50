
import mysql from 'mysql2';


const connection = mysql.createConnection({
  host: 'localhost',       
  user: 'hyfuser',         
  password: '12345',     
  database: 'world'        
});


connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the MySQL server: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL server with id ' + connection.threadId);
});


const query = `
  SELECT name
  FROM country
  WHERE population > 8000000;
`;

connection.query(query, (error, results) => {
  if (error) {
    console.error('Error querying the database: ' + error.stack);
    return;
  }
  console.log('============================================')
  console.log('Countries with population greater than 8 million:');
  console.log('============================================')
  results.forEach((country) => {
    console.log(country.name);
   
  });
   console.log('============================================')
});



const queryLand = `
  SELECT name
  FROM country
  WHERE name LIKE '%land%';
`;

connection.query(queryLand, (error, results) => {
  if (error) {
    console.error('Error querying the database: ' + error.stack);
    return;
  }

  console.log('Countries with "land" in their names:');
  console.log('============================================')
  results.forEach((land) => {
    console.log(land.name);
  });
});

const queryPopulation = `
  SELECT name
  FROM city
  WHERE population BETWEEN 500000 AND 1000000;
`;

connection.query(queryPopulation, (error, results) => {
  if (error) {
    console.error('Error querying the database: ' + error.stack);
    return;
  }
  console.log('============================================')
  console.log('Cities with population between 500,000 and 1 million:');
  console.log('============================================')
  results.forEach((city) => {
    console.log(city.name);
  });
 
});

const queryEurope = `
  SELECT name
  FROM country
  WHERE continent = 'Europe';
`;

connection.query(queryEurope, (error, results) => {
  if (error) {
    console.error('Error querying the database: ' + error.stack);
    return;
  }
  console.log('============================================')
  console.log('Countries in Europe:');
  console.log('============================================')
  results.forEach((country) => {
    console.log(country.name);
  });
});

const querySurfaceArea = `
  SELECT name, SurfaceArea
  FROM country
  ORDER BY SurfaceArea DESC;
`;

connection.query(querySurfaceArea, (error, results) => {
  if (error) {
    console.error('Error querying the database: ' + error.stack);
    return;
  }
  console.log('============================================')
  console.log('Countries by Surface Area (Descending):');
  console.log('============================================')
  results.forEach((country) => {
    console.log(`${country.name} - ${country.SurfaceArea} sq km`);
  });
});
const queryNetherlands = `
  SELECT name
  FROM city
  WHERE CountryCode = 'NLD';
`;

connection.query(queryNetherlands, (error, results) => {
  if (error) {
    console.error('Error querying the database: ' + error.stack);
    return;
  }
  console.log('============================================')
  console.log('Cities in the Netherlands:');
  console.log('============================================')
  results.forEach((city) => {
    console.log(city.name);
  });
});
const queryRotterdam = `
  SELECT population
  FROM city
  WHERE name = 'Rotterdam';
`;

connection.query(queryRotterdam, (error, results) => {
  if (error) {
    console.error('Error querying the database: ' + error.stack);
    return;
  }

  if (results.length > 0) {
    console.log('============================================')
    console.log(`The population of Rotterdam is: ${results[0].population}`);
    console.log('============================================')
  } else {
    console.log('City not found.');
  }
});
const queryTop10 = `
  SELECT name, SurfaceArea
  FROM country
  ORDER BY SurfaceArea DESC
  LIMIT 10;
`;

connection.query(queryTop10, (error, results) => {
  if (error) {
    console.error('Error querying the database: ' + error.stack);
    return;
  }
  console.log('============================================')
  console.log('Top 10 countries by surface area:');
  console.log('============================================')
  results.forEach((country, index) => {
    console.log(`${index + 1}. ${country.name} - ${country.SurfaceArea} km²`);
  });
});

const queryTopPopulatedCity = `
  SELECT Name, Population
  FROM city
  ORDER BY Population DESC
  LIMIT 10;
`;

connection.query(queryTopPopulatedCity, (error, results) => {
  if (error) {
    console.error('Error querying the database: ' + error.stack);
    return;
  }
  console.log('============================================')
  console.log('Top 10 most populated cities:');
  console.log('============================================')
  results.forEach((city, index) => {
    console.log(`${index + 1}. ${city.Name} - ${city.Population}`);
  });
});

const queryWorldPopulation = `
  SELECT SUM(Population) AS WorldPopulation
  FROM country;
`;

connection.query(queryWorldPopulation, (error, results) => {
  if (error) {
    console.error('Error querying the database: ' + error.stack);
    return;
  }
  console.log('============================================')
  console.log('Total population of the world: ' + results[0].WorldPopulation);
  console.log('============================================')
});


connection.end();
