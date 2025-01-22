Exercise 3 : SQL injection

You are given the below function which returns the population of a specific country from the [world](../Week2/world.sql)
database.

```js
function getPopulation(Country, name, code, cb) {
  // assuming that connection to the database is established and stored as conn
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
    function (err, result) {
      if (err) cb(err);
      if (result.length == 0) cb(new Error("Not found"));
      cb(null, result[0].name);
    }
  );
}
```

1. Give an example of a value that can be passed as `name` and `code` that would take advantage of SQL-injection and (
   fetch all the records in the database)

ANSWER:

As the `Name`, the attacker can pass `'' OR 'HYF'='HYF';`  , which will be evaluated as `TRUE`. This skips the `Name` condition, and the SQL will execute the code in the `code` variable. The attacker can use `''; DROP TABLE Country;` to drop the `Country` table or `''; SELECT * FROM Country` to gain all data. To make sure the rest of the query doesn't affect the attack, the attacker can use the comment symbol `--` to end the SQL statement, allowing the malicious query to run.

2. Rewrite the function so that it is no longer vulnerable to SQL injection

```js
async function getPopulation(conn, tableName, countryName, countryCode) {
  try {
    const query = `SELECT Population FROM ?? WHERE Name = ? AND code = ?`;
    const [result] = await conn.execute(query, [tableName, countryName, countryCode]);
    
    if (result.length === 0) {
      throw new Error("Population not found for the given parameters");
    }
    
    return result[0].Population;
  } catch (error) {
    console.error('Error executing query:', error.message);
    throw error;
  } finally {
    if (conn) {
      await conn.end();
    }
  }
}
```
