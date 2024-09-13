import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import toast from 'react-hot-toast';
import Confetti from 'react-confetti';
import ProgressBar from "@ramonak/react-progress-bar";
import { Tooltip } from 'react-tooltip'
import 'primeicons/primeicons.css';
import { FaFlagCheckered } from "react-icons/fa";
import { useParams } from "react-router-dom";

const Game = () => {
    const { userId, username } = useParams();
    const [randomNumber, setRandomNumber] = useState(0);
    const [tries, setTries] = useState(0);
    const [guess, setGuess] = useState('');
    const [highestScore, setHighestScore] = useState(0);
    const [score, setScore] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);

    const triggerConfetti = () => {

          setShowConfetti(true);
          setTimeout(() => {
            setShowConfetti(false);
          }, 3000); // Confetti lasts for 3 seconds
        
      }

    //get the highest score from the server
    useEffect(() => {
        axios.get(`https://guessing-game-api.vercel.app/cred/gethighscore/${userId}`)
            .then((res) => {
                setHighestScore(res.data.highestScore);
                console.log(res.data.highestScore);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [highestScore, userId, username]);

    // whenever a new highest score is achieved, send it to the server along with the userId
    useEffect(() => {
        axios.post('https://guessing-game-api.vercel.app/cred/highscore', {
            userId: userId,
            highestScore: highestScore
        })
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [highestScore, userId, username]);

    // Generate a new random number between 1 and 10
    const generateRandomNumber = () => {
        setRandomNumber(Math.floor(Math.random() * 10) + 1);
    };

    useEffect(() => {
        generateRandomNumber(); // Initial random number generation
    }, []);

    const resetGame = () => {
        setScore(0);
        setTries(0);
        generateRandomNumber(); // Generate a new random number for a new game
    };

    const handleGuess = () => {
        const numericGuess = Number(guess); // Convert guess to number

        if (isNaN(numericGuess)) {
            alert('Please enter a valid number.');
            return;
        }

        // Increase the number of tries
        const newTries = tries + 1;
        setTries(newTries);

        if (numericGuess > randomNumber) {
            alert('Too high');
        } else if (numericGuess < randomNumber) {
            alert('Too low');
        } else {
            alert('Correct!');

            // Increment score when the correct guess is made
            const newScore = score + 1;
            setScore(newScore);

            // Update highest score if necessary
            if (newScore > highestScore) {
                setHighestScore(newScore);
                toast.success('New high score!');
                triggerConfetti();
            }

            // Reset tries and generate a new random number
            setTries(0);
            generateRandomNumber();
            setGuess('');
            return; // Exit the function since the user won
        }

        // If player fails to guess within 3 tries
        if (newTries >= 3) {
            alert('Game over! You failed to guess the number. The number was ' + randomNumber);
            resetGame(); // Reset score, tries, and generate a new random number
        }

        // Clear the guess input after every attempt
        setGuess('');
    };

    // Handle setting the guess by clicking on a number
    const handleNumberClick = (number) => {
        // Append the clicked number to the current guess, ensuring it doesn't exceed 2 digits
        const newGuess = guess + number.toString();

        // Only allow numbers with up to 2 digits
        if (newGuess.length <= 2) {
            setGuess(newGuess);
        }
    };

    return (
        <div className='App'>
            <Tooltip id="my-tooltip" />
            <Navbar />
            {showConfetti && <Confetti />}

            <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '91vh', flexDirection:'column'}}>
            <p style={{ color: 'white' }}>Welcome {username}</p>
            
            <div style={{ color: 'white', marginBottom: '20px' }}>
                <h1>Guessing Game</h1>
                <p>Guess a number between 1 and 10</p>
                <p>Number of tries: {tries} / 3</p>
                <a data-tooltip-id="my-tooltip" data-tooltip-content="High Score is the highest number of games won CONSECUTIVELY"
                >High Score: {highestScore} &nbsp;<i className="pi pi-info-circle" style={{ color: '#fff', fontSize: '15px' }}></i></a>
                <p></p>
                <a data-tooltip-id="my-tooltip" data-tooltip-content="Score is the number of games won CONSECUTIVELY"
                >Score: {score} &nbsp;<i className="pi pi-info-circle" style={{ color: '#fff', fontSize: '15px' }}></i></a>
                {/* <p>Score: {score}</p> */}
                <p></p>
                <ProgressBar completed={(score).toFixed(0)} maxCompleted={highestScore} />Progress To New High Score <FaFlagCheckered />
            </div>

            <div style={{ color: 'white' }}>
                
                {guess ? ( <h2>{guess}</h2>) : <h2>_ _</h2>}
                <button onClick={handleGuess}
                style={{
                    width: 'auto',
                    height: '40px',
                    fontSize: '20px',
                    backgroundColor: 'white',
                    color: 'black',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease', // Smooth transition
                    margin: '10px',
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.2)'; // Grow the button
                    e.target.style.backgroundColor = '#f0f0f0'; // Change color slightly
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)'; // Return to original size
                    e.target.style.backgroundColor = 'white'; // Return to original color
                  }}
                >Guess</button>
                <button onClick={()=>setGuess("")} 
                style={{
                    width: 'auto',
                    height: '40px',
                    fontSize: '20px',
                    backgroundColor: 'white',
                    color: 'black',
                    border: 'none',
                    borderRadius: '5px',
                    cursor: 'pointer',
                    transition: 'all 0.3s ease', // Smooth transition
                    margin: '10px',
                    
                  }}
                  onMouseEnter={(e) => {
                    e.target.style.transform = 'scale(1.2)'; // Grow the button
                    e.target.style.backgroundColor = '#f0f0f0'; // Change color slightly
                  }}
                  onMouseLeave={(e) => {
                    e.target.style.transform = 'scale(1)'; // Return to original size
                    e.target.style.backgroundColor = 'white'; // Return to original color
                  }}    
                >Reset</button>
            </div>

            {/* Number grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 50px)', gap: '10px', marginTop: '20px', justifyContent: 'center' }}>
                {Array.from({ length: 10 }, (_, index) => (
                    <button 
                    key={index} 
                    style={{
                      width: '50px',
                      height: '50px',
                      fontSize: '20px',
                      backgroundColor: 'white',
                      color: 'black',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease', // Smooth transition
                    }} 
                    onClick={() => handleNumberClick(index)}
                    onMouseEnter={(e) => {
                      e.target.style.transform = 'scale(1.2)'; // Grow the button
                      e.target.style.backgroundColor = '#f0f0f0'; // Change color slightly
                    }}
                    onMouseLeave={(e) => {
                      e.target.style.transform = 'scale(1)'; // Return to original size
                      e.target.style.backgroundColor = 'white'; // Return to original color
                    }}
                  >
                    {index}
                  </button>
                  
                ))}
                
            </div>
        </div>
        </div>
    );
};

export default Game;
