// generate random number between 1 and 10
export const generateRandomNumber = () => {
    return Math.floor(Math.random() * 10) + 1;
  };
  
// reset the game
  export const resetGame = (setScore, setTries, setGuesses, setRandomNumber) => {
    setScore(0);
    setTries(0);
    setGuesses([]);
    setRandomNumber(generateRandomNumber());
  };