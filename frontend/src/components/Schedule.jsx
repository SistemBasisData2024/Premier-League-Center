import * as assets from "../assets";
import styles, { layout } from "../style";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Upcoming = () => {
  const [matches, setMatches] = useState([]);
  const [results, setResults] = useState([]);

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

    fetch("http://localhost:3001/ResultMatches")
      .then((response) => response.json())
      .then((data) => setResults(data))
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  return (
    <div className="text-center">
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          
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

const Schedule = () => (
  <section id="datamanagement" className={layout.section}>
    <div className="w-full px-4 sm:px-6 lg:px-8">
      <Upcoming />
    </div>
  </section>
);
export default Schedule;
