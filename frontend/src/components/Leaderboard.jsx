import React, { useState, useEffect } from "react";
import * as assets from "../assets"; // Import assets containing club logos
import styles from "../style";

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    useEffect(() => {
        fetchLeaderboard();
    }, []);

    const fetchLeaderboard = async () => {
        try {
            const response = await fetch("http://localhost:3001/PremierLeague", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (response.ok) {
                const data = await response.json();
                setLeaderboard(data);
            } else {
                console.error("Failed to fetch leaderboard");
            }
        } catch (error) {
            console.error("Error fetching leaderboard:", error);
        }
    };

    return (
        <div className="flex justify-center items-center min-h-screen">
            <section id="leaderboard" className={`flex flex-col ${styles.paddingX} w-full h-full`}>
                <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 flex justify-center items-center w-full`}>
                    <h1 className="font-poppins font-semibold text-[55px] text-white leading-[100.8px] mb-8">
                        <span className="text-gradient">Leaderboard</span>
                    </h1>
                    <div className="overflow-auto w-full max-h-[70vh] pb-32">
                        <table className="min-w-full bg-#050505">
                            <thead>
                                <tr className="bg-[#38003c]">
                                    <th className="font-poppins w-[5%] px-4 py-2 text-white">Position</th>
                                    <th className="font-poppins w-[20%] px-4 py-2 text-white">Club</th>
                                    <th className="font-poppins w-[10%] px-4 py-2 text-white">Played</th>
                                    <th className="font-poppins w-[10%] px-4 py-2 text-white">Won</th>
                                    <th className="font-poppins w-[10%] px-4 py-2 text-white">Drawn</th>
                                    <th className="font-poppins w-[10%] px-4 py-2 text-white">Lost</th>
                                    <th className="font-poppins w-[10%] px-4 py-2 text-white">Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboard.map((team, index) => (
                                    <tr key={index} className="bg-white">
                                        <td className="border px-4 py-2 text-black">{index + 1}</td>
                                        <td className="border px-4 py-2 flex items-center text-black">
                                            <img
                                                src={assets[team.team_code]} // Assuming team_code matches the key in assets
                                                alt={team.name}
                                                className="w-8 h-8 mr-2 object-cover" // Ensuring the logo is square with object-cover
                                            />
                                            {team.name}
                                        </td>
                                        <td className="border px-4 py-2 text-black">{team.matches_played}</td>
                                        <td className="border px-4 py-2 text-black">{team.wins}</td>
                                        <td className="border px-4 py-2 text-black">{team.draws}</td>
                                        <td className="border px-4 py-2 text-black">{team.losses}</td>
                                        <td className="border px-4 py-2 text-black">{team.points}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Leaderboard;
