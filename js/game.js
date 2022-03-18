const buttonStartGameElement = document.querySelector("#btn-start-game");
const boardGameElement = document.querySelector("#board");
const pointsElement = document.querySelector("#points");
const hitsElement = document.querySelector("#hits");
const errorsElement = document.querySelector("#errors");

let historyIndexsMatcheds = [];
const indexesCompare = [1, 2, 3, 4, 5, 6, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8];
let cardsPosition = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
let points = 0;
let errors = 0;
let hits = 0;
let firstCard, secondCard;
let blockBoard = false;

const shuffleCards = () => {
  cardsPosition = cardsPosition.sort(() => Math.random() - 0.5);
};

const handleClickCard = (element, index) => {
  if (historyIndexsMatcheds.indexOf(index) > -1) return;

  if (blockBoard) return;

  if (!firstCard) {
    firstCard = { element, index };
  } else if (!secondCard) {
    secondCard = { element, index };
  }

  element.style.backgroundImage = `url('./img/${index}.png')`;

  if (firstCard && secondCard) {
    testCards();
  }
};

const isFinishGame = () => hits === cardsPosition.length / 2;

const testCards = () => {
  blockBoard = true;

  setTimeout(() => {
    let isMatch = isMatchCards();

    if (isMatch) {
      hits++;
      points++;
      historyIndexsMatcheds.push(firstCard.index);
      historyIndexsMatcheds.push(secondCard.index);
    } else {
      errors++;
      points--;
    }

    updateBoard(!isMatch);
    updateInfo();


    firstCard = null;
    secondCard = null;

    if (isFinishGame()) {
      buttonStartGameElement.disabled = false;
      return;
    }

    blockBoard = false;
  }, 500);
};

const updateBoard = (hideCards = false) => {
  if (hideCards) {
    const urlImage = "url('./img/card-back.png')";
    firstCard.element.style.backgroundImage = urlImage;
    secondCard.element.style.backgroundImage = urlImage;
  } else {
    firstCard.element.style.opacity = "0.5";
    secondCard.element.style.opacity = "0.5";
  }
};

const updateInfo = () => {
  pointsElement.innerHTML = points;
  hitsElement.innerHTML = hits;
  errorsElement.innerHTML = errors;
}

const isMatchCards = () => {
  if (!firstCard || !secondCard) {
    return false;
  }

  const indexFirstCard = firstCard.index;
  const indexSecondCard = secondCard.index;

  return indexesCompare[indexFirstCard] === indexesCompare[indexSecondCard];
};

const drawBoard = () => {
  boardGameElement.innerHTML = "";
  cardsPosition.forEach(() => {
    let divCard = document.createElement('div');
    divCard.classList.add("card");
    divCard.classList.add("card-back");
    boardGameElement.appendChild(divCard);
  })
}

const resetGame = () => {
  points = 0;
  errors = 0;
  hits = 0;
  firstCard = null;
  secondCard = null;
  blockBoard = false;
  historyIndexsMatcheds = [];
  updateInfo();
}

function startGame() {
  buttonStartGameElement.disabled = true;

  if(isFinishGame()){
    resetGame();
  }
  shuffleCards();
  drawBoard();

  const cardsElement = document.querySelectorAll(".card");

  cardsElement.forEach((cardElement, index) => {
    cardElement.addEventListener("click", () =>
      handleClickCard(cardElement, cardsPosition[index])
    );
  });
}

buttonStartGameElement.addEventListener("click", startGame);
