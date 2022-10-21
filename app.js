// create a gameboardController object with a module, this object will have:
//  a gameboard array (empty at the start, 3x3 2D array)
//  a public updateBoard method for updating the gameboard array after each player move
//  a private render method for displaying the contents of the gameboard array on the DOM

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





// createPlayer factory function: creates player obejcts, players will have:
//  properties: name, marker, score
//  public methods: setName, updateScore
//  placeMarker method (also public) it will call the gameboardController.updateBoard method when a certain field is clicked

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





// create gameFlowController object with a module, this object will:
//  start the game
//  decide whose turn is it
//  check win condition after every turn (and display end of game message if there is a winner)
//  update player score after win by calling player.updateScore method
//  start a new game

const gameFlowController = (function() {
    let currentTurn = 1;

    const takeTurn = function(e) {
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
                return true;
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