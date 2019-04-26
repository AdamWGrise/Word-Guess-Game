var possibleSolutions = ["tablesaw","powerdrill","jigsaw","bandsaw"];
var roundSolution = [];
var roundSolutionBlanks = [];
var guess = null;
var guessIs = null;

// Just runs at the beginning of the round
var getSolution = function(){
        word = possibleSolutions[Math.floor(Math.random()*possibleSolutions.length)]
        roundSolution = word.split("");
    };

// Just runs at the beginning of the round
var genBlanks = function(){
    for (i = 0 ; i < roundSolution.length ; i++ ) {
        roundSolutionBlanks.push("_");
    }
}

// This needs to run for each guess the user makes
var guessMatch = function() { 
    if (roundSolution.includes(guess)) {
        guessIs = true;
    } else {
        guessIs = false
    }
}

var reveal = function() {
    if (guessIs === true) {
        for (i = 0 ; i < roundSolution.length ; i++) {
            if (guess === roundSolution[i]) {
                console.log(roundSolutionBlanks);
                roundSolutionBlanks[i] = guess;
                console.log(roundSolutionBlanks);
            }
        }
    }
}

//////////// Actual stuff -happening- /////////////////

// Page loads and gets a solution chosen
getSolution();
genBlanks();

var guess = prompt("Guess a letter!");
guess = guess.toLowerCase();

guessMatch();
reveal();

// Logging
console.log("This round's solution: " + roundSolution);
console.log("Round solution's length: " + roundSolution.length);
console.log("Round's blank solution: " + roundSolutionBlanks);
console.log("Round's blanks length: " + roundSolutionBlanks.length);
console.log("Guess: " + guess + ", " + guessIs);

/********* to do

need to add a condition for when the guess has already been made

*/