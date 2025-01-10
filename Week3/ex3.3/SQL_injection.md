### 3.3. Exercise 3 : SQL injection

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

    SQL Injection example:
        1.value for name: '; DROP TABLE ${Country}; --
        2.value for code: OR '1'='1

2. Rewrite the function so that it is no longer vulnerable to SQL injection
```js
function getPopulation(Country, name, code, cb) {
  const query = `SELECT Population FROM ?? WHERE Name = ? AND code = ?`;

  conn.query(query, [Country, name, code], function (err, result) {
    if (err) return cb(err);
    if (result.length === 0) return cb(new Error("Not found"));
    cb(null, result[0].Population); // Return Population instead of name
  });
}    
```