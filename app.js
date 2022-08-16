const gameContainer = document.getElementById("game");
const colorBtn = document.getElementById("color-btn");
const randomBtn = document.getElementById("random-btn");
const gifBtn = document.getElementById("gif-btn");
const countEle = document.getElementById("count");
const scoreEle = document.getElementById("lowscore");
let clickedCard1 = '';
let clickedCard2 = '';
let count = 0;
let lowScore = 0;
const staticColor = [
  "crimson",
  "royalblue",
  "lawngreen",
  "darkorange",
  "rebeccapurple",
  "yellow"
];

const gifLibrary = [
    "https://media.giphy.com/media/ZqlvCTNHpqrio/giphy.gif",
    "https://media.giphy.com/media/3oEjHAUOqG3lSS0f1C/giphy.gif",
    "https://media.giphy.com/media/o75ajIFH0QnQC3nCeD/giphy.gif",
    "https://media.giphy.com/media/Rlwz4m0aHgXH13jyrE/giphy.gif",
    "https://media.giphy.com/media/S4H2ZREgH8c2EG6TmV/giphy.gif",
    "https://media.giphy.com/media/NUevhWb3aWuSyXz3FP/giphy.gif",
];

let randomColor = [];

const memArray = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six"
];

// helper function to shuffle an array it returns the same array with values shuffled
function shuffle(array) {
  let counter = array.length;

  while (counter > 0) {                              // While there are elements in the array
    let index = Math.floor(Math.random() * counter); // Pick a random index
    counter--;                                       // Decrease counter by 1
    let temp = array[counter];                       // And swap the last element with it
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createCards() {
    let shuffArray = shuffle(memArray);
    for (let item of shuffArray) {
        const newDiv = document.createElement("div");       // create a new div
        newDiv.classList.add(item, 'flipped', 'card');             // give it a class attribute for the value we are looping over
        newDiv.addEventListener("click", handleCardClick);  // call a function handleCardClick when a div is clicked on
        gameContainer.append(newDiv);                       // append the div to the element with an id of game
    }
}

// this function stores the element(s) clicked on in public variables
// then once two have been stored the function calls matchCheck on them
function handleCardClick(event) {
    if (!clickedCard1 && event.target.classList.contains("flipped")) {  
        clickedCard1 = event.target  
        clickedCard1.classList.remove('flipped');                       
        if(clickedCard1.children[0]) {
            clickedCard1.children[0].classList.remove('hide');                             
        }                    
                                   
    } else if (!clickedCard2 && event.target.classList.contains("flipped")) {
        clickedCard2 = event.target  
        clickedCard2.classList.remove('flipped');
        if(clickedCard2.children[0]) {
            clickedCard2.children[0].classList.remove('hide');                           
        }                       
        matchCheck(clickedCard1, clickedCard2);                        
    };
}

function matchCheck() {
    if (clickedCard1.classList.value === clickedCard2.classList.value) {
        addCheck(clickedCard1);
        addCheck(clickedCard2);
        clickedCard1 = '';
        clickedCard2 = '';
    } else {
        setTimeout(function() {
            if(clickedCard1.children[0]) {
                clickedCard1.children[0].classList.add('hide');
            } 
            clickedCard1.classList.add('flipped');
            if(clickedCard1.children[0]) {
                clickedCard2.children[0].classList.add('hide');
            }  
            clickedCard2.classList.add('flipped');
            clickedCard1 = '';
            clickedCard2 = '';
        }, 1000);
    };
    count += 1;
    countEle.innerText = count;
}

function addCheck(item) {
    const newSpan = document.createElement("span");       // create a new span
    newSpan.classList.add('match');             // give it a class attribute for match
    newSpan.innerHTML = '&#10004;';  // add checkmark code
    item.append(newSpan); 
}
function getRandColor() {
    let rgbArray = [];
    for (let i = 0; i < 6; i++) {
        let r = Math.round(Math.random() * 255);
        let g = Math.round(Math.random() * 255);
        let b = Math.round(Math.random() * 255);
        rgbArray.push(`rgb(${r}, ${g}, ${b})`)
    }
    return rgbArray;
}
function saveScore() {
    if (!document.querySelector('.flipped')) {
        if(!localStorage.getItem('lowscore')){
            localStorage.setItem('lowscore', count);
            lowScore = count;
        } else {
            let score = localStorage.getItem('lowscore');
            if(count < score) {
                localStorage.setItem('lowscore', count);
                lowScore = count;
            } else {
                lowScore = score;
            }
        }
        scoreEle.innerText = lowScore;
    }
}

function gameReset() {
    saveScore();
    gameContainer.innerHTML = '';
    clickedCard1 = '';
    clickedCard2 = '';
    count = 0;
    countEle.innerText = count;
    colorBtn.innerText = "Color Game!";
    randomBtn.innerText = "Random Game!";
    gifBtn.innerText = "GIF Game!";
}

// button to start game, shuffles array, clears board and resets public variables
colorBtn.addEventListener("click", function(e){
    e.preventDefault();
    gameReset();
    colorBtn.innerText = "Restart Game!";
    createCards();
    applyColor(staticColor);
});

randomBtn.addEventListener("click", function(e){
    e.preventDefault();
    gameReset();
    randomBtn.innerText = "Restart Game!";
    createCards();
    randomColor = getRandColor();
    applyColor(randomColor);
});

gifBtn.addEventListener("click", function(e){
    e.preventDefault();
    gameReset();
    gifBtn.innerText = "Restart Game!";
    createCards();
    applyGif(gifLibrary);
});

function applyColor(colorArray) {
    const allCards = document.querySelectorAll('div');
    for ( let card of allCards) {
        if(card.classList.contains('one')) {
            card.style.backgroundColor = colorArray[0];
        } else if(card.classList.contains('two')) {
            card.style.backgroundColor = colorArray[1];
        } else if(card.classList.contains('three')) {
            card.style.backgroundColor = colorArray[2];
        } else if(card.classList.contains('four')) {
            card.style.backgroundColor = colorArray[3];
        } else if(card.classList.contains('five')) {
            card.style.backgroundColor = colorArray[4];
        } else if(card.classList.contains('six')) {
            card.style.backgroundColor = colorArray[5];
        };
    }
}

function applyGif(gifArray) {
    const allCards = document.querySelectorAll('div');
    for ( let card of allCards) {
        if(card.classList.contains('one')) {
            card.innerHTML = `<img class="hide" src=${gifArray[0]} width="100%" height="210px">`;
        } else if(card.classList.contains('two')) {
            card.innerHTML = `<img class="hide" src=${gifArray[1]} width="100%" height="210px">`;
        } else if(card.classList.contains('three')) {
            card.innerHTML = `<img class="hide" src=${gifArray[2]} width="100%" height="210px">`;
        } else if(card.classList.contains('four')) {
            card.innerHTML = `<img class="hide" src=${gifArray[3]} width="100%" height="210px">`;
        } else if(card.classList.contains('five')) {
            card.innerHTML = `<img class="hide" src=${gifArray[4]} width="100%" height="210px">`;
        } else if(card.classList.contains('six')) {
            card.innerHTML = `<img class="hide" src=${gifArray[5]} width="100%" height="210px">`;
        };
    }
}

window.addEventListener('load', function() {
    countEle.innerText = count;
    if(!localStorage.getItem('lowscore')){
        scoreEle.innerText = '--';
    } else {
        scoreEle.innerText = localStorage.getItem('lowscore');
    }
    createCards();
    applyColor(staticColor);
});