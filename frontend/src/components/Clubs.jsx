import * as assets from "../assets";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Clubs = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        fetch("http://localhost:3001/teams")
            .then((response) => response.json())
            .then((data) => setTeams(data))
            .catch((error) => console.error("Error fetching data", error));
    }, []);

    return (
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
            <h1 className="font-poppins font-semibold text-white text-center justify-center text-7xl mb-12 pt-12">
                <span className="text-gradient">THE TEAMS</span>
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                {teams.map((team, index) => (
                    <Link
                        key={index}
                        to={`/team/${team.team_code}`}
                        className="group relative overflow-hidden rounded-lg shadow-lg transition-all duration-300"
                    >
                        <div className="relative h-64 bg-gradient-to-r from-purple-900 to-white">
                            <img
                                src={assets[team.team_code]}
                                alt={team.team_name}
                                className="absolute inset-0 h-full w-full p-4 object-cover object-center opacity-100 transition-opacity group-hover:opacity-50"
                            />
                        </div>
                        <div className="absolute inset-0 bg-black bg-opacity-0 transition-opacity group-hover:bg-opacity-50"></div>
                        <div className="relative p-4 bg-gray-700 flex items-center justify-between">
                            <h3 className="text-xl font-poppins font-semibold text-white">{team.team_name}</h3>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 text-white transition-transform group-hover:translate-x-1"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                            >
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                            </svg>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default Clubs;
