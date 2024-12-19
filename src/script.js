const cardsContainer = document.querySelector(".cards-container");
const difficultyButtons = document.querySelectorAll(".difficulty-button");
const clear = document.querySelector(".clear");

let cardsNum = 6;
let cards = [];
let repeat = 2;
let isGameActive = true;
let clickedCards = [];
let matches = 0;

function shuffleImages(images) {
  let temp = [...images];
  let randomImages = [];

  for (let i = 0; i < cardsNum; i++) {
    let index = Math.floor(Math.random() * temp.length);
    randomImages.push(temp[index]);
    temp.splice(index, 1);
  }

  let shownImages = [];

  for (let i = 0; i < repeat; i++) {
    shownImages = shownImages.concat(randomImages);
  }
  return shownImages.sort(() => Math.random() - 0.5);
}

function clearCards() {
  clickedCards.forEach((card) => {
    card.classList.add("hidden");
    clickedCards = clickedCards.filter((e) => {
      return e !== card;
    });
  });

  isGameActive = true;
}

function activateButton(index1, index2) {
  for (let i = 0; i < 6; i++) {
    difficultyButtons[i].classList.remove("active");
    if (i === index1 || index2) {
      difficultyButtons[index1].classList.add("active");
      difficultyButtons[index2].classList.add("active");
    }
  }
}
function clickCard() {
  if (isGameActive) {
    if (!clickedCards.length) {
      this.classList.remove("hidden");
      clickedCards.push(this);
    } else if (!this.classList.contains("hidden")) {
      alert("click something else");
    } else {
      if (clickedCards[0].dataset.name == this.dataset.name) {
        clickedCards.push(this);
        this.classList.remove("hidden");
        checkWin();
      } else {
        this.classList.remove("hidden");
        clickedCards.push(this);
        isGameActive = false;
        setTimeout(clearCards, 1000);
      }
    }
  }
}
function checkWin() {
  if (clickedCards.length == repeat) {
    matches++;

    document.querySelector("#found-matches").innerHTML = `Found: ${matches}`;
    document.querySelector("#remaining-matches").innerHTML =
      `Remaining: ${cardsNum - matches}`;

    clickedCards.forEach((card) => {
      card.removeEventListener("click", clickCard);
    });
    if (matches == cardsNum) {
      setTimeout(() => {
        alert("You Won!!");
      }, 500);
    }
    clickedCards = [];
  }
}

function makeRandomCards() {
  matches = 0;
  cardsContainer.innerHTML = "";
  clearCards();
  cards = [];
  const images = [
    "eagle.jpg",
    "cat.jpg",
    "parrot.jpg",
    "iguana.jpg",
    "rabbit.jpg",
    "tiger.jpg",
    "toucan.jpg",
    "chicken.jpg",
  ];

  document.querySelector("#remaining-matches").innerHTML =
    `Remaining: ${cardsNum - matches}`;

  document.querySelector("#found-matches").innerHTML = `Found: ${matches}`;
  const shownImages = shuffleImages(images);

  shownImages.forEach((image) => {
    let elementContainer = document.createElement("div");
    elementContainer.classList.add("card-container");
    elementContainer.classList.add("hidden");
    elementContainer.dataset.name = image.slice(0, -4);
    elementContainer.dataset.id = (((1 + Math.random()) * 0x1000000) | 0)
      .toString(16)
      .substring(1);
    elementContainer.addEventListener("click", clickCard);

    let backElement = document.createElement("div");
    backElement.classList.add("card-back");
    backElement.innerHTML = `<img src="assets/backImage.png">`;

    let element = document.createElement("div");
    element.classList.add("card");
    element.innerHTML = `<img src="assets/${image}">`;

    elementContainer.appendChild(element);
    elementContainer.appendChild(backElement);
    cards.push(elementContainer);
  });

  cards.forEach((card) => cardsContainer.appendChild(card));
}

[difficultyButtons[0], difficultyButtons[3]].forEach((button) => {
  button.addEventListener("click", () => {
    repeat = 2;
    cardsNum = 6;
    if (cardsContainer.classList.contains("wide")) {
      cardsContainer.classList.remove("wide");
    }
    activateButton(0, 3);
    makeRandomCards();
  });
});

[difficultyButtons[1], difficultyButtons[4]].forEach((button) => {
  button.addEventListener("click", () => {
    repeat = 2;
    cardsNum = 8;
    if (cardsContainer.classList.contains("wide")) {
      cardsContainer.classList.remove("wide");
    }
    activateButton(1, 4);
    makeRandomCards();
  });
});

[difficultyButtons[2], difficultyButtons[5]].forEach((button) => {
  button.addEventListener("click", () => {
    repeat = 3;
    cardsNum = 8;
    if (!cardsContainer.classList.contains("wide")) {
      cardsContainer.classList.add("wide");
    }
    activateButton(2, 5);
    makeRandomCards();
  });
});

clear.addEventListener("click", () => {
  makeRandomCards();
});

makeRandomCards();
