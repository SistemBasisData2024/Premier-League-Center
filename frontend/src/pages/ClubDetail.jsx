import * as assets from "../assets"; // Import assets
import { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ColorThief from "colorthief"; // Import ColorThief
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import style from "../style";

const ClubDetail = () => {
  const { team_code } = useParams();
  const [teamMembers, setTeamMembers] = useState([]);
  const [filteredTeamMembers, setFilteredTeamMembers] = useState([]);
  const [teamColor, setTeamColor] = useState("#ffffff"); // Default color
  const [textColor, setTextColor] = useState("#000000"); // Default text color
  const [searchKeyword, setSearchKeyword] = useState(""); // Search keyword state
  const navigate = useNavigate(); // Use useNavigate for navigation
  const cardsRef = useRef([]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/teamInfo/${team_code}`)
      .then((response) => {
        setTeamMembers(response.data);
        setFilteredTeamMembers(response.data); // Set initial filtered data
        // Get the team logo from assets and set the color
        if (response.data.length > 0) {
          const teamLogoUrl = assets[team_code];
          const img = new Image();
          img.src = teamLogoUrl;
          img.crossOrigin = "Anonymous";
          img.onload = () => {
            const colorThief = new ColorThief();
            const color = colorThief.getColor(img);
            const gradientColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`;
            setTeamColor(gradientColor);
            const brightness =
              (color[0] * 299 + color[1] * 587 + color[2] * 114) / 1000;
            setTextColor(brightness > 128 ? "#000000" : "#ffffff");
          };
        }
      })
      .catch((error) => console.error("Error fetching team details", error));
  }, [team_code]);

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
  }, [filteredTeamMembers]); // Update dependency to include filteredTeamMembers

  useEffect(() => {
    setFilteredTeamMembers(
      teamMembers.filter((member) =>
        member.member_name.toLowerCase().includes(searchKeyword.toLowerCase())
      )
    );
  }, [searchKeyword, teamMembers]);

  const handleSearchChange = (e) => {
    setSearchKeyword(e.target.value);
  };

  if (teamMembers.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-primary w-full relative pt-9">
      <Navbar />
      <div className={`bg-primary ${style.flexStart}`}>
        <div className={`${style.boxWidth}`}>
          <h1 className="font-poppins font-semibold text-center justify-center ss:text-[55px] text-[45px] mt-20">
            <span className="text-gradient">Players</span>
          </h1>
          <h2 className="font-poppins font-semibold text-center justify-center ss:text-[90px] text-[45px] text-white mb-8">
            {teamMembers.length > 0 && teamMembers[0].team_name}
          </h2>

          <div className="mx-auto max-w-md mb-12">
            <input
              type="text"
              value={searchKeyword}
              onChange={handleSearchChange}
              placeholder="Search club..."
              className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-20">
            {filteredTeamMembers.map((member, index) => (
              <div
                key={member.member_code}
                className="rounded-lg shadow-lg p-6 transition-opacity duration-500 opacity-0 transform hover:scale-105 hover:shadow-xl"
                style={{
                  background: `linear-gradient(135deg, ${teamColor} 0%, #16161d 100%)`,
                  color: textColor,
                }}
                ref={(el) => (cardsRef.current[index] = el)}
              >
                <img
                  src={`https://via.placeholder.com/150?text=${member.member_code}`}
                  alt={member.member_name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h2 className="text-xl font-semibold text-center mb-2">
                  {member.member_name}
                </h2>
                <p className="text-center">
                  {member.member_role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className={`bg-primary ${style.paddingX} ${style.flexCenter}`}>
        <div className={`${style.boxWidth}`}>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default ClubDetail;
