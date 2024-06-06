import React, { useState, useEffect } from "react";
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
                    <div className="overflow-auto w-full max-h-[70vh]">
                        <table className="min-w-full bg-#050505">
                            <thead>
                                <tr>
                                    <th className="font-poppins w-[5%] px-4 py-2">Position</th>
                                    <th className="font-poppins w-[20%] px-4 py-2">Club</th>
                                    <th className="font-poppins w-[10%] px-4 py-2">Played</th>
                                    <th className="font-poppins w-[10%] px-4 py-2">Won</th>
                                    <th className="font-poppins w-[10%] px-4 py-2">Drawn</th>
                                    <th className="font-poppins w-[10%] px-4 py-2">Lost</th>
                                    <th className="font-poppins w-[10%] px-4 py-2">Points</th>
                                </tr>
                            </thead>
                            <tbody>
                                {leaderboard.map((team, index) => (
                                    <tr key={index} className="bg-gray-800">
                                        <td className="border px-4 py-2">{index + 1}</td>
                                        <td className="border px-4 py-2">{team.name}</td>
                                        <td className="border px-4 py-2">{team.matches_played}</td>
                                        <td className="border px-4 py-2">{team.wins}</td>
                                        <td className="border px-4 py-2">{team.draws}</td>
                                        <td className="border px-4 py-2">{team.losses}</td>
                                        <td className="border px-4 py-2">{team.points}</td>
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
