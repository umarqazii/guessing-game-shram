// importing the required libraries
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Confetti from "react-confetti";
import ProgressBar from "@ramonak/react-progress-bar";
import { Tooltip } from "react-tooltip";
import { FaFlagCheckered } from "react-icons/fa";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

// importing the helper functions
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
  // state variables
  const { userId, username } = useParams();
  const [randomNumber, setRandomNumber] = useState(0);
  const [tries, setTries] = useState(0);
  const [guess, setGuess] = useState("");
  const [highestScore, setHighestScore] = useState(0);
  const [score, setScore] = useState(0);
  const [guesses, setGuesses] = useState([]);
  const [showConfetti, setShowConfetti] = useState(false);
  let toastid = '';

  // function to trigger confetti when new high score is achieved
  const triggerConfetti = () => {
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  };

  // fetching the highest score of a user from the database
  useEffect(() => {
    fetchHighestScore(userId, setHighestScore);
  }, [userId]);

  // updating the highest score of a user in the database
  useEffect(() => {
    updateHighestScore(userId, highestScore);
  }, [highestScore, userId]);

  // random number generation
  useEffect(() => {
    setRandomNumber(generateRandomNumber()); // Initial random number generation
  }, []);

  // function to handle the guess made by the user
  const handleGuess = () => {
    // converting the guess to a number from a string
    const numericGuess = Number(guess);

    // checking if the guess is a number
    if (isNaN(numericGuess)) {
      alert("Please enter a valid number.");
      return;
    }

    // adding the guess to the guesses array (just to display it)
    const newGuesses = [...guesses, numericGuess];
    setGuesses(newGuesses);

    // incrementing the tries
    const newTries = tries + 1;
    setTries(newTries);

    // checking if the guess is correct, higher or lower
    if (numericGuess > randomNumber) {
      toastid = toast.error("Too high, Try a smaller number");
    } else if (numericGuess < randomNumber) {
      toastid = toast.error("Too low, Try a larger number");
    } else {
      toast.success("Correct!");
      // if the guess is correct, increment the score
      const newScore = score + 1;
      setScore(newScore);
      // reset the guesses array for the next round
      setGuesses([]);

      // if the player achieves a new high score, trigger the confetti and update the highest score
      if (newScore > highestScore) {
        setHighestScore(newScore);
        toast.success("New high score!");
        triggerConfetti();
      }
      // reset the tries and generate a new random number
      setTries(0);
      setRandomNumber(generateRandomNumber());
      setGuess("");
      return;
    }

    // if the player fails 3 times, end the game
    if (newTries >= 3) {
      toast.dismiss(toastid);
      toast.error(`Game over! The number was ${randomNumber}`);
      resetGame(setScore, setTries, setGuesses, setRandomNumber);
    }

    setGuess("");
  };

  // function to handle the number click on the screen
  const handleNumberClick = (number) => {
    const newGuess = guess + number.toString();
    if (newGuess.length <= 2) {
      setGuess(newGuess);
    }
  };

  return (
    <div className="App">
      <Tooltip id="my-tooltip" />
      {/* Displaying the Navbar on the top */}
      <Navbar />

      {/* Confetti animation */}
      {showConfetti && <Confetti />}

      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "91vh", flexDirection: "column" }}>
        <p style={{ color: "white" }}>Welcome {username}</p>

        <div style={{ color: "white", marginBottom: "20px" }}>
          <h1>Guessing Game</h1>
          <p>Guess a number between 1 and 10</p>

          {/* Table to display the number of tries, high score and the score */}
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

          {/* Progress bar to show the player's progress to new high score */}
          <ProgressBar completed={score.toFixed(0)} maxCompleted={highestScore} />
          <span>Progress To New High Score <FaFlagCheckered /></span>
        </div>

        <div style={{ color: "white" }}>
          {guess ? <h2>{guess}</h2> : <h2>_ _</h2>}

          {/* Button to submit the guessed number */}
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
              e.target.style.backgroundColor = "gray"; 
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "white";
            }}>Guess</button>

          {/* Button to reset the guessed number */}
          <button onClick={() => setGuess("")} style={{
              width: "auto",
              height: "40px",
              fontSize: "20px",
              backgroundColor: "white",
              color: "black",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "all 0.3s ease", 
              margin: "10px",
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = "gray"; 
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = "white"; 
            }}>Reset</button>
        </div>

        {/* Buttons to enter the guessed number so that the player doesn't need to use the keyboard */}
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
                e.target.style.backgroundColor = "gray";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "white";
              }}>
              {index}
            </button>
          ))}
        </div>

        {/* Display the guesses so far with (too low, too high) for the player's easy */}
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
