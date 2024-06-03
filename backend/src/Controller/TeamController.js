const db = require('../db');//mundur 2 kali
const bcrypt = require('bcrypt');
 

  

  const Teams = async (req, res) => {
    db.query(
      `SELECT * FROM teams`,
      (err, result) => {
        if (err) {
          console.error("Error executing query", err);
          return;
        }
        res.json(result.rows);
      }
    );
  };
module.exports = { Teams };