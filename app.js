const gameboardController = (function() {
    const gameboard = [];
    const invalidFields = [];


    const updateBoard = function(field, marker) {
            gameboard[field] = marker;
            _render();
    };

    const clearBoard = function() {
        gameboard.splice(0, gameboard.length);
        invalidFields.splice(0, invalidFields.length);
        _render();
    }

    const getBoardState = function() {
        return gameboard;
    };

    //cache DOM fields
    const fields = document.querySelectorAll('.field');
    const xName = document.querySelector('#x-name');
    const oName = document.querySelector('#o-name');
    const xScore = document.querySelector('#x-score');
    const oScore = document.querySelector('#o-score');
    const gameOverBanner = document.querySelector('.game-over-banner');
    const overlay = document.querySelector('.overlay');

    // binding events
    // newGameButton.addEventListener('click', gameFlowController.startNewGame);


    const toggleGameOverScreen = function() {
        gameOverBanner.classList.toggle('active');
        overlay.classList.toggle('active');
    }

    const _render = function() {
        fields.forEach((field, marker) => field.textContent = gameboard[marker]);
        xName.textContent = `${playerOne.getName()}`;
        oName.textContent = `${playerTwo.getName()}`;
        xScore.textContent = `${playerOne.displayScore()}`;
        oScore.textContent = `${playerTwo.displayScore()}`;
    };

    return {
        getBoardState: getBoardState,
        updateBoard: updateBoard,
        invalidFields: invalidFields,
        clearBoard: clearBoard,
        render: _render,
        toggleGameOverScreen: toggleGameOverScreen
    };
    
})();


const createPlayer = function(name, marker) {
    // this.name = name;
    // this.marker = marker;
    let score = 0;
    const capturedFields =[];
  
    const placeMarker = function(e, field) {
        // const field = Number(e.target.getAttribute('id'));
        // console.log(field);
        gameboardController.updateBoard(field, marker);
        capturedFields.push(field);
        // console.log(`${marker}: ${capturedFields}`);
    };

    const updateScore = function() {
        score++;
        gameboardController.render();
    };

    const resetScore = function() {
        score = 0;
        gameboardController.render();
    }

    const getName = function() {
        return name;
    }
    
    const displayScore = function() {
        return score;
    }

    const clearCapturedFields = function() {
        capturedFields.splice(0, capturedFields.length);
    }

    return {
        name: name,
        updateScore: updateScore,
        getName: getName,
    	displayScore: displayScore,
        placeMarker: placeMarker,
        capturedFields: capturedFields,
        clearCapturedFields: clearCapturedFields,
        resetScore: resetScore
    }

};


const playerOne = createPlayer('Player', 'X');
const playerTwo = createPlayer('Computer', 'O');


const gameFlowController = (function() {
    let currentTurn = 1;
    let gameOver = false;

    const takeTurn = function(e) {
        if (gameOver) return;

        let currentPlayer = (currentTurn % 2 !== 0) ? playerOne : playerTwo
        const currentField = Number(e.target.getAttribute('id'));

        if (gameboardController.invalidFields.includes(currentField)) {
            return;
        } else {
            currentPlayer.placeMarker(e, currentField);
            gameboardController.invalidFields.push(currentField);
            checkForWinner(winningStates, currentPlayer.capturedFields, currentPlayer);
            currentTurn++;
        }
    }

    const checkForWinner = function(winning, captured, winner) {
        for (let i = 0; i < winning.length; i++) {
            if (winning[i].every(elem => captured.includes(elem))) {
                winner.updateScore();
                gameOver = true;
                gameboardController.toggleGameOverScreen();
            }
        }
    };

    const startNewGame = function() {
        gameboardController.clearBoard();
        playerOne.clearCapturedFields();
        playerTwo.clearCapturedFields();
        playerOne.resetScore();
        playerTwo.resetScore();
        currentTurn = 1;
        gameOver = false;
        gameboardController.toggleGameOverScreen();
    }

    const startNextRound = function() {
        gameboardController.clearBoard();
        playerOne.clearCapturedFields();
        playerTwo.clearCapturedFields();
        currentTurn = 1;
        gameOver = false;
        gameboardController.toggleGameOverScreen();
    }

    const winningStates = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    //cache DOM fields
    const fields = document.querySelectorAll('.field');
    const newGameButton = document.querySelector('.new-game-btn');
    const nextRoundButton = document.querySelector('.next-round-btn')


    // binding events
    fields.forEach(field => field.addEventListener('click', takeTurn));
    newGameButton.addEventListener('click', startNewGame);
    nextRoundButton.addEventListener('click', startNextRound);


    return {
        startNewGame: startNewGame
    }

})();

// gameFlowController.startNewGame();
gameboardController.clearBoard();