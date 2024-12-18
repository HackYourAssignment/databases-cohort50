const mysql = require("mysql2");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "world",
});

function queryDatabase(query) {
  connection.execute(query, (err, results) => {
    if (err) {
      console.error(err);
    } else {
      console.log(results);
    }
  });
}

const query1 = `
  SELECT name FROM country WHERE population > 8000000;
`;
queryDatabase(query1);

const query2 = `
  SELECT name FROM country WHERE name LIKE '%land%';
`;
queryDatabase(query2);

const query3 = `
  SELECT name FROM city WHERE population BETWEEN 500000 AND 1000000;
`;
queryDatabase(query3);

const query4 = `
  SELECT name FROM country WHERE continent = 'Europe';
`;
queryDatabase(query4);

const query5 = `
  SELECT name FROM country ORDER BY surfaceArea DESC;
`;
queryDatabase(query5);

const query6 = `
  SELECT name FROM city WHERE countryCode = 'NLD';
`;
queryDatabase(query6);

const query7 = `
  SELECT population FROM city WHERE name = 'Rotterdam';
`;
queryDatabase(query7);

const query8 = `
  SELECT name FROM country ORDER BY surfaceArea DESC LIMIT 10;
`;
queryDatabase(query8);

const query9 = `
  SELECT name FROM city ORDER BY population DESC LIMIT 10;
`;
queryDatabase(query9);

const query10 = `
  SELECT SUM(population) AS world_population FROM country;
`;
queryDatabase(query10);

connection.end();
