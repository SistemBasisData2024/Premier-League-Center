const db = require("../db"); //mundur 2 kali

const Teams = async (req, res) => {
  db.query(`SELECT * FROM teams`, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      return;
    }
    res.json(result.rows);
  });
};

const TeamInfo = async (req, res) => {
  const team_code = req.params.team_code;

  db.query(
    `SELECT team_info.*, teams.team_name FROM team_info INNER JOIN teams ON team_info.team_code = teams.team_code WHERE team_info.team_code = $1`,
    [team_code],
    (err, result) => {
      if (err) {
        console.error("Error executing query", err);
        res.status(500).json({ error: "Failed to retrieve team information" });
        return;
      }
      res.json(result.rows);
    }
  );
};

module.exports = { Teams, TeamInfo };
