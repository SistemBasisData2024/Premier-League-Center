import * as assets from "../assets";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";

const Clubs = () => {
  const [teams, setTeams] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const cardsRef = useRef([]);

  // Define filteredTeams here
  const filteredTeams = teams
    .filter((team) =>
      team.team_name.toLowerCase().includes(searchKeyword.toLowerCase())
    )
    .sort((a, b) => a.team_name.localeCompare(b.team_name)); // Sort teams alphabetically

  useEffect(() => {
    fetch("http://localhost:3001/teams")
      .then((response) => response.json())
      .then((data) => setTeams(data))
      .catch((error) => console.error("Error fetching data", error));
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("opacity-100", "transform-none");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
      }
    );

    cardsRef.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    return () => {
      observer.disconnect();
    };
  }, [filteredTeams]); // Update dependency to include filteredTeams

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
      <h1 className="font-poppins font-semibold text-white text-center justify-center text-7xl mb-12 pt-12">
        <span className="text-gradient">Clubs</span>
      </h1>
      <div className="mx-auto max-w-md mb-8">
        <input
          type="text"
          value={searchKeyword}
          onChange={handleSearchChange}
          placeholder="Search club..."
          className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {filteredTeams.map((team, index) => (
          <Link
            key={index}
            to={`/clubs/${team.team_code}`}
            className="group relative overflow-hidden rounded-lg shadow-lg transition-all ease-in duration-700 transform translate-y-10 opacity-0"
            ref={(el) => (cardsRef.current[index] = el)}
          >
            <div className="relative h-64 glassmorphism">
              <img
                src={assets[team.team_code]}
                alt={team.team_name}
                className="absolute inset-0 h-full w-full p-4 object-cover object-center opacity-100 transition-opacity "
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity group-hover:bg-opacity-25"></div>
            <div className="relative p-4 glassmorphism flex items-center justify-between group-hover:bg-white">
              <h3 className="text-xl font-poppins font-semibold text-white group-hover:text-black">
                {team.team_name}
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white transition-transform group-hover:translate-x-1 group-hover:text-black"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Clubs;
