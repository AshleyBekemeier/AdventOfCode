var fs = require("fs");
var text = fs.readFileSync("./input1.txt", "utf-8");

const lines = text.split("\n");
// text = text.replace(/\s/g,'');
var result = 0;

for (let i = 0; i < lines.length; i++) {
  const element = lines[i].trim();

  const regex = new RegExp(/\*+/, "g");

  const numberRegex = new RegExp(/\d+/, "g");

  let match;

  while ((match = regex.exec(element)) !== null) {
    // console.log(`Line ${i + 1}: Found ${match[0]}. position: ${match.index}.`);

    prevPos = match.index - 1;
    followPos = regex.lastIndex;
    // console.log(followPos, element.length);

    thisRowMatches = getAdjacentNumbers(element, match.index);

    const prevLine = lines[i - 1].trim() || "";
    const followLine = lines[i + 1].trim() || "";

    if (/\d/.test(prevLine.charAt(match.index))) {
      prevRowMatches = getNumbersFromLine(prevLine, match.index);
    } else {
      prevRowMatches = getAdjacentNumbers(prevLine, match.index);
    }

    if (/\d/.test(followLine.charAt(match.index))) {
      followRowMatches = getNumbersFromLine(followLine, match.index);
    } else {
      followRowMatches = getAdjacentNumbers(followLine, match.index);
    }

    resultArray = thisRowMatches
      .filter(Boolean)
      .concat(prevRowMatches.filter(Boolean))
      .concat(followRowMatches.filter(Boolean));

    if (resultArray.length === 2) {
      power = parseInt(resultArray[0]) * parseInt(resultArray[1]);
      //   console.log(power);
      result += power;
    }
  }
}

function getAdjacentNumbers(row, index) {
  var prevCharRow = row.substring(0, index);
  var followCharRow = row.substring(index + 1);

  var prevChar = prevCharRow.split(".").at(-1);
  var followChar = followCharRow.split(".")[0];

  //   console.log(prevChar, followChar);

  return [prevChar, followChar];
}

function getNumbersFromLine(line, index) {
//   console.log(line);
//   console.log(index);
  const lineArray = line.split(/(\d+)/g);
  //   console.log(lineArray);
  let posEnd = 0;
  const newArr = lineArray.map((el) => {
    posEnd += el.length;
    const newEl = { el, posEnd: posEnd };
    return newEl;
  });

  const match = newArr.find((el) => el.posEnd > index);
//   console.log(match.el);
  return [match?.el ?? undefined];
}

console.log(result);
