var Scrabble = function() {
    // due to how the specs are written, this score table does not account for the 50 point bonus for 7-letter words...
    this.scoreTable = [
        [1, "A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
        [2, "D", "G"],
        [3, "B", "C", "M", "P"],
        [4, "F", "H", "V", "W", "Y"],
        [5, "K"],
        [8, "J", "X"],
        [10, "Q", "Z"]
    ];
};

// score(word): returns the total score value for the given word. The word is input as a string (case insensitive).
Scrabble.prototype.score = function(word) {
    if (word.length > 7) {
        return 0;
    }
    var wordScore = 0;
    var scoreTable = this.scoreTable; //this local variable is necessary to bypass the error that otherwise would be thrown in line 18 because the scope of 'this' changes inside anonymous functions.
    var wordAsArray = word.toUpperCase().split("");
    wordAsArray.forEach(function(letter) {
        scoreTable.forEach(function(scoreRow) {
            if (scoreRow.includes(letter)) {
                wordScore += scoreRow[0];
            }
        });
    });
    return wordScore;
};

// highestScoreFrom(arrayOfWords): returns the word in the array with the highest score (based on specs).
Scrabble.prototype.highestScoreFrom = function(arrayOfWords) {
    var scores = [];
    for (var i = 0; i < arrayOfWords.length; i++) {
        aScore = this.score(arrayOfWords[i]);
        scores.push(aScore);
    }

    // find the highest score
    var greatestVal = 0;
    for (var j = 0; j < scores.length; j++) {
        if (scores[j] > greatestVal) {
            greatestVal = scores[j];
        }
    }

    // to handle "tie" situations, creating a new array with the words whose score is the greatestVal
    var highestScoreWords = [];
    for (var k = 0; k < arrayOfWords.length; k++) {
        if (this.score(arrayOfWords[k]) === greatestVal) {
            highestScoreWords.push(arrayOfWords[k]);
        }
    }

    // console.log(highestScoreWords); // this line above was solely for internal manual testing purposes to confirm everything below is working as expected. Could turn this back 'on' for testing in the future if doing tweaks on this object.

    if (highestScoreWords.length === 1) {
        return highestScoreWords[0];
    } else {
        var minLength = 7;
        for (var l = 0; l < highestScoreWords.length; l++) {
            if (highestScoreWords[l].length === 7) {
                return highestScoreWords[l];
            } else if (highestScoreWords[l].length < minLength) {
                minLength = highestScoreWords[l].length;
            }
        }
        for (var m = 0; m < highestScoreWords.length; m++) {
            if (highestScoreWords[m].length === minLength) {
                return highestScoreWords[m];
            }
        }

    }
};



var Player = function(name) {
    this.name = name.toUpperCase();
    this.plays = [];
    this.game = new Scrabble();
};

Player.prototype.totalScore = function() {
    var playerScore = 0;
    for (var n = 0; n < this.plays.length; n++) {
        playerScore += this.game.score(this.plays[n]);
    }
    return playerScore;
};

Player.prototype.hasWon = function() {
    if (this.totalScore() > 100) {
        return true;
    } else {
        return false;
    }
};

Player.prototype.play = function(word) {
    if (this.totalScore() > 100) {
        return false;
    } else {
    this.plays.push(word.toUpperCase());
    }
};

Player.prototype.highestScoringWord = function() {
    return this.game.highestScoreFrom(this.plays);
};

Player.prototype.highestWordScore = function() {
    return this.game.score(this.highestScoringWord());
};



// YOUR CODE HERE - this and the next 4 lines part of the original file
Scrabble.prototype.helloWorld = function() {
  return 'hello world!';
};



// TESTING SCRABBLE... (see comments for expected outputs)
var testingS = new Scrabble();
console.log(testingS.helloWorld()); // hello world! - this was in the original file, keeping in here for fun.
console.log(testingS.score("quiz")); // 22
console.log(testingS.score("quizlets")); // 0, because the word's length is more than 7.
console.log(testingS.highestScoreFrom(["tea", "coffee", "qqqq"])); // qqqq - when there's only one highest scoring word, this is the clear winner.
console.log(testingS.highestScoreFrom(["tea", "coffee", "qqqq", "qqqkdda"])); // qqqkdda - when multiple words have the same highest score, the (first) word in the input array that is 7-letters wins.
console.log(testingS.highestScoreFrom(["tea", "coffee", "qqqkk", "zzzz", "qqqq"])); // zzzz - when multiple words have the same highest score and none of them are 7-letters, the (first) highest scoring word with the fewest letters wins.



// TESTING PLAYER... (see comments for expected outputs)
var testingP = new Player('suzannah');
console.log(testingP.name); // SUZANNAH
testingP.play("zebras");
testingP.play("giraffe");
console.log(testingP.plays); // [ 'ZEBRA', 'GIRAFFE' ]
console.log(testingP.totalScore()); // 31
console.log(testingP.hasWon()); // false
testingP.play("qqqqqqq");
console.log(testingP.plays); // [ 'ZEBRAS', 'GIRAFFE', 'QQQQQQQ' ]
console.log(testingP.totalScore()); // 101
console.log(testingP.hasWon()); // true
console.log(testingP.play("is")); // false - because this player has already won.
console.log(testingP.plays); // [ 'ZEBRAS', 'GIRAFFE', 'QQQQQQQ' ] - simply confirming that nothing was added into the plays array from the line above.
console.log(testingP.highestScoringWord()); // QQQQQQQ
console.log(testingP.highestWordScore()); // 70



module.exports = Scrabble;



// Notes about this project's short life:
    // I'm assuming all inputs are alpha characters
