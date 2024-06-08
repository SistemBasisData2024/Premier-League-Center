import * as assets from "../assets";
import styles, { layout } from "../style";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';


const Upcoming = () => {
    const [matches, setMatches] = useState([]);
    const [tournaments, setTournaments] = useState([]);
    const [teams, setTeams] = useState([]);
    const [showAddModal, setShowAddModal] = useState(false);
    const [newMatch, setNewMatch] = useState({
        tournament_code: "",
        team_1_code: "",
        team_2_code: "",
        match_date: ""
    });
    const [matchCount, setMatchCount] = useState(0);

    const formatMatchDate = (dateString) => {
        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear().toString();

        return `${day}-${month}-${year}`;
    };

    useEffect(() => {
        fetch("http://localhost:3001/UpcomingMatches")
            .then((response) => response.json())
            .then((data) => setMatches(data))
            .catch((error) => console.error("Error fetching data", error));
        
        fetch("http://localhost:3001/Tournaments")
            .then((response) => response.json())
            .then((data) => setTournaments(data))
            .catch((error) => console.error("Error fetching tournaments", error));

        fetch("http://localhost:3001/Teams")
            .then((response) => response.json())
            .then((data) => setTeams(data))
            .catch((error) => console.error("Error fetching teams", error));
    }, []);

    useEffect(() => {
        if (newMatch.tournament_code) {
            const matchCodePrefix = newMatch.tournament_code;
            const matchesForTournament = matches.filter(
                (match) => match.tournament_code === newMatch.tournament_code
            );
            setMatchCount(matchesForTournament.length);
        }
    }, [newMatch.tournament_code, matches]);

    const handleDelete = (match_code) => {
        axios
            .delete(`http://localhost:3001/matchInfo/${match_code}`)
            .then((response) => {
                console.log("Match deleted successfully");
                fetch("http://localhost:3001/UpcomingMatches")
                    .then((response) => response.json())
                    .then((data) => setMatches(data))
                    .catch((error) => console.error("Error fetching data", error));
            })
            .catch((error) => {
                console.error("Error deleting match", error);
            });
    };

    const handleAddMatch = (event) => {
        event.preventDefault();
        const matchCodePrefix = newMatch.tournament_code;
        const newMatchCode = `${matchCodePrefix}${(matchCount + 1).toString().padStart(3, '0')}`;

        axios
            .post("http://localhost:3001/InsertMatch", { ...newMatch, match_code: newMatchCode })
            .then((response) => {
                console.log("Match added successfully");
                setShowAddModal(false);
                fetch("http://localhost:3001/UpcomingMatches")
                    .then((response) => response.json())
                    .then((data) => setMatches(data))
                    .catch((error) => console.error("Error fetching data", error));
            })
            .catch((error) => {
                console.error("Error adding match", error);
            });
    };

    return (
        <section>
            <h1 className="font-poppins font-semibold text-white text-center justify-center ss:text-[40px] text-[30px]">
                <span className="text-gradient"> Upcoming </span>
                <span> Matches </span>
            </h1>
            <button
                onClick={() => setShowAddModal(true)}
                className="btn btn-primary mb-4"
            >
                Add Match
            </button>
            <div className={`overflow-x-auto mb-6 feature-card`}>
                <table className={`table`}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Teams</th>
                            <th>Match Date</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map((match, index) => (
                            <tr key={index}>
                                <td>
                                    <div className="flex items-center space-x-3">
                                        <div className="avatar">
                                            <div className="mask mask-squircle w-12 h-12">
                                                <img src={assets[match.tournament_code]} alt="page-icon" />
                                            </div>
                                        </div>
                                        <div>
                                            <div className="font-bold">{match.tournament_name}</div>
                                            <div className="text-sm opacity-50">{match.scope}</div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    {match.team_1_code} vs {match.team_2_code}
                                    <br />
                                    <span className="badge badge-ghost badge-sm">{match.match_stage} - BEST OF {match.round_count}</span>
                                </td>
                                <td>{formatMatchDate(match.match_date)}</td>
                                <td>
                                    {/* Tombol Fill Match Data */}
            <Link to={`/FillMatchData/${match.match_code}`}>
                <button className="btn btn-ghost w-14 h-14 ml-2">
                    Fill Match Data
                </button>
            </Link>
            {/* Tombol Hapus */}
            <button className="btn btn-ghost w-14 h-14" onClick={() => handleDelete(match.match_code)}>
                <img src={assets['trash']} />
            </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            {showAddModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                        <div className="relative w-auto my-6 mx-auto max-w-3xl">
                            <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-primary outline-none focus:outline-none">
                                <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                    <h3 className="text-3xl font-semibold">
                                        ADD MATCH
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => setShowAddModal(false)}
                                    >
                                        <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                            ×
                                        </span>
                                    </button>
                                </div>
                                <div className="relative p-6 flex-auto">
                                    <form onSubmit={handleAddMatch}>
                                        <div className="font-poppins font-semibold text-white text-[15px] leading-[23.4px] mb-1">
                                            <label htmlFor="tournament_code" className="block mb-2">Tournament</label>
                                            <select id="tournament_code" name="tournament_code" className="w-full px-3 py-2 border rounded-md" value={newMatch.tournament_code} onChange={(event) => setNewMatch({ ...newMatch, tournament_code: event.target.value })} required>
                                                <option value="" disabled>Select Tournament</option>
                                                {tournaments.map((tournament) => (
                                                    <option key={tournament.tournament_code} value={tournament.tournament_code}>
                                                        {tournament.tournament_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="team_1_code" className="block mb-2 font-semibold text-white">Team 1</label>
                                            <select id="team_1_code" name="team_1_code" className="w-full px-3 py-2 border rounded-md" value={newMatch.team_1_code} onChange={(event) => setNewMatch({ ...newMatch, team_1_code: event.target.value })} required>
                                                <option value="" disabled>Select Team</option>
                                                {teams.map((team) => (
                                                    <option key={team.team_code} value={team.team_code}>
                                                        {team.team_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="team_2_code" className="block mb-2 font-semibold text-white">Team 2</label>
                                            <select id="team_2_code" name="team_2_code" className="w-full px-3 py-2 border rounded-md" value={newMatch.team_2_code} onChange={(event) => setNewMatch({ ...newMatch, team_2_code: event.target.value })} required>
                                                <option value="" disabled>Select Team</option>
                                                {teams.map((team) => (
                                                    <option key={team.team_code} value={team.team_code}>
                                                        {team.team_name}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="match_date" className="block mb-2 font-semibold text-white">Match Date</label>
                                            <input
                                                type="date"
                                                id="match_date"
                                                name="match_date"
                                                value={newMatch.match_date}
                                                onChange={(event) => setNewMatch({ ...newMatch, match_date: event.target.value })}
                                                className="w-full px-3 py-2 border rounded-md"
                                                required
                                            />
                                        </div>
                                        <button type="submit" className="btn btn-primary">
                                            Add Match
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null}
        </section>
    );
};



const Results = ({ props, index }) => {
    const [matches, setMatches] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [match_winner, setMatch_winner] = useState("");
    const [team_1_score, setTeam_1_score] = useState("");
    const [team_2_score, setTeam_2_score] = useState("");

    useEffect(() => {
        fetch("http://localhost:3001/ResultMatches")
            .then((response) => response.json())
            .then((data) => setMatches(data))
            .catch((error) => console.error("Error fetching data", error));
    }, []);

    const handleDeleteResult = (match_code) => {
        axios
            .delete(`http://localhost:3001/matchInfo/${match_code}`)
            .then((response) => {
                console.log("Match deleted successfully");
                fetch("http://localhost:3001/ResultMatches")
                    .then((response) => response.json())
                    .then((data) => setMatches(data))
                    .catch((error) => console.error("Error fetching data", error));
            })
            .catch((error) => {
                console.error("Error deleting match", error);
            });
    };

    const handleUpdate = (match_code) => {
        axios
            .put(`http://localhost:3001/updateResultsMatch/${match_code}`, {
                match_winner: match_winner,
                team_1_score: team_1_score,
                team_2_score: team_2_score,
            })
            .then((response) => {
                console.log("Match updated successfully");
                fetch("http://localhost:3001/ResultMatches")
                    .then((response) => response.json())
                    .then((data) => setMatches(data))
                    .catch((error) => console.error("Error fetching data", error));
            })
            .catch((error) => {
                console.error("Error updating match", error);
            });
    };

    return (
        <section>
            <h1 className="font-poppins font-semibold text-white text-center justify-center ss:text-[40px] text-[30px]">
                <span className="text-gradient"> Results </span>
                <span> Matches </span>
            </h1>
            <div className={`overflow-x-auto feature-card`}>
                <table className={`table`}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Winner</th>
                            <th>Score</th>
                            <th>Details</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {matches.map((match, index) => {
                            return (
                                <tr key={index}>
                                    <td>
                                        <div className="flex items-center space-x-3">
                                            <div className="avatar">
                                                <div className="mask mask-squircle w-12 h-12">
                                                    <img src={assets[match.tournament_code]} alt="page-icon" />
                                                </div>
                                            </div>
                                            <div>
                                                <div className="font-bold"> {match.tournament_name} </div>
                                                <div className="text-sm opacity-50"> {match.scope} </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td>
                                        {match.match_winner}
                                        <br />
                                        <span className="badge badge-ghost badge-sm"> {match.team_1_code} vs {match.team_2_code} </span>
                                    </td>
                                    <td> {match.team_1_score} - {match.team_2_score} </td>
                                    <td>
                                        <div className="font-bold">Possession: {match.possession_avg_1}% - {match.possession_avg_2}%</div>
                                        <div className="text-sm">Shots: {match.shots_1} - {match.shots_2}</div>
                                        <div className="text-sm">Shots on Goal: {match.shots_on_goal_1} - {match.shots_on_goal_2}</div>
                                        <div className="text-sm">Passing Accuracy: {match.passing_acc_1}% - {match.passing_acc_2}%</div>
                                        <div className="text-sm">Fouls: {match.fouls_1} - {match.fouls_2}</div>
                                    </td>
                                    <td>
                                        <button onClick={() => setShowModal(true)} className="btn btn-ghost w-14 h-14 z-50">
                                            <img src={assets['edit']} />
                                        </button>
                                        {showModal ? (
                                            <>
                                                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                                                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                                                        <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-primary outline-none focus:outline-none">
                                                            <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                                                                <h3 className="text-3xl font-semibold">
                                                                    EDIT DATA
                                                                </h3>
                                                                <button
                                                                    className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                                                    onClick={() => setShowModal(false)}
                                                                >
                                                                    <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                                        ×
                                                                    </span>
                                                                </button>
                                                            </div>
                                                            <div className="relative p-6 flex-auto">
                                                                <form onSubmit={handleUpdate}>
                                                                    <div className="font-poppins font-semibold text-white text-[15px] leading-[23.4px] mb-1">
                                                                        <label htmlFor="match_winner" className="block mb-2">Match Winner</label>
                                                                        <input type="text" id="match_winner" name="match_winner" className="w-full px-3 py-2 border rounded-md" value={match_winner} onChange={(event) => setMatch_winner(event.target.value)} required />
                                                                    </div>
                                                                    <div className="font-poppins font-semibold text-white text-[15px] leading-[23.4px] mb-1">
                                                                        <label htmlFor="team_1_score" className="block mb-2">Team 1 Score</label>
                                                                        <input type="text" id="team_1_score" name="team_1_score" className="w-full px-3 py-2 border rounded-md" value={team_1_score} onChange={(event) => setTeam_1_score(event.target.value)} required />
                                                                    </div>
                                                                    <div className="font-poppins font-semibold text-white text-[15px] leading-[23.4px] mb-1">
                                                                        <label htmlFor="team_2_score" className="block mb-2">Team 2 Score</label>
                                                                        <input type="text" id="team_2_score" name="team_2_score" className="w-full px-3 py-2 border rounded-md" value={team_2_score} onChange={(event) => setTeam_2_score(event.target.value)} required />
                                                                    </div>
                                                                    <button type="submit" className="gap-x-10 font-poppins font-semibold text-[18px] text-primary bg-blue-gradient px-4 py-2 rounded-md mt-2" onClick={() => handleUpdate(match.match_code)}>Save Changes</button>
                                                                </form>
                                                            </div>
                                                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                                                                <button
                                                                    className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                                                    type="button"
                                                                    onClick={() => setShowModal(false)}
                                                                >
                                                                    Close
                                                                </button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                                            </>
                                        ) : null}
                                        <button className="btn btn-ghost w-14 h-14" onClick={() => handleDeleteResult(match.match_code)}>
                                            <img src={assets['trash']} />
                                        </button>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

const DataManagement = () => (
    <section id="datamanagement" className={layout.section}>
        <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6`}>
            <div className="flex flex-row justify-between items-center w-full">
                <h1 className="flex-1 font-poppins font-semibold ss:text-[60px] text-[52px] text-white ss:leading-[100.8px] leading-[75px]">
                    <span className="text-gradient"> Admin </span> <br className="sm:block hidden" />{" "}
                    <span> Data Management </span>
                </h1>
            </div>
        </div>
        <div className={`${layout.sectionImg} flex-col`}>
            <Upcoming />
            <Results />
            <a href="/register" className={`gap-x-10 font-poppins font-semibold text-[18px] text-primary bg-blue-gradient px-6 py-3 rounded-md mt-8`}>
                Register more Admin
            </a>
        </div>
    </section>
);
export default DataManagement;
