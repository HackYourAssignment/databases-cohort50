import { createConnection } from 'mysql2/promise';
import { readFile } from 'fs/promises';

const connection = await createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  multipleStatements: true,
});

const sqlDatabase = await readFile('../databases/world.sql', 'utf-8');
const countryWithPopulationGreat8Million = `SELECT Name FROM country WHERE Population > 8000000`;
const countryWithLandInName = `SELECT Name FROM country WHERE Name LIKE '%land%'`;
const cityWithPopulationBetween500ToMillion = `SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000`;
const countryInEUrope = `SELECT Name FROM country WHERE Continent = 'Europe'`;
const countryDescendingOrderSurfaceArea = `SELECT Name FROM country ORDER BY SurfaceArea DESC`;
const cityInNetherlands = `SELECT city.Name AS CityName, country.Name AS CountryName 
FROM city JOIN country ON city.CountryCode = country.Code
WHERE country.Name = 'Netherlands'`;
const rotterdamPopulation = `SELECT Population FROM city WHERE Name = 'Rotterdam'`;
const countrySurfaceAreaTop10 = `SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10`;
const cityPopulationTop10 = `SELECT Name FROM city ORDER BY Population DESC LIMIT 10`;
const populationNumberOfTheWorld = `SELECT SUM(Population) AS PopulationNumberOfTheWorld FROM country`;

try {
await connection.query(sqlDatabase);

const [resultOfCountryWithPopulationGreat8Million] = 
await connection.query(countryWithPopulationGreat8Million);
console.log('resultOfCountryWithPopulationGreat8Million:', resultOfCountryWithPopulationGreat8Million);

const [resultOfCountryWithLandInName] =
await connection.query(countryWithLandInName);
console.log('resultOfCountryWithLandInName:', resultOfCountryWithLandInName);

const [resultOfCityWithPopulationBetween500ToMillion] =
await connection.query(cityWithPopulationBetween500ToMillion);
console.log('resultOfCityWithPopulationBetween500ToMillion', resultOfCityWithPopulationBetween500ToMillion);

const [resultOfCountryInEUrope] =
await connection.query(countryInEUrope);
console.log('resultOfCountryInEUrope', resultOfCountryInEUrope);

const [resultOfCountryDescendingOrderSurfaceArea] =
await connection.query(countryDescendingOrderSurfaceArea);
console.log('resultOfCountryDescendingOrderSurfaceArea', resultOfCountryDescendingOrderSurfaceArea);

const [resultOfCityInNetherlands] =
await connection.query(cityInNetherlands);
console.log('resultOfCityInNetherlands', resultOfCityInNetherlands);

const [resultOfRotterdamPopulation] =
await connection.query(rotterdamPopulation);
console.log('resultOfRotterdamPopulation', resultOfRotterdamPopulation);

const [resultOfCountrySurfaceAreaTop10] =
await connection.query(countrySurfaceAreaTop10);
console.log('resultOfCountrySurfaceAreaTop10', resultOfCountrySurfaceAreaTop10);

const [resultOfCityPopulationTop10] =
await connection.query(cityPopulationTop10);
console.log('resultOfCityPopulationTop10', resultOfCityPopulationTop10);

const [resultOfPopulationNumberOfTheWorld] =
await connection.query(populationNumberOfTheWorld);
console.log('resultOfPopulationNumberOfTheWorld', resultOfPopulationNumberOfTheWorld);

connection.end();
} catch (err) {
    console.error('Connection error', err)
};