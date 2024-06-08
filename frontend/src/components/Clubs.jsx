import * as assets from "../assets";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import ColorThief from "colorthief";

const Clubs = () => {
  const [teams, setTeams] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const cardsRef = useRef([]);
  const colorThief = new ColorThief();

  // Define filteredTeams here
  const filteredTeams = teams.filter((team) =>
    team.team_name.toLowerCase().includes(searchKeyword.toLowerCase())
  );

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

  const setCardBackgroundColor = (imgElement, cardElement, textElement) => {
    if (imgElement.complete) {
      const color = colorThief.getColor(imgElement);
      const rgbColor = `rgb(${color.join(",")})`;
      cardElement.style.setProperty("--hover-bg-color", rgbColor);
      cardElement.style.setProperty("--border-color", rgbColor);

      const brightness = (color[0] * 299 + color[1] * 587 + color[2] * 114) / 1000;
      const textColor = brightness > 128 ? "black" : "white";
      textElement.style.setProperty("--text-hover-color", textColor);
    } else {
      imgElement.addEventListener("load", () => {
        const color = colorThief.getColor(imgElement);
        const rgbColor = `rgb(${color.join(",")})`;
        cardElement.style.setProperty("--hover-bg-color", rgbColor);
        cardElement.style.setProperty("--border-color", rgbColor);

        const brightness = (color[0] * 299 + color[1] * 587 + color[2] * 114) / 1000;
        const textColor = brightness > 128 ? "black" : "white";
        textElement.style.setProperty("--text-hover-color", textColor);
      });
    }
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
            style={{
              "--hover-bg-color": "transparent",
              "--border-color": "transparent",
              borderBottomWidth: "4px",
              borderBottomColor: "var(--border-color)"
            }}
          >
            <div className="relative h-64 glassmorphism">
              <img
                src={assets[team.team_code]}
                alt={team.team_name}
                className="absolute inset-0 h-full w-full p-4 object-cover object-center opacity-100 transition-opacity "
                onLoad={(e) => setCardBackgroundColor(e.target, cardsRef.current[index], cardsRef.current[index].querySelector(".team-name"))}
              />
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity group-hover:bg-opacity-25"></div>
            <div className="relative p-4 glassmorphism flex items-center justify-between group-hover:bg-[var(--hover-bg-color)]"
                 style={{ height: '70px' }}> {/* Set a fixed height */}
              <h3 className="team-name text-xl font-poppins font-semibold text-white group-hover:text-[var(--text-hover-color)]">
                {team.team_name}
              </h3>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 text-white transition-transform group-hover:translate-x-1 group-hover:text-[var(--text-hover-color)]"
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
