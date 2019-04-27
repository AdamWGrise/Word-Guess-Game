var possibleSolutions = ["tablesaw", "powerdrill", "jigsaw", "bandsaw"];
var roundSolution = [];
var roundSolutionBlanks = [];
var guessCorrect = null;
var guessLetter = null;
var win = 0;
var guessesLog = [];
var turnsLeft = null;
var guessDupe = 0

//// FUNCTIONS FOR PREPPING THE ROUND
var freshRound = function () {
    roundSolution = [];
    roundSolutionBlanks = [];
    guessLetter = null;
    guessCorrect = null;
    guessesLog.length = 0;
    turnsLeft = null;
}

var getSolution = function () {
    word = possibleSolutions[Math.floor(Math.random() * possibleSolutions.length)]
    word = word.toUpperCase();
    roundSolution = word.split("");
    console.log("Round solution chosen: " + roundSolution + " (" + roundSolution.length + " letters)")
};

var genBlanks = function () {
    for (i = 0; i < roundSolution.length; i++) {
        roundSolutionBlanks.push("_");
    }
    $("#theWord").text(roundSolutionBlanks);
}

//// FUNCTIONS FOR EACH USER GUESS

var guessDupeNLog = function () {
    console.log("Guessed letter: " + guessLetter);
    if (guessesLog.includes(guessLetter)) {
        alert("YOU CLOWN, YOU ALREADY GUESSED THAT LETTER");
        guessDupe = 1;
    } else {
        guessesLog.push(guessLetter);
        guessDupe = 0;
    }
    console.log("Guess Log: " + guessesLog);
}

var guessMatch = function () {
    if (roundSolution.includes(guessLetter)) {
        guessCorrect = 1;
    } else {
        guessCorrect = 0;
        turnsLeft--;
    }
    console.log("Turns left: " + turnsLeft);
}

var guessRevealOrLose = function () {
    if (guessCorrect === 1) {
        for (i = 0; i < roundSolution.length; i++) {
            if (guessLetter === roundSolution[i]) {
                roundSolutionBlanks[i] = guessLetter;
                console.log("After reveal: " + roundSolutionBlanks);
            }
        }
    } else if (guessCorrect === 1 && turnsLeft === 0) {
        document.getElementById("submitGuess").disabled = true;
        alert("You lose! Bummer.");
        // Disable the submit button, only allow new game to start.
    } else {
        // No action
    }
}

//// WIN CHECK

var guessIsWin = function () {
    if (roundSolutionBlanks.includes("_")) {
        // No action; not a win yet.
    } else {
        youWin();
    }
}

//// USER WINS

var youWin = function () {
    console.log("Win confirmed");
    win = 0;
    // Replace this alert, don't restart round until a restart button is pushed
    document.getElementById("submitGuess").disabled = true;
    alert("You won! Push the Start a New Game button to begin a new round.");
    // Disable the submit button until new round starts
}

//////////// Actual stuff -happening- /////////////////

// New Game Setup

var gameSetup = function () {
    freshRound();
    getSolution();
    genBlanks();
    turnsLeft = roundSolution.length;
    document.getElementById("submitGuess").disabled = false; 
}

// Control for the text field - only allow letters
document.getElementById("currentGuess").onkeyup = function (event) {
    this.value = this.value.replace(/[^a-zA-Z]/gi, '');
}

// Functions for each guess submitted

var runGame = function () {
    guessLetter = document.getElementById('currentGuess').value;
    guessLetter = guessLetter.toUpperCase();
    guessDupeNLog();
    guessMatch();
    guessRevealOrLose();
    $("#theWord").text(roundSolutionBlanks);
    guessIsWin();
}

// Elements to show on-screen


// Page loads & runs game

gameSetup();

/********* to do

catalog and display guesses fancily
show turns left
clear text box on guess
stop decrementing remaining turns on duplicate guess
interrupt runGame if duplicate guess

*/