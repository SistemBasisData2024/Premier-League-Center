import React, { useState } from "react";
import styles from "../style";

const Leaderboard = () => {
    const [leaderboard, setLeaderboard] = useState([]);

    const fetchLeaderboard = async () => {
        try {
            const response = await fetch("http://localhost:3001/Leaderboard", {
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
        <div className="flex justify-center items-center h-screen pb-24">
            <section id="leaderboard" className={`flex md:flex-row flex-col ${styles.paddingX}`}>
                <div className={`flex-1 ${styles.flexStart} flex-col xl:px-0 sm:px-16 px-6 flex justify-center items-center`}>
                    <h1 className="font-poppins font-semibold text-[55px] text-white leading-[100.8px] mb-8">
                        <span className="text-gradient">Leaderboard</span>
                    </h1>
                </div>
            </section>
        </div>
    );
}

export default Leaderboard;