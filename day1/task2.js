var fs = require("fs");
var text = fs.readFileSync("./input1.txt", "utf-8");
// var text = fs.readFileSync("./testInput.txt", "utf-8");

const numberStrings = [
  ["one", 1],
  ["two", 2],
  ["three", 3],
  ["four", 4],
  ["five", 5],
  ["six", 6],
  ["seven", 7],
  ["eight", 8],
  ["nine", 9],
];

// text = text.replace(/(one)/gm, "1one");
// text = text.replace(/(two)/gm, "2two");
// text = text.replace(/(three)/gm, "3three");
// text = text.replace(/(four)/gm, "4four");
// text = text.replace(/(five)/gm, "5five");
// text = text.replace(/(six)/gm, "6six");
// text = text.replace(/(seven)/gm, "7seven");
// text = text.replace(/(eight)/gm, "8");
// text = text.replace(/(nine)/gm, "9");

// console.log(text);

const lines = text.split("\n");
var result = 0;
var count = 0;

for (let i = 0; i < lines.length; i++) {
  var element = lines[i];

  indexArray = [];

  numberStrings.forEach((num) => {
    const firstMatch = element.indexOf(num[0]);
    const lastMatch = element.lastIndexOf(num[0]);
    if (firstMatch >= 0) {
      indexArray.push([firstMatch, num[1]]);
    }

    if (lastMatch >= 0 && firstMatch !== lastMatch) {
      indexArray.push([lastMatch, num[1]]);
    }
  });

  console.log(indexArray);

  indexArray.forEach((combi) => {
    element =
      element.substring(0, combi[0]) +
      combi[1] +
      element.substring(combi[0] + 1);
    // console.log(element);
  });

  const foo = element.replace(/[a-z]/g, "");

  const bar = `${parseInt(foo.at(0))}${parseInt(foo.at(-1))}`;
  count++;

  result += parseInt(bar);
}

console.log(count);
console.log(result);
