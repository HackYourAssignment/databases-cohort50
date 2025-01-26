function getPopulation(Country, name, code, cb) {
  const query = `SELECT Population FROM ?? WHERE Name = ? AND code = ?`;
  
  conn.query(query, [Country, name, code], function (err, result) {
    if (err) {
      cb(err);
      return;
    }

    if (result.length == 0) {
      cb(new Error("Not found"));
      return;
    }

    cb(null, result[0].Population);
  });
}

/*
  Name = '' OR 1=1: This condition is always true because 1=1 is always true, so the Name field is ignored.

code = '' OR 1=1: Similarly, this condition is also true, so the code field is ignored.

 --: This is a SQL comment, meaning everything after it is ignored, so the rest of the query is discarded.  */
