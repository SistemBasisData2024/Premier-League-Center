const db = require('../db');//mundur 2 kali 

//Tabel upcoming Matches

const UpcomingMatches = async (req, res) => {
    const query = `SELECT 
            t.tournament_code,
            t.tournament_name,
            t.scope,
            m.match_code,
            m.team_1_code,
            m.team_2_code,
            m.match,
            m.match_date,
        FROM
            tournaments t
        JOIN 
            match_info m ON  t.tournament_code = m.tournament_code
        WHERE
            m.match_status = 'upcoming';
    `;

    db.query(query, (err, result) => {
        if (err) {
            console.error("Error executing query", err);
            return;
        }
        res.json(result.rows);
    });
}

module.exports = { UpcomingMatches };