// these are always the set of available solutions, available globally
var solutions = ["JIGSAW","TABLESAW","POWERDRILL","HAMMER","SCREWDRIVER","SANDPAPER"]

// something needs to select the random word when the user starts the game,
// then the number of available guesses needs to be populated

// this just needs to be reset at the start of each round
var guesses = []

// this should be run only once the round has started
document.onkeyup = function(event) {
    var letter = event.key.toUpperCase();
    if (letter === "already guessed") {
        //do nothing
    }else if (letter === "match"){
        //do something good
    }else if (letter === "no match"){
        //do something bad
    };