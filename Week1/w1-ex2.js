import mysql from 'mysql';

const dbConfig = {
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'new_world',
};

const queries = [
  { query: 'SELECT Name FROM country WHERE Population > 8000000;' },
  { query: 'SELECT Name FROM country WHERE Name LIKE land;' },
  {
    query: 'SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000;',
  },
  { query: "SELECT Name FROM country WHERE Continent = 'Europe';" },
  { query: 'SELECT Name FROM country ORDER BY SurfaceArea DESC;' },
  { query: "SELECT Name FROM city WHERE CountryCode = 'NLD';" },
  { query: "SELECT Population FROM city WHERE Name = 'Rotterdam';" },
  { query: 'SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10;' },
  { query: 'SELECT Name FROM city ORDER BY Population DESC LIMIT 10;' },
  { query: 'SELECT SUM(Population) AS WorldPopulation FROM country;' },
];

const connection = mysql.createConnection(dbConfig);

const executeQueries = () => {
  connection.connect((err) => {
    if (err) return;

    queries.forEach(({ query }) => {
      connection.query(query, (error, results) => {
        if (!error) console.table(results);
      });
    });

    connection.end();
  });
};

executeQueries();
