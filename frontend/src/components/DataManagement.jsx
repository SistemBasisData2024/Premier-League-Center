import * as assets from "../assets";
import styles, { layout } from "../style";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Upcoming = () => {
  const [matches, setMatches] = useState([]);
  const [results, setResults] = useState([]);
  const [tournaments, setTournaments] = useState([]);
  const [teams, setTeams] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showFillModal, setShowFillModal] = useState(false);
  const [newMatch, setNewMatch] = useState({
    tournament_code: "",
    team_1_code: "",
    team_2_code: "",
    match_date: "",
  });
  const [matchCount, setMatchCount] = useState(0);
  const [currentMatch, setCurrentMatch] = useState(null);
  const [matchData, setMatchData] = useState({
    team_1_score: null,
    team_2_score: null,
    match_winner: "",
    possession_avg_1: null,
    possession_avg_2: null,
    shots_1: null,
    shots_2: null,
    shots_on_goal_1: null,
    shots_on_goal_2: null,
    passing_acc_1: null,
    passing_acc_2: null,
    fouls_1: null,
    fouls_2: null,
  });

  const formatMatchDate = (dateString) => {
    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
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

    fetch("http://localhost:3001/ResultMatches")
      .then((response) => response.json())
      .then((data) => setResults(data))
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  useEffect(() => {
    if (newMatch.tournament_code) {
      // Filter matches for the specific tournament
      const matchesForTournament = matches.filter(
        (match) => match.tournament_code === newMatch.tournament_code
      );

      // Filter results for the specific tournament
      const resultsForTournament = results.filter(
        (result) => result.tournament_code === newMatch.tournament_code
      );

      // Calculate total count of matches and results
      const totalMatches = matchesForTournament.length;
      const totalResults = resultsForTournament.length;

      // Set matchCount as the sum of total matches and total results
      setMatchCount(totalMatches + totalResults);
    }
  }, [newMatch.tournament_code, matches, results]);
  const handleDelete = (match_code) => {
    axios
        .delete(`http://localhost:3001/Matches/${match_code}`)
        .then((response) => {
            console.log("Match deleted successfully");
            // Fetch updated lists of upcoming and result matches
            fetch("http://localhost:3001/UpcomingMatches")
                .then((response) => response.json())
                .then((data) => setMatches(data))
                .catch((error) => console.error("Error fetching data", error));

            fetch("http://localhost:3001/ResultMatches")
                .then((response) => response.json())
                .then((data) => setResults(data))
                .catch((error) => console.error("Error fetching data", error));
        })
        .catch((error) => {
            console.error("Error deleting match", error);
        });
};


  const handleAddMatch = (event) => {
    event.preventDefault();
    const matchCodePrefix = newMatch.tournament_code;
    const newMatchCode = `${matchCodePrefix}${(matchCount + 1)
      .toString()
      .padStart(3, "0")}`;

    axios
      .post("http://localhost:3001/CreateMatch", {
        ...newMatch,
        match_code: newMatchCode,
      })
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

  const handleFillMatchData = (event) => {
    event.preventDefault();
    axios
      .put("http://localhost:3001/UpdateMatch", {
        match_code: currentMatch.match_code,
        ...matchData,
      })
      .then((response) => {
        console.log("Match data filled successfully");
        setShowFillModal(false);
        fetch("http://localhost:3001/UpcomingMatches")
          .then((response) => response.json())
          .then((data) => setMatches(data))
          .catch((error) => console.error("Error fetching data", error));
        fetch("http://localhost:3001/ResultMatches")
          .then((response) => response.json())
          .then((data) => setResults(data))
          .catch((error) => console.error("Error fetching data", error));
      })
      .catch((error) => {
        console.error("Error filling match data", error);
      });
  };

  const openFillModal = (match) => {
    setCurrentMatch(match);
    setShowFillModal(true);
  };

  return (
    <div className="text-center">
      <button
        onClick={() => setShowAddModal(true)}
        className="btn btn-primary mb-4 bg-[#38003c] border-0 text-white hover:bg-white hover:text-black"
      >
        + New Match
      </button>
      <section className="flex flex-wrap justify-between text-left w-full">
        <div className="w-full lg:w-1/2 pr-4">
          <h1 className="font-poppins font-semibold text-white text-center justify-center ss:text-[40px] text-[30px]">
            <span className="text-gradient"> Upcoming </span>
            <span> Matches </span>
          </h1>

          <div className={`overflow-x-auto mt-4 feature-card`}>
            <table className="min-w-full bg-#050505">
              <thead>
                <tr className="bg-[#38003c]">
                  <th className="font-poppins px-4 py-2 text-white">Tournament Name</th>
                  <th className="font-poppins px-4 py-2 text-white">Clubs</th>
                  <th className="font-poppins px-4 py-2 text-white">
                    Schedule
                  </th>
                  <th className="font-poppins px-4 py-2 text-white"></th>
                </tr>
              </thead>
              <tbody>
                {matches.map((match, index) => (
                  <tr key={index} className="bg-white">
                    <td className="border px-4 py-2 text-black">
                      <div className="flex items-center">
                        <div>
                          <div className="font-bold">
                            {match.tournament_name}
                          </div>
                          <div className="text-sm opacity-50">
                            {match.scope}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="border px-4 py-2 text-black">
                      {match.team_1_code} vs {match.team_2_code}
                    </td>
                    <td className="border px-4 py-2 text-black">
                      {formatMatchDate(match.match_date)}
                    </td>
                    <td className="border px-4 py-2 text-black flex">
                      <button
                        className="btn btn-ghost w-14 h-14 ml-2 bg-[#581d63] text-white hover:bg-white hover:text-black"
                        onClick={() => openFillModal(match)}
                      >
                        Fill Match Data
                      </button>
                      <button
                        className="btn btn-ghost w-14 h-14"
                        onClick={() => handleDelete(match.match_code)}
                      >
                        <img src={assets["trash"]} alt="Delete" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {showAddModal && (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-2 border-white rounded-lg shadow-lg relative flex flex-col w-full bg-primary outline-none focus:outline-none">
                    <div className="flex items-start justify-between p-5 border-b-2 border-solid border-white rounded-t">
                      <h3 className="text-3xl font-semibold">ADD MATCH</h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-white float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowAddModal(false)}
                      >
                        x
                      </button>
                    </div>
                    <div className="relative p-6 flex-auto">
                      <form onSubmit={handleAddMatch}>
                        <div className="font-poppins font-semibold text-white text-[15px] leading-[23.4px] mb-1">
                          <label
                            htmlFor="tournament_code"
                            className="block mb-2"
                          >
                            Tournament
                          </label>
                          <select
                            id="tournament_code"
                            name="tournament_code"
                            className="w-full px-3 py-2 border rounded-md"
                            value={newMatch.tournament_code}
                            onChange={(event) =>
                              setNewMatch({
                                ...newMatch,
                                tournament_code: event.target.value,
                              })
                            }
                            required
                          >
                            <option value="" disabled>
                              Select Tournament
                            </option>
                            {tournaments.map((tournament) => (
                              <option
                                key={tournament.tournament_code}
                                value={tournament.tournament_code}
                              >
                                {tournament.tournament_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="team_1_code"
                            className="block mb-2 font-semibold text-white"
                          >
                            Team 1
                          </label>
                          <select
                            id="team_1_code"
                            name="team_1_code"
                            className="w-full px-3 py-2 border rounded-md"
                            value={newMatch.team_1_code}
                            onChange={(event) =>
                              setNewMatch({
                                ...newMatch,
                                team_1_code: event.target.value,
                              })
                            }
                            required
                          >
                            <option value="" disabled>
                              Select Team
                            </option>
                            {teams.map((team) => (
                              <option
                                key={team.team_code}
                                value={team.team_code}
                              >
                                {team.team_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="team_2_code"
                            className="block mb-2 font-semibold text-white"
                          >
                            Team 2
                          </label>
                          <select
                            id="team_2_code"
                            name="team_2_code"
                            className="w-full px-3 py-2 border rounded-md"
                            value={newMatch.team_2_code}
                            onChange={(event) =>
                              setNewMatch({
                                ...newMatch,
                                team_2_code: event.target.value,
                              })
                            }
                            required
                          >
                            <option value="" disabled>
                              Select Team
                            </option>
                            {teams.map((team) => (
                              <option
                                key={team.team_code}
                                value={team.team_code}
                              >
                                {team.team_name}
                              </option>
                            ))}
                          </select>
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="match_date"
                            className="block mb-2 font-semibold text-white"
                          >
                            Match Date
                          </label>
                          <input
                            type="date"
                            id="match_date"
                            name="match_date"
                            value={newMatch.match_date}
                            onChange={(event) =>
                              setNewMatch({
                                ...newMatch,
                                match_date: event.target.value,
                              })
                            }
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
          )}
          {showFillModal && (
            <>
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="relative w-auto my-6 mx-auto max-w-3xl">
                  <div className="border-2 border-white rounded-lg shadow-lg relative flex flex-col w-full bg-primary outline-none focus:outline-none mt-20">
                    <div className="flex items-start justify-between p-5 border-b-2 border-solid border-white rounded-t">
                      <h3 className="text-3xl font-semibold">
                        FILL MATCH DATA
                      </h3>
                      <button
                        className="p-1 ml-auto bg-transparent border-0 text-white float-right text-2xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => setShowFillModal(false)}
                      >
                        x
                      </button>
                    </div>
                    <div className="relative p-6 flex-auto">
                      <form onSubmit={handleFillMatchData}>
                        <div className="flex justify-between">
                          <div className="w-1/2 pr-2">
                            <h4 className="text-xl font-semibold text-white mb-4">
                              Team 1
                            </h4>
                            <div className="mb-4">
                              <label
                                htmlFor="team_1_score"
                                className="block mb-2 font-semibold text-white"
                              >
                                Team 1 Score
                              </label>
                              <input
                                type="number"
                                id="team_1_score"
                                name="team_1_score"
                                value={matchData.team_1_score}
                                onChange={(event) =>
                                  setMatchData({
                                    ...matchData,
                                    team_1_score: event.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border rounded-md"
                                required
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                htmlFor="possession_avg_1"
                                className="block mb-2 font-semibold text-white"
                              >
                                Possession Avg Team 1
                              </label>
                              <input
                                type="number"
                                step="0.01"
                                id="possession_avg_1"
                                name="possession_avg_1"
                                value={matchData.possession_avg_1}
                                onChange={(event) =>
                                  setMatchData({
                                    ...matchData,
                                    possession_avg_1: event.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border rounded-md"
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                htmlFor="shots_1"
                                className="block mb-2 font-semibold text-white"
                              >
                                Shots Team 1
                              </label>
                              <input
                                type="number"
                                id="shots_1"
                                name="shots_1"
                                value={matchData.shots_1}
                                onChange={(event) =>
                                  setMatchData({
                                    ...matchData,
                                    shots_1: event.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border rounded-md"
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                htmlFor="shots_on_goal_1"
                                className="block mb-2 font-semibold text-white"
                              >
                                Shots on Goal Team 1
                              </label>
                              <input
                                type="number"
                                id="shots_on_goal_1"
                                name="shots_on_goal_1"
                                value={matchData.shots_on_goal_1}
                                onChange={(event) =>
                                  setMatchData({
                                    ...matchData,
                                    shots_on_goal_1: event.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border rounded-md"
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                htmlFor="passing_acc_1"
                                className="block mb-2 font-semibold text-white"
                              >
                                Passing Accuracy Team 1
                              </label>
                              <input
                                type="number"
                                step="0.01"
                                id="passing_acc_1"
                                name="passing_acc_1"
                                value={matchData.passing_acc_1}
                                onChange={(event) =>
                                  setMatchData({
                                    ...matchData,
                                    passing_acc_1: event.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border rounded-md"
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                htmlFor="fouls_1"
                                className="block mb-2 font-semibold text-white"
                              >
                                Fouls Team 1
                              </label>
                              <input
                                type="number"
                                id="fouls_1"
                                name="fouls_1"
                                value={matchData.fouls_1}
                                onChange={(event) =>
                                  setMatchData({
                                    ...matchData,
                                    fouls_1: event.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border rounded-md"
                              />
                            </div>
                          </div>
                          <div className="w-1/2 pl-2">
                            <h4 className="text-xl font-semibold text-white mb-4">
                              Team 2
                            </h4>
                            <div className="mb-4">
                              <label
                                htmlFor="team_2_score"
                                className="block mb-2 font-semibold text-white"
                              >
                                Team 2 Score
                              </label>
                              <input
                                type="number"
                                id="team_2_score"
                                name="team_2_score"
                                value={matchData.team_2_score}
                                onChange={(event) =>
                                  setMatchData({
                                    ...matchData,
                                    team_2_score: event.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border rounded-md"
                                required
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                htmlFor="possession_avg_2"
                                className="block mb-2 font-semibold text-white"
                              >
                                Possession Avg Team 2
                              </label>
                              <input
                                type="number"
                                step="0.01"
                                id="possession_avg_2"
                                name="possession_avg_2"
                                value={matchData.possession_avg_2}
                                onChange={(event) =>
                                  setMatchData({
                                    ...matchData,
                                    possession_avg_2: event.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border rounded-md"
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                htmlFor="shots_2"
                                className="block mb-2 font-semibold text-white"
                              >
                                Shots Team 2
                              </label>
                              <input
                                type="number"
                                id="shots_2"
                                name="shots_2"
                                value={matchData.shots_2}
                                onChange={(event) =>
                                  setMatchData({
                                    ...matchData,
                                    shots_2: event.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border rounded-md"
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                htmlFor="shots_on_goal_2"
                                className="block mb-2 font-semibold text-white"
                              >
                                Shots on Goal Team 2
                              </label>
                              <input
                                type="number"
                                id="shots_on_goal_2"
                                name="shots_on_goal_2"
                                value={matchData.shots_on_goal_2}
                                onChange={(event) =>
                                  setMatchData({
                                    ...matchData,
                                    shots_on_goal_2: event.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border rounded-md"
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                htmlFor="passing_acc_2"
                                className="block mb-2 font-semibold text-white"
                              >
                                Passing Accuracy Team 2
                              </label>
                              <input
                                type="number"
                                step="0.01"
                                id="passing_acc_2"
                                name="passing_acc_2"
                                value={matchData.passing_acc_2}
                                onChange={(event) =>
                                  setMatchData({
                                    ...matchData,
                                    passing_acc_2: event.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border rounded-md"
                              />
                            </div>
                            <div className="mb-4">
                              <label
                                htmlFor="fouls_2"
                                className="block mb-2 font-semibold text-white"
                              >
                                Fouls Team 2
                              </label>
                              <input
                                type="number"
                                id="fouls_2"
                                name="fouls_2"
                                value={matchData.fouls_2}
                                onChange={(event) =>
                                  setMatchData({
                                    ...matchData,
                                    fouls_2: event.target.value,
                                  })
                                }
                                className="w-full px-3 py-2 border rounded-md"
                              />
                            </div>
                          </div>
                        </div>
                        <div className="mb-4">
                          <label
                            htmlFor="match_winner"
                            className="block mb-2 font-semibold text-white"
                          >
                            Match Winner
                          </label>
                          <select
                            id="match_winner"
                            name="match_winner"
                            className="w-full px-3 py-2 border rounded-md"
                            value={matchData.match_winner}
                            onChange={(event) =>
                              setMatchData({
                                ...matchData,
                                match_winner: event.target.value,
                              })
                            }
                          >
                            <option value="" disabled>
                              Select Winner
                            </option>
                            {teams.map((team) => {
                              // Check if the current team is either team_1 or team_2
                              if (
                                team.team_code === currentMatch.team_1_code ||
                                team.team_code === currentMatch.team_2_code
                              ) {
                                return (
                                  <option
                                    key={team.team_code}
                                    value={team.team_code}
                                  >
                                    {team.team_name}
                                  </option>
                                );
                              }
                              return null; // If not one of the specified teams, return null
                            })}
                          </select>
                        </div>
                        <button type="submit" className="btn btn-primary">
                          Fill Match Data
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
            </>
          )}
        </div>
        <div className="w-full lg:w-1/2 pl-4">
          <h1 className="font-poppins font-semibold text-white text-center justify-center ss:text-[40px] text-[30px]">
            <span className="text-gradient"> Results </span>
            <span> Matches </span>
          </h1>
          <div className={`overflow-x-auto feature-card mt-4`}>
            <table className="min-w-full bg-#050505">
              <thead>
                <tr className="bg-[#38003c]">
                  <th className="font-poppins px-4 py-2 text-white">Name</th>
                  <th className="font-poppins px-4 py-2 text-white">Winner</th>
                  <th className="font-poppins px-4 py-2 text-white">Score</th>
                  <th className="font-poppins px-4 py-2 text-white">Details</th>
                  <th className="font-poppins px-4 py-2 text-white"></th>
                </tr>
              </thead>
              <tbody>
                {results.map((match, index) => (
                  <tr key={index} className="bg-white">
                    <td className="border px-4 py-2 text-black align-text-top">
                      <div className="flex">
                        <div>
                          <div className="font-bold">
                            {match.tournament_name}
                          </div>
                          <div className="text-sm opacity-50">
                            {match.scope}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="border text-black align-text-top">
                    {match.team_1_code} vs {match.team_2_code}
                    <br />
                      {match.match_winner === null ? (
                        <span className="bg-yellow-500 px-2 rounded-md text-white">
                          DRAW
                        </span>
                      ) : (
                        <span className="bg-green-500 px-2 rounded-md text-white">
                          {match.match_winner}
                        </span>
                      )}
                    </td>
                    <td className="border px-4 py-2 text-black align-text-top">
                      {match.team_1_score} - {match.team_2_score}
                    </td>
                    <td className="border py-2 text-black align-text-top">
                      <div className="font-bold mr-12">
                        Possession: <br />
                        <span className="font-normal">
                          {match.possession_avg_1}%-{match.possession_avg_2}%
                        </span>
                      </div>
                      <div className="font-bold">
                        Shots: <br />{" "}
                        <span className="font-normal">
                          {match.shots_1} - {match.shots_2}{" "}
                        </span>
                      </div>
                      <div className="font-bold">
                        Shots on Goal: <br />{" "}
                        <span className="font-normal">
                          {match.shots_on_goal_1} - {match.shots_on_goal_2}{" "}
                        </span>
                      </div>
                      <div className="font-bold">
                        Passing Accuracy: <br />{" "}
                        <span className="font-normal">
                          {match.passing_acc_1}% - {match.passing_acc_2}%{" "}
                        </span>
                      </div>
                      <div className="font-bold">
                        Fouls: <br />{" "}
                        <span className="font-normal">
                          {match.fouls_1} - {match.fouls_2}{" "}
                        </span>
                      </div>
                    </td>
                    <td className="border px-4 py-2 text-black">
                      <button
                        className="btn btn-ghost w-14 h-14"
                        onClick={() => handleDelete(match.match_code)}
                      >
                        <img src={assets["trash"]} alt="Delete" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>
    </div>
  );
};

const DataManagement = () => (
  <section id="datamanagement" className={layout.section}>
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <h1 className="font-poppins font-semibold text-white text-center justify-center text-7xl mb-12 pt-12">
        <span className="text-gradient">Admin Data </span>
        <span> Management </span>
      </h1>
      <Upcoming />
    </div>
  </section>
);
export default DataManagement;
