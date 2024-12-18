import mysql from 'mysql2/promise';

async function connectToDatabase() {
    return await mysql.createConnection({
        host: 'localhost',
        user: 'hyfuser',
        password: 'hyfpassword',
        database: 'world'
    });
}

async function executeQuery(query) {
    const connection = await connectToDatabase();
    try {
        const [rows] = await connection.query(query);
        return rows;
    } catch (error) {
        console.error('Error executing query:', error.message);
        return null;
    } finally {
        await connection.end();
    }
}

async function queryCountriesPopulation() {
    const query = `SELECT Name FROM country WHERE Population >= 8000000`;
    const rows = await executeQuery(query);
    console.log('Countries with population greater than 8 million:');
    rows.forEach((row) => console.log(row.Name));
}

async function queryCountriesWithLandInName() {
    const query = `SELECT Name FROM country WHERE Name LIKE '%land%'`;
    const rows = await executeQuery(query);
    console.log('Names of the countries that have “land” in their names:');
    rows.forEach((row) => console.log(row.Name));
}

async function queryCitiesWithRange() {
    const query = `SELECT Name FROM city WHERE Population BETWEEN 500000 AND 1000000`;
    const rows = await executeQuery(query);
    console.log(
        'Names of the cities with population in between 500,000 and 1 million:'
    );
    rows.forEach((row) => console.log(row.Name));
}

async function queryEuropeCountries() {
    const query = `SELECT Name FROM country WHERE Continent='Europe'`;
    const rows = await executeQuery(query);
    console.log(`Names of all the countries on the continent 'Europe':`);
    rows.forEach((row) => console.log(row.Name));
}

async function queryCountriesBySurfaceArea() {
    const query = `SELECT Name FROM country ORDER BY SurfaceArea DESC`;
    const rows = await executeQuery(query);
    console.log(
        'List all the countries in the descending order of their surface areas:'
    );
    rows.forEach((row) => console.log(row.Name));
}

async function queryCitiesInNetherlands() {
    const query = `SELECT Name FROM city WHERE CountryCode = 'NLD'`;
    const rows = await executeQuery(query);
    console.log('Names of all the cities in the Netherlands:');
    rows.forEach((row) => console.log(row.Name));
}

async function queryPopulationOfRotterdam() {
    const query = `SELECT Population FROM city WHERE Name = 'Rotterdam'`;
    const rows = await executeQuery(query);
    console.log('Population of Rotterdam?', rows[0].Population);
}

async function queryTop10CountriesBySurfaceArea() {
    const query = `SELECT Name FROM country ORDER BY SurfaceArea DESC LIMIT 10`;
    const rows = await executeQuery(query);
    console.log('Top 10 countries by Surface Area?');
    rows.forEach((row) => console.log(row.Name));
}

async function queryMostPopulatedCities() {
    const query = `SELECT Name FROM city ORDER BY Population DESC LIMIT 10`;
    const rows = await executeQuery(query);
    console.log('Top 10 most populated cities:');
    rows.forEach((row) => console.log(row.Name));
}

async function queryWorldPopulation() {
    const query = `SELECT SUM(Population) AS WorldPopulation FROM country`;
    const rows = await executeQuery(query);
    console.log('Total population of the world:', rows[0].WorldPopulation);
}

async function executeAllQueries() {
    try {
        await queryCountriesPopulation();
        await queryCountriesWithLandInName();
        await queryCitiesWithRange();
        await queryEuropeCountries();
        await queryCountriesBySurfaceArea();
        await queryCitiesInNetherlands();
        await queryPopulationOfRotterdam();
        await queryTop10CountriesBySurfaceArea();
        await queryMostPopulatedCities();
        await queryWorldPopulation();
    } catch (error) {
        console.error('Error in one of the queries:', error.message);
    }
}

executeAllQueries();
