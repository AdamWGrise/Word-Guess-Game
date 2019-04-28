var possibleSolutions = ["tablesaw", "powerdrill", "jigsaw", "bandsaw","hammer","tapemeasure","chisel","screwdriver","caliper","clamp","sawhorse","workbench","grinder","palmsander","router","drillpress","goggles","earplugs","jointer","planer","facemask","pliers"];
var goodComments = ['Nice one!','Was that a lucky guess, or have you already figured it out?','Good guess!','Something tells me you have done this before.','Awesome!','Sweet.','Tubular, bro!','Ride it like a wave.',"That's right!",'Excellent work!'];
var badComments = ['Nope.','Not even close.','Try another letter.','Yeah, definitely not that letter.','Why would you even try that letter? Come on.','Not this time, champ.','Try again, sport.','The eight ball says, "WRONG." Sorry.']
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
    $(".commentary").text("Enter a letter into the box on the left, then click on the 'Submit Guess' button to get started!");
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
    $("#theWord").text(roundSolutionBlanks.join(""));
}

//// FUNCTIONS FOR EACH USER GUESS

var guessDupeNLog = function () {
    console.log("Guessed letter: " + guessLetter);
    if (guessesLog.includes(guessLetter)) {
        $(".commentary").text("Hold up there, chief. You already guessed that letter!");
        guessDupe = 1;
    } else {
        guessesLog.push(guessLetter);
        guessDupe = 0;
        $("#roundGuesses").text(guessesLog.join(" "));
    }
    console.log("Guess Log: " + guessesLog);
}

var guessMatch = function () {
    if (roundSolution.includes(guessLetter)) {
        guessCorrect = 1;
    } else {
        guessCorrect = 0;
        turnsLeft--;
        $("#guessesLeft").text(turnsLeft.toString());
        var badCommentPick = Math.floor(Math.random()*badComments.length);
        $(".commentary").text(badComments[badCommentPick]);
    }
}

var guessRevealOrLose = function () {
    if (guessCorrect === 1) {
        for (i = 0; i < roundSolution.length; i++) {
            if (guessLetter === roundSolution[i]) {
                roundSolutionBlanks[i] = guessLetter;
                $("#theWord").text(roundSolutionBlanks.join(""));
            }
        }
        var goodCommentPick = Math.floor(Math.random()*goodComments.length);
        $(".commentary").text(goodComments[goodCommentPick]);
    } else if (guessCorrect === 0 && turnsLeft === 0) {
        $("#guessesLeft").text(turnsLeft.toString());
        $("#submitGuess").prop("disabled",true);
        $(".commentary").text("Shucks, pardner. Ya lost this round. Hit 'Start a New Game' to take another shot.");
    } else {
        // No action
    }
}

var eraseText = function () {
    document.getElementById("currentGuess").value = "";
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
    win = 0;
    // Replace this alert, don't restart round until a restart button is pushed
    $("#submitGuess").prop("disabled",true); 
    $(".commentary").text("Yeah! You win! Hit the 'Start a New Game' button to play again.");
    // Disable the submit button until new round starts
}

//////////// Actual stuff -happening- /////////////////

// New Game Setup

var gameSetup = function () {
    freshRound();
    getSolution();
    genBlanks();
    turnsLeft = 6; // Sorry, not drawing a head, body, two arms, two legs :(
    $("#submitGuess").prop("disabled",false); 
    $("#theWord").text(roundSolutionBlanks.join(""));
    $("#guessesLeft").text(turnsLeft.toString());
    $("#roundGuesses").text(guessesLog.join(" "));
    $
}

// Control for the text field - only allow letters (no symbols or numbers)
document.getElementById("currentGuess").onkeyup = function (event) {
    this.value = this.value.replace(/[^a-zA-Z]/gi, '');
}

// Functions for each guess submitted - main cycle
var runGame = function () {
    guessLetter = document.getElementById('currentGuess').value;
    guessLetter = guessLetter.toUpperCase();
    guessDupeNLog();
    if(guessDupe === 0) {
        guessMatch();
        guessRevealOrLose();
        eraseText();
        guessIsWin();
    }
}

// Page loads & runs game
gameSetup();