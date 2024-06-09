import * as assets from "../assets";
import styles, { layout } from "../style";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Upcoming = () => {
  const [matches, setMatches] = useState([]);

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
  }, []);

  return (
    <div className="text-center">
      <section className="flex flex-wrap justify-between text-left w-full mb-8 mt-8">
        <div className="w-full">
          <h1 className="font-poppins font-semibold text-white text-left ss:text-[40px] text-[30px] mb-4">
            <span className="text-gradient">Upcoming</span>
            <span className="text-white"> Matches</span>
          </h1>

          <div className={`overflow-x-auto feature-card`}>
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
      </section>
    </div>
  );
};

export default Upcoming;
