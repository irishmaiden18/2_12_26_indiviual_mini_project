//Variables//

//words to choose from
const words = ["alpaca"]

//creates an empty array to record words user has guessed
let guessedWords = []

let numberOfHintsGiven

//lists the hints user has been given
let hintsArray = ["it is a land animal", "it is related to the llama"]

//chosen word that user is trying to guess
let chosenWord

//scrambled array made from the chosen word
let scrambledWord = []

//word user guesses
let guessedWord

//keeps track of the number of guesses the user has remaining
let guessesRemaining

//keeps track of the countdown timer until the next hint
let timer

let myTimer

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

const hintPopUp = document.querySelector("#hint-modal")
const hintGiven = document.querySelector("#hint")
const closeHintButton= document.querySelector("#close-hint-button")

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

    numberOfHintsGiven = 0

    timer = 5

    startCountdown()
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
    for (let originalIndex = 0; originalIndex < scrambledWordArray.length; originalIndex++) {
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
//Word Scramble Algorithm came from: https://www.geeksforgeeks.org/javascript/word-scramble-game-using-javascript/

//builds word area
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

//checks guessed word
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

//clears guessedWordsList
function clearGuessedWordsList() {
    const guestWordsLi = document.querySelectorAll("#guessed-words li")
    guestWordsLi.forEach(li => li.remove())
}

//clears word area
function clearWordArea() {
    const wordAreaSpans = document.querySelectorAll("#word-area span")
    wordAreaSpans.forEach(span => span.remove())
}

//clears text input field after a guess is submitted
function clearGuessedWordField() {
    guessedWordInputField.value = ""
}




//Timer//

//calls a function every second and sets our intial timer value
function startCountdown() {
    //calls a countdownTimer every second
    myTimer = setInterval(countdownTimer, 1000)
    //initializes our timer to 5 seconds
    timer = 5
}

//controls the in-page timer and what hints are given and when they are given
function countdownTimer() {
    //decrements our timer
    timer = timer - 1
    //if the timer is still counting down and we havent already given all the hints
    if((timer >= 0) && (numberOfHintsGiven <=1)) {
        //change the timer text on the page to the current value of timer
        hintsTimer.textContent = `${timer} seconds`
    //if the timer is not counting down or we have given all our hints    
    } else {
        //stop the timer
        clearInterval(myTimer)
        //if we haven't given all our hints
        if(numberOfHintsGiven <=1) {
            //display the hint
            let hintText = getHint()
            hintGiven.textContent = hintText
            hintPopUp.style.display = "block"
        //if we have given all out hints, 
        } else {
            //change the timer text to "No more hints available"
            hintsTimer.textContent = "No more hints available"
        }
    }
}

//increments the numberOfHintsGiven and gets the hint from the hintsArray
function getHint() {
    numberOfHintsGiven += 1
        //return a hint
    return hintsArray[numberOfHintsGiven -1]
}

//closes the hint pop up
function closeHintPopUp() {
    hintPopUp.style.display = "none"
}





//Event Listeners//

//add eventListener to victoryPopUpRestartButton and call the initializeNewGame function
victoryPopUpRestartButton.addEventListener("click", initializeNewGame)

//add eventListener to loserPopUpRestartButton and call the initializeNewGame function
loserPopUpRestartButton.addEventListener("click", initializeNewGame)

//add eventListener to newWordButton and call the initializeNewGame function
newWordButton.addEventListener("click", initializeNewGame)

//add eventListener to rescrambleWordButton and call two functions,
rescrambleWordButton.addEventListener("click", function() {
    //create a temporary word to hold our newly shuffled word
    let tempWord = shuffleLetters(scrambledWord)
    //call clearWordArea
    clearWordArea()
    //call buildWordArea using our temporary word
    buildWordArea(tempWord)
})
    
//add eventListener to guessWordButton and call the check word function
guessWordButton.addEventListener("click", checkWord)

//add eventListener to closeHintButton and call two functions,
closeHintButton.addEventListener("click", function() {
    //hide the hint pop up
    closeHintPopUp()
    //start the hint timer
    startCountdown()
})



initializeNewGame()


