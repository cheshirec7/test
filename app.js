// Assignment:
// Create a console application that reads all the files and prints out the following values:
//  Number of words
//  First word alphabetically
//  Longest word
//  Count of N-letter words (there are zero one-letter words, seven two-letter words, etc.)
//  Words with most unique letters
//  Find the word with the most repeated use of a single letter
//  A random word

// Notes
// Treat each line as a single word
// Aggregate the files so you have one long list
// Plurals should be counted as unique words
// Make sure the project is written in an object oriented fashion


// Implementation notes:
// expects valid text files with one lowercase word per line in the current directory
// combined list of all words found in files is not sorted
//

'use strict';
const fs = require('fs'),
    charcode_a = 'a'.charCodeAt(0),
    charcode_z = 'z'.charCodeAt(0);

class WordTest {

    constructor() {
        this.allWords = [];
        this.countNLetterWords = {};
        this.maxWordLen = 0;
        this.maxUniqueLetterCount = 0;
        this.mostRepeatedLetterCount = 0;
        this.longestWords = [];
        this.maxUniqueLettersWords = [];
        this.mostRepeatedLettersWords = [];
        this.firstWord = '{'; // any valid word will always be less than this
    }

    processFile(fileName) {
        let words, word, wordLen, uniqueLetterCount, addMostRepeated,
            letterCounts = new Array(charcode_z - charcode_a);

        words = fs.readFileSync(fileName).toString().split("\n");

        for (let i in words) {
            word = words[i].trim(); //.toLowerCase();
            wordLen = word.length;
            // if (word.indexOf("'") > -1) // if word is plural, reduce count?
            //     wordLen--;
            if (wordLen > 0) { // && allwords.indexOf(word) < 0) { // check for dups?
                this.allWords.push(word);

                if (word < this.firstWord)
                    this.firstWord = word;

                if (wordLen in this.countNLetterWords)
                    this.countNLetterWords[wordLen]++;
                else
                    this.countNLetterWords[wordLen] = 1;

                letterCounts.fill(0);
                word.split('').map(char => {
                    if (char !== "'")
                        letterCounts[char.charCodeAt(0) - charcode_a]++;
                });

                uniqueLetterCount = 0;
                addMostRepeated = false;
                letterCounts.map(theCount => {
                    if (theCount > 0) {
                        uniqueLetterCount++;
                        if (theCount >= this.mostRepeatedLetterCount) {
                            if (theCount > this.mostRepeatedLetterCount) {
                                this.mostRepeatedLettersWords = [];
                                this.mostRepeatedLetterCount = theCount;
                            }
                            addMostRepeated = true;
                        }
                    }
                });
                if (addMostRepeated)
                    this.mostRepeatedLettersWords.push(word);

                if (uniqueLetterCount >= this.maxUniqueLetterCount) {
                    if (uniqueLetterCount > this.maxUniqueLetterCount) {
                        this.maxUniqueLettersWords = [];
                        this.maxUniqueLetterCount = uniqueLetterCount;
                    }
                    this.maxUniqueLettersWords.push(word);
                }

                if (wordLen >= this.maxWordLen) {
                    if (wordLen > this.maxWordLen) {
                        this.longestWords = [];
                        this.maxWordLen = wordLen;
                    }
                    this.longestWords.push(word);
                }
            }
        }
    }

    printNumberOfWords() {
        console.log('Number of words: ' + this.allWords.length); // (there were no dups in the 4 sample files)
    }

    printFirstWord() {
        if (this.firstWord === '{')
            console.log('First word is not defined');
        else
            console.log('First word: ' + this.firstWord);
    }

    printLongestWords() {
        console.log('Longest word(s) (' + this.maxWordLen + ' letters):');
        this.longestWords.map(word => {
            console.log(' ' + word);
        });
    }

    printCountOfNLetterWords() {
        for (let i in this.countNLetterWords) {
            console.log(i + '-letter words: ' + this.countNLetterWords[i]);
        }
    }

    printWordsWithMostUniqueLetters() {
        console.log('Word(s) with most unique letters (' + this.maxUniqueLetterCount + '):');
        this.maxUniqueLettersWords.map(word => {
            console.log(' ' + word);
        });
    }

    printWordsWithMostRepeatedUseOfSingleLetter() {
        console.log('Word(s) with the most repeated use of a single letter (' + this.mostRepeatedLetterCount + ' repeats):');
        this.mostRepeatedLettersWords.map(word => {
            console.log(' ' + word);
        });
    }

    printRandomWord() {
        if (this.allWords.length > 0)
            console.log('Random word: ' + this.allWords[Math.floor(Math.random() * this.allWords.length)]);
        else {
            console.log('No words available to choose random word');
        }
    }
}

let wt = new WordTest();
wt.processFile('words1.txt');
wt.processFile('words2.txt');
wt.processFile('words3.txt');
wt.processFile('words4.txt');
wt.printNumberOfWords();
wt.printFirstWord();
wt.printLongestWords();
wt.printCountOfNLetterWords();
wt.printWordsWithMostUniqueLetters();
wt.printWordsWithMostRepeatedUseOfSingleLetter();
wt.printRandomWord();

// Sample Output
// ----------------------------------
// Number of words: 8807
// First word: abnormalize
// Longest word(s) (23 letters):
// constitutionalization's
// polytetrafluorethylenes
// 2-letter words: 7
// 3-letter words: 14
// 4-letter words: 56
// 5-letter words: 114
// 6-letter words: 207
// 7-letter words: 355
// 8-letter words: 640
// 9-letter words: 1030
// 10-letter words: 1267
// 11-letter words: 1218
// 12-letter words: 1028
// 13-letter words: 862
// 14-letter words: 700
// 15-letter words: 546
// 16-letter words: 327
// 17-letter words: 204
// 18-letter words: 106
// 19-letter words: 68
// 20-letter words: 33
// 21-letter words: 18
// 22-letter words: 5
// 23-letter words: 2
// Word(s) with most unique letters (16):
// superacknowledgment
// Word(s) with the most repeated use of a single letter (6 repeats):
// defenselessnesses
// disindividualizing
// Random word: cryesthesia
