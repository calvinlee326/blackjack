let firstCard;
let secondCard;
let sum;
let isAlive = false;
let hasBlackjack = false;

let sumEL = document.querySelector("#sum-el");
let messageEL = document.querySelector("#message-el");
let cardsEL = document.querySelector("#cards-el");

function startGame() {
    firstCard = Math.ceil(Math.random() * 11);
    secondCard = Math.ceil(Math.random() * 11);
    sum = firstCard + secondCard;
    isAlive = true;
    hasBlackjack = false;
    cardsEL.textContent = firstCard + " " + secondCard;
    renderGame();
}

function newCard() {
    if (!isAlive || hasBlackjack) return;
    let card = Math.ceil(Math.random() * 11);
    sum += card;
    cardsEL.textContent += " " + card;
    renderGame();
}

function renderGame() {
    sumEL.textContent = sum;
    if (sum < 21) {
        messageEL.textContent = "Do you want to draw a new card?";
    } else if (sum === 21) {
        messageEL.textContent = "You've got Blackjack!";
        hasBlackjack = true;
    } else {
        messageEL.textContent = "You're out of the game!";
        isAlive = false;
    }
}

 