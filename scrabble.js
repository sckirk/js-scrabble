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
    var wordScore = 0;
    var scoreTable = this.scoreTable; //this local variable is necessary to bypass the error that otherwise would be thrown in line 18 because 'this' scope changes inside anonymous functions.
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

var testing = new Scrabble();
console.log(testing.score("suzannah"));

// score(word): returns the total score value for the given word. The word is input as a string (case insensitive). The chart below shows the point value for a given letter.


Scrabble.prototype.highestScoreFrom = function(arrayOfWords) {

};
// highestScoreFrom(arrayOfWords): returns the word

// YOUR CODE HERE
Scrabble.prototype.helloWorld = function() {
  return 'hello world!';
};

module.exports = Scrabble;


// this.scoreTable = {
//     1: [1, "A", "E", "I", "O", "U", "L", "N", "R", "S", "T"],
//     2: [2, "D", "G"],
//     3: [3, "B", "C", "M", "P"],
//     4: [4, "F", "H", "V", "W", "Y"],
//     5: [5, "K"],
//     6: [8, "J", "X"],
//     7: [10, "Q", "Z"]
// };
