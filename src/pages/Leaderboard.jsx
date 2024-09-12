import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    // Fetch the leaderboard data from the backend
    axios
      .get("https://guessing-game-api.vercel.app/cred/leaderboard")
      .then((res) => {
        setLeaderboard(res.data.leaderboard); // Set the leaderboard data to state
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <div className="App">
      <Navbar />
      <div
        style={{
          height: "85vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          color: "white",
          gap: "20px",
        }}
      >
        <h1>Leaderboard</h1>
        {/* Check if leaderboard has data */}
        {leaderboard.length > 0 ? (
          <table>
            <thead>
              <tr>
                <th style={{ padding: "10px 20px" }}>Rank</th>
                <th style={{ padding: "10px 20px" }}>Username</th>
                <th style={{ padding: "10px 20px" }}>Highest Score</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td> {/* Rank starts from 1 */}
                  <td>{user.username}</td>
                  <td>{user.highestScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>Loading leaderboard...</p>
        )}
      </div>
    </div>
  );
};

export default Leaderboard;
