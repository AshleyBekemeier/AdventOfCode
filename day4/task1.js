var fs = require("fs");
var text = fs.readFileSync("./input1.txt", "utf-8");

const lines = text.split("\n");
// text = text.replace(/\s/g,'');
var result = 0;

for (let i = 0; i < lines.length; i++) {
  var line = lines[i].trim();

  line = line.split(": ")[1];
  numbers = line.split(/\W/).filter(Boolean);

  winCards = numbers.slice(0, 10);
  haveCards = numbers.slice(10);

  // console.log(winCards);
  // console.log(haveCards);

  cardValue = 0;
  haveCards.forEach((card) => {
    if (winCards.includes(card)) {
      cardValue = cardValue === 0 ? 1 : cardValue * 2;
    }
  });
  result += cardValue;
  // console.log(cardValue);
}

console.log(result);
