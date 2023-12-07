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
  { char: "J", strength: 10 },
  { char: "T", strength: 9 },
  { char: "9", strength: 8 },
  { char: "8", strength: 7 },
  { char: "7", strength: 6 },
  { char: "6", strength: 5 },
  { char: "5", strength: 4 },
  { char: "4", strength: 3 },
  { char: "3", strength: 2 },
  { char: "2", strength: 1 },
];

for (let i = 0; i < lines.length; i++) {
  const hand = lines[i].split(" ")[0];
  const bid = lines[i].split(" ")[1];

  const pair = /([a-zA-Z0-9]).*(\1)/g;
  const triple = /([a-zA-Z0-9]).*(\1).*(\1)/g;
  const quad = /([a-zA-Z0-9]).*(\1).*(\1).*(\1)/g;
  const quint = /([a-zA-Z0-9]).*(\1).*(\1).*(\1).*(\1)/g;

  if (quint.test(hand)) {
    // console.log('quint: ', hand);
    fiveOfAKind.push({ hand, bid });
  } else if (quad.test(hand)) {
    // console.log('quad: ',hand)
    fourOfAKind.push({ hand, bid });
  } else if (triple.test(hand)) {
    // console.log('triple: ', hand)
    const regex = new RegExp(hand.match(triple)[0].at(0), "g");
    // console.log(hand.match(triple), hand.replace(regex, '') );

    //fullhouse?
    if (
      hand.match(pair).length > 1 ||
      hand.replace(regex, "").match(pair)?.length > 0
    ) {
      fullHouse.push({ hand, bid });
    } else {
      threeOfAKind.push({ hand, bid });
    }
  } else if (pair.test(hand)) {
    //doublePair?

    // console.log(hand.match(pair), hand.replace(hand.match(pair)[0], hand.match(pair)[0].substring(1)).match(pair)?.length);
    if (
      hand.match(pair).length > 1 ||
      hand
        .replace(hand.match(pair)[0], hand.match(pair)[0].substring(1))
        .match(pair)?.length > 0
    ) {
      doublePair.push({ hand, bid });
    } else {
      twoOfAKind.push({ hand, bid });
    }
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

// console.log(fullHouse);
// console.log(threeOfAKind);

for (let i = 0; i < combinedHands.length; i++) {
  const bid = parseInt(combinedHands[i].bid);
  const rank = parseInt(combinedHands.length - i);
  // console.log(combinedHands[i]);
  // console.log(rank);
  result += bid * rank;
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
