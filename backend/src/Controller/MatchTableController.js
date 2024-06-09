const db = require('../db');//mundur 2 kali 

//Tabel upcoming Matches
const UpcomingMatches = async (req, res) => {
    const query = `
    SELECT 
    t.tournament_code,
    t.tournament_name,
    m.match_code,
    m.team_1_code,
    m.team_2_code,
    m.match_status,
    m.match_date
FROM
    tournaments t
JOIN 
    match_info m ON  t.tournament_code = m.tournament_code
WHERE
    m.match_status = 'Upcoming';
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Error executing query", err);
            return;
        }
        res.json(result.rows);
    });
}

//Tabel result Matches
const ResultMatches = async (req, res) => {
    const query = `
    SELECT 
    t.tournament_code,
    t.tournament_name,
    m.match_code,
    m.team_1_code,
    m.team_2_code,
    m.match_status,
    m.match_date,
    team_1_score,
    team_2_score,
    match_winner,
    possession_avg_1,
    possession_avg_2,
    shots_1,
    shots_2,
    shots_on_goal_1,
    shots_on_goal_2,
    passing_acc_1,
    passing_acc_2,
    fouls_1,
    fouls_2
FROM
    tournaments t
JOIN 
    match_info m ON  t.tournament_code = m.tournament_code
WHERE
    m.match_status = 'Completed';
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Error executing query", err);
            return;
        }
        res.json(result.rows);
    });
}

//Tabel Premier League
const PremLeagTable= async (req, res) => {
    const query = `
    SELECT 
        ROW_NUMBER() OVER (ORDER BY points DESC) AS position,
        team_code,
        name,
        matches_played,
        wins,
        draws,
        losses,
        points
    FROM 
        premier_league
    ORDER BY 
        points DESC;
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Error executing query", err);
            return;
        }
        res.json(result.rows);
    });
}

module.exports = { UpcomingMatches, ResultMatches, PremLeagTable};