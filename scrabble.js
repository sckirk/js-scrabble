var Scrabble = function() {
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

    // to handle "tie" situations, create a new array with the words whose score is the greatestVal
    var highestScoreWords = [];
    for (var k = 0; k < arrayOfWords.length; k++) {
        if (this.score(arrayOfWords[k]) === greatestVal) {
            highestScoreWords.push(arrayOfWords[k]);
        }
    }
    console.log(highestScoreWords); // this line is solely for internal testing purposes to confirm everything below is working as expected. Keeping live because it makes my tests below easy to confirm.

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




var testing = new Scrabble();


// YOUR CODE HERE - these next 4 lines part of the originial file
Scrabble.prototype.helloWorld = function() {
  return 'hello world!';
};

// TESTING... (see comments for expected outputs)
// var testing = new Scrabble();
console.log(testing.helloWorld()); // hello world! - this was in the original file, keeping in here for fun.
console.log(testing.score("quiz")); // 22
console.log(testing.score("quizlets")); // 0, because the word's length is more than 7.
console.log(testing.highestScoreFrom(["tea", "coffee", "qqqq"])); // qqqq - when there's only one highest scoring word, this is the clear winner.
console.log(testing.highestScoreFrom(["tea", "coffee", "qqqq", "qqqkdda"])); // qqqkdda - when multiple words have the same highest score, the (first) word in the input array that is 7-letters wins.
console.log(testing.highestScoreFrom(["tea", "coffee", "qqqkk", "zzzz", "qqqq"])); // zzzz - when multiple words have the same highest score and none of them are 7-letters, the (first) highest scoring word with the fewest letters wins.


module.exports = Scrabble;



// Items I have not done in this project's short life:
    // Assuming all inputs are alpha characters
