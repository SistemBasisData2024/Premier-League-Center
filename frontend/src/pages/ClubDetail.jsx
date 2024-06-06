import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import style from "../style";

const ClubDetail = () => {
  const { team_code } = useParams();
  const [teamMembers, setTeamMembers] = useState([]);
  const navigate = useNavigate(); // Use useNavigate for navigation

  useEffect(() => {
    axios
      .get(`http://localhost:3001/teamInfo/${team_code}`)
      .then((response) => setTeamMembers(response.data))
      .catch((error) => console.error("Error fetching team details", error));
  }, [team_code]);

  if (teamMembers.length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-primary w-full relative pt-9">
      <Navbar />
      <div className={`bg-primary ${style.flexStart}`}>
        <div className={`${style.boxWidth}`}>
          <button
            className="px-4 py-2 mt-20 ml-20 bg-gray-800 text-white rounded-lg hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            onClick={() => navigate("/clubs")} // Navigate to ClubsPage.jsx on button click
          >
            Back
          </button>
          <h1 className="font-poppins font-semibold text-center justify-center ss:text-[55px] text-[45px] mb-6 text-gradient">
            Team Players of {teamMembers.length > 0 && teamMembers[0].team_name}
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-20">
            {teamMembers.map((member) => (
              <div
                key={member.member_code}
                className="bg-gray-800 rounded-lg shadow-lg p-6 transform hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={`https://via.placeholder.com/150?text=${member.member_code}`}
                  alt={member.member_name}
                  className="w-24 h-24 rounded-full mx-auto mb-4"
                />
                <h2 className="text-xl font-semibold text-white text-center mb-2">
                  {member.member_name}
                </h2>
                <p className="text-gray-300 text-center">
                  Role: {member.member_role}
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
