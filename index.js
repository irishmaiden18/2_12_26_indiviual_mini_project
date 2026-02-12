//Variables//

//words to choose from
const words = ["alpaca"]

let guessedWords = []

//lists the hints user has been given
let hintsGiven = []

//chosen word that user is trying to guess
let chosenWord

//scrambled array made from the chosen word
let scrambledWord = []

//word user guesses
let guessedWord
let guessesRemaining = 5

//shows spaces for each letter of currentWord being guessed
const wordArea = document.querySelector("#word-area")

const guessedWordInputField = document.querySelector("#guessed-word")

const guessWordButton = document.querySelector("#guess-word-button")

//displays user's remaining guesses
const guessesRemainingSpan = document.querySelector("#guesses-remaining-span")

const rescrambleWordButton = document.querySelector("#rescramble-button")

const newWordButton = document.querySelector("#restart-button")

//list hints will be added to as they are given
const hintsGivenList = document.querySelector("#hints-given")

//countdown timer until next hint is automatically shown
const hintsTimer = document.querySelector("#hint-timer")

const getHintButton = document.querySelector("#get-a-hint-button")

//list guessed words will be added to as they are guessed
const guessedWordsList = document.querySelector("#guessed-words")

//reset button
const startAgainButtons = document.querySelectorAll(".restart-button")


const victoryPopUP = document.querySelector("#victory-modal")
const victoryPopUpRestartButton = document.querySelector("#victory-modal button")


const loserPopUp = document.querySelector("#defeat-modal")
const loserPopUpRestartButton = document.querySelector("#defeat-modal button")
const correctAnswer = document.querySelector("#correct-answer")





//Functions//

//starts a new game
function initializeNewGame() {
    //hides the victory popup if the user just won
    victoryPopUP.style.display = "none"

    //hides the lose popup if the user just lost
    loserPopUp.style.display = "none"

    //clears word area underscores
    clearWordArea()

    //clears the word guessed text input field
    clearGuessedWordField()

    //clears guessedWords array
    guessedWords = []

    //clears guessed words list
    clearGuessedWordsList()

    //sets chosenWord to a new random word
    chosenWord = getRandomWord()

    //scrambles chosenWord
    scrambledWord = shuffleLetters(chosenWord)

    //builds the word area based on the new chosen word
    buildWordArea(scrambledWord)

    //sets guesses remaining to 5
    guessesRemaining = 5 
    
    //updates the guesses remaining display counter
    guessesRemainingSpan.textContent = guessesRemaining
}

//gets a random word from our list of random words
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length)
    return words[randomIndex]
}

//shuffles the letters of our chosen word
function shuffleLetters(word) {
    //turn the word into an array
    let scrambledWordArray = Array.from(word)
    //create a for loop to go over all the indexes of the new array
    for (let originalIndex = 0; originalIndex < scrambledWordArray.length - 1; originalIndex++) {
        //find a new random index for the letter swap
        let newIndex = Math.floor(Math.random() * scrambledWordArray.length)
        //swap the letters
        let temp = scrambledWordArray[originalIndex]
        scrambledWordArray[originalIndex] = scrambledWordArray[newIndex]
        scrambledWordArray[newIndex] = temp
    }
    //return a string of the scrambled word
    return scrambledWordArray.join(" ")
}

//build word area
function buildWordArea(word) {
    chosenWordArray = word.split("")
    chosenWordArray.forEach(letter => {
        const span = document.createElement("span")
        span.textContent = `${letter}`
        span.style.textDecoration = "underline"
        wordArea.append(span)

        const spanSpace = document.createElement("span")
        spanSpace.textContent = " "
        wordArea.append(spanSpace)
    })
}

//add eventListener to guessWordButton and call the check word function
guessWordButton.addEventListener("click", checkWord)

//check guessed word
function checkWord() {
    //grab guessed word input and change it to lower case
    guessedWord = guessedWordInputField.value.toLowerCase()
    //check whether the guessed word is the same as the current word
    //if it is the same
    if (guessedWord === chosenWord) {
        //display victory screen
        victoryPopUP.style.display = "block"
    //if it isn't
    } else {
        //if guesses remaining is greater than zero
        if (guessesRemaining > 0) {
            //if the word guessed is already in our guessed words
            if (guessedWords.includes(guessedWord)) {
                //end the function
                return
            //if this is a new guess
            } else {
                // decrease guesses remaining by 1
                guessesRemaining = guessesRemaining - 1
                // change remaining guesses field to be current
                guessesRemainingSpan.textContent = guessesRemaining
                //add the guessedWord to our guessWords list
                guessedWords.push(`${guessedWord}`)
                //add the new guessed words to our guessed word list on the page
                updateGuessedWordsArea()
            }
            // clear input field
            clearGuessedWordField()
        //if guesses remaining is not greater than zero
        } else {
            //display losing screen
            showLoserScreen()
        }
    }
}

//shows and updates loser screen
function showLoserScreen() {
    let correctAnswerElement = document.createElement("h3")
    correctAnswerElement.textContent = chosenWord
    correctAnswer.append(correctAnswerElement)

    loserPopUp.style.display = "block"
}

//adds guessed words to the guessed word area
function updateGuessedWordsArea() {
    //clear guessedWordsArea
    clearGuessedWordsList()
    guessedWords.forEach((word) => {
        let newLi = document.createElement("li")
        newLi.textContent = word
        guessedWordsList.append(newLi)
    }) 
}

//clears GuessedWords List
function clearGuessedWordsList() {
    const guestWordsLi = document.querySelectorAll("#guessed-words li")
    guestWordsLi.forEach(li => li.remove())
}

//clears word area of underscores
function clearWordArea() {
    const wordAreaSpans = document.querySelectorAll("#word-area span")
    wordAreaSpans.forEach(span => span.remove())
}

//clears text input field after a guess is submitted
function clearGuessedWordField() {
    guessedWordInputField.value = ""
}




//Event Listeners//

victoryPopUpRestartButton.addEventListener("click", initializeNewGame)

loserPopUpRestartButton.addEventListener("click", initializeNewGame)

newWordButton.addEventListener("click", initializeNewGame)

rescrambleWordButton.addEventListener("click", function() {
    let tempWord = shuffleLetters(scrambledWord)
    clearWordArea()
    buildWordArea(tempWord)
})
    



initializeNewGame()


//Word Scramble Algorithm: https://www.geeksforgeeks.org/javascript/word-scramble-game-using-javascript/