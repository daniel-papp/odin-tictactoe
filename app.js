const gameboardController = (function() {
    const gameboard = Array.from({length: 9});
    const invalidFields = [];


    const updateBoard = function(field, marker) {
            gameboard[field] = marker;
            _render();
    };

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
        invalidFields: invalidFields
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
        console.log(`${marker}: ${capturedFields}`);
    };

    const updateScore = function() {
        score++;
    };
    
    const displayScore = function() {
        console.log(score);
    }

    return {
        name: name,
        updateScore: updateScore,
    	displayScore: displayScore,
        placeMarker: placeMarker,
        capturedFields: capturedFields
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
            checkForWinner(winningStates, currentPlayer.capturedFields, currentPlayer.name);
            currentTurn++;
        }
    }

    const checkForWinner = function(winning, captured, winner) {
        for (let i = 0; i < winning.length; i++) {
            if (winning[i].every(elem => captured.includes(elem))) {
                console.log(`${winner} is the winner!`);
                gameOver = true;
            }
        }
    };

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

})();