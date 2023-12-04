var fs = require("fs");
var text = fs.readFileSync("./input1.txt", "utf-8");

const lines = text.split("\n");
const instances = Array(lines.length).fill(1);
var result = 0;

for (let i = 0; i < lines.length; i++) {
  var line = lines[i].trim();

  line = line.split(": ")[1];
  numbers = line.split(/\W/).filter(Boolean);

  winCards = numbers.slice(0, 10);
  haveCards = numbers.slice(10);

  // console.log(winCards);
  // console.log(haveCards);

  wins = 0;
  haveCards.forEach((card) => {
    if (winCards.includes(card)) {
      wins++;
      instances[wins + i] = instances[wins + i] + instances[i];
    }
  });
}

console.log(instances);

instances.forEach((count) => (result += count));

console.log(result);
