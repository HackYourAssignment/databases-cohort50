// 1. Give an example of a value that can be passed as `name` and `code` that would take advantage of SQL-injection and (
//     fetch all the records in the database)
// SELECT Population FROM country WHERE Name = '' OR '1'='1' AND code = '' OR '1'='1'

//  2. Rewrite the function so that it is no longer vulnerable to SQL injection

import mysql from 'mysql2/promise';

async function main() {
    const conn = await mysql.createConnection({
        host: 'localhost',
        user: 'hyfuser',
        password: 'hyfpassword',
        database: 'new_world'
    });

    const allowedTables = {
        country: 'country',
        city: 'city'
    };

    async function getPopulation(table, name, code, cb) {
        try {
            if (!allowedTables[table]) {
                throw new Error('Invalid table name');
            }

            const query = `SELECT Population FROM \`${allowedTables[table]}\` WHERE Name = ? AND Code = ?`;
            const [result] = await conn.execute(query, [name, code]);

            if (result.length === 0) {
                throw new Error('Not found');
            }

            cb(null, result[0].Population);
        } catch (err) {
            cb(err);
        } finally {
            conn.end();
        }
    }

    getPopulation('country', 'Ukraine', 'UKR', function (err, population) {
        if (err) {
            console.error('Error:', err.message);
            return;
        }
        console.log('Population of Ukraine:', population);
    });
}

main();
