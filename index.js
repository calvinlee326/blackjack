let playerName = "";
let credits = 1000;
let bet = 0;
let playerCards = [];
let dealerCards = [];
let gameActive = false;

const sumEl = document.querySelector("#sum-el");
const messageEl = document.querySelector("#message-el");
const cardsEl = document.querySelector("#cards-el");
const dealerCardsEl = document.querySelector("#dealer-cards-el");
const dealerSumEl = document.querySelector("#dealer-sum-el");
const creditsEl = document.querySelector("#credits-el");
const playerNameEl = document.querySelector("#player-name-el");
const btnHit = document.querySelector("#btn-hit");
const btnStand = document.querySelector("#btn-stand");
const btnDeal = document.querySelector("#btn-deal");

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

function startSession() {
    const input = document.querySelector("#name-input").value.trim();
    playerName = input || "Player";
    playerNameEl.textContent = playerName.toUpperCase();
    document.querySelector("#welcome-screen").classList.add("hidden");
    document.querySelector("#game-container").classList.remove("hidden");
}

function calculateSum(cards) {
    let sum = 0;
    let aces = 0;
    for (let card of cards) {
        if (card.face === "A") {
            aces++;
            sum += 11;
        } else {
            sum += card.value;
        }
    }
    while (sum > 21 && aces > 0) {
        sum -= 10;
        aces--;
    }
    return sum;
}

function getRandomCard() {
    return deck[Math.floor(Math.random() * deck.length)];
}

function createCardEl(card, faceDown = false) {
    const div = document.createElement("div");
    div.classList.add("card");
    if (faceDown) {
        div.classList.add("face-down");
        div.innerHTML = `
            <span class="card-top">?</span>
            <span class="card-suit">★</span>
            <span class="card-bottom">?</span>
        `;
        return div;
    }
    if (card.suit === "♥" || card.suit === "♦") div.classList.add("red");
    div.innerHTML = `
        <span class="card-top">${card.face}</span>
        <span class="card-suit">${card.suit}</span>
        <span class="card-bottom">${card.face}</span>
    `;
    return div;
}

function startGame() {
    const betInput = parseInt(document.querySelector("#bet-input").value);
    if (!betInput || betInput < 1) {
        messageEl.textContent = "Enter a valid bet.";
        return;
    }
    if (betInput > credits) {
        messageEl.textContent = "Not enough credits!";
        return;
    }

    bet = betInput;
    playerCards = [getRandomCard(), getRandomCard()];
    dealerCards = [getRandomCard(), getRandomCard()];
    gameActive = true;

    cardsEl.innerHTML = "";
    dealerCardsEl.innerHTML = "";

    for (let card of playerCards) cardsEl.appendChild(createCardEl(card));

    dealerCardsEl.appendChild(createCardEl(null, true));
    dealerCardsEl.appendChild(createCardEl(dealerCards[1]));

    dealerSumEl.textContent = "?";
    sumEl.textContent = calculateSum(playerCards);

    btnHit.disabled = false;
    btnStand.disabled = false;
    btnDeal.disabled = true;

    const playerSum = calculateSum(playerCards);
    if (playerSum === 21) {
        messageEl.textContent = "Blackjack!";
        endRound();
    } else {
        messageEl.textContent = "Hit or Stand?";
    }
}

function hit() {
    if (!gameActive) return;
    const card = getRandomCard();
    playerCards.push(card);
    cardsEl.appendChild(createCardEl(card));
    const playerSum = calculateSum(playerCards);
    sumEl.textContent = playerSum;

    if (playerSum > 21) {
        messageEl.textContent = "Bust!";
        endRound();
    } else if (playerSum === 21) {
        messageEl.textContent = "21!";
        endRound();
    }
}

function stand() {
    if (!gameActive) return;
    endRound();
}

function endRound() {
    gameActive = false;
    btnHit.disabled = true;
    btnStand.disabled = true;
    revealDealer();
}

function revealDealer() {
    dealerCardsEl.innerHTML = "";
    for (let card of dealerCards) dealerCardsEl.appendChild(createCardEl(card));

    while (calculateSum(dealerCards) < 17) {
        const card = getRandomCard();
        dealerCards.push(card);
        dealerCardsEl.appendChild(createCardEl(card));
    }

    const playerSum = calculateSum(playerCards);
    const dealerSum = calculateSum(dealerCards);
    dealerSumEl.textContent = dealerSum;
    sumEl.textContent = playerSum;

    determineWinner(playerSum, dealerSum);
}

function determineWinner(playerSum, dealerSum) {
    let message;
    let creditChange = 0;
    const isBlackjack = playerSum === 21 && playerCards.length === 2;
    const dealerBlackjack = dealerSum === 21 && dealerCards.length === 2;

    if (playerSum > 21) {
        message = `Bust! Lost ${bet} credits.`;
        creditChange = -bet;
    } else if (isBlackjack && !dealerBlackjack) {
        const winnings = Math.floor(bet * 1.5);
        message = `Blackjack! Won ${winnings} credits!`;
        creditChange = winnings;
    } else if (dealerSum > 21) {
        message = `Dealer busts! Won ${bet} credits!`;
        creditChange = bet;
    } else if (playerSum > dealerSum) {
        message = `You win! Got ${bet} credits!`;
        creditChange = bet;
    } else if (playerSum < dealerSum) {
        message = `Dealer wins. Lost ${bet} credits.`;
        creditChange = -bet;
    } else {
        message = "Push! Bet returned.";
        creditChange = 0;
    }

    credits += creditChange;
    creditsEl.textContent = credits;
    messageEl.textContent = message;

    if (credits <= 0) {
        messageEl.textContent = "No credits left! Refresh to start over.";
        btnDeal.disabled = true;
    } else {
        btnDeal.disabled = false;
    }
}
