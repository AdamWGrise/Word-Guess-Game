// these are always the set of available solutions, available globally
var solutions = ["jigsaw", "tablesaw", "powerdrill", "hammer", "screwdriver", "sandpaper"]

var letters = "abcdefghijklmnopqrstuvwxyz";

// something needs to select the random word when the user starts the game,
// then the number of available guesses needs to be populated

// this just needs to be reset at the start of each round
var guessesLeft, guessedLetters, currentSolutionWord, currentSolutionArray;

/********* GAME SETUP ***********/
var setup = function () {
    currentSolutionWord = solutions[Math.floor(Math.random() * solutions.length)];
    guessesLeft = currentSolutionWord.length + 2;
    currentSolutionArray = currentSolutionWord.split("");
    console.log("currentSolutionWord: " + currentSolutionWord + " | currentSolutionArray: " + currentSolutionArray)
    guessedLetters = []
}

// this should be running only once the round has started
document.onkeyup = function (event) {
    var letter = event.key.toLowerCase();
    if (letters.indexOf(letter) > -1) {
        alert("Pick a letter!")
    } else if (letter === "already guessed") {
        alert("You've already guessed the letter " + letter + "!")
    } else if (letter === "match") {
        // do something good
    } else if (letter === "no match") {
        // do something bad
    }
};


// on page load, run script
document.onload = function () {
    setup();
};