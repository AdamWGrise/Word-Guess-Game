var possibleSolutions = ["tablesaw", "powerdrill", "jigsaw", "bandsaw"];
var roundSolution = [];
var roundSolutionBlanks = [];
var guessLetter;
var guessIs = null;
var win = 0;
var guessLog = [];
var totalTurns = null;
var turnsLeft = null;

var freshRound = function () {
    roundSolution = [];
    roundSolutionBlanks = [];
    guessLetter = null;
    guessIs = null;
    guessLog = [];
    totalTurns = null;
    turnsLeft = null;
}

// Just runs at the beginning of the round
var getSolution = function () {
    word = possibleSolutions[Math.floor(Math.random() * possibleSolutions.length)]
    roundSolution = word.split("");
    console.log("Round solution chosen: " + roundSolution + " (" + roundSolution.length + " letters)")
};

var genBlanks = function () {
    for (i = 0; i < roundSolution.length; i++) {
        roundSolutionBlanks.push("_");
    }
}

// This needs to run for each guess the user makes

var guessDupeNLog = function () {
    console.log("Guessed letter: " + guessLetter);
    if (guessLog.includes(guessLetter)) {
        alert("YOU CLOWN, YOU ALREADY GUESSED THAT LETTER");
    } else {
        guessLog.push(guessLetter);
    }
    console.log("Guess Log: " + guessLog);
}

var guessMatch = function () {
    if (roundSolution.includes(guessLetter)) {
        guessIs = 1;
    } else {
        guessIs = 0;
        turnsLeft--;
    }
    console.log("Turns left: " + turnsLeft);
}

var reveal = function () {
    if (guessIs === 1) {
        for (i = 0; i < roundSolution.length; i++) {
            if (guessLetter === roundSolution[i]) {
                console.log("Before reveal: " + roundSolutionBlanks);
                roundSolutionBlanks[i] = guessLetter;
                console.log("After reveal: " + roundSolutionBlanks);
            }
        }
    }
}

var isWin = function () {
    if (roundSolutionBlanks.includes("_")) {
        win = 0;
    } else {
        win = 1;
    }
}

var youWin = function () {
    console.log("Win confirmed");
    win = 0;
    // do other stuff to reset the game
    alert("You won! Press OK to restart.");
    freshRound();
    runGame();
}

//////////// Actual stuff -happening- /////////////////

// New Game
var runGame = function () {
    getSolution();
    genBlanks();

    totalTurns = roundSolution.length;
    turnsLeft = totalTurns;

    console.log("Total turns: " + totalTurns);

    for (i = 0; i < 10; i++) {
        if (win === 0) {
            if (turnsLeft === 0) {
                alert("You lose! Click OK to try again.");
                freshRound();
                runGame();
                break;
            } else {
                guessLetter = prompt("Guess a letter!");
                guessLetter = guessLetter.toLowerCase();
                guessDupeNLog();
                guessMatch();
                reveal();
                isWin();
            }
        } else {
            youWin();
            break;
        };
        // Logging
        console.log("Guess: " + guessLetter + ", " + guessIs);
        console.log("Win? " + win);
    }
}

// Page loads & runs game

runGame();

/********* to do

catalog and display guesses

*/