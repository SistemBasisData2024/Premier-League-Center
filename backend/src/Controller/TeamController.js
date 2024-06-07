const db = require("../db");
const { redis } = require("../redis.js");

const Teams = async (req, res) => {
  const cacheKey = 'teams:all';
  
  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }
  } catch (error) {
    console.error("Error retrieving data from Redis", error);
  }

  db.query(`SELECT * FROM teams ORDER BY team_name ASC`, (err, result) => {
    if (err) {
      console.error("Error executing query", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    try {
      redis.set(cacheKey, JSON.stringify(result.rows), 'EX', 3600); // Cache for 1 hour
    } catch (error) {
      console.error("Error setting data in Redis", error);
    }
    
    res.json(result.rows);
  });
};

const TeamInfo = async (req, res) => {
  const team_code = req.params.team_code;
  const cacheKey = `teams:${team_code}`;

  try {
    const cachedData = await redis.get(cacheKey);
    if (cachedData) {
      return res.json(JSON.parse(cachedData));
    }
  } catch (error) {
    console.error("Error retrieving data from Redis", error);
  }

  db.query(
    `SELECT team_info.*, teams.team_name FROM team_info INNER JOIN teams ON team_info.team_code = teams.team_code WHERE team_info.team_code = $1`,
    [team_code],
    (err, result) => {
      if (err) {
        console.error("Error executing query", err);
        res.status(500).json({ error: "Failed to retrieve team information" });
        return;
      }

      try {
        redis.set(cacheKey, JSON.stringify(result.rows), 'EX', 3600); // Cache for 1 hour
      } catch (error) {
        console.error("Error setting data in Redis", error);
      }

      res.json(result.rows);
    }
  );
};

module.exports = { Teams, TeamInfo };
