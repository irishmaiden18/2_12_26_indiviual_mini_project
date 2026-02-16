//Variables//

//words to choose from
// const words = ["alpaca"]

//creates an empty array to record words user has guessed
let guessedWords = []

//keeps track of how many hints have been given
let numberOfHintsGiven

//lists the hints user can get
let hintsArray

//chosen word that user is trying to guess
let chosenWord

//scrambled array made from the chosen word
let scrambledWord = []

//word user guesses
let guessedWord

//last word played
let lastPlayedWord

//keeps track of the number of guesses the user has remaining
let guessesRemaining

//keeps track of the countdown timer value until the next hint
let timer

//calls a function every second using setInterval
let myTimer

//shows spaces for each letter of currentWord being guessed
const wordArea = document.querySelector("#word-area")

//the field where the user enters their word guess
const guessedWordInputField = document.querySelector("#guessed-word")

//the submit button for a guessed word
const guessWordButton = document.querySelector("#guess-word-button")

//displays user's remaining guesses
const guessesRemainingSpan = document.querySelector("#guesses-remaining-span")

//re-scrambles the word
const rescrambleWordButton = document.querySelector("#rescramble-button")

//gives a new word to guess
const newWordButton = document.querySelector("#restart-button")

//list hints will be added to as they are given
const hintsGivenList = document.querySelector("#hints-given")

//countdown timer until next hint is automatically shown
const hintsTimer = document.querySelector("#hint-timer")

//button to get a hint
const getHintButton = document.querySelector("#get-a-hint-button")

//list guessed words will be added to as they are guessed
const guessedWordsList = document.querySelector("#guessed-words")

//reset button
const startAgainButtons = document.querySelectorAll(".restart-button")

//hint popUp parts
const hintPopUp = document.querySelector("#hint-modal")
const hintGiven = document.querySelector("#hint")
const closeHintButton= document.querySelector("#close-hint-button")

//victory popup parts
const victoryPopUP = document.querySelector("#victory-modal")
const victoryPopUpRestartButton = document.querySelector("#victory-modal button")
const correctAnimal = document.querySelector("#correct-animal")
const correctAnimalImg = document.querySelector("#correct-animal-image")

//loser popup parts
const loserPopUp = document.querySelector("#defeat-modal")
const loserPopUpRestartButton = document.querySelector("#defeat-modal button")
const correctAnswer = document.querySelector("#correct-answer")





//Functions//

//starts a new game
function initializeNewGame() {
    //hides the hint popup if its open
    closeHintPopUp()

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

    //clears hints given list
    clearHintsGivenList()

    //sets chosenWord to a new random word
    chosenWord = getRandomWord()

    // set the chosen word to all lower case
    chosenWordLowerCase = chosenWord.toLowerCase()

    //if this chosen word is the same as last game, get a new random word
    if (chosenWordLowerCase == lastPlayedWord) {
        chosenWord = getRandomWord()
        chosenWordLowerCase = chosenWord.toLowerCase()
    }

    //set lastPlayed word to our new chosen word lower cased
    lastPlayedWord = chosenWordLowerCase

    //scrambles chosenWord
    scrambledWord = shuffleLetters(chosenWordLowerCase)

    //builds the word area based on the new chosen word
    buildWordArea(scrambledWord)

    //sets guesses remaining to 5
    guessesRemaining = 5 
    
    //updates the guesses remaining display counter
    guessesRemainingSpan.textContent = guessesRemaining

    //resets numberOfHintsGiven to zero
    numberOfHintsGiven = 0

    //sets timer to its start value
    timer = 30

    //starts countdown timer
    startCountdown()
}

//gets a random word from our list of random words
function getRandomWord() {
    const randomIndex = Math.floor(Math.random() * words.length)
    return words[randomIndex].name
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

//designs victory popup
function makeVictoryPopUp() {

    //set correctAnimal to chosenWord
    correctAnimal.textContent = chosenWord

    //find correct object in our words array
    const result = words.find(animal => animal.name === chosenWord)

    //set image properties to appropriate image
    correctAnimalImg.src = result.img

    //display victory screen
    victoryPopUP.style.display = "block"
}


//checks guessed word
function checkWord() {
    //grab guessed word input and change it to lower case
    guessedWord = guessedWordInputField.value.toLowerCase()
    //check whether the guessed word is the same as the current word
    //if it is the same
    if (guessedWord === chosenWordLowerCase) {
        //display victory screen
        makeVictoryPopUp()
    //if it isn't
    } else {
        //if guesses remaining is greater than zero
        if (guessesRemaining > 1) {
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

//clears hintsList
function clearHintsGivenList() {
    const hintGivenLi = document.querySelectorAll("#hints-given li")
    hintGivenLi.forEach(li => li.remove())
}




//Timer & Hint Functionality//

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
        //handle hint request
        handleHintRequest()
    }
}

function handleHintRequest() {
    //if we haven't given all our hints
    if(numberOfHintsGiven <=1) {
        //display the hint
        let hintText = getHint()

        const newLi = document.createElement("li")
        newLi.textContent = hintText
        hintsGivenList.append(newLi)

        hintGiven.textContent = hintText
        hintPopUp.style.display = "block"
    //if we have given all out hints, 
    } else {
        //change the timer text to "No more hints available"
        hintsTimer.textContent = "No more hints available"
    }
}

//increments the numberOfHintsGiven and gets the hint from the hintsArray
function getHint() {
    numberOfHintsGiven += 1
    //find the animal that matches our current chosenWord
    const result = words.find(animal => animal.name === chosenWord)
    //construct a string to match the attribute name for the appropriate hint
    const tempString = `hint${numberOfHintsGiven}`
    //return appropriate hint
    return result[tempString]
}

//closes the hint pop up
function closeHintPopUp() {
    hintPopUp.style.display = "none"
}





//Event Listeners//

//add eventListener to victoryPopUpRestartButton and call two functions
victoryPopUpRestartButton.addEventListener("click", function() {
    //stop the hint timer
    clearInterval(myTimer)
    //intialize a new game
    initializeNewGame()
})

//add eventListener to loserPopUpRestartButton and call two functions
loserPopUpRestartButton.addEventListener("click", function() {
    //stop the hint timer
    clearInterval(myTimer)
    //intialize a new game
    initializeNewGame()
})

//add eventListener to newWordButton and call two functions,
newWordButton.addEventListener("click", function() {
    //stop the hint timer
    clearInterval(myTimer)
    //intialize a new game
    initializeNewGame()
})

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
guessWordButton.addEventListener("click", function() {
    //see if the word is correct
    checkWord()
    //stop the hint timer
    clearInterval(myTimer)
    //if the guessed word is incorrect
    if (!(guessedWord === chosenWord)) {
        //start hint countdown timer
        startCountdown()
    }
})

//add eventListener to closeHintButton and call two functions,
closeHintButton.addEventListener("click", function() {
    //hide the hint pop up
    closeHintPopUp()
    //start the hint timer
    startCountdown()
})

//add eventListener to getHintButton and call two functions,
getHintButton.addEventListener("click", function() {
    //get a hint if there is one remaining
    handleHintRequest()
    //stop the hint timer
    clearInterval(myTimer)
})




//start a new game on load
initializeNewGame()


