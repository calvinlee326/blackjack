let sentence = ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog"];
let animalsEl = document.getElementById("animals");

for(let i =0; i < sentence.length; i++){
    animalsEl.textContent += sentence[i] + " ";
}