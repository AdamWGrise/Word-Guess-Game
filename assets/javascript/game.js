// Available puzzles
var solutions = ["jigsaw", "tablesaw", "powerdrill", "hammer", "screwdriver", "sandpaper"]

var letters = "abcdefghijklmnopqrstuvwxyz";

// something needs to select the random word when the user starts the game,
// then the number of available guesses needs to be populated

// this just needs to be reset at the start of each round
var guessesLeft, guessedLetters, currentSolutionWord, currentSolutionArray;

var guessedLetters = "asdf";

/********* GAME SETUP ***********/
var setup = function () {
    currentSolutionWord = solutions[Math.floor(Math.random() * solutions.length)];
    guessesLeft = currentSolutionWord.length + 2;
    currentSolutionArray = currentSolutionWord.split("");
    console.log("currentSolutionWord: " + currentSolutionWord + " | currentSolutionArray: " + currentSolutionArray)
    guessedLetters = ["asdf"]
};

/********** GAME FUNCTIONS ***********/
document.onkeyup = function (event) {
    var letter = event.key.toLowerCase();

    if (guessedLetters.indexOf(letter) > -1) {
        alert("You've already guessed the letter " + letter + "!")
    } else if (letter === "part of the array that matches the word") {
        // Matching letter - do good stuff
    } else if (letters.indexOf(letter) > -1) {
        // Non-matching letter - do bad stuff
    }
};

// Run on page load
document.onload = function () {
    setup();
};