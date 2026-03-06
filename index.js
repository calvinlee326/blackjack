let firstCard = Math.ceil(Math.random() * 11);
console.log("First card: " + firstCard);
let secondCard = Math.ceil(Math.random() * 11);
console.log("Second card: " + secondCard);
let sum = firstCard + secondCard;
let isALive = true;
let hasBlackjack = false;

console.log("Sum: " + sum);

if (sum < 21) {
    console.log("Do you want to draw a new card?");
} else if (sum === 21) {
    console.log("You've got Blackjack!");
    hasBlackjack = true;
} else {
    isALive = false; //player busted
    console.log("You're out of the game!");
} 

console.log("Has blackjack: " + hasBlackjack); 