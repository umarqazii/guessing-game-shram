# Guessing Game 

This is a React-based application for a guessing game. The player will have to guess a randomly stored number between 1-10 within 3 tries.
If they succeed, an increment will be made in the score. To keep the score on increasing you have to win games Consequetively. Highscore is the 
hisghest number of games won consequetively. A leadership board is maintained to rank the players on the basis of their highest scores. As soon as the player makes a highest score, it will be stored in the database accordingly. 

## Features

- Splash Screen
- User Registration/Login
- Keeping track of score and storing highest score for each player in the database
- Displays Tries Remaining, Score, Highscore, Progress Bar, Guesses so far to keep the player aware of their position in the game.
- Responsive design with a visually appealing user interface.
- Leaderboard to see the top 10 highest scorers in the game so you can aim to take their place.

## Technologies Used

- **React.js**: Frontend library for building user interfaces.
- **Axios**: For making HTTP requests to the backend API.
- **CSS**: For styling the UI components.
- **Node.js and Express.js**: Backend to handle the API and game logic (if applicable).
- **React-Hot-Toast**: To display toasts for error, success, loading etc.
- **React-Confetti**: To pop a confetti when a player makes a new highscore.
- **React-tooltip**: To give information to the player on hover. (used in score/highscore)
- **Vercel**: Game is deployed on vercel. Feel free to play on desktop or your mobile phone

## How to run the Code

- Step 1
open command prompt and type:
### `git clone https://github.com/umarqazii/guessing-game-shram.git`

- Step 2
### `cd guessing-game-shram`

- Step 3
### `npm install`

- Step 4
### `npm start`

## The game is deployed to Vercel
[Deployment link](https://guessing-game-shram.vercel.app/)

## Backend Repo Link
[Backend Repo](https://github.com/umarqazii/guessing-game-api)

