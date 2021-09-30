'use strict';
let rollDiceButton = document.querySelector('.btn--roll') 
let diceImage = document.querySelector('.dice')
let playerOne = document.querySelector('.player--0')
let playerTwo = document.querySelector('.player--1')
let playerOneTurn = true
let playerOneScore = 0
let playerTwoScore = 0
let playerOneCurrentScore = 0
let playerTwoCurrentScore = 0
let temporaryScore = 0
let playerOneScoreDisplay = document.querySelector('#score--0')
let playerTwoScoreDisplay = document.querySelector('#score--1')
let playerOneCurrentScoreDisplay = document.querySelector('#current--0')
let playerTwoCurrentScoreDisplay = document.querySelector('#current--1')
let startNewGameButton = document.querySelector('.btn--new')
let holdButton = document.querySelector('.btn--hold')

function startGame() {
    playerOneScore = 0
    playerTwoScore = 0
    playerOneScoreDisplay.textContent = 0
    playerTwoScoreDisplay.textContent = 0
    playerOneCurrentScoreDisplay.textContent = 0
    playerTwoCurrentScoreDisplay.textContent = 0
    diceImage.style.display = 'none'
    startNewGameButton.addEventListener('click', startGame)
    holdButton.addEventListener('click', holdGame)
    rollDiceButton.addEventListener('click', rollDice)
    rollDiceButton.addEventListener('click', gameOver)

    playerTwo.classList.remove('player--active')
    playerOne.classList.add('player--active')

    playerOne.classList.remove('player--winner')
    playerTwo.classList.remove('player--winner')


}

function holdGame() {
    
    if (playerOneTurn) {
        playerOneScore += playerOneCurrentScore
        playerOneScoreDisplay.textContent = playerOneScore
    } else {
        playerTwoScore += playerTwoCurrentScore
        playerTwoScoreDisplay.textContent = playerTwoScore
    }
    
    gameOver()
    resetScore()
    switchPlayer()
}

function rollDice() {
    diceImage.style.display = 'block'
    // let dices = ['dice-1.png', 'dice-2.png', 'dice-3.png', 'dice-4.png', 'dice-5.png', 'dice-6.png'] 
    let dices = [1, 2, 3, 4, 5, 6] 
    let randomScore = dices[Math.floor(Math.random() * dices.length)]
    // console.log(random_dice)
    diceImage.src = `dice-${randomScore}.png`
    // changeScoreDisplay(random_dice)
    handleScores(randomScore)
}

function switchPlayer() {
    if (playerOneTurn) {
        playerOneTurn = false
        playerOne.classList.remove('player--active')
        playerTwo.classList.add('player--active')
    } else {
        playerOneTurn = true
        playerTwo.classList.remove('player--active')
        playerOne.classList.add('player--active')

    }
}

function handleScores(score) {

    temporaryScore += score
    console.log(temporaryScore)
    if (playerOneTurn) {
        // playerOneScore += score
        // playerOneScoreDisplay.textContent = playerOneScore
        playerOneCurrentScore = temporaryScore
        playerOneCurrentScoreDisplay.textContent = playerOneCurrentScore
    } else {
        // playerTwoScore += score
        // playerTwoScoreDisplay.textContent = playerTwoScore
        playerTwoCurrentScore = temporaryScore
        playerTwoCurrentScoreDisplay.textContent = playerTwoCurrentScore
    }
    
    if (score == 1) {
        resetScore()
        switchPlayer()
        console.log('playerScoredOne')
    }
}

function resetScore() {

    if (playerOneTurn) {
        playerOneCurrentScore = 0
        playerOneCurrentScoreDisplay.textContent = 0
    } else {
        playerTwoCurrentScore = 0
        playerTwoCurrentScoreDisplay.textContent = 0
    }
    temporaryScore = 0
}

function gameOver() {
    if (playerOneScore >= 100 || playerTwoScore >= 100) {

        if (playerOneTurn) {
            playerOne.classList.add('player--winner')
        } else {
            playerTwo.classList.add('player--winner')
        }

        holdButton.removeEventListener('click', holdGame)
        rollDiceButton.removeEventListener('click', rollDice)
        rollDiceButton.removeEventListener('click', gameOver)
    }
}
startGame()