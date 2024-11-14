const cardsContainer = document.querySelector(".cards-container");

let cardsNum = 6;
let cards = [];
let repeat = 2;
let isGameActive = true;
let clickedCards = []; // Array to track selected cards
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
  clearCards()
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
    let element = document.createElement("div");
    element.classList.add("card");
    element.classList.add("hidden");
    element.innerHTML = `<img src="assets/${image}">`;
    element.dataset.name = image.slice(0, -4);
    element.dataset.id = (((1 + Math.random()) * 0x1000000) | 0)
      .toString(16)
      .substring(1);
    element.addEventListener("click", clickCard);
    cards.push(element);
  });

  cards.forEach((card) => cardsContainer.appendChild(card));
}

document.querySelector(".easy").addEventListener("click", () => {
  repeat = 2;
  cardsNum = 6;
  if (cardsContainer.classList.contains("wide")) {
    cardsContainer.classList.remove("wide");
  }
  makeRandomCards();
});
document.querySelector(".medium").addEventListener("click", () => {
  repeat = 2;
  cardsNum = 8;
  if (cardsContainer.classList.contains("wide")) {
    cardsContainer.classList.remove("wide");
  }
  makeRandomCards();
});

document.querySelector(".hard").addEventListener("click", () => {
  repeat = 3;
  cardsNum = 8;
  if (!cardsContainer.classList.contains("wide")) {
    cardsContainer.classList.add("wide");
  }

  makeRandomCards();
});

makeRandomCards();
