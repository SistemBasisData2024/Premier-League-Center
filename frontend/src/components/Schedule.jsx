import { useState, useEffect } from "react";
import axios from "axios";
import style from "../style";

const Schedule = () => {
  const [upcomingMatches, setUpcomingMatches] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/Schedule")
      .then((response) => setUpcomingMatches(response.data))
      .catch((error) => console.error("Error fetching upcoming matches", error));
  }, []);

  if (upcomingMatches.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-primary py-10">
      <div className={`max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 ${style.flexStart}`}>
        <div className="w-full">
          <h2 className="text-4xl font-semibold text-white mb-6">Upcoming Matches</h2>
          <div className="grid grid-cols-1 gap-6">
            {upcomingMatches.map((match) => (
              <div
                key={match.match_id}
                className="bg-secondary rounded-lg shadow-lg p-6 flex items-center justify-between"
              >
                <div className="flex items-center">
                  <div className="mr-4">
                    <img
                      src={assets[match.team1_code]}
                      alt={match.team1_name}
                      className="w-10 h-10"
                    />
                    <p className="text-white text-center">{match.team1_name}</p>
                  </div>
                  <div className="mr-4">
                    <p className="text-white text-xl">-</p>
                  </div>
                  <div>
                    <img
                      src={assets[match.team2_code]}
                      alt={match.team2_name}
                      className="w-10 h-10"
                    />
                    <p className="text-white text-center">{match.team2_name}</p>
                  </div>
                </div>
                <div>
                  <p className="text-white text-sm">{match.date}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
