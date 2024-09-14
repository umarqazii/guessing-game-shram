import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { getLeaderboardData } from "../utils/apiRequests"; // Importing the helper function

const Leaderboard = () => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        const leaderboardData = await getLeaderboardData(); // Using the helper function
        setLeaderboard(leaderboardData); // Set the leaderboard data to state
      } catch (err) {
        console.error("Failed to fetch leaderboard:", err);
      }
    };

    fetchLeaderboard();
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
    <h1 style={{ fontSize: "2.5rem" }}>Leaderboard</h1>
    {/* Check if leaderboard has data */}
    {leaderboard.length > 0 ? (
      <table
        style={{
          borderCollapse: "collapse",
          width: "80%",
          maxWidth: "600px",
          color: "#333",
          backgroundColor: "white",
          borderRadius: "8px",
          overflow: "hidden",
          boxShadow: "0 5px 15px rgba(0, 0, 0, 0.1)",
        }}
      >
        <thead>
          <tr
            style={{
              backgroundColor: "#4a3055",
              color: "white",
              fontWeight: "bold",
              textAlign: "center",
            }}
          >
            <th style={{ padding: "15px 20px", borderBottom: "2px solid white" }}>Rank</th>
            <th style={{ padding: "15px 20px", borderBottom: "2px solid white" }}>Username</th>
            <th style={{ padding: "15px 20px", borderBottom: "2px solid white" }}>Highest Score</th>
          </tr>
        </thead>
        <tbody>
          {leaderboard.map((user, index) => (
            <tr
              key={user._id}
              style={{
                backgroundColor: index % 2 === 0 ? "#f9f9f9" : "#f1f1f1",
                transition: "background-color 0.3s ease",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#e0e0e0")}
              onMouseLeave={(e) =>
                (e.currentTarget.style.backgroundColor =
                  index % 2 === 0 ? "#f9f9f9" : "#f1f1f1")
              }
            >
              <td
                style={{
                  padding: "15px 20px",
                  borderBottom: "1px solid #ddd",
                  textAlign: "center",
                  fontWeight: "bold",
                }}
              >
                {index + 1}
              </td>
              <td
                style={{
                  padding: "15px 20px",
                  borderBottom: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                {user.username}
              </td>
              <td
                style={{
                  padding: "15px 20px",
                  borderBottom: "1px solid #ddd",
                  textAlign: "center",
                }}
              >
                {user.highestScore}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    ) : (
      <p style={{ fontSize: "1.2rem" }}>Loading leaderboard...</p>
    )}
  </div>
</div>

  );
};

export default Leaderboard;
