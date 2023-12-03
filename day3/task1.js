var fs = require("fs");
var text = fs.readFileSync("./input1.txt", "utf-8");

const lines = text.split("\n");
// text = text.replace(/\s/g,'');
var result = 0;

for (let i = 0; i < lines.length; i++) {
  const element = lines[i].trim();

  const regex = new RegExp(/\d+/, "g");

  let match;

  while ((match = regex.exec(element)) !== null) {
    // console.log(`Line ${i + 1}: Found ${match[0]}. regex: ${match.index}.`);

    prevPos = match.index - 1;
    followPos = regex.lastIndex;
    // console.log(followPos, element.length);
    var prevChar = prevPos >= 0 ? element.charAt(prevPos) : ".";
    var followChar =
      followPos >= element.length ? "." : element.charAt(followPos);

    // console.log(prevChar, followChar);

    const prevRow = lines[i - 1]?.substring(prevPos, followPos + 1).trim();
    const followRow = lines[i + 1]?.substring(prevPos, followPos + 1).trim();
    // console.log(prevRow, followRow);

    const combinedString = `${prevChar}${followChar}${prevRow || ""}${
      followRow || ""
    }`;
    const containsSymbol = /[^\.\d]/.test(combinedString);
    if (containsSymbol) {
      // console.log(match[0]);
      result += parseInt(match[0]);
      // console.log(/[^\.\d]/.exec(combinedString)[0]);
    }
  }
}

console.log(result);
