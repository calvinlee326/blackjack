let firstCard = Math.ceil(Math.random() * 11);
console.log("First card: " + firstCard);
let secondCard = Math.ceil(Math.random() * 11);
console.log("Second card: " + secondCard);
let sum = firstCard + secondCard;
let isALive = true;
let hasBlackjack = false;
let message= "";

// let sumEl = document.getElementById("sum-el");
let sumEL= document.querySelector(".sum-el");
let messageEL= document.querySelector("#message-el");
let cardsEL= document.querySelector("#cards-el");

console.log("Sum: " + sum);
function startGame() {
    cardsEL.textContent = "Cards: " + firstCard + " " + secondCard;
    sumEL.textContent = "Sum: " + sum;
    if (sum < 21) {
        console.log("Do you want to draw a new card?");
    } else if (sum === 21) {
    console.log("You've got Blackjack!");
    hasBlackjack = true;
    } else if (sum > 21) {
    isALive = false; //player busted
    console.log("You're out of the game!");
    } 
    console.log("Has blackjack: " + hasBlackjack);
    console.log("Is alive: " + isALive);
}
function newCard() {
    console.log("Drawing a new card from the deck!");
    let card = Math.ceil(Math.random() * 11);
    sum += card;
    cardsEL.textContent = "Cards: " + firstCard + " " + secondCard + " " + card;
    sumEL.textContent = "Sum: " + sum;
    if (sum < 21) {
        console.log("Do you want to draw a new card?");
    } else if (sum === 21) {
        console.log("You've got Blackjack!");
    } else if (sum > 21) {
        console.log("You're out of the game!");
    }
}

 