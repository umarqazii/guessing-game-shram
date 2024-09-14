import axios from "axios";

// fetch highest score of a user from the database
export const fetchHighestScore = async (userId, setHighestScore) => {
  try {
    const res = await axios.get(
      `https://guessing-game-api.vercel.app/cred/gethighscore/${userId}`
    );
    setHighestScore(res.data.highestScore);
    console.log(res.data.highestScore);
  } catch (error) {
    console.error("Error fetching highest score:", error);
  }
};

// update the highest score of a user in the database
export const updateHighestScore = async (userId, highestScore) => {
  try {
    const res = await axios.post(
      "https://guessing-game-api.vercel.app/cred/highscore",
      {
        userId: userId,
        highestScore: highestScore,
      }
    );
    console.log("Highest score updated:", res);
  } catch (error) {
    console.error("Error updating highest score:", error);
  }
};

// fetch leaderboard data
export const getLeaderboardData = async () => {
    try {
      const response = await axios.get(
        "https://guessing-game-api.vercel.app/cred/leaderboard"
      );
      return response.data.leaderboard;
    } catch (error) {
      console.error("Error fetching leaderboard:", error);
      throw error; // Rethrow the error to handle it in the component
    }
  };