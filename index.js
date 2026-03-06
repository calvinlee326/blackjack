let cards = [];
let sum = 0;
let isAlive = false;
let hasBlackjack = false;

let sumEL = document.querySelector("#sum-el");
let messageEL = document.querySelector("#message-el");
let cardsEL = document.querySelector("#cards-el");

const deck = [
    { face: "A", suit: "♠", value: 11 },
    { face: "A", suit: "♥", value: 11 },
    { face: "A", suit: "♦", value: 11 },
    { face: "A", suit: "♣", value: 11 },
    { face: "K", suit: "♠", value: 10 },
    { face: "K", suit: "♥", value: 10 },
    { face: "K", suit: "♦", value: 10 },
    { face: "K", suit: "♣", value: 10 },
    { face: "Q", suit: "♠", value: 10 },
    { face: "Q", suit: "♥", value: 10 },
    { face: "Q", suit: "♦", value: 10 },
    { face: "Q", suit: "♣", value: 10 },
    { face: "J", suit: "♠", value: 10 },
    { face: "J", suit: "♥", value: 10 },
    { face: "J", suit: "♦", value: 10 },
    { face: "J", suit: "♣", value: 10 },
    { face: "10", suit: "♠", value: 10 },
    { face: "10", suit: "♥", value: 10 },
    { face: "10", suit: "♦", value: 10 },
    { face: "10", suit: "♣", value: 10 },
    { face: "9", suit: "♠", value: 9 },
    { face: "9", suit: "♥", value: 9 },
    { face: "9", suit: "♦", value: 9 },
    { face: "9", suit: "♣", value: 9 },
    { face: "8", suit: "♠", value: 8 },
    { face: "8", suit: "♥", value: 8 },
    { face: "8", suit: "♦", value: 8 },
    { face: "8", suit: "♣", value: 8 },
    { face: "7", suit: "♠", value: 7 },
    { face: "7", suit: "♥", value: 7 },
    { face: "7", suit: "♦", value: 7 },
    { face: "7", suit: "♣", value: 7 },
    { face: "6", suit: "♠", value: 6 },
    { face: "6", suit: "♥", value: 6 },
    { face: "6", suit: "♦", value: 6 },
    { face: "6", suit: "♣", value: 6 },
    { face: "5", suit: "♠", value: 5 },
    { face: "5", suit: "♥", value: 5 },
    { face: "5", suit: "♦", value: 5 },
    { face: "5", suit: "♣", value: 5 },
    { face: "4", suit: "♠", value: 4 },
    { face: "4", suit: "♥", value: 4 },
    { face: "4", suit: "♦", value: 4 },
    { face: "4", suit: "♣", value: 4 },
    { face: "3", suit: "♠", value: 3 },
    { face: "3", suit: "♥", value: 3 },
    { face: "3", suit: "♦", value: 3 },
    { face: "3", suit: "♣", value: 3 },
    { face: "2", suit: "♠", value: 2 },
    { face: "2", suit: "♥", value: 2 },
    { face: "2", suit: "♦", value: 2 },
    { face: "2", suit: "♣", value: 2 },
];

function getRandomCard() {
    return deck[Math.floor(Math.random() * deck.length)];
}

function createCardEl(card) {
    let isRed = card.suit === "♥" || card.suit === "♦";
    let cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    if (isRed) cardDiv.classList.add("red");
    cardDiv.innerHTML = `
        <span class="card-top">${card.face}</span>
        <span class="card-suit">${card.suit}</span>
        <span class="card-bottom">${card.face}</span>
    `;
    return cardDiv;
}

function startGame() {
    cards = [];
    sum = 0;
    isAlive = true;
    hasBlackjack = false;
    cardsEL.innerHTML = "";
    let first = getRandomCard();
    let second = getRandomCard();
    cards.push(first, second);
    sum = first.value + second.value;
    cardsEL.appendChild(createCardEl(first));
    cardsEL.appendChild(createCardEl(second));
    renderGame();
}

function newCard() {
    if (!isAlive || hasBlackjack) return;
    let card = getRandomCard();
    cards.push(card);
    sum += card.value;
    cardsEL.appendChild(createCardEl(card));
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

 