// create a gameboardController object with a module, this object will have:
//  a gameboard array (empty at the start, 3x3 2D array)
//  a public updateBoard method for updating the gameboard array after each player move
//  a private render method for displaying the contents of the gameboard array on the DOM

const gameboardController = (function() {
    const gameboard = Array.from({length: 9});

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
        updateBoard: updateBoard
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
  
    const placeMarker = function(e) {
        const currentField = Number(e.target.getAttribute('id'));
        gameboardController.updateBoard(currentField, marker);
        capturedFields.push(currentField);
        console.log(capturedFields);
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
        placeMarker: placeMarker
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

        currentPlayer.placeMarker(e);

        currentTurn++;
    }


    //cache DOM fields
    const fields = document.querySelectorAll('.field');

    // binding events
    fields.forEach(field => field.addEventListener('click', takeTurn));

})();