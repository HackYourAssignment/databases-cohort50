

  function getPopulation(Country, name, code, cb) {
    conn.query(
      `SELECT Population FROM ${Country} WHERE Name = '${name}' AND code = '${code}'`,
      function (err, result) {
        if (err) cb(err);
        if (result.length == 0) cb(new Error("Not found"));
        cb(null, result[0].name);
      }
    );
  }
  

  getPopulation("Country", `' OR 1=1 --`, `ignored`, console.log);
  
// ==========================================================================


  function getPopulation(conn, countryTable, name, code, cb) {
    
    conn.query(
      `SELECT Population FROM ?? WHERE Name = ? AND code = ?`,
      [countryTable, name, code], 
      function (err, result) {
        if (err) return cb(err);
        if (result.length === 0) return cb(new Error("Not found"));
        cb(null, result[0].Population); 
      }
    );
  }
  