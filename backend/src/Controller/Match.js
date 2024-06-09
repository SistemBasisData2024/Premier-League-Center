const db = require('../db');//mundur 2 kali 


const Tournaments = async (req, res) => {
    const query = `
      SELECT * FROM tournaments;
      `;
  
    db.query(query, (err, result) => {
      if (err) {
        console.error("Error executing query", err);
        return;
      }
      res.json(result.rows);
    });
  };

const CreateMatch = async (req, res) => {
    const {
        match_code,
        tournament_code,
        team_1_code,
        team_2_code,
        match_date
    } = req.body;
    const query = 'INSERT INTO match_info (match_code, tournament_code, team_1_code, team_2_code, match_date, match_status) VALUES ($1, $2, $3, $4, $5, \'Upcoming\')';

    try {
        await db.query(query, [match_code, tournament_code, team_1_code, team_2_code, match_date]);
        res.status(200).json({ message: 'Match created successfully' });
    } catch (error) {
        console.error('Error creating match:', error);
        res.status(500).json({ error: 'Failed to create match' });
    }
};
const MatchResult = async (req, res) => {
    const {
        match_code,
        tournament_code,
        team_1_code,
        team_2_code,
        team_1_score,
        team_2_score,
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
    } = req.body;

    let { match_winner } = req.body;

    // If match_winner is not provided, set it to null
    if (typeof match_winner === 'undefined' || !match_winner) {
        match_winner = null;
    }

    const updateMatchQuery = `
        UPDATE match_info
        SET match_status = 'Completed', team_1_score = $1, team_2_score = $2, match_winner = $3, possession_avg_1 = $4, possession_avg_2 = $5, shots_1 = $6, shots_2 = $7, shots_on_goal_1 = $8, shots_on_goal_2 = $9, passing_acc_1 = $10, passing_acc_2 = $11, fouls_1 = $12, fouls_2 = $13
        WHERE match_code = $14 AND match_status = 'Upcoming'
    `;

    const selectQuery = `
        SELECT matches_played, wins, draws, losses, points 
        FROM premier_league 
        WHERE team_code = $1
    `;

    const updateTeamStatsQuery = `
        UPDATE premier_league 
        SET matches_played = $1, wins = $2, draws = $3, losses = $4, points = $5 
        WHERE team_code = $6
    `;

    try {
        // Update match info if it is currently 'Upcoming'
        const result = await db.query(updateMatchQuery, [
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
            fouls_2, 
            match_code
        ]);

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Match not found or not in Upcoming status' });
        }

        // Check if the tournament_code is defined and contains "PL"
        if (tournament_code && tournament_code.includes('PL')) {
            // Fetch current stats for both teams
            const team1StatsResult = await db.query(selectQuery, [team_1_code]);
            const team2StatsResult = await db.query(selectQuery, [team_2_code]);

            if (team1StatsResult.rows.length === 0 || team2StatsResult.rows.length === 0) {
                return res.status(404).json({ message: 'One or both teams not found' });
            }

            let team1Stats = team1StatsResult.rows[0];
            let team2Stats = team2StatsResult.rows[0];

            // Update stats based on match result
            team1Stats.matches_played += 1;
            team2Stats.matches_played += 1;

            if (team_1_score > team_2_score) {
                team1Stats.wins += 1;
                team1Stats.points += 3;
                team2Stats.losses += 1;
            } else if (team_1_score < team_2_score) {
                team2Stats.wins += 1;
                team2Stats.points += 3;
                team1Stats.losses += 1;
            } else {
                team1Stats.draws += 1;
                team2Stats.draws += 1;
                team1Stats.points += 1;
                team2Stats.points += 1;
            }

            // Update team 1 stats
            await db.query(updateTeamStatsQuery, [
                team1Stats.matches_played, 
                team1Stats.wins, 
                team1Stats.draws, 
                team1Stats.losses, 
                team1Stats.points, 
                team_1_code
            ]);

            // Update team 2 stats
            await db.query(updateTeamStatsQuery, [
                team2Stats.matches_played, 
                team2Stats.wins, 
                team2Stats.draws, 
                team2Stats.losses, 
                team2Stats.points, 
                team_2_code
            ]);
        }

        res.status(200).json({ message: 'Match and stats updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};


const DeleteMatchResult = async (req, res) => {
    const { match_code } = req.params;

    try {
        const result = await db.query('DELETE FROM match_info WHERE match_code = $1', [match_code]);
        
        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Match not found' });
        }
        
        return res.status(200).json({ message: 'Match deleted successfully' });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal Server Error' });
    }
};










module.exports = { CreateMatch, MatchResult, DeleteMatchResult, Tournaments };

