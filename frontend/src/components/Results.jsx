import { useState, useEffect } from "react";
import axios from "axios";
import style from "../style";

const Results = () => {
  const [matchResults, setMatchResults] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3001/Results")
      .then((response) => setMatchResults(response.data))
      .catch((error) => console.error("Error fetching match results", error));
  }, []);

  if (matchResults.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-primary py-10">
      <div className={`max-w-screen-xl mx-auto px-4 sm:px-6 lg:px-8 ${style.flexStart}`}>
        <div className="w-full flex flex-col lg:flex-row items-start">
          <h2 className="text-4xl font-semibold text-white mb-6 lg:mb-0 lg:w-1/3">
            Match Results
          </h2>
          <div className="lg:w-2/3 grid grid-cols-1 gap-6">
            {matchResults.map((match) => (
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
                    <p className="text-white text-xl">{match.team1_score}</p>
                  </div>
                  <div className="mr-4">
                    <p className="text-white text-xl">-</p>
                  </div>
                  <div className="mr-4">
                    <p className="text-white text-xl">{match.team2_score}</p>
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

export default Results;
