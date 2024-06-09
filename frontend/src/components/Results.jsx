import * as assets from "../assets";
import styles, { layout } from "../style";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Results = () => {
  const [results, setResults] = useState([]);

  useEffect(() => {
    fetch("http://localhost:3001/ResultMatches")
      .then((response) => response.json())
      .then((data) => setResults(data))
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  return (
    <div className="text-center">
      <section className="flex flex-wrap justify-between text-left w-full">
        <div className="w-full">
          <h1 className="font-poppins font-semibold text-white text-left ss:text-[40px] text-[30px] mb-4">
            <span className="text-gradient">Match</span>
            <span className="text-white"> Results</span>
          </h1>

          <div className={`overflow-x-auto feature-card`}>
            <table className="min-w-full bg-#050505">
              <thead>
                <tr className="bg-[#38003c]">
                  <th className="font-poppins px-4 py-2 text-white">Tournament</th>
                  <th className="font-poppins px-4 py-2 text-white">Match</th>
                  <th className="font-poppins px-4 py-2 text-white">Result</th>
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
                      <div className="flex items-center">
                        <img
                          src={assets[match.team_1_code]}
                          alt={match.team_1_code}
                          className="w-6 h-6 mr-2 object-cover"
                        />
                        {match.team_1_code} {match.team_1_score} - {match.team_2_score} {match.team_2_code}
                        <img
                          src={assets[match.team_2_code]}
                          alt={match.team_2_code}
                          className="w-6 h-6 ml-2 object-cover"
                        />
                      </div>
                      <br />
                      <div>
                        <div className="font-bold mr-12">
                          Possession: <span className="font-normal">{match.possession_avg_1}% - {match.possession_avg_2}%</span>
                        </div>
                        <div className="font-bold">
                          Shots: <span className="font-normal">{match.shots_1} - {match.shots_2}</span>
                        </div>
                        <div className="font-bold">
                          Shots on Goal: <span className="font-normal">{match.shots_on_goal_1} - {match.shots_on_goal_2}</span>
                        </div>
                        <div className="font-bold">
                          Passing Accuracy: <span className="font-normal">{match.passing_acc_1}% - {match.passing_acc_2}%</span>
                        </div>
                        <div className="font-bold">
                          Fouls: <span className="font-normal">{match.fouls_1} - {match.fouls_2}</span>
                        </div>
                      </div>
                    </td>
                    <td className="border px-4 py-2 text-black align-text-top">
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

export default Results;
