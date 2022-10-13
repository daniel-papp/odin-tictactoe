// create a gameboardController object with a module, this object will have:
//  a gameboard array (empty at the start, 3x3 2D array)
//  a public updateBoard method for updating the gameboard array after each player move
//  a private render method for displaying the contents of the gameboard array on the DOM

const gameboardController = (function() {

})();





// createPlayer factory function: creates player obejcts, players will have:
//  properties: name, marker, score
//  public methods: setName, updateScore
//  placeMarker method (also public) it will call the gameboardController.updateBoard method when a certain field is clicked

const createPlayer = function(name, marker) {

};





// create gameFlowController object with a module, this object will:
//  start the game
//  decide whose turn is it
//  check win condition after every turn (and display end of game message if there is a winner)
//  update player score after win by calling player.updateScore method
//  start a new game

const gameFlowController = (function() {

})();