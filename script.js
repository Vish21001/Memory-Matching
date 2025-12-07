const board = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const restartBtn = document.getElementById('restart');
const startBtn = document.getElementById('start');
const difficultySelect = document.getElementById('difficulty');

let cards = [];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;
let totalPairs = 0;

// Generate emojis for cards
function generateCards(pairCount) {
    const baseEmojis = ['🍎','🍌','🍇','🍓','🍍','🥝','🍒','🍑'];
    const selected = baseEmojis.slice(0, pairCount);
    let allCards = [...selected, ...selected]; // duplicate for pairs
    allCards.sort(() => 0.5 - Math.random());
    return allCards;
}

// Set grid columns based on difficulty
function setGrid(pairCount) {
    const cols = Math.min(pairCount, 4); // max 4 columns
    board.style.gridTemplateColumns = `repeat(${cols}, 80px)`;
}

// Create game board
function createBoard(pairCount) {
    board.innerHTML = '';
    cards = generateCards(pairCount);
    totalPairs = pairCount;
    setGrid(pairCount);
    cards.forEach((symbol) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

function flipCard() {
    if(lockBoard) return;
    if(this === firstCard) return;

    this.textContent = this.dataset.symbol;
    if(!firstCard) {
        firstCard = this;
        return;
    }

    secondCard = this;
    lockBoard = true;
    checkForMatch();
}

function checkForMatch() {
    if(firstCard.dataset.symbol === secondCard.dataset.symbol) {
        firstCard.classList.add('matched');
        secondCard.classList.add('matched');
        score += 10;
        totalPairs--;
        resetBoard();
        if(totalPairs === 0) alert(`You won! Final Score: ${score}`);
    } else {
        setTimeout(() => {
            firstCard.textContent = '';
            secondCard.textContent = '';
            resetBoard();
        }, 1000);
    }
    scoreDisplay.textContent = `Score: ${score}`;
}

function resetBoard() {
    [firstCard, secondCard] = [null, null];
    lockBoard = false;
}

startBtn.addEventListener('click', () => {
    const difficulty = parseInt(difficultySelect.value);
    createBoard(difficulty);
});

restartBtn.addEventListener('click', () => {
    const difficulty = parseInt(difficultySelect.value);
    createBoard(difficulty);
});
