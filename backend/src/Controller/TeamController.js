const db = require('../db');//mundur 2 kali 

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

const InsertTeam = async (req, res) => {
  const { code, name } = req.body;

  if (!code || !name) {
    return res.status(400).send("name and code required");
  }
  //kode 400, server tidak dapat memahami request 

  const query = 'INSERT INTO teams (team_code, team_name) VALUES ($1, $2)';

  db.query(query, [code, name], (err) => {
    if (err){
      console.error("Error executing query", err);
      return;
    }
    res.send("Team inserted successfully");
  });
};

const DeleteTeam = (req, res) => {
  const { code } = req.body;

  if (!code) {
    return res.status(400).send("code required");
  }

  const query = 'DELETE FROM teams WHERE team_code = $1';

  db.query(query, [code], (err) => {
    if (err){
      console.error("Error executing delete query ", err);
      return;
    }
    res.send("Team deleted seccessfully")
  })
};

module.exports = { Teams, InsertTeam, DeleteTeam };