const board = document.getElementById('game-board');
const scoreDisplay = document.getElementById('score');
const restartBtn = document.getElementById('restart');

let cards = ['🍎','🍌','🍇','🍓','🍎','🍌','🍇','🍓'];
let firstCard = null;
let secondCard = null;
let lockBoard = false;
let score = 0;

// Shuffle cards
cards.sort(() => 0.5 - Math.random());

function createBoard() {
    board.innerHTML = '';
    cards.forEach((symbol) => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.symbol = symbol;
        card.addEventListener('click', flipCard);
        board.appendChild(card);
    });
    score = 0;
    scoreDisplay.textContent = `Score: ${score}`;
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
        resetBoard();
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

restartBtn.addEventListener('click', createBoard);

createBoard();
