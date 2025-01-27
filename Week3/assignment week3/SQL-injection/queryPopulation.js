import conn from './connection.js'; 
async function getPopulation(Country, name, code, cb) {
  try {
    const connection = await conn.getConnection(); 
    console.log("Connected to database:", connection); 

    const sql = `SELECT Population FROM ?? WHERE Name = ? AND Code = ?`;
    console.log("Executing SQL query:", sql); 
 
    const [result] = await connection.query(sql, [Country, name, code]);

    if (!result || result.length === 0) {
      console.log("No matching records found.");
      return cb(new Error("Not found"));
    }

    console.log("Population found:", result[0].Population); 
    cb(null, result[0].Population); 
    connection.release();
  } catch (err) {
    console.error("Error executing query:", err); 
    return cb(err);
  }
}

export default getPopulation; 
