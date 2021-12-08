const URL = `http://deckofcardsapi.com/api/deck/new/draw/?deck_count=1`;
let cards = [];

//1st question
axios.get(URL).then((res) => {
  console.log(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`);
});

//2nd question
axios.get(URL)
  .then((res) => {
    let deckID = res.data.deck_id;
    cards.push(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`);
    return axios.get(`http://deckofcardsapi.com/api/deck/${deckID}/draw/?deck_count=1`);
  })
  .then((res) => {
    cards.push(`${res.data.cards[0].value} of ${res.data.cards[0].suit}`);
    cards.forEach((card) => console.log(card));
  })
  .catch((err) => console.log("error", err));

//3rd question
const drawCardBtn = document.querySelector(".draw-btn");
let allCardsDiv = document.querySelector(".all-cards");
let deckID;

window.onload = function getDeckID() {
  axios.get("http://deckofcardsapi.com/api/deck/new/shuffle").then((res) => {
    deckID = res.data.deck_id;
  });
};

function createImg(imgURL) {
  let cardImg = document.createElement("img");
  cardImg.src = imgURL;
  allCardsDiv.appendChild(cardImg);
  for (let i = 1; i < allCardsDiv.children.length; i++) {
    allCardsDiv.children[i].className = "card";
  }
}

drawCardBtn.addEventListener("click", function () {
  axios.get(`http://deckofcardsapi.com/api/deck/${deckID}/draw/?deck_count=1`)
    .then((res) => {
      let imageURL = res.data.cards[0].image;
      createImg(imageURL);
    })
    .catch((err) => {
      console.log("Error", err);
      alert("Out of cards");
    });
});
