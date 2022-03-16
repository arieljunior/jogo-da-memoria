const buttonStartGameElement = document.querySelector("#btn-start-game");

const historyIndexsMatcheds = [];
const indexesCompare = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
let cards = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let points = 0;
let firstCard, secondCard;

let blockBoard = false;

const shuffleCards = () => {
  cards = cards.sort(() => Math.random() - 0.5);
};

const handleClickCard = (element, index) => {

  if(historyIndexsMatcheds.indexOf(index) > -1) return;

  if(blockBoard) return;

  if(!firstCard){
    firstCard = { element, index };
  }else if(!secondCard){
    secondCard = { element, index }; 
  }

  element.style.backgroundImage = `url('./img/${index}.png')`;

  if(firstCard && secondCard){
    testCards();
  }

};

const testCards = () => {
  
  blockBoard = true;

  setTimeout(() => {
    let isMatch = isMatchCards();

    let message;
    if(isMatch){
      message = "você acertou!";
      handleMatchedCards();
    }else{
      message = "você errou!";
      points--;
      hideCards();
    }

    alert(message);
    
    blockBoard = false;

    firstCard = null;
    secondCard = null;
  }, 500);
}

const handleMatchedCards = () => {
  firstCard.element.style.opacity = '0.5';
  secondCard.element.style.opacity = '0.5';

  historyIndexsMatcheds.push(firstCard.index);
  historyIndexsMatcheds.push(secondCard.index);

  points++;
}

const hideCards = () => {
  const urlImage = "url('./img/carta_costas.png')";
  firstCard.element.style.backgroundImage = urlImage;
  secondCard.element.style.backgroundImage = urlImage;
}

const isMatchCards = () => {
  if(!firstCard || !secondCard){
    return false;
  }

  const indexFirstCard = firstCard.index;
  const indexSecondCard = secondCard.index;

  return indexesCompare[indexFirstCard] === indexesCompare[indexSecondCard];
}

function startGame() {
  buttonStartGameElement.disabled = true;

  shuffleCards();

  const cardsElement = document.querySelectorAll(".card");

  cardsElement.forEach((cardElement, index) => {
    cardElement.addEventListener("click", () => handleClickCard(cardElement, cards[index]));
  });
}

buttonStartGameElement.addEventListener("click", startGame);
