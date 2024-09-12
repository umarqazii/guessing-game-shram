import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';

const Game = () => {
    const [randomNumber, setRandomNumber] = useState(0);
    const [tries, setTries] = useState(0);
    const [guess, setGuess] = useState('');
    const [highestScore, setHighestScore] = useState(0);
    const [score, setScore] = useState(0);

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
            <Navbar />
            <div style={{ color: 'white' }}>
                <h1>Guessing Game</h1>
                <p>Number of tries: {tries} / 3</p>
                <p>Highest score: {highestScore}</p>
                <p>Score: {score}</p>
            </div>

            <div style={{ color: 'white' }}>
                <p>Guess a number between 1 and 10</p>
                <input 
                    type="text" 
                    value={guess} 
                    readOnly // Make the input read-only since we're using buttons
                />
                <button onClick={handleGuess}>Guess</button>
                <button onClick={()=>setGuess("")} >Reset</button>
            </div>

            {/* Number grid */}
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 50px)', gap: '10px', marginTop: '20px', justifyContent: 'center' }}>
                {Array.from({ length: 10 }, (_, index) => (
                    <button 
                        key={index} 
                        style={{ width: '50px', height: '50px', fontSize: '20px' }} 
                        onClick={() => handleNumberClick(index)}
                    >
                        {index}
                    </button>
                ))}
                
            </div>
        </div>
    );
};

export default Game;
