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

    const _render = function() {
        fields.forEach((field, marker) => field.textContent = gameboard[marker]);
    };

    return {
        getBoardState: getBoardState,
        updateBoard: updateBoard,
        invalidFields: invalidFields,
        clearBoard: clearBoard
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
    };
    
    const displayScore = function() {
        return score;
    }

    const clearCapturedFields = function() {
        capturedFields.splice(0, capturedFields.length);
    }

    return {
        name: name,
        updateScore: updateScore,
    	displayScore: displayScore,
        placeMarker: placeMarker,
        capturedFields: capturedFields,
        clearCapturedFields: clearCapturedFields
    }

};


const playerOne = createPlayer('First Player', 'X');
const playerTwo = createPlayer('Second Player', 'O');


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
                console.log(`${winner.name} is the winner!`);
                console.log('The score is:')
                console.log(`X: ${playerOne.displayScore()} - O: ${playerTwo.displayScore()}`)
                gameOver = true;
            }
        }
    };

    const startNewGame = function() {
        gameboardController.clearBoard();
        playerOne.clearCapturedFields();
        playerTwo.clearCapturedFields();
        currentTurn = 1;
        gameOver = false;
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

    // binding events
    fields.forEach(field => field.addEventListener('click', takeTurn));

    return {
        startNewGame: startNewGame
    }

})();