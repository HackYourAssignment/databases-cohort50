
// The following code is vulnerable to SQL injection.

function getPopulation(Country, name, code, cb) {
    conn.query(
      `SELECT Population FROM ${Country} WHERE Name = '${name}' and code = '${code}'`,
      function (err, result) {
        if (err) cb(err);
        if (result.length == 0) cb(new Error("Not found"));
        cb(null, result[0].name);
      }
    );
  };

  getPopulation("The Netherland", "'' OR '1'='1'", "'' OR '1'='1'", function (err, population){
    if(err) console.log(err);
    console.log(population);
  });



//The following code is not vulnerable to SQL injection.

function getPopulation(Country, name, code, cb) {
  conn.query(
    `SELECT Population FROM ${Country} WHERE Name = ? AND code = ?`,
    [name, code],
    function (err, result) {
      if (err) return cb(err);
      if (result.length === 0) return cb(new Error("Not found"));
      cb(null, result[0].Population);
    }
  )
};
