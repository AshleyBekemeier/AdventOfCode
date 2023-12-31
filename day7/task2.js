var fs = require("fs");
var text = fs.readFileSync("./input1.txt", "utf-8");

const lines = text.split("\n");
var result = 0;

var fiveOfAKind = [];
var fourOfAKind = [];
var fullHouse = [];
var threeOfAKind = [];
var doublePair = [];
var twoOfAKind = [];
var highCard = [];

const strengthFromHighToLow = [
  { char: "A", strength: 13 },
  { char: "K", strength: 12 },
  { char: "Q", strength: 11 },
  { char: "T", strength: 10 },
  { char: "9", strength: 9 },
  { char: "8", strength: 8 },
  { char: "7", strength: 7 },
  { char: "6", strength: 6 },
  { char: "5", strength: 5 },
  { char: "4", strength: 4 },
  { char: "3", strength: 3 },
  { char: "2", strength: 2 },
  { char: "J", strength: 1 },
];

for (let i = 0; i < lines.length; i++) {
  const hand = lines[i].split(" ")[0];
  const bid = lines[i].split(" ")[1];

  const count = countCharacters(hand);
  // console.log(count);

  if (count[0] === 5) {
    fiveOfAKind.push({ hand, bid });
  } else if (count[0] === 4) {
    fourOfAKind.push({ hand, bid });
  } else if (count[0] === 3 && count[1] === 2) {
    fullHouse.push({ hand, bid });
  } else if (count[0] === 3) {
    threeOfAKind.push({ hand, bid });
  } else if (count[0] === 2 && count[1] === 2) {
    doublePair.push({ hand, bid });
  } else if (count[0] === 2) {
    twoOfAKind.push({ hand, bid });
  } else {
    highCard.push({ hand, bid });
  }
}

fiveOfAKind = fiveOfAKind.sort(sortFunc);
fourOfAKind = fourOfAKind.sort(sortFunc);
fullHouse = fullHouse.sort(sortFunc);
threeOfAKind = threeOfAKind.sort(sortFunc);
doublePair = doublePair.sort(sortFunc);
twoOfAKind = twoOfAKind.sort(sortFunc);
highCard = highCard.sort(sortFunc);

combinedHands = [
  ...fiveOfAKind,
  ...fourOfAKind,
  ...fullHouse,
  ...threeOfAKind,
  ...doublePair,
  ...twoOfAKind,
  ...highCard,
];

console.log(combinedHands.length);
// console.log(combinedHands)

console.log("five: ", fiveOfAKind);
// console.log("four: ", fourOfAKind);
// console.log("fullhouse: ", fullHouse);
// console.log("three: ", threeOfAKind);
// console.log("2pair: ", doublePair);
// console.log("two: ", twoOfAKind);
// console.log("high: ", highCard);

for (let i = 0; i < combinedHands.length; i++) {
  const bid = parseInt(combinedHands[i].bid);
  const rank = parseInt(combinedHands.length - i);
  result += bid * rank;
  //   if (rank === 1000) {
  //       console.log(combinedHands[i]);
  //       console.log(rank);
  //       console.log(bid*rank);
  //       console.log(result);
  //     }
}

console.log(result);

function sortFunc(valA, valB) {
  pos = findFirstDiffPos(valA.hand, valB.hand);
  const valAFirstChar = valA.hand[pos];
  const valBFirstChar = valB.hand[pos];

  strengthA = strengthFromHighToLow.find((obj) => {
    return obj.char == valAFirstChar;
  })?.strength;
  strengthB = strengthFromHighToLow.find((obj) => {
    return obj.char == valBFirstChar;
  })?.strength;

  return strengthB - strengthA;
}

function findFirstDiffPos(a, b) {
  if (a.length < b.length) [a, b] = [b, a];
  return [...a].findIndex((chr, i) => chr !== b[i]);
}

function countCharacters(str) {
  // Create an empty object to store character counts
  const charCount = {};

  // Loop through each character in the string
  for (let char of str) {
    // Increment the count for the current character
    charCount[char] = (charCount[char] || 0) + 1;
  }
  // console.log(charCount);
  jokers = charCount["J"];
  charCount["J"] = 0;
  // console.log(jokers);
  // console.log(charCount);

  let newValues = Object.values(charCount).sort((a, b) => b - a);
  if (jokers) {
    newValues[0] = newValues[0] + jokers;
  }
  // console.log(newValues);

  return newValues.slice(0, 2);
}
