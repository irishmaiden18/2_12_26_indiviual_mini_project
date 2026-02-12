//Variables//

//words to choose from
const words = ["alpaca"]

let guessedWords = []

//lists the hints user has been given
let hintsGiven = []

//chosen word that user is trying to guess
let chosenWord

//word user guesses
let guessedWord
let guessesRemaining = 5

//shows spaces for each letter of currentWord being guessed
const wordArea = document.querySelector("#word-area")

const guessWordButton = document.querySelector("#guess-word-button")

//displays user's remaining guesses
const guessesRemainingSpan = document.querySelector("#guesses-remaining-span")

const rescrambleWordButton = document.querySelector("#rescramble-button")

const newWordButton = document.querySelector("#restart button")

//list hints will be added to as they are given
const hintsGivenList = document.querySelector("#hints-given")

//countdown timer until next hint is automatically shown
const hintsTimer = document.querySelector("#hint-timer")

const getHintButton = document.querySelector("#get-a-hint-button")

//list guessed words will be added to as they are guessed
const guessedWordsList = document.querySelector("#guessed-words")

//reset buttons on modals
const startAgainButtons = document.querySelectorAll(".restart-button")



//Functions//

//starts a new game
function initializeNewGame() {
    chosenWord = getRandomWord()
    buildWordArea(chosenWord)
}

//gets a random word from our list of random words
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length)
    return words[randomIndex]
}

//build word area
function buildWordArea(word) {
    chosenWordArray = word.split("")
    chosenWordArray.forEach(letter => {
        const span = document.createElement("span")
        span.textContent = " _ "
        wordArea.append(span)
    })
}

//add eventListener to guessWordButton and call the check word function
guessWordButton.addEventListener("click", checkWord())
guessedWord = document.querySelector("#guessed-word").value

//check guessed word
function checkWord() {
     console.log("I am being called")

    // //check whether the guessed word is the same as the current word
    // //if it is the same
    // if (guessedWord === chosenWord) {
    //     //display victory screen
    //     console.log("words are the same")
        
    // //if it isn't
    // } else {
    //     //is guesses remaining greater than zero?
    //         //if it is
    //             //decrease guesses remaining by 1
    //             //add word to guessed words list
    //             //clear input field
    //         //if not
    //             //display losing screen

    //         console.log("words are NOT the same")
    //}
}

initializeNewGame()