import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Confetti from "react-confetti";
import ProgressBar from "@ramonak/react-progress-bar";
import { Tooltip } from "react-tooltip";
import { FaFlagCheckered } from "react-icons/fa";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";
import {
  generateRandomNumber,
  resetGame
} from "../utils/gameLogic";
import {
  fetchHighestScore,
  updateHighestScore
} from "../utils/apiRequests";
import {
  showSuccessToast,
  showErrorToast
} from "../utils/toastNotifications";

const Game = () => {
  const { userId, username } = useParams();
  const [randomNumber, setRandomNumber] = useState(0);
  const [tries, setTries] = useState(0);
  const [guess, setGuess] = useState("");
  const [highestScore, setHighestScore] = useState(0);
  const [score, setScore] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  let toastid = '';

  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

  useEffect(() => {
    fetchHighestScore(userId, setHighestScore);
  }, [userId]);

  useEffect(() => {
    updateHighestScore(userId, highestScore);
  }, [highestScore, userId]);

  useEffect(() => {
    setRandomNumber(generateRandomNumber()); // Initial random number generation
  }, []);

  const handleGuess = () => {
    const numericGuess = Number(guess);

    if (isNaN(numericGuess)) {
      alert("Please enter a valid number.");
      return;
    }

    const newGuesses = [...guesses, numericGuess];
    setGuesses(newGuesses);

    const newTries = tries + 1;
    setTries(newTries);

    if (numericGuess > randomNumber) {
      toastid = toast.error("Too high, Try a smaller number");
    } else if (numericGuess < randomNumber) {
      toastid = toast.error("Too low, Try a larger number");
    } else {
      toast.success("Correct!");
      const newScore = score + 1;
      setScore(newScore);
      setGuesses([]);

      if (newScore > highestScore) {
        setHighestScore(newScore);
        toast.success("New high score!");
        triggerConfetti();
      }

      setTries(0);
      setRandomNumber(generateRandomNumber());
      setGuess("");
      return;
    }

    if (newTries >= 3) {
      toast.dismiss(toastid);
      toast.error(`Game over! The number was ${randomNumber}`);
      resetGame(setScore, setTries, setGuesses, setRandomNumber);
    }

    setGuess("");
  };

  const handleNumberClick = (number) => {
    const newGuess = guess + number.toString();
    if (newGuess.length <= 2) {
      setGuess(newGuess);
    }
  };

  return (
    <div className="App">
      <Tooltip id="my-tooltip" />
      <Navbar />
      {showConfetti && <Confetti />}

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "91vh", flexDirection: "column" }}>
        <p style={{ color: "white" }}>Welcome {username}</p>

        <div style={{ color: "white", marginBottom: "20px" }}>
          <h1>Guessing Game</h1>
          <p>Guess a number between 1 and 10</p>

          {/* Table and Progress bar */}
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginBottom: "20px",
            }}
          >
            <thead>
              <tr>
                <th
                  style={{
                    border: "1px solid white",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  No of Tries
                </th>
                <th
                  style={{
                    border: "1px solid white",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  High Score&nbsp;
                  <a
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Highest number of games won CONSECUTIVELY"
                  >
                    <i
                      className="pi pi-info-circle"
                      style={{ color: "#fff", fontSize: "15px" }}
                    ></i>
                  </a>
                </th>
                <th
                  style={{
                    border: "1px solid white",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  Score&nbsp;
                  <a
                    data-tooltip-id="my-tooltip"
                    data-tooltip-content="Score is the number of games won CONSECUTIVELY"
                  >
                    <i
                      className="pi pi-info-circle"
                      style={{ color: "#fff", fontSize: "15px" }}
                    ></i>
                  </a>
                </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td
                  style={{
                    border: "1px solid white",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {tries} / 3
                </td>
                <td
                  style={{
                    border: "1px solid white",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {highestScore}
                </td>
                <td
                  style={{
                    border: "1px solid white",
                    padding: "10px",
                    textAlign: "center",
                  }}
                >
                  {score}
                </td>
              </tr>
            </tbody>
          </table>

          <ProgressBar completed={score.toFixed(0)} maxCompleted={highestScore} />
          <span>Progress To New High Score <FaFlagCheckered /></span>
        </div>

        <div style={{ color: "white" }}>
          {guess ? <h2>{guess}</h2> : <h2>_ _</h2>}
          <button onClick={handleGuess} style={{
              width: "auto",
              height: "40px",
              fontSize: "20px",
              backgroundColor: "white",
              color: "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "all 0.3s ease", // Smooth transition
              margin: "10px",
            }}
            onMouseEnter={(e) => {
              //e.target.style.transform = "scale(1.2)"; // Grow the button
              e.target.style.backgroundColor = "gray"; // Change color slightly
            }}
            onMouseLeave={(e) => {
              //e.target.style.transform = "scale(1)"; // Return to original size
              e.target.style.backgroundColor = "white"; // Return to original color
            }}>Guess</button>
          <button onClick={() => setGuess("")} style={{
              width: "auto",
              height: "40px",
              fontSize: "20px",
              backgroundColor: "white",
              color: "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "all 0.3s ease", // Smooth transition
              margin: "10px",
            }}
            onMouseEnter={(e) => {
              //e.target.style.transform = "scale(1.2)"; // Grow the button
              e.target.style.backgroundColor = "gray"; // Change color slightly
            }}
            onMouseLeave={(e) => {
              //e.target.style.transform = "scale(1)"; // Return to original size
              e.target.style.backgroundColor = "white"; // Return to original color
            }}>Reset</button>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 50px)", gap: "10px", marginTop: "20px", justifyContent: "center" }}>
          {Array.from({ length: 10 }, (_, index) => (
            <button key={index} onClick={() => handleNumberClick(index)} style={{ width: "50px",
              height: "50px",
              fontSize: "20px",
              backgroundColor: "white",
              color: "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "all 0.3s ease", // Smooth transition
               }}
              
              onMouseEnter={(e) => {
                //e.target.style.transform = "scale(1.2)"; // Grow the button
                e.target.style.backgroundColor = "gray"; // Change color slightly
              }}
              onMouseLeave={(e) => {
                //e.target.style.transform = "scale(1)"; // Return to original size
                e.target.style.backgroundColor = "white"; // Return to original color
              }}>
              {index}
            </button>
          ))}
        </div>

        <div style={{ marginTop: "20px" }}>
          {guesses.length > 0 ? (
            <p style={{ color: "white" }}>Guesses so far: {guesses.map(guess => guess < randomNumber ? `${guess} (too low)` : guess > randomNumber ? `${guess} (too high)` : `${guess} (correct)`).join(", ")}</p>
          ) : (
            <p style={{ color: "white" }}>No Guesses so far </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Game;
